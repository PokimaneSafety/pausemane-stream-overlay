terraform {
  backend "s3" {
    bucket         = "pokimane-safety-terraform-state"
    dynamodb_table = "pokimane-safety-terraform-lock"
    encrypt        = true
    key            = "apps-pausemane-stream-overlay/terraform.tfstate"
    region         = "us-west-2"
  }
}
