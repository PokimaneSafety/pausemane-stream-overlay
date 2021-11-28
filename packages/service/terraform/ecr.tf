resource "aws_ecr_repository" "repo" {
  name                 = "pokimane-safety/${local.service_name}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }
}

resource "aws_ecr_lifecycle_policy" "repo_policy" {
  repository = aws_ecr_repository.repo.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1,
      description  = "Keep last ${local.images_to_keep} images",
      selection = {
        tagStatus   = "any",
        countType   = "imageCountMoreThan",
        countNumber = local.images_to_keep
      },
      action = {
        type = "expire"
      }
    }]
  })
}
