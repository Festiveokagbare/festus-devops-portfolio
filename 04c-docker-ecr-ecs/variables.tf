variable "region" {
  description = "AWS region to deploy resources"
  default     = "eu-north-1"
}

variable "app_name" {
  description = "Name of the application"
  default     = "festus-app"
}

variable "image_uri" {
  description = "Docker image URI in ECR"
  default     = "462513676659.dkr.ecr.eu-north-1.amazonaws.com/festus-app:latest"
}

variable "app_port" {
  description = "Port the application listens on"
  default     = 80
}

variable "subnet_cidr_1" {
  description = "CIDR block for public subnet 1"
  default     = "10.0.1.0/24"
}

variable "subnet_cidr_2" {
  description = "CIDR block for public subnet 2"
  default     = "10.0.2.0/24"
}

variable "az_1" {
  description = "Availability zone for subnet 1"
  default     = "eu-north-1a"
}

variable "az_2" {
  description = "Availability zone for subnet 2"
  default     = "eu-north-1b"
}