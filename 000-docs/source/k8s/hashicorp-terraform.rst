Hashicorp - Terraform
######################

Terraform steps: scope, author, initialize, plan, apply
scope: identify the infrastructure for your project
author: Write configuration to define your infra
initialize: install required terraform providers
plan: preview the changes terraform will makes
apply: make the changes to your infra

Docker
*******

```main.tf
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "nginx" {
  name         = "nginx:latest"
  keep_locally = false
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.latest
  name  = "tutorial"
  ports {
    internal = 80
    external = 8000
  }
}
```

terraform init: download plugin for this file
terraform apply: apply the file
terraform destroy: remove the file creation

terraform {} will define where to deploy
`kreuzwerker/docker`: is a shorthand for `registry.terraform.io/kreuzwerker/docker`

terraform fmt: permit to correctly format your file, if anything to do, return empty
terraform validate: check your files
terraform show: inspect current state
terraform state list: for advance state management

terraform apply -var "container_name=YetAnotherName"
