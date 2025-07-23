variable "aws_region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  description = "EC2 Key Pair name"
}

variable "ami_id" {
  description = "Ubuntu AMI ID for your region"
}

variable "vpc_id" {
  description = "VPC to deploy EC2"
}

variable "subnet_id" {
  description = "Subnet to deploy EC2"
}

variable "db_username" {
  default = "admin"
}

variable "db_password" {
  description = "Database password"
  sensitive   = true
}

variable "db_name" {
  default     = "prestashop"
  description = "Name of the MySQL database to create"
}

variable "db_allocated_storage" {
  type    = number
  default = 20
}

variable "subnet_ids" {
  description = "List of subnet IDs in different AZs for RDS"
  type        = list(string)
  default     = ["subnet-abc12345", "subnet-def67890"]
}