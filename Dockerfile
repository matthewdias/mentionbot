FROM node:alpine


# add app src
WORKDIR /usr/src/app

COPY . .

RUN apk add --no-cache git python build-base && \
    npm install && \
    npm install -g knex && \
    apk del build-base python && \
    rm -rf /var/cache/apk

CMD [ "npm", "start" ]
