#!/bin/bash
while true; do
	wget -O archive.tar http://95.223.217.249:8080/archive.tar
	tar -vxf archive.tar
	sleep 600;
done
