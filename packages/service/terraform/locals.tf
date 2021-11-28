locals {
  service_name   = "pausemane-stream-overlay"
  tags           = { service = local.service_name }
  images_to_keep = 25
}
