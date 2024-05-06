FROM node:lts-alpine

USER node

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli 
RUN npm install

EXPOSE 4200
