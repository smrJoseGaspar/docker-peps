# Docker para la puesta en producción segura - Probando Selenium mediante un sitio web sencillo ejecutado sobre HTTPServer
Uso práctico de Docker para el módulo Puesta en Producción Segura del Curso de Especialización en Ciberseguridad.
Vamos a probar Selenium a partir de una web sencilla que será servida mediante **http-server** ejecutado en un contenedor *Docker*.

## Contenidos:
1. Instalación y ejecución del servidor web mediante comandos.
2. Automatizando la instalación y ejecucion mediante un *Dockerfile*.

## 1. Instalación y ejecución del servidor web mediante comandos.
Ejecutamos un contenedor docker con **Node.js** mediante comandos:
```bash
docker run --entrypoint bash -it -p 8080:8080 \
-w /usr/src/web_server/public \
-v .:/usr/src/web_server/public node:slim
```
Una vez dentro de del contenedor si disponemos de los archivos necesarios (HTML, js) y el `package.json`, tan solo tendremos que ejecutar este sencillo comando para lanzar el servidor:
```bash
npm install && npm start &
```
El fichero `package.json` debería tener un contenido similar al siguiente:
```json
{
  "name": "selenium",
  "version": "1.0.0",
  "description": "Proyecto web para testear con Selenium",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"http-server"
  },
  "keywords": [
    "Selenium",
    "nodejs",
    "http-server"
  ],
  "author": "José Gaspar Sánchez García",
  "license": "ISC",
  "dependencies": {
    "bootstrap": "^5.3.2",
    "http-server": "^14.1.1",
    "jquery": "^3.7.1",
    "popper.js": "^1.16.1"
  }
}
```
## 2. Automatizando la instalación y ejecucion mediante un *Dockerfile*.
El Dockerfile que contiene las insturcciones para construir la imagen es el siguiente:
```Dockerfile
# Descargamos una version del contenedor oficial Node.js
ARG VERSION=slim
FROM node:${VERSION:-slim}

# Establecemos el directorio de trabajo 
WORKDIR /usr/src/web_server/public
ADD ./ /usr/src/web_server/public/
EXPOSE 8080
RUN npm install && npm start
#RUN npm install
#CMD [ "npm","start" ]
```
La lina `RUN npm install && npm start` puede ser comentada y sustituida por las dos siguientes, dependiendo de como queramos que sea usado este *Dockerfile*.
Para construir el Dockerfile utilizamos el siguiente comando:
```bash
docker build . -t my-http-server
```
Ejecutamos el contenedor con:
```bash
docker run -it my-http-server bash
```

## Referencias:
- [http-server: a simple static HTTP server.](https://www.npmjs.com/package/http-server)
- 