#!/bin/bash
DATADIR="data"

while true; do
	# update the map symlink
	./update.sh

	# make sure we're not spamming...
	sleep 10;

	# wait for modified files in data/
	inotifywait ${DATADIR}
done
