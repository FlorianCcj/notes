
# Use one of the standard Node images from Docker Hub 
FROM node:8

# The Dockerfile's author
LABEL maintainer=florianccj

# Create a directory in the container where the code will be placed
RUN mkdir -p /usr/src/app

# Set this as the default working directory.
# We'll land here when we SSH into the container.
WORKDIR /usr/src/app

# For prod
# COPY package*.json ./
# RUN npm install
# COPY . .

# Our Nginx container will forward HTTP traffic to containers of 
# this image via port 3000. For this, 3000 needs to be 'open'.
EXPOSE 3000

CMD [ "npm", "start" ]
