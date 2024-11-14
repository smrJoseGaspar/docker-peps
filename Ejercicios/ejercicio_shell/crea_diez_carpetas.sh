#!/bin/bash

for i in {1..10}
do
	if [ $i -lt 10 ]
	then
		mkdir "carpeta0$i"
	else 
		mkdir "carpeta$i"
	fi
done
