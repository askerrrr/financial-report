FROM node:20.19.3-alpine3.21
WORKDIR /report_app
COPY package*.json  /report_app/
RUN npm i \
    && apk update \
    && apk add vim
COPY . .
EXPOSE 5000
CMD npm start