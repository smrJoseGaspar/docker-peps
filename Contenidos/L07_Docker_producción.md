![Logotipos Fondos Next Generation](../imagenes/Logotipo_ME_FP_GV_FSE.png)
# Docker para la puesta en producción segura
Uso práctico de Docker para el módulo Puesta en Producción Segura del Curso de Especialización en Ciberseguridad.

## Contenidos:
1. Docker en producción.
2. Entorno de desarrollo Node.js
3. Entorno de desarrollo Node.js:slim (reducido)

## 1. Docker en producción
Para utilizar Docker en entornos de producción, se recomienda seguir las mejores prácticas para garantizar la seguridad y la eficiencia del sistema. Docker Compose es una herramienta útil para definir y ejecutar aplicaciones Docker en diferentes entornos, como **CI**, *staging* y **producción**.

Para preparar una aplicación Docker para producción, es necesario realizar algunos cambios en la configuración de la aplicación. Algunos de estos cambios incluyen:

- Eliminar cualquier enlace de volumen para el código de la aplicación, para que el código permanezca dentro del contenedor y no se pueda cambiar desde el exterior
- Enlazar a diferentes puertos en el host.
- Especificar variables de entorno de manera diferente, como reducir la verbosidad del registro o especificar configuraciones para servicios externos como un servidor de correo electrónico.
- Especificar una política de reinicio como `restart: always` para evitar el tiempo de inactividad.
- Agregar servicios adicionales como un agregador de registros.

Para hacer estos cambios, se puede definir un archivo adicional de Compose, por ejemplo **production.yml**, que especifique la configuración adecuada para producción. Este archivo de configuración solo necesita incluir los cambios que se desean hacer en el archivo *Compose* original. El archivo adicional de **Compose** se aplica sobre el archivo `compose.yml` original para crear una nueva configuración.

Una vez que se tiene un segundo archivo de configuración, se puede usar con la opción -f:
```sh
docker-compose -f compose.yml -f production.yml up -d
```
## 2. Entorno de desarrollo Node.js
### Preparación del entorno testing con Node.js mediante comandos docker
En primer lugar, aprenderemos como preparar un entorno de desarrollo Node.js sobre un sistema operativo Linux empleado comandos Docker. Los pasos que debemos seguir son:
1. Descarga de la imagen del entorno Nodejs.
```bash
docker pull node:latest
```
2. Comprobamos que la imagen del sistema operativo se ha descargado correctamente.
```bash
docker images
```
3. Ejecutamos un contenedor Docker a partir de la imagen de Nodejs descargada.
```bash
docker run -it --entrypoint bash --name jg-my-javascript-app -p 8080:8080 -v ${PWD}/my-javascript-app:/app -w /app node:latest
```
4. Dentro del contenedor `/app#` ejecutamos **mocha** `mpm test`. En caso de que *mocha* no esté instalado lo instalamos previamente `npm install mocha`.
5. Lanzamos el servidor **Exrpress** dentro del contenedor **Node**. En el contenedor `/app#` ejecutamos `node src/index.js &`, si todo ha ido bien debemos obtener la respuesta *"Servidor escuchando en el puerto 8080"*

### Despliegue de un entorno de desarrollo Node.js mediante Dockerfile
1. En primer lugar, es necesario crear el fichero *Dockerfile*:
```Dockerfile
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
```
2. Una vez elaborado el fichero *Dockerfile* es necesario construírlo:
```bash
docker build -t mi-js-app .
```

3. Después de construída la imñagen el siguiente paso es lanzar el contenedor asociado.
- Podemos lanzar el servidor web y consultar la aplicación Javascript a través de un navegador web.
```bash
docker run -it --name mi-js-app -p 8080:8080 mi-js-app
```
Paramos el contenedor que publica el servicio web mediante `docker container stop mi-js-app`.
- También es posible abrir una consola `bash` y ejecutar las pruebas dentro del contenedor.
```bash
docker run -it --entrypoint bash -p 8080:8080 mi-js-app
npm test
exit
```
### Despliegue de un entorno de desarrollo Node.js mediante docker-compose
1. En primer lugar, es necesario crear el fichero `compose-js-app.yml`:
```yaml
networks:
    ds-my-javascript-app-net:
        driver: bridge

services:
    app:
        build: .
        container_name: ds-my-javascript-app
        ports:
            - "8080:8080"
        networks:
            - ds-my-javascript-app-net

```
2. Una vez elaborado el fichero `compose-js-app.yml` lo lanzamos mediante la herramienta `docker-compose`:
```bash
docker-compose -f compose-js-app.yml up -d
```

3. Una vez compuesto el contenedor que contiene el **servidor Node** podemos consultar la aplicación Javascript a través de un navegador web. Para parar el servicio ejecutamos nuevamente `docker-compose`.
```bash
docker-compose -f compose-js-app.yml down
```
## 3. Entorno de desarrollo Node.js:slim (reducido)
Cuando se lanzan contenedores en producción suele ser muy útil optimizar el tamaño de las imagenes y contenedores empleados con el objetivo que su tamaño sea lo más reducido posible.
1. Podemos observar como es posible esto estudiando el contenido del fichero `slim-js-app.yml`.
```yaml
networks:
    ds-slim-javascript-app-net:
        driver: bridge

services:
    app:
        image: mini-js-app
        container_name: ds-slim-javascript-app
        ports:
            - "8080:8080"
        networks:
            - ds-slim-javascript-app-net

```
2. Debemos construir una imagen de tanaño reducido (extremadamente delgada), llamada `mini-js-app` empleando `Dockerfile` con el argumento `$VERSION=slim`.
```bash
docker build --build-arg VERSION=slim -t mini-js-app .
```
3. Una vez construida la imagen `mini-js-app`, lanzaremos el contenedor `docker-compose -f slim-js-app.yml up -d`.
4. Finalizada la sesión de trabajo paramos el contenedor `docker-compose -f slim-js-app.yml down`.

## Vídeos:

- [Cómo crear nuestra primera pagina web con NodeJS, Express, Docker y Publicarla en Digitalocean.](https://youtu.be/USivUGPSZ9s)

## Referencias:
- [Set up a dev enviroment.](https://docs.docker.com/desktop/dev-environments/set-up/)
- [Use compose in production.](https://docs.docker.com/compose/production/)
- [Docker: Buenas prácticas en entornos de producción.](https://santimacnet.wordpress.com/2017/10/22/docker-buenas-practicas-en-entornos-de-produccion/)