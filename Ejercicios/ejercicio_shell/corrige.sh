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