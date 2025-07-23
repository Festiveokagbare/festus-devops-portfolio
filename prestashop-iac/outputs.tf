output "ec2_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.prestashop_vm.public_ip
}

output "rds_endpoint" {
  description = "RDS DB Endpoint"
  value       = aws_db_instance.prestashop_db.endpoint
}