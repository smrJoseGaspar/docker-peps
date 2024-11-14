![Logotipos Fondos Next Generation](../imagenes/Logotipo_ME_FP_GV_FSE.png)
<a name="top"></a>
# Construcción de un Laboratorio Hacking para Puesta en Producción Segura con Docker
Uso práctico de Docker para el módulo Puesta en Producción Segura del Curso de Especialización en Ciberseguridad.

## Contenidos:
1. [OWASP JuiceShop en un contendor Docker.](#uno)
2. [kali Linux en un contenedor Docker.](#dos)

<a name="uno"></a>
## 1. OWASP JuiceShop en un contendor Docker
Debe tener instalado Docker para ejecutar Juice Shop como un contenedor dentro de él. Si sigue las instrucciones a continuación:
1. Instale Docker en su computadora.
2. En la línea de comando, ejecute `docker pull bkimminich/juice-shop`.
3. Ejecute el contenedor descargado, para iniciar el contenedor con esa imagen.
```bash
docker run -d -p 3000:3000 bkimminich/juice-shop
```
4. Abra en un navegador web: `http://IP_juiceshop:3000` .
Si está utilizando Docker en Windows, dentro de una máquina virtual VirtualBox, asegúrese de habilitar también el reenvío de puertos desde el host `127.0.0.1:3000` a `0.0.0.0:3000` TCP.

<a name="dos"></a>
## 2. Kali Linux en un contenedor Docker
En primer lugar instamos Kali Linux en un contenedor Docker.
```bash
docker pull kalilinux/kali-rolling
docker run -it -p 3389 \
--name kali-gui-PePS \
--hostname kali-PePS kalilinux/kali-rolling
```
### 2.1. Instalación de GUI en el contenedor Kali Linux
Una vez abierto el terminal del contendor KaliLinux instalaremos una interfaz gráfica XFCE para acceder desde un cliente RDP.
```bash
apt update && apt install -y kali-desktop-xfce xrdp dbus-x11
```
Antes de acceder al Escritorio desde un cliente RDP es muy recomendable cambiar la contraseña del usuario `root`.
```bash
passwd root
```
También, será necesario iniciar el servicio *xrdp*.
```bash
service xrdp start
```
### 2.2. Instalación de un cliente RDP en el host anfitrión
```bash
apt update && apt install -y remmina
```
Para conectar con el Escritorio Kali Linux en el cliente RDP introduciremos. **RDP**: `dirección_IP_kali-PePS:3389`
## Vídeos
- [Kali Linux en Docker con GUI](https://youtu.be/sVJ4iocUods)
- [Pentesting desde un contenedor - HackTheBox o TryHackMe desde KaliLinux en docker](https://youtu.be/0GsiBPVRMyI)

## Referencias
- [Awesome *Damn Vulnerable Apps*](https://github.com/rarecoil/awesome-dva)
- [Björn Kimminich; Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
[Subir](#top)
