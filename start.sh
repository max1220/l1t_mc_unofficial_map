#!/bin/bash
DATADIR="data"

if [ ! -e "$DATADIR" ]; then
    echo "Data symlink not found, creating..."
	ln -s ~/.minecraft/map\ exports/ $DATADIR
fi

# watch out for maps updates
./watch.sh &

# start httpd.
busybox httpd -v -f -p 8080 | tee -a httpd_log.txt
