FROM node:buster-slim

WORKDIR /app

COPY dist /app/

ENV NODE_ENV production
ENV BUILD WEBPACK
ENV MEDIA https://same-media-api.herokuapp.com/stream/upload
ENV CLIENT_URL http://localhost:3000

CMD node bundle.js --bind:0.0.0.0