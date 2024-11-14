![Logotipos Fondos Next Generation](../imagenes/Logotipo_ME_FP_GV_FSE.png)
# Despliegue de aplicaciones con `docker-compose`

## Contenidos:
1. Usos de Docker en Microservicios.
2. ¿Qué es Docker-Compose?.
3. Arquitecturas de microservicios con `compose.yaml`.
4. Comandos básicos de `docker-compose.`

## 1. Usos de Docker en Microservicios 
En el contexto de los microservicios, Docker se utiliza principalmente para la construcción, el despliegue y la gestión de aplicaciones. Algunos de los usos más comunes son: 
- **Despliegue de aplicaciones:** Docker se utiliza para empaquetar y desplegar diferentes microservicios en contenedores separados, lo que facilita el proceso de despliegue y minimiza el riesgo de conflictos y errores.
- **Integración continua y entrega continua:** Docker se utiliza ampliamente en procesos de integración continua y entrega continua. Las imágenes de contenedores se construyen y prueban automáticamente, lo que facilita la implementación rápida y segura de nuevas funcionalidades. 
- **Pruebas de aplicaciones:** Docker se utiliza para crear diferentes entornos de prueba para las aplicaciones, lo que ayuda a los desarrolladores a identificar y corregir errores antes de desplegar las aplicaciones en producción. 
- **Infraestructura como código:** Docker se utiliza para automatizar la creación y el despliegue de infraestructura en diferentes entornos, lo que permite a los desarrolladores gestionar la infraestructura como código. Esto facilita la gestión de diferentes entornos de desarrollo, pruebas y producción para la misma aplicación. 
- **Despliegue de aplicaciones en la nube:** Docker se utiliza ampliamente en la nube para desplegar aplicaciones en diferentes entornos. Los contenedores de Docker son portátiles y se pueden desplegar en diferentes proveedores de la nube con facilidad. 

## 2. ¿Qué es Docker-Compose?
**Docker Compose** es una herramienta que permite definir y administrar aplicaciones multi-contenedor. Permite describir la configuración de una aplicación utilizando un archivo YAML y luego utilizar ese archivo para crear y administrar los contenedores de la aplicación de manera fácil y reproducible.
Docker Compose surge porque muchas aplicaciones requieren de más de un microservicio. Pero claro, **la idea de Docker es que únicamente ejecute un único microservicio por contenedor** y no varios a la vez.

Por tanto,  en esta situación podemos hacer dos cosas:
1. **Ejecutar dos microservicios en un mismo Docker.** Lo bueno en esta situación es que no necesitamos aprender nada para ello, simplemente con Docker podríamos lograrlo. Sin embargo, esto es muy delicado, ya que, si uno de los dos servicios fallase, fallarían todos los servicios. Además, sería poco escalable, ya que se compartirían todos los recursos y se tendría que escalar todo a la vez, lo cual no tiene mucho sentido. Lo lógico sería que si, por ejemplo, una API que tenemos en Docker recibe muchas peticiones, escalemos solo esa API, y no todo lo demás.
2. **Utilizar Docker Compose:** con Docker Compose puedes crear varios contenedores y definir cómo quieres que se relacionen y cómo quieres que gestionen los datos que generan. De esta forma, si uno de los contenedores fallase, podrías (depende cómo lo configures) permitir que los otros servicios sigan funcionando.

![Logotipo Pulpo de Docker Compose](../imagenes/L04_docker-compose-logo.png)

Con Docker Compose, se pueden definir los servicios, redes y volúmenes de una aplicación en un solo archivo, lo que facilita la configuración y el despliegue de la aplicación en diferentes entornos. Además, Docker Compose proporciona comandos para administrar los contenedores, como iniciar, detener y eliminar los servicios.

## 3. Arquitectura de microservicios con `compose.yaml`.
### ¿Qué es un fichero con extensión YAML?  
**YAML** es un acrónimo que significa *Ain’t Markup Languaje (YAML no es un leguaje de marcas)*. Se trata de un estándar de serialización de datos amigable para todos los lenguajes de programación. Más información en [yaml.org](yaml.org)

Con **Compose** utilizaremos ficheros en formato **YAML**, que nos servirán para definir la configuración de la aplicación en cuestión. De esta manera podemos, con un solo comando, crear e iniciar los servicios configurados en estos ficheros.

### Estructura de un fichero `compose.yaml`
Para crear un Docker Compose necesitamos crear un fichero `compose.yaml`. Este fichero es donde indicaremos qué servicios queremos que se ejecuten y de qué manera. Este fichero se estructura en los siguientes apartados:
- Versión (Opcional)
- Servicios (Requerido).
- Redes.
- Volúmenes.
- Configs.
- Secrets.

