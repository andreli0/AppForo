#Author : Andres Hidalgo

#pull the base image
FROM node:22-alpine

RUN apk update && apk add --no-cache \
    git \
    curl

#set working directory
WORKDIR /app

#copy the package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm install

#copy all files
COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]