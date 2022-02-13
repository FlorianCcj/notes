Linux - Triks
#############

* :code:`while [ $? -ne 0 ]; do !!; done`
* pstree: guedin tricks
* :code:`tree`: can be replace by :code:`ls -R`
* :code:`du -k | sort -n`: can be replace by :code:`ncdu`, scan everything to know which package take the most place

Awk
****

* Split a string from the space
* :code:`echo "hi guy" | awk '{print}'`: just return the string
* :code:`echo "hi guy" | awk '{print $1}'`: return the first word
* :code:`echo "hi:guy" | awk -F ':' '{print $1}'`: return the first word but split by :code:`:`

Background - foreground
***********************

* When you launch a command with :code:`&` you launch a process in background
* you can also use ctrl + z to make a process on a backgroune and stop it
* :code:`fg` permit to make the last process on foreground
* :code:`fg %1` permit to make the process with id 1 (in :code:`jobs`) on foreground


Copy tricks
***********

* :code:`diff -r <rep1> <rep2>`
* :code:`find -type f -exec md5sum "{}" + >> test.chk`
* :code:`md5sum -c test.chk`
* date rfc 5425: "$(date +"%Y-%m-%dT%H:%M:%S%z")"

Countdown
*********

* :code:`secs=$((30 * 1)); while [ $secs -gt 0 ]; do echo -ne "$secs\033[0K\r"; sleep 1; secs=$((secs-1)); done`
* :code:`secs=$((30 * 1)); while [ $secs -gt 0 ]; do echo -ne "Time before Hint: $secs\033[0K\r"; sleep 1; secs=$((secs-1)); done`
* :code:`secs=$((30 * 1)); while [ $secs -gt 0 ]; do echo -ne "Time before Solution: $secs\033[0K\r"; sleep 1; secs=$((secs-1)); done`

Cowsay
******

* :code:`fortune | cowsay -f $(ls /usr/share/cowsay/cows/ | shuf -n1)`

default text editor
*******************

* :code:`export EDITOR='vim'`
* :code:`export VISUAL='less'`

find heavy directory/file
*************************

* :code:`du -k | sort -n`
* :code:`find . -type f -size +100k -print "%p %n\n" -exec ls -ln {} \; awk '{print $9": "$}'`

find recent file
****************

* :code:`find . -mtime -1`: en jour
* :code:`find . -mmin -60`
* :code:`find . -ctime 1`

kick someone
************

* :code:`pkill -o -u <username> sshd`
* :code:`skill -u <username>`: kill session
* :code:`killall -u <username>`
* :code:`pkill -u <username> && pkill -9 -u <username>`: ok pour centos8

Network
*******

* :code:`apt install wireless-tools`

package
*******

* :code:`apt list --installed` list installed package
* `<https://www.cyberciti.biz/faq/apt-get-list-packages-are-installed-on-ubuntu-linux/>`_

path
****

* :code:`export PATH=${PATH}:$HOME/software/bin`

process
********

* :code:`ps -p 2053 -o comm=`: find process by pid

Sed
****

* :code:`sed 's/Pineapple/Feta/' toppings.txt`: take the file content and every occurence of the first word will be replace
  * :code:`'s/whatever/whatever2@'`: the :code:`s` is for string
  * :code:`/`: can be replace by any characterer :code:`'s@whatever@whatever2@'`
* :code:`sed -i 's/Pineapple/Feta/' toppings.txt`: replace immediatly on the file

Terminal
********

Guake
=====

appear just with :code:`F12`

shortbut -> RMB -> preferance

launch at startup: :code:`sudo cp /usr/share/applications/guake.desktop /etc/xdg/autostart/`

Sources
*******

* https://www.a2hosting.com/kb/developer-corner/linux/setting-the-default-text-editor-in-linux

dmefg: savoir quel process a ete kill
