# Project 04c – Docker + ECR + ECS + Application Load Balancer (ALB)

This project demonstrates how to containerize a simple web application, push it to AWS Elastic Container Registry (ECR), and deploy it using AWS Elastic Container Service (ECS) with Fargate. An Application Load Balancer (ALB) is added to make the service publicly accessible.


## Stack Used

- **Docker** – Containerize the application
- **AWS ECR** – Host Docker images
- **AWS ECS (Fargate)** – Deploy containers
- **Terraform** – Infrastructure as Code
- **ALB** – Public access via HTTP
- **GitHub Actions** – Optional CI/CD

---

## Public URL

http://festus-app-alb-1025132682.eu-north-1.elb.amazonaws.com


## How It Works

1. **Docker Build & Push**
   - A Docker image is built and pushed to ECR.

2. **Terraform Deployment**
   - Creates:
     - VPC + Subnets + Internet Gateway
     - ECS Cluster + Task Definition
     - ECS Fargate Service
     - Application Load Balancer (ALB)
     - Security Groups

3. **Access**
   - The ALB routes HTTP traffic to the ECS containerized app.

## File Structure

04c-docker-ecr-ecs/
│
├── Dockerfile # App container config
├── main.tf # Terraform infrastructure
├── variables.tf # Input variables
├── outputs.tf # Terraform output values
└── README.md # Project documentation


## Outputs

After running `terraform apply`, the following will be available:
- ECS Cluster Name
- VPC ID
- **ALB DNS Name** (Public URL)



## Commands

# Build Docker image
docker build -t festus-app .

# Tag image for ECR
docker tag festus-app:latest <my-ecr-repo-uri>:latest

# Login to ECR and push
aws ecr get-login-password | docker login --username AWS --password-stdin <my-ecr-repo-uri>
docker push <my-ecr-repo-uri>:latest

# Deploy with Terraform
terraform init
terraform apply
