

# use corectly mysql in chromebook/crouton
https://github.com/dnschneid/crouton/wiki/Running-servers-in-crouton#lamp
```
# vi /etc/rc.local
/etc/init.d/apache2 start

export HOME=/etc/mysql
umask 007
[ -d /var/run/mysqld ] || install -m 755 -o mysql -g root -d /var/run/mysqld
/usr/sbin/mysqld &
```

# TODO
 * https://gist.github.com/khilnani/33800c637f898c1781a7


## Passer en mode dev

* esc + refresh + power
* ctrl + D

## afficher la console

* ctrl + alt + ->
* log: chronos
* sudo initctl stop powerd

## Console dans le navigateur et crouton

https://doc.ubuntu-fr.org/chromebook

* download crouton
* ctrl + alt + T
* shell

## install

* sudo sh ~/Download/crouton -r trusty -t xfce -e
* sudo sh ~/Download/crouton -r trusty -t unity -e
	* -e : permet d'encrypter les données
	
## enter

* shell
* enter-chroot
