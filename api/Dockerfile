#  Dockerfile for Node Express Backend

FROM node:12.22-alpine

# Create App Directory
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy api source code
COPY . .

# Exports
EXPOSE 8088

CMD ["npm","start"]