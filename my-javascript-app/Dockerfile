ARG VERSION=latest
FROM node:${VERSION:-latest}
RUN mkdir -p /usr/src/app/src/public/js /usr/src/app/test
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src/*.js ./src/
COPY src/public/*.html ./src/public/
COPY src/public/js/*.js ./src/public/js/
# La siguiente línea podría eliminarse en Producción
COPY test/* ./test/
EXPOSE 8080
CMD ["node","src/index.js"]
