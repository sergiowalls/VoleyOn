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

variable "frontend_source_dir" {
  description = "Repository path to the frontend source"
  type        = string
  default     = "frontend"
}

variable "frontend_build_command" {
  description = "Build command used by App Platform for the frontend"
  type        = string
  default     = "npm ci && npm run build"
}
