# festus-devops-portfolio
A personal DevOps &amp; Cloud Engineering portfolio by Festus Okagbare.

#  Dockerized Node.js App

This is a basic Node.js + Express web app that runs inside a Docker container.

##  Features
- Express server on port 3000
- Dockerized using a simple Dockerfile
- Lightweight and easy to deploy

##  How to Run

```bash
# Clone the project and navigate
git clone https://github.com/Festiveokagbare/festus-devops-portfolio
cd festus-devops-portfolio/01-docker-node-app

# Build the Docker image
docker build -t festive-node-app .

# Run the container
docker run -p 3000:3000 festive-node-app