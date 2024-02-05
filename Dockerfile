FROM node:latest as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm ci
COPY . ./
RUN npm run build
CMD cp -r dist result_build
