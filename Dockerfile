FROM node:current-alpine3.19 as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD cp -r dist result_build
