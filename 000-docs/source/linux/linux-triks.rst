Linux - Triks
#############

* :code:`while [ $? -ne 0 ]; do !!; done`
* pstree: guedin tricks

Copy tricks
***********

* :code:`diff -r <rep1> <rep2>`
* :code:`find -type f -exec md5sum "{}" + >> test.chk`
* :code:`md5sum -c test.chk`
* date rfc 5425: "$(date +"%Y-%m-%dT%H:%M:%S%z")"

Cowsay
******

* :code:`fortune | cowsay -f $(ls /usr/share/cowsay/cows/ | shuf -n1)`

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
