#!/bin/bash
DATADIR="data"

# get the highest number exported image
LAST=$( find ${DATADIR}/ -type f | cut -d "_" -f 2 | sort -g | tail -n1 )
LAST="${DATADIR}/export_${LAST}"

# update map.png symlink
echo "Update: Lastest image" ${LAST}
ln -fs ${LAST} map.png
