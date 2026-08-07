terraform {
  required_version = ">= 1.5"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  backend "s3" {
    endpoints = {
      s3 = "https://lon1.digitaloceanspaces.com"
    }
    bucket = "voleyon-tf-state"
    key    = "frontend/terraform.tfstate"
    region = "us-east-1" # required by the S3 backend; DO Spaces ignores this value

    skip_credentials_validation = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    use_path_style              = true
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_app" "voleyon_frontend" {
  spec {
    name   = "voleyon-frontend"
    region = var.region

    static_site {
      name              = "frontend"
      source_dir        = var.frontend_source_dir
      build_command     = var.frontend_build_command
      output_dir        = "dist"
      index_document    = "index.html"
      catchall_document = "index.html"

      github {
        repo           = "sergiowalls/VoleyOn"
        branch         = "main"
        deploy_on_push = false
      }

      env {
        key   = "VITE_VOLEYON_API_URL"
        value = var.frontend_api_url
        scope = "BUILD_TIME"
      }
    }
  }
}
