#!/bin/sh
rsync -e "ssh -o 'ControlPath=~/.ssh/ctl/%L-%r@%h:%p'" root@137.22.30.188:/var/log/cmh/LuaUPnP.log .
grep "CurrentDistance, \|Variable2, \|Variable1, " LuaUPnP.log > filtered.log
