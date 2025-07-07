# Project 4B – CI/CD Deployment to AWS EC2 via GitHub Actions

## Objective
Set up a Continuous Integration and Continuous Deployment (CI/CD) pipeline using **GitHub Actions** to automatically deploy code to an **AWS EC2** instance.

## Tools Used
- GitHub Actions
- AWS EC2 (Amazon Linux 2)
- Nginx
- SSH (via `appleboy/scp-action`)

## What Was Done

1. Created a sample static `index.html` website.
2. Launched an EC2 instance and installed Nginx.
3. Created a GitHub Actions workflow that:
   - Detects changes to `main` branch
   - Securely copies the updated `index.html` file to the EC2 instance via SCP
4. Manually moved the file to Nginx's public directory (`/usr/share/nginx/html`) and restarted the service.

##  GitHub Secrets Configured

| Secret Name      | Description                          |
|------------------|--------------------------------------|
| `EC2_HOST`       | Public IP of the EC2 instance        |
| `EC2_SSH_KEY`    | Contents of the `.pem` SSH key file  |
