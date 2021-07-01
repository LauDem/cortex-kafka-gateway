FROM node:14-alpine

WORKDIR /gateway

COPY package.json .

RUN npm install

ENV containerized = true

COPY . .

EXPOSE 3000 8080 29092

CMD [ "node", "index.js" ]