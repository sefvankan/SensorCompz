#!/usr/bin/expect -f

# spawn scp "root@137.22.30.136:/var/log/cmh/LuaUPnP.log" .
# rsync flag template taken from https://gist.github.com/KartikTalwar/4393116
# rsync -aHAXxv --numeric-ids --delete --progress -e "ssh -T -c arcfour -o Compression=no -x" root@137.22.30.136:/var/log/cmh/LuaUPnP.log .
spawn rsync -avz root@137.22.30.136:/var/log/cmh/LuaUPnP.log .

#######################
# expect {
#   -re ".*es.*o.*" {
#     exp_send "yes\r"
#     exp_continue
#   }
#   -re ".*sword.*" {
#     exp_send "bird63hole\r"
#   }
# }
# interact

expect {
  -re ".*password.*" {
    exp_send "bird63hole\r"
  }
}
interact