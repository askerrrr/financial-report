FROM node:24.15.0-alpine3.22
WORKDIR /report_app
COPY package*.json  /report_app/
RUN npm ci \
    && apk update \
    && apk add vim
COPY . .
EXPOSE 5000
CMD npm start
