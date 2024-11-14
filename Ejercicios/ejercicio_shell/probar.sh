#!/bin/bash
for i in {1..10}
do
    if [ $i -lt 10 ]
    then
        test -d "carpeta0$i"
    else
        test -d "carpeta$i" 
    fi

    if [ $? -ne 0 ]
    then
        echo "PRÁCTICA INCORRECTA"
        echo "ERROR EN PRUEBA $i"
        exit $i
    fi
done
echo "PRÁCTICA OK"