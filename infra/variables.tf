variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "django_secret_key" {
  description = "Django SECRET_KEY"
  type        = string
  sensitive   = true
}

variable "allowed_hosts" {
  description = "Comma-separated list of Django ALLOWED_HOSTS"
  type        = string
  default     = "localhost,127.0.0.1"
}

variable "region" {
  description = "DigitalOcean region slug for the App Platform"
  type        = string
  default     = "nyc3"
}

variable "spaces_access_key" {
  description = "DigitalOcean Spaces access key (for Terraform state backend)"
  type        = string
  sensitive   = true
  default     = ""
}

variable "spaces_secret_key" {
  description = "DigitalOcean Spaces secret key (for Terraform state backend)"
  type        = string
  sensitive   = true
  default     = ""
}
