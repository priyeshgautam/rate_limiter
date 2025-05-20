#!/bin/bash

# Function to print colored output
print_status() {
    case $2 in
        "success")
            echo -e "\e[32m$1\e[0m" # Green text
            ;;
        "error")
            echo -e "\e[31m$1\e[0m" # Red text
            ;;
        *)
            echo -e "\e[34m$1\e[0m" # Blue text
            ;;
    esac
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_status "❌ Docker is not installed!" "error"
    print_status "Please install Docker first. Visit: https://docs.docker.com/get-docker/" "error"
    exit 1
fi

# Check Docker version
docker_version=$(docker --version)
print_status "✅ Docker is installed: $docker_version" "success"

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    print_status "❌ Docker daemon is not running!" "error"
    print_status "Please start Docker daemon first" "error"
    exit 1
fi

print_status "✅ Docker daemon is running" "success"

# Check if Docker Compose is installed
if ! docker compose version &> /dev/null; then
    print_status "❌ Docker Compose is not available!" "error"
    print_status "Please ensure Docker Desktop is properly installed" "error"
    exit 1
fi

# Check Docker Compose version
compose_version=$(docker compose version)
print_status "✅ Docker Compose is installed: $compose_version" "success"

print_status "🎉 All checks passed! You can proceed with running the application." "success" 
