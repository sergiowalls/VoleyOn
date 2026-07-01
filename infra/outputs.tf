output "app_url" {
  description = "Live URL of the deployed backend App Platform application"
  value       = digitalocean_app.voleyon_backend.live_url
}

output "app_id" {
  description = "DigitalOcean App Platform application ID"
  value       = digitalocean_app.voleyon_backend.id
}

output "images_bucket_name" {
  description = "Name of the DigitalOcean Spaces bucket for tournament poster images"
  value       = digitalocean_spaces_bucket.tournament_images.name
}

output "images_bucket_endpoint" {
  description = "S3-compatible endpoint URL for the tournament images bucket (use for direct SDK access)"
  value       = "https://${var.images_bucket_region}.digitaloceanspaces.com"
}

output "images_cdn_endpoint" {
  description = "CDN endpoint URL for publicly serving tournament poster images"
  value       = "https://${digitalocean_spaces_bucket.tournament_images.name}.${var.images_bucket_region}.cdn.digitaloceanspaces.com"
}
