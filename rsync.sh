#!/bin/sh
rsync -e "ssh -o 'ControlPath=~/.ssh/ctl/%L-%r@%h:%p'" root@137.22.30.136:/var/log/cmh/LuaUPnP.log .