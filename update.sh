#!/bin/bash
DATADIR="data"

# get the highest number exported image
LAST=$( find ${DATADIR}/ -type f | cut -d "_" -f 2 | sort -g | tail -n1 )
LAST="${DATADIR}/export_${LAST}"

# update map.png symlink
echo "Update: Lastest image" ${LAST}
cp -v ${LAST} map.png
convert ${LAST} -scale 200% map_2x.png
convert ${LAST} -scale 300% map_3x.png
convert ${LAST} -scale 400% map_4x.png
#convert ${LAST} -scale 800% map_8x.png

tar --exclude-vcs --exclude="archive.tar" --exclude="data" -vczf archive.tar .
