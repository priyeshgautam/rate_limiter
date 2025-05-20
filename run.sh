#!/bin/bash

# First check if Docker is properly installed and running
./check-docker.sh
if [ $? -ne 0 ]; then
    echo "Please fix the Docker installation issues before continuing."
    exit 1
fi

# If all checks pass, proceed with running the application
docker compose up --build 
