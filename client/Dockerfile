# Dockerfile for React client

# Build react client
FROM node:12.22-alpine as build-step

#Make client directory in container
RUN mkdir /client

#Identify working directory
WORKDIR /client

#Copy package
COPY package.json /client

#Install rpm packages from package.json
RUN npm install

#Copy over client to client folder
COPY . /client

#Command to build ReactJS application for deploy
RUN npm run build

#Run Steps
FROM nginx:1.19.8-alpine  
COPY --from=build-step /client/build /usr/share/nginx/html