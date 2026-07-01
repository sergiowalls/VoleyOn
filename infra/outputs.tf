output "app_url" {
  description = "Live URL of the deployed backend App Platform application"
  value       = digitalocean_app.voleyon_backend.live_url
}

output "app_id" {
  description = "DigitalOcean App Platform application ID"
  value       = digitalocean_app.voleyon_backend.id
}
