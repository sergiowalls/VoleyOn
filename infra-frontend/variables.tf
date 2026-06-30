variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "frontend_api_url" {
  description = "Backend API URL exposed to the frontend build as VITE_VOLEYON_API_URL"
  type        = string
}

variable "region" {
  description = "DigitalOcean region slug for the App Platform"
  type        = string
  default     = "lon1"
}
