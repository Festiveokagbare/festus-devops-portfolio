provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "festus_ec2" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  tags = {
    Name = "Festus-Terraform-Instance"
  }
}