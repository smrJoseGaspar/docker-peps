![Logotipos Fondos Next Generation](../imagenes/Logotipo_ME_FP_GV_FSE.png)
<a name="top"></a>
# Gestión gráfica de Docker con Portainer
**Docker Portainer** es una herramienta de administración de contenedores de Docker que proporciona una interfaz gráfica de usuario (GUI) intuitiva y fácil de usar. Permite administrar y supervisar fácilmente tus contenedores, imágenes, volúmenes y redes de Docker a través de una interfaz web.

## Contenidos:
1. [¿Qué es Docker Portainer?](#titulo1)
2. [Características principales de Docker Portainer](#titulo2)
3. [Cómo usar Docker Portainer](#titulo3)
4. [Seguridad y control de acceso](#titulo4)
   
<a name="titulo1"></a>
## 1. ¿Qué es Docker Portainer?
   Docker Portainer es una herramienta de administración de contenedores de Docker de código abierto que proporciona una interfaz gráfica fácil de usar para administrar y supervisar tus contenedores de Docker. Permite realizar tareas comunes de administración de contenedores, como crear, iniciar, detener y eliminar contenedores, administrar imágenes, volúmenes y redes, y ver registros de contenedores, todo a través de una interfaz web.
   
   ![Logotipo Portainer](../imagenes/L06_portainer.png)

<a name="titulo2"></a>
## 2. Características principales de Docker Portainer
   - **Interfaz gráfica de usuario intuitiva**: Docker Portainer proporciona una interfaz web fácil de usar que permite administrar contenedores de Docker sin necesidad de utilizar comandos de línea de comandos.
   - **Administración de contenedores**: puedes crear, iniciar, detener, reiniciar y eliminar contenedores de Docker directamente desde la interfaz de Portainer.
   - **Administración de imágenes**: puedes administrar imágenes de Docker, como buscar, descargar, eliminar y ver detalles de imágenes.
   - **Administración de volúmenes y redes**: Portainer te permite administrar volúmenes y redes de Docker, como crear, eliminar y configurar volúmenes y redes.
   - **Supervisión de contenedores**: puedes ver el estado y los registros de tus contenedores de Docker, lo que facilita la depuración y el seguimiento de problemas.
   - **Control de acceso y autenticación**: Portainer ofrece opciones de autenticación y control de acceso para proteger tu entorno de Docker.
   - **Soporte multiplataforma**: Docker Portainer es compatible con diferentes plataformas, lo que te permite administrar contenedores de Docker en cualquier sistema operativo compatible con Docker.

<a name="titulo3"></a>
## 3. Cómo usar Docker Portainer
   - **Instalación**: puedes instalar Docker Portainer como un contenedor de Docker utilizando el siguiente comando:
     ```bash
     docker volume create portainer_data
     docker run -d -p 9000:9000 --name=portainer --restart=always \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -v portainer_data:/data portainer/portainer-ce:latest
     ```
     Esto iniciará un contenedor de Docker con Portainer en el puerto 9000 y se conectará al socket de Docker para administrar los contenedores.
   - **Acceso a la interfaz web**: una vez que el contenedor de Portainer esté en ejecución, puedes acceder a la interfaz web de Portainer a través de tu navegador web utilizando la dirección `http://localhost:9000` (o la dirección IP del host si estás ejecutando Docker en un entorno remoto).
   - **Configuración inicial**: al acceder a la interfaz web de Portainer por primera vez, se te pedirá que configures una contraseña de administrador y elijas el entorno en el que deseas administrar tus contenedores de Docker (local, remoto, etc.).
   - **Administración de contenedores**: una vez que hayas configurado Portainer, podrás administrar tus contenedores de Docker desde la interfaz web. Puedes ver y administrar contenedores existentes, crear nuevos contenedores, iniciar, detener y eliminar contenedores, y realizar otras acciones relacionadas con los contenedores.
   - **Administración de imágenes, volúmenes y redes**: Portainer también proporciona opciones para administrar imágenes de Docker, volúmenes y redes. Puedes buscar, descargar, eliminar y configurar imágenes, crear y eliminar volúmenes y redes, y realizar otras tareas relacionadas.
   - **Supervisión y registros**: Portainer te permite supervisar el estado de tus contenedores de Docker y ver sus registros para ayudarte en la depuración y el seguimiento de problemas.

<a name="titulo4"></a>
## 4. Seguridad y control de acceso
   - Docker Portainer ofrece opciones de autenticación y control de acceso para proteger tu entorno de Docker. Puedes configurar usuarios y contraseñas para acceder a la interfaz web y asignar diferentes niveles de acceso y permisos a los usuarios.
   - Además, puedes configurar reglas de firewall y asegurarte de que solo los usuarios autorizados puedan acceder a la interfaz web de Portainer.

## Vídeos:
- [Docker GUI: Portainer.](https://youtu.be/cD_q5QBdRUI?list=PLrb1e2Mp6N_s898B-37mcbI00aJ5gmwLm)
## Referencias:
- [Gestión gráfica de Docker con Portainer.](https://colaboratorio.net/davidochobits/sysadmin/2018/gestion-grafica-docker-portainer/)

[Subir](#top)
