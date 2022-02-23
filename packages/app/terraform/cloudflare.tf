resource "cloudflare_record" "website" {
  zone_id = var.cloudflare_zone_id
  name    = "pausemane.pokijam.com"
  value   = aws_s3_bucket.website.website_endpoint
  type    = "CNAME"
  ttl     = 1
  proxied = true
}