Para entenderlo mś facilmente recurriremos a un fichero [`compose.yaml`](../wordpress/compose.yml) que despliega un servidor **[Wordpress](https://es.wordpress.org/)**, junto con **[MySQL](https://www.mysql.com/)** y **[phpMyAdmin](https://www.phpmyadmin.net/)**.
![Docker-Compose: Wordpress + MySQL + phpMyAdmin](../imagenes/L04_docker-compose-wordpress.png)

```yaml
networks:
    ds-wordpress-6.1.1-net:
        driver: bridge

services:
    mysql:
        image: mysql:5.7
        container_name: ds-wordpress-6.1.1-mysql
        tty: true
        ports:
            - "4208:3306"
        volumes:
            - "./var/libclea/mysql/:/var/lib/mysql"
        environment:
            MYSQL_ROOT_PASSWORD: 1234
            MYSQL_DATABASE: wordpress
            MYSQL_USER: miusuario
            MYSQL_PASSWORD: mipassword
        networks:
            - ds-wordpress-6.1.1-net

    server:
        image: wordpress:latest
        container_name: ds-wordpress-6.1.1
        ports:
            - "4282:80"
        volumes:
            - "./var/www/html/:/var/www/html"
        environment:
            WORDPRESS_DB_USER: miusuario
            WORDPRESS_DB_PASSWORD: mipassword
            WORDPRESS_DB_NAME: wordpress
            WORDPRESS_DB_HOST: ds-wordpress-6.1.1-mysql
        depends_on:
            - mysql
        networks:
            - ds-wordpress-6.1.1-net

    phpmyadmin:
        image: phpmyadmin/phpmyadmin
        container_name: ds-phpmyadmin
        ports:
            - "4283:80"
        environment:
            PMA_HOST: ds-wordpress-6.1.1-mysql
            MYSQL_ROOT_PASSWORD: 1234
        depends_on:
            - mysql
        networks:
            - ds-wordpress-6.1.1-net
```
#### Networks
Las redes es la capa que permite conectar a los servicios entre sí. Por ejemplo, en nuestro caso queremos que la aplicación pueda acceder a la base de datos. 

El funcionamiento del network es el siguiente:
1. A cada **servicio** (*service*) indicamos el nombre del network al que pertenece, usando el parámetro **networks**.
2. En la sección **networks** indicamos la configuración de cada uno de los networks.

**driver**: especifica qué controlador se debe utilizar para esta red. Compose admite los siguientes controladores:
Docker Compose admite varios tipos de controladores de red (network drivers) que se pueden utilizar para conectar los contenedores entre sí. A continuación se describen los tipos de controladores de red admitidos por Docker Compose:
- **bridge**: El controlador de red *bridge* es el predeterminado en Docker Compose. Crea una red interna en el host de Docker y asigna una interfaz de red virtual a cada contenedor conectado a esa red. Los contenedores en la misma red bridge pueden comunicarse entre sí utilizando sus nombres de host dentro de la red.
- **host**: El controlador de red *host* utiliza la red del host de Docker en lugar de crear una red interna. Con este controlador, los contenedores comparten la misma interfaz de red que el host y pueden acceder directamente a los servicios que se ejecutan en el host sin necesidad de redireccionamiento de puertos.
- **none**: El controlador de red *none* deshabilita completamente la red para un contenedor. Esto significa que el contenedor no tendrá acceso a ninguna red y estará completamente aislado.

#### Services
La definición de los servicios en Docker Compose es la única sección requerida y la más importante. En ella, definimos cada uno de los microservicios que vamos a ejecutar, con el nombre que queramos.

Además, para cada servicio se suelen definir los siguientes aspectos:

- **build**: especifica la ubicación de un fichero *Dockerfile* para el build de una imagen a nivel local. Ejemplo:
```yaml
services:
    app:
        build: .
```
- **image**: especifíca la imagen que se usará para crear el contenedor. Únicamente se aplica si no se ha especificado el campo build, en cuyo caso se aplicará lo especificado en build. El nombre de la imagen siempre debe seguir el siguiente formato: `[<registry>/][<project>/]<image>[:<tag>|@<digest>]`. Además, si tenemos que descargar la imagen, se puede controlar dicha política con el campo `pull_policy`.
- **container_name**: se utiliza para especificar el nombre personalizado de un contenedor. Es importante destacar que el nombre del contenedor debe ser único en el host de Docker. Si intentas iniciar un contenedor con un nombre que ya está en uso, se producirá un error.
- **ports**: permite indicar qué puerto o puertos del contenedor se van a exponer. La forma de exponerlos debe ser: `[HOST:]CONTAINER[/PROTOCOL]`
- **restart**: define la política a aplicar cuando termina la ejecución de un contenedor (por ejemplo, cuando se da un error. Los valores posibles son:
    * **no**: el contenedor no se reinicia.
    * **always**: el contenedor siempre se reinicia.
    * **on-failure**: el contenedor se reinicia solo si hay un error.
    * **unless-stopped**: el contenedor siempre se reinicia, hasta que el contenedor sea parado o eliminado.
- **volumes**: define rutas de *mount* o volúmenes que deben ser accesibles mediante otros servicios. En otras palabras, nos permite indicar qué carpetas queremos que sean copiadas de local a nuestro contenedor.
- **enviroment**: permite especificar las variables de entorno del contenedor.
- **depends_on:** permite definir dependencias de arranque y cierre entre diferentes servicios.

#### Volumes
Los volúmenes son formas de persistir la información, tal como hemos visto previamente en la sección de servicios. En este sentido, si queremos que varios contenedores accedan al mismo volumen, deberemos crear la sección ``volumes``.
#### Configs
Al igual que la sección *volumes* permite la gestión y persistencia de datos, la sección configs sigue la misma idea, pero para la configuración de servicios.
Supongamos, por ejemplo, que tienes un servidor Apache dentro de tu Docker Compose. Es probable que quieras cambiar la configuración de dicho servicio, pero claro, tener que hacer un *build* de la imagen cada vez que lo modificas no es algo muy óptimo.

En su lugar, a la hora de definir el servicio puedes indicar que se le debe aplicar una configuración y, en la sección *config* puedes explicar dicha configuración.

En este sentido, hay tres formas de definir la configuración:

- **file**: la configuración se crea a partir de un fichero en local.
- **external**: si se fija como **True** indica que la configuración ya se ha creado. Sirve para asegurarnos de que no se modifica algo que ya se ha configurado previamente.
- **name**: el nombre del *config* en Docker. Se puede fijar en caso de haber indicado `external: True`.

Ejemplo:
```yaml
services:
  redis:
    image: redis:latest
    configs:
      - redis_conf

configs:
  redis_conf:
    file: ./redis/redis.conf
```

#### Secrets
La sección *secrets* es una idea similar a la de configs, pero para permitir acceso a información sensible, tales como contraseñas o API Keys. Al igual que en el caso de config, se pueden definir `secrets` de varias formas:
- **file**: el secret es creado con el contenido de un fichero.
environment: el secret se crea con el valor de una variable de entorno de tu sistema.
- **external**: si se fija como **True** indica que la configuración ya se ha creado. Sirve para asegurarnos de que no se modifica algo que ya se ha configurado previamente.
- **name**: el nombre del secret en Docker. Se puede fijar en caso de haber indicado `external: True`.

Ejemplo:
```yaml
services:
  myapp:
    image: myapp:latest
    secrets:
      - api

secrets:
  my_secret:
    file: ./my_secret.txt
```

## 4. Comandos básicos de `docker-compose`.

 Algunos comandos básicos de Docker Compose que te ayudarán a trabajar con tus archivos `docker-compose.yml` son:

1. `docker-compose up`: Este comando inicia todos los servicios definidos en el archivo `docker-compose.yml`. Si las imágenes de los servicios no están presentes, Docker Compose las construirá automáticamente.
```bash
docker-compose up -d
```
2. `docker-compose ps`: Este comando muestra el estado de los servicios definidos en el archivo `docker-compose.yml`. Proporciona información sobre los contenedores en ejecución, los puertos expuestos y el estado actual de cada servicio.
```bash
docker-compose ps
```
3. `docker-compose logs`: Este comando muestra los registros de los contenedores en ejecución. Puedes utilizar la opción `-f` para seguir los registros en tiempo real.
```bash
docker-compose logs
```
4. `docker-compose down`: Este comando detiene y elimina todos los contenedores, redes y volúmenes creados por `docker-compose up`. Es útil para limpiar el entorno y asegurarse de que todos los recursos relacionados con el archivo `docker-compose.yml` se eliminen correctamente.
```bash
docker-compose down
```
## Videos
- [Sincroniza y construye contenedores automáticamente en local - compose watch - docker desktop](https://youtu.be/_mRuZts6zTs)
## Referencias:
- [Fernández, A.: Tutorial Docker Compose.](https://anderfernandez.com/blog/tutorial-docker-compose/)
- [YAML: *YAML Ain't Markup Language*.](yaml.org)
- [Docker docs reference: *Compose file*.](https://docs.docker.com/compose/compose-file/03-compose-file/)
- [compose.yaml spec](https://github.com/compose-spec/compose-spec/blob/master/00-overview.md)