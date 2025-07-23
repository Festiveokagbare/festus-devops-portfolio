provider "aws" {
  region = var.aws_region
}

# ✅ New Security Group for EC2 and Terraform-managed RDS
resource "aws_security_group" "prestashop_sg_new" {
  name        = "prestashop_sg_new"
  description = "Allow SSH, HTTP and MySQL"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow MySQL from EC2"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "PrestaShop-SG-New"
  }
}

# ✅ EC2 Instance for PrestaShop
resource "aws_instance" "prestashop_vm" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  subnet_id              = var.subnet_id
  vpc_security_group_ids = [aws_security_group.prestashop_sg_new.id]

  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install apache2 php php-mysql unzip wget -y
              systemctl start apache2
              systemctl enable apache2
              echo "<h1>PrestaShop Server is running</h1>" > /var/www/html/index.html
              EOF

  tags = {
    Name = "PrestaShop-Server"
  }
}

# ✅ RDS Subnet Group (must cover 2 AZs)
resource "aws_db_subnet_group" "main" {
  name = "main-db-subnet-group"
  subnet_ids = [
    "subnet-07fbaf6a7d70ca745", # us-east-1a
    "subnet-0e1fb16401ac33e4c", # us-east-1c
  ]

  tags = {
    Name = "Main DB Subnet Group"
  }
}

# ✅ RDS MySQL Instance
resource "aws_db_instance" "prestashop_db" {
  identifier             = "prestashop-db"
  allocated_storage      = var.db_allocated_storage
  engine                 = "mysql"
  engine_version         = "8.0.34"
  instance_class         = "db.t3.micro"
  username               = var.db_username
  password               = var.db_password
  parameter_group_name   = "default.mysql8.0"
  skip_final_snapshot    = true
  publicly_accessible    = true
  db_subnet_group_name   = aws_db_subnet_group.main.id
  vpc_security_group_ids = [aws_security_group.prestashop_sg_new.id]

  tags = {
    Name = "PrestaShop-RDS"
  }
}
