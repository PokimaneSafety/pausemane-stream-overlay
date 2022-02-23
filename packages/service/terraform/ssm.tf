resource "aws_ssm_parameter" "postgresql_database" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/database"
  count = var.postgresql_database != "" ? 1 : 0
  value = var.postgresql_database
}

resource "aws_ssm_parameter" "postgresql_host" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/host"
  count = var.postgresql_host != "" ? 1 : 0
  value = var.postgresql_host
}

resource "aws_ssm_parameter" "postgresql_port" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/port"
  count = var.postgresql_port != "" ? 1 : 0
  value = var.postgresql_port
}

resource "aws_ssm_parameter" "postgresql_user" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/user"
  count = var.postgresql_user != "" ? 1 : 0
  value = var.postgresql_user
}

resource "aws_ssm_parameter" "postgresql_password" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/postgresql/password"
  count = var.postgresql_password != "" ? 1 : 0
  value = var.postgresql_password
}

resource "aws_ssm_parameter" "websocket_host" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/websocket/host"
  count = var.websocket_host != "" ? 1 : 0
  value = var.websocket_host
}

resource "aws_ssm_parameter" "websocket_port" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/websocket/port"
  count = var.websocket_port != "" ? 1 : 0
  value = var.websocket_port
}

resource "aws_ssm_parameter" "websocket_path" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/websocket/path"
  count = var.websocket_path != "" ? 1 : 0
  value = var.websocket_path
}

resource "aws_ssm_parameter" "websocket_trust_proxy" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/websocket/trust_proxy"
  count = var.websocket_trust_proxy != "" ? 1 : 0
  value = var.websocket_trust_proxy
}

resource "aws_ssm_parameter" "health_host" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/health/host"
  count = var.health_host != "" ? 1 : 0
  value = var.health_host
}

resource "aws_ssm_parameter" "health_port" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/health/port"
  count = var.health_port != "" ? 1 : 0
  value = var.health_port
}

resource "aws_ssm_parameter" "health_path" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/health/path"
  count = var.health_path != "" ? 1 : 0
  value = var.health_path
}

resource "aws_ssm_parameter" "health_trust_proxy" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/health/trust_proxy"
  count = var.health_trust_proxy != "" ? 1 : 0
  value = var.health_trust_proxy
}

resource "aws_ssm_parameter" "health_uptime" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/health/uptime"
  count = var.health_uptime != "" ? 1 : 0
  value = var.health_uptime
}

resource "aws_ssm_parameter" "metrics_host" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/metrics/host"
  count = var.metrics_host != "" ? 1 : 0
  value = var.metrics_host
}

resource "aws_ssm_parameter" "metrics_port" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/metrics/port"
  count = var.metrics_port != "" ? 1 : 0
  value = var.metrics_port
}

resource "aws_ssm_parameter" "metrics_path" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/metrics/path"
  count = var.metrics_path != "" ? 1 : 0
  value = var.metrics_path
}

resource "aws_ssm_parameter" "metrics_trust_proxy" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/metrics/trust_proxy"
  count = var.metrics_trust_proxy != "" ? 1 : 0
  value = var.metrics_trust_proxy
}

resource "aws_ssm_parameter" "twitch_user" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/twitch/user"
  count = var.twitch_user != "" ? 1 : 0
  value = var.twitch_user
}

resource "aws_ssm_parameter" "twitch_token" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/twitch/token"
  count = var.twitch_token != "" ? 1 : 0
  value = var.twitch_token
}

resource "aws_ssm_parameter" "twitch_room" {
  type  = "String"
  tags  = local.tags
  name  = "/${local.service_name}/twitch/room"
  count = var.twitch_room != "" ? 1 : 0
  value = var.twitch_room
}
