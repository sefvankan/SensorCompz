#!/usr/bin/expect -f

spawn scp "root@137.22.30.96:/var/log/cmh/LuaUPnP.log" .
#######################
expect {
  -re ".*es.*o.*" {
    exp_send "yes\r"
    exp_continue
  }
  -re ".*sword.*" {
    exp_send "stone53card\r"
  }
}
interact