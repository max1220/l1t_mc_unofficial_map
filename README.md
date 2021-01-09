# Unofficial L1T Minecraft Dynmap

https://mc.max1220.de/l1t_unofficial_dynmap/

This Dynmap works completely client-side.
I use Xaero's World Map, specifically the export png feature to make this work.
Below is an explanation of how to set up something like this yourself.

*Because this is image-based, this needs calibration, and therefore the positions are not always accurate!*

## Getting started guide(linux)

* Install imagemagic(for the convert tool), and inotify-tools
* Install Forge Install Xaero's World Map.
* Clone https://github.com/max1220/l1t_mc_unofficial_map somewhere
* run the `./start.sh` script.

The start script should automatically create a symlink
from `~/.minecraft/map exports/` to `data/`, and then start the
busybox-included httpd.

The rest happens in Javascript on the client.

This is an unofficial Dynmap. I am not affiliated with Level1Techs, or the L1T minecraft server.
Use at your own risk. No gurantees.

Made in 2020 by max1220.
