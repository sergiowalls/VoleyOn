output "app_url" {
  description = "Live URL of the deployed frontend App Platform application"
  value       = digitalocean_app.voleyon_frontend.live_url
}

output "app_id" {
  description = "DigitalOcean App Platform application ID"
  value       = digitalocean_app.voleyon_frontend.id
}
