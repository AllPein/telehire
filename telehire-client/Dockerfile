FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY . ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn
RUN yarn build

EXPOSE 3000

CMD [ "node", "server.js" ]