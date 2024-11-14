FROM kalilinux/kali-rolling
ENV HOSTNAME kali-PePS
# Let the container know there will be no TTY
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /root


# RUN apt update -y ; apt upgrade -y ; apt autoremove -y ; apt install git -y ; apt install python3 -y ; apt install python3-pip -y
# RUN apt install bettercap -y && apt install metasploit-framework -y
# RUN apt install hydra -y && apt install nmap -y && apt install aircrack-ng -y && apt install crackmapexec -y && apt install wfuzz -y && apt install gobuster -y && apt install john -y && apt install crunch -y && apt install netcat-traditional -y && apt install hping3 -y
# RUN apt install python3-impacket -y && apt install arp-scan -y && apt install impacket-scripts -y && apt install airgeddon -y && apt install set -y

# Instalación de escritorios XFCE y servicio XRDP
# RUN apt update && apt install -y kali-desktop-xfce xrdp dbus-x11 burpsuite && service xrdp start

# Instalación y actualización de Kali
RUN apt -y update && apt -y dist-upgrade && apt -y autoremove && apt clean
# Install tools we want
RUN apt-get install -y \
    hydra \
    john \
    metasploit-framework \
    nmap \
    sqlmap \
    wfuzz \
    exploitdb \
    nikto
    # commix
   # hashcat
   # wordlists 
    # cewl
    # burpsuite

# Install Other tools
# RUN apt-get install -y gdb

# Install utils
RUN apt-get install -y \
    vim \
    git

# Setup gdb-peda
RUN git clone https://github.com/longld/peda.git ~/peda && \
    echo "source ~/peda/peda.py" >> ~/.gdbinit

RUN apt install -y kali-desktop-xfce xrdp dbus-x11 && service xrdp start

EXPOSE 3389
CMD ["/bin/bash"]