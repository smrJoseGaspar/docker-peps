# Descargamos una version del contenedor oficial Node.js
ARG VERSION=slim
FROM node:${VERSION:-slim}

# Establecemos el directorio de trabajo 
WORKDIR /usr/src/web_server/public
ADD ./ /usr/src/web_server/public/
EXPOSE 8080
#RUN npm install && npm start
RUN npm install
CMD [ "npm","start" ]
