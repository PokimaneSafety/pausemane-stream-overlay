resource "aws_ssm_parameter" "postgresql_database" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/database"
  value = var.postgresql_database
}

resource "aws_ssm_parameter" "postgresql_host" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/host"
  value = var.postgresql_host
}

resource "aws_ssm_parameter" "postgresql_port" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/port"
  value = var.postgresql_port
}

resource "aws_ssm_parameter" "postgresql_user" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/user"
  value = var.postgresql_user
}

resource "aws_ssm_parameter" "postgresql_password" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/password"
  value = var.postgresql_password
}

resource "aws_ssm_parameter" "websocket_host" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/websocket/host"
  value = var.websocket_host
}

# resource "aws_ssm_parameter" "websocket_port" {
#   type  = "String"
#   tags  = local.tags
#   name  = "/${local.service_name}/websocket/port"
#   value = var.websocket_port
# }

resource "aws_ssm_parameter" "websocket_path" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/websocket/path"
  value = var.websocket_path
}

# resource "aws_ssm_parameter" "websocket_trust_proxy" {
#   type  = "String"
#   tags  = local.tags
#   name  = "/${local.service_name}/websocket/trust_proxy"
#   value = var.websocket_trust_proxy
# }

resource "aws_ssm_parameter" "health_host" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/health/host"
  value = var.health_host
}

# resource "aws_ssm_parameter" "health_port" {
#   type  = "String"
#   tags  = local.tags
#   name  = "/${local.service_name}/health/port"
#   value = var.health_port
# }

# resource "aws_ssm_parameter" "health_path" {
#   type  = "String"
#   tags  = local.tags
#   name  = "/${local.service_name}/health/path"
#   value = var.health_path
# }

# resource "aws_ssm_parameter" "health_trust_proxy" {
#   type  = "String"
#   tags  = local.tags
#   name  = "/${local.service_name}/health/trust_proxy"
#   value = var.health_trust_proxy
# }

# resource "aws_ssm_parameter" "health_uptime" {
#   type  = "String"
#   tags  = local.tags
#   name  = "/${local.service_name}/health/uptime"
#   value = var.health_uptime
# }

resource "aws_ssm_parameter" "metrics_host" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/metrics/host"
  value = var.metrics_host
}

# resource "aws_ssm_parameter" "metrics_port" {
#   type  = "String"
#   tags  = local.tags
#   name  = "/${local.service_name}/metrics/port"
#   value = var.metrics_port
# }

# resource "aws_ssm_parameter" "metrics_path" {
#   type  = "String"
#   tags  = local.tags
#   name  = "/${local.service_name}/metrics/path"
#   value = var.metrics_path
# }

# resource "aws_ssm_parameter" "metrics_trust_proxy" {
#   type  = "String"
#   tags  = local.tags
#   name  = "/${local.service_name}/metrics/trust_proxy"
#   value = var.metrics_trust_proxy
# }

resource "aws_ssm_parameter" "twitch_user" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/twitch/user"
  value = var.twitch_user
}

resource "aws_ssm_parameter" "twitch_token" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/twitch/token"
  value = var.twitch_token
}

resource "aws_ssm_parameter" "twitch_room" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/twitch/room"
  value = var.twitch_room
}
