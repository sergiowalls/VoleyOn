terraform {
  required_version = ">= 1.5"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  # Remote state using DigitalOcean Spaces (S3-compatible).
  # Before using this backend, create a Space named "voleyon-tf-state" in the
  # lon1 region and generate a Spaces access key in the DigitalOcean control
  # panel. Pass the credentials via environment variables:
  #   AWS_ACCESS_KEY_ID     → Spaces access key
  #   AWS_SECRET_ACCESS_KEY → Spaces secret key
  backend "s3" {
    endpoints = {
      s3 = "https://lon1.digitaloceanspaces.com"
    }
    bucket = "voleyon-tf-state"
    key    = "backend/terraform.tfstate"
    region = "us-east-1" # required by the S3 provider; DO Spaces ignores it

    skip_credentials_validation = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    use_path_style              = true
  }
}

provider "digitalocean" {
  token             = var.do_token
  spaces_access_id  = var.spaces_access_key
  spaces_secret_key = var.spaces_secret_key
}

# ---------------------------------------------------------------------------
# DigitalOcean Spaces bucket for tournament poster images
# ---------------------------------------------------------------------------

resource "digitalocean_spaces_bucket" "tournament_images" {
  name   = var.images_bucket_name
  region = var.images_bucket_region
  acl    = "public-read"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    max_age_seconds = 3600
  }
}

resource "digitalocean_spaces_bucket_cors_configuration" "tournament_images" {
  bucket = digitalocean_spaces_bucket.tournament_images.name
  region = digitalocean_spaces_bucket.tournament_images.region

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    allowed_origins = ["https://voleyon.com", "http://localhost:5173"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3600
  }
}

resource "digitalocean_spaces_bucket_policy" "tournament_images_public_read" {
  bucket = digitalocean_spaces_bucket.tournament_images.name
  region = digitalocean_spaces_bucket.tournament_images.region
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "arn:aws:s3:::${var.images_bucket_name}/*"
      }
    ]
  })
}

resource "digitalocean_app" "voleyon_backend" {
  spec {
    name   = "voleyon-backend"
    region = var.region

    # Dev PostgreSQL database – runs inside App Platform at no extra cost.
    # Switch production = true and add a cluster_name to use a managed database.
    database {
      name       = "db"
      engine     = "PG"
      version    = "16"
      production = false
    }

    # Run database migrations before each new deployment
    job {
      name               = "migrate"
      kind               = "PRE_DEPLOY"
      instance_count     = 1
      instance_size_slug = "apps-s-1vcpu-0.5gb"
      source_dir         = "backend"
      run_command        = "python manage.py migrate --noinput"

      github {
        repo           = "sergiowalls/VoleyOn"
        branch         = "main"
        deploy_on_push = false
      }

      # Needs the same database env vars as the service
      env {
        key   = "DB_NAME"
        value = "$${db.DATABASE}"
        scope = "RUN_TIME"
      }
      env {
        key   = "DB_USER"
        value = "$${db.USERNAME}"
        scope = "RUN_TIME"
      }
      env {
        key   = "DB_PASSWORD"
        value = "$${db.PASSWORD}"
        type  = "SECRET"
        scope = "RUN_TIME"
      }
      env {
        key   = "DB_HOST"
        value = "$${db.HOSTNAME}"
        scope = "RUN_TIME"
      }
      env {
        key   = "DB_PORT"
        value = "$${db.PORT}"
        scope = "RUN_TIME"
      }
    }

    service {
      name               = "backend"
      environment_slug   = "python"
      instance_count     = 1
      instance_size_slug = "apps-s-1vcpu-0.5gb" # Basic XXS – 1 vCPU / 512 MB

      source_dir    = "backend"
      build_command = "pip install --quiet pipenv && pipenv install --deploy && python manage.py collectstatic --noinput"
      run_command   = "gunicorn --worker-class uvicorn.workers.UvicornWorker --workers ${var.gunicorn_workers} --bind 0.0.0.0:8080 voleyon.asgi:application"
      http_port     = 8080

      github {
        repo           = "sergiowalls/VoleyOn"
        branch         = "main"
        deploy_on_push = false # CI controls deployments; disable auto-deploy
      }

      # Django core settings
      env {
        key   = "SECRET_KEY"
        value = var.django_secret_key
        type  = "SECRET"
        scope = "RUN_AND_BUILD_TIME"
      }
      env {
        key   = "DEBUG"
        value = "False"
        scope = "RUN_AND_BUILD_TIME"
      }
      env {
        key   = "ALLOWED_HOSTS"
        value = var.allowed_hosts
        scope = "RUN_AND_BUILD_TIME"
      }

      # Database connection – resolved from the "db" component at runtime
      env {
        key   = "DB_NAME"
        value = "$${db.DATABASE}"
        scope = "RUN_TIME"
      }
      env {
        key   = "DB_USER"
        value = "$${db.USERNAME}"
        scope = "RUN_TIME"
      }
      env {
        key   = "DB_PASSWORD"
        value = "$${db.PASSWORD}"
        type  = "SECRET"
        scope = "RUN_TIME"
      }
      env {
        key   = "DB_HOST"
        value = "$${db.HOSTNAME}"
        scope = "RUN_TIME"
      }
      env {
        key   = "DB_PORT"
        value = "$${db.PORT}"
        scope = "RUN_TIME"
      }

      # DigitalOcean Spaces – tournament poster image storage
      env {
        key   = "SPACES_ACCESS_KEY_ID"
        value = var.spaces_access_key
        type  = "SECRET"
        scope = "RUN_TIME"
      }
      env {
        key   = "SPACES_SECRET_ACCESS_KEY"
        value = var.spaces_secret_key
        type  = "SECRET"
        scope = "RUN_TIME"
      }
      env {
        key   = "SPACES_BUCKET_NAME"
        value = var.images_bucket_name
        scope = "RUN_TIME"
      }
      env {
        key   = "SPACES_REGION"
        value = var.images_bucket_region
        scope = "RUN_TIME"
      }
      env {
        key   = "SPACES_ENDPOINT_URL"
        value = "https://${var.images_bucket_region}.digitaloceanspaces.com"
        scope = "RUN_TIME"
      }
      env {
        key   = "SPACES_CDN_ENDPOINT"
        value = "https://${var.images_bucket_name}.${var.images_bucket_region}.cdn.digitaloceanspaces.com"
        scope = "RUN_TIME"
      }
    }
  }
}
