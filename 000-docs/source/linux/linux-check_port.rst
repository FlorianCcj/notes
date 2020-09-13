linux - check port
##################

lsof -t -i:6443

sudo apt install net-tools
netstat -ltnp | grep -w ':80'

l – tells netstat to only show listening sockets.
t – tells it to display tcp connections.
n – instructs it show numerical addresses.
p – enables showing of the process ID and the process name.

sudo apt install psmisc
fuser 80/tcp
