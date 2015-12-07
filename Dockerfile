FROM node:0.10

RUN apt-get install -y curl
RUN curl https://install.meteor.com | /bin/sh

ADD . /opt/iso-deck-tracker/app

WORKDIR /opt/iso-deck-tracker/app/programs/server
RUN npm install

WORKDIR /opt/iso-deck-tracker/app
ENV PORT 80
ENV ROOT_URL http://127.0.0.1
ENV MONGO_URL mongodb://meteor_mongo:27017/iso-deck-tracker

EXPOSE 80

CMD node ./main.js