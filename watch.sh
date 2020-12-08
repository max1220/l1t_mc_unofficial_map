#!/bin/bash
DATADIR="data"

while true; do
	# make sure an entire image has been written
	sleep 5;

	# update the map symlink
	./update.sh

	# wait for modified files in data/
	inotifywait ${DATADIR}
done
