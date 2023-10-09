FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY yarn.lock ./
RUN npm install -g yarn

# Install app dependencies
RUN yarn

EXPOSE 5173
CMD [ "npm", "run", "dev" ]