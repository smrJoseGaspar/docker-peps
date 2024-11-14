![Logotipos Fondos Next Generation](../imagenes/Logotipo_ME_FP_GV_FSE.png)
<a name="top"></a>
# Docker: Preparación de contenedores mediante comandos.
El objteto de esta lección es aprender como preparar un contenedor personalizado mediante comandos.

## Contenidos:
1. [Entorno de desarrollo Python en Ubuntu.](#titulo1)
2. [Entrono de desarrollo Python en Alpine.](#titulo2)
   
<a name="titulo1"></a>
## 1. Entorno de desarrollo Python en Ubuntu
En primer lugar, aprenderemos como preparar un entorno de desarrollo Python sobre un sistema operativo Linux empleado comandos Docker. Los pasos que debemos seguir son:
1. Descarga de la imagen del sistema operativo Ubuntu.
```bash
docker pull ubuntu:latest
```
2. Comprobamos que la imagen del sistema operativo se ha descargado correctamente.
```bash
docker images
```
3. Creamos una carpeta *my-python-app* donde almacenaremos los ficheros que deseamos compartir con el contenedor.
```bash
mkdir -p my-python-app/tests
```
4. En el interior de la carpeta *my-python-app* creamos un fichero llamado *[requierements.txt](../my-python-app/requierements.txt)* que contendrá las librerias Python que deseamos instalar en el entorno. En el insterior de esta carpeta situaremos los ficheros de código Python (sanple.py) y test (test_sample.py).
```bash
cd my-python-app
nano requierements.txt
Pylint
Pytest

cd ..
```

5. Ejecutamos un contenedor Docker a partir de la imagen de Ubuntu descargada.
```bash
docker run -it --name jg-ubuntu-python -v ${PWD}/my-python-app:/app -w /app ubuntu
```
6. Una vez iniciado el terminal interactivo del contenedor, procederemos a instalar Python.
```sh
apt update && apt install -y python3 pip
```
7. Seguidamente instalaremos las librerías del lenguaje.
```sh
pip install -r requierements.txt
```
8. Una vez realizadas las modificaciones sobre el contenedor podemos confirmar estas en una nueva imagen.
```bash
docker commit -m "Entorno de desrrollo Python sobre Ubuntu" -a "José Gaspar Sánchez García <jg.sanchezgarcia@edu.gva.es>" jg-ubuntu-python josegasparsanch2/ubuntu-python:v1.0
```
9. Por último, podemos subir al registro DockerHub la imagen que acabamos de personalizar.
```sh
docker push josegasparsanch2/ubuntu-python:v1.0
```
10. La ejecución de los *tests* de esta imagen la conseguiriamos del siguiete modo
```sh
docker run -it -v ${PWD}/my-python-app:/app -w /app josegasparsanch2/ubuntu-python:v1.0 pytest
```
### Dockerfile
Podemos obtener una imagen automatizada, similar a la obtenida mediante los comandos anteriores, empleando *Dockerfile* y los siguientes comandos:
1. En primer lugar nos situamos en el directorio *my-python-app* y construimos el [Dockerfile](../my-python-app/Dockerfile):
```dockerfile
FROM ubuntu:latest

RUN apt update && apt install -y \
python3 \
pip

WORKDIR /app
COPY . /app/
RUN pip install -r requierements.txt
ENTRYPOINT ["pytest"]
```
2. A continuación, construimos la *imagen my-ubuntu-python*.
```bash
docker build -t my-ubuntu-python .
```
3. Por último, ejecutamos un contenedor a partir de la imagen construida.
```sh
docker run -it my-ubuntu-python
```
<a name="titulo2"></a>
## 2. Entorno de desarrollo Python en Alpine
n primer lugar, aprenderemos como preparar un entorno de desarrollo Python sobre un sistema operativo Linux empleado comandos Docker. Los pasos que debemos seguir son:
1. Descarga de la imagen del sistema operativo Alpine.
```bash
docker pull alpine:latest
```
2. Comprobamos que la imagen del sistema operativo se ha descargado correctamente.
```bash
docker images
```
3. Creamos una carpeta *my-python-app* donde almacenaremos los ficheros que deseamos compartir con el contenedor.
```bash
mkdir -p my-python-app/tests
```
4. En el interior de la carpeta *my-python-app* creamos un fichero llamado *[requierements.txt](../my-python-app/requierements.txt)* que contendrá las librerias Python que deseamos instalar en el entorno. En el insterior de esta carpeta situaremos los ficheros de código Python (sanple.py) y test (test_sample.py).
```bash
cd my-python-app
nano requierements.txt
Pylint
Pytest

cd ..
```

5. Ejecutamos un contenedor Docker a partir de la imagen de Ubuntu descargada.
```bash
docker run -it --name jg-alpine-python -v ${PWD}/my-python-app:/app -w /app alpine
```
6. Una vez iniciado el terminal interactivo del contenedor, procederemos a instalar Python.
```sh
apk add --update python3 py3-pip
```
7. Seguidamente instalaremos las librerías del lenguaje.
```sh
python3 -m venv /path/to/venv
    . /path/to/venv/bin/activate
pip install -r requierements.txt
```
8. Una vez realizadas las modificaciones sobre el contenedor podemos confirmar estas en una nueva imagen.
```bash
docker commit -m "Entorno de desrrollo Python sobre Alpine" -a "José Gaspar Sánchez García <jg.sanchezgarcia@edu.gva.es>" jg-alpine-python josegasparsanch2/alpine-python:v1.0
```
9. Por último, podemos subir al registro DockerHub la imagen que acabamos de personalizar.
```sh
docker push josegasparsanch2/alpine-python:v1.0
```
10. La ejecución de los *tests* de esta imagen la conseguiriamos del siguiete modo
```sh
docker run -it -v ${PWD}/my-python-app:/app -w /app josegasparsanch2/alpine-python:v1.0 pytest
```

## Vídeos:
- [Ejecutar comandos dentro de un contenedor Docker con `docker run`](https://youtu.be/3zxWWRmOdug)


## Referencias:
- [Ejecutar comandos dentro de un contenedor Docker con `docker run`.](https://geekytheory.com/curso-docker-ejecutar-comandos-dentro-contenedor-docker-run/)
- [Pytest: helps you write better programs.](https://docs.pytest.org/en/7.4.x/)
- [Pylint.](https://pypi.org/project/pylint/)
- [Tutorial de Pytest.](https://misovirtual.virtual.uniandes.edu.co/codelabs/tutorial-PyTest/index.html?index=..%2F..index#0)
- [Documentación Oficial Docker: docker commit.](https://docs.docker.com/engine/reference/commandline/commit/)

[Subir](#top)
