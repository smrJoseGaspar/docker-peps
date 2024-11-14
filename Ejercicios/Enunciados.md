![Logotipos Fondos Next Generation](../imagenes/Logotipo_ME_FP_GV_FSE.png)
# Enunciados de ejercicios Docker
## Servicios en red
1. Ejecutar de forma manual un servidor web estático:**seqvence/static-site**.
```bash
docker run --name static-site \
 -e AUTHOR="Your Name" -d \
 -p 9980:80 seqvence/static-site
```
2. Averigue los contenedores que se encuentran en ejecución.
```bash
docker ps
```
3. Obtener la salida estándar del contenedor *static-site*.
```bash
docker logs static-site
```
4. Abre la URL http://127.0.0.1:9980 en un navegador y accede al puerto 80 de la aplicación en el contenedor.
5. Parar el contenedor *static-site*.
```bash
docker stop static-site
```
6. Parar y borrar todos los contenedores.
```bash
docker rm -f $(ps -a -q)
```
7. Arranque un contenedor MySQL llamado **miBD**, que disponga de las siguientes variables de entorno configuradas: *MYSQL_ROOT_PASSWORD, MYSQL_DATABASE,MYSQL_USER, MYSQL_PASSWORD=micontrasea*
```bash
docker run --name miBD -d \
-e MYSQL_ROOT_PASSWORD=12345678Aa \
-e MYSQL_DATABASE=db_my \
-e MYSQL_USER=myuser \
-e MYSQL_PASSWORD=micontrasea \
mysql
```
8. Conecte con la base de datos MySQL dockerizada.
```bash
docker exec -it miBD mysql -h 172.17.0.2 -P 3306 -u root -p
```
9.  Ejecutar un servidor web con **[Drupal](https://www.drupal.org/home)** dockerizada.
```bash
docker run -d -p 8081:80 drupal
```
10. Acceda al servidor web ejercutado a través de un navegador y proceda a su configuración.
11. Ejecuta un servidor web **NGINX** que haga uso de volumenes para almacenar las páginas HTML.
```bash
docker run -d -p 9000:80 -v "$PWD":/usr/share/nginx/html nginx
```
12. **Jekyll** es una herramienta que genera un sitio web partiendo de ficheros de texto (**Markdown**). Ejecuta Jekyll desde un contenedor sin tener que instalarlo en el host.
  ```bash
  # Descarga el contenido de ejemplo desde GitHub.
  git clone https://github.com/henrythemes/jekyll-minimal-theme
  cd jekyll-minimal-theme 
  
  # Ejecuta el contenedor para generar el sitio web en la carpeta descargada.
  docker run --rm  -v "$PWD":/src grahamc/jekyll build
  ``` 
13. **Ejercicio shell**: Ejecuta un contenedor Docker a partir de una imagen **alpine**. En el interior de dicho contenedor (de nombre **ejercicio_shell**) se debe lanzar un *script bash* (llamado *crea_diez_carpetas.sh*) que debe crear diez directorios en el interior de */root* denominados *carpeta01*, *carpeta02*, ..., y *carpeta10*. El ejercicio se corregirá mediante el siguiente script:
```bash
#!/bin/bash
if [ $# -lt 1 ]
then
    echo "Uso: $0 nombre_contenedor"
    exit 1
fi


for i in {1..10}
do
    if [ $i -lt 10 ]
    then
        docker exec -it $1 test -d "/root/carpeta0$i"
    else
        docker exec -it $1 test -d "/root/carpeta$i" 
    fi

    if [ $? -ne 0 ]
    then
        echo "PRÁCTICA INCORRECTA"
        echo "ERROR EN PRUEBA $i"
        exit $i
    fi
done
echo "PRÁCTICA OK"
```
Crearemos un contenedor con la imagen base **alpine**. Además, al crearlo, dejaremos lista una *shell* para instalar los programas pertinentes. Esto podemos hacerlo con las siguientes ordenes:
```bash
docker run -it --name ejercicio_shell -v "$PWD":/root ubuntu /bin/bash
./crea_diez_carpetas.sh
```
Es posible salir de la *shell* con el comando `exit`, lo cual parará el contenedor.
Para volver a acceder, es posible re-arrancar el contenedor mediante el siguiente comando:
```bash
docker start -ai ejercicio_shell
```
La corrección del ejercicio se lanzará desde un terminal del host:
```bash
./corrige ejercicio_shell
```
14. Compilar una aplicación **Java (maven:3.3-jdk-8)** con un compilador dockerizado:
  - Emplearemos el ccódigo de ejemplo de la aplicación Java accesible en el directorio  [java-web-app](./java-webapp/).
  - Situándonos en el directorio **java-web-app** ejecutamos el contenedor **maven**.
```bash
cd java-web-app
docker run --rm -v "$PWD":/data -w /data maven:3.3-jdk-8 mvn package
```
  - Una vez compilada la aplicación web podemos comprobar su correcta ejecución mediante el uso de un **servidor web OpenJDK**.
```bash
  docker run -it --name servidor_web \
  -v "$PWD":/root -w /root \
  openjdk:8-jre java -jar target/java-webapp-0.0.1.jar
```
- Mediante el comando `docker inspect servidor_web` podemos averiguar la dirección IP del servidor para acceder a su contenido a través de un mavegador web [http://172.17.0.2:8080)](http://172.17.0.2:8080)
15. Utilizando el contenedor Maven dockerizado del la actividad anterior como si fuera una máquina virtual:
    1.  Ejecuta una shell en el contenedor.
    2.  Ejecuta los comandos de compilación dentro de la shell cada vez que quieras compilar
    3.  Ejecuta la aplicación una vez compilada (recuerda *bindear* el puerto 8080 para que sea accesible desde el host).
  ```bash
  # Ejecutamos el contenedor desde la máquina host
  docker run -it -p 8080:8080 -v "$PWD":/data -w /data maven:3.3-jdk-8 /bin/sh
  
  # En el interior del contenedor
  mvn package
  java -jar target/java-webapp-0.0.1.jar
  ```
## Enlaces:
- [Hacking Tools](https://github.com/Rexinazor/Ensemble-HackTools)
  

