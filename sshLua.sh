#!/usr/bin/expect -f

spawn ssh "vankans@137.22.5.59"
#######################
expect {
  -re ".*es.*o.*" {
    exp_send "yes\r"
    exp_continue
  }
  -re ".*sword.*" {
    exp_send "MNS10~barca\r"
  }
}

set found= true

while $found {
	scp vankans@137.22.5.59:/Desktop/Log\ parsing/LuaUPnP.log .
	sleep 5
}
interact