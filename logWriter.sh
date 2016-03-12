ssh -nNf -o ControlMaster=yes -o ControlPath="~/.ssh/ctl/%L-%r@%h:%p" -o ControlPersist=10m root@137.22.30.188

# expect {
#   -re ".*password.*" {
#     exp_send "bird63hole\r"
#   }
# }
# interact

python parseLog.py
echo "hello"

ssh -O exit -o ControlPath="~/.ssh/ctl/%L-%r@%h:%p" root@137.22.30.188
