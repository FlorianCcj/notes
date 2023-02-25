sudo passwd USERNAME : set password of a user

# Espace disque

espace disque par partition
df -h
espace disque prit par les elements d un dossier
du -sh /home/user/

# fichier important

/etc/debian_version
/etc/hosts
/etc/ssh/sshd_config
/etc/groups
/var/log/auth.log

# package

dpkg -i package.deb : install un .deb
tar cfz file.tgz repertoire : compresse
tar xfz file.tgz : decompresse

# droit

config permit RootLogin yes
allowUsers moi toi
addgroup ssh-allowed
usermod -a -G ssh-allowed florian
groups "utilisateur"
allowUsers denyUsers
allowGroups denyGroups


# debug

sudo service $(cat /etc/X11/default-display-manager | awk '{print substr($1,11)}') restart : lancer le GUI a partir de tty
echo $PATH
echo $env
while true; do date; sleep 5 ; done

reinstall packet precedement delete
awk '$3 =="remove" {print $1,$2,$4}' /var/log/dpkg.log | tee list
sudo apt-get --simulate install $(awk '{print $3}' list mod)

# Reseau

scp /home/user/data/file user@192.168.2.2:/tmp : deposer en scp quelque chose
  -r
  -p 8080 : changement de port

ss -lmtp | grep 22 : qui ecoute le port 22

ssh user@server
sshfs user@ip:chemin_sur_la_vm chemin_en_local
umount chemin_en_local

netstat -ntpl : affiche les ports utilisé

a2enmod
a2ensite
a2dismod
a2dissite

python -m json.tool
ip -4 addr

# Recherche

grep -lR "coincoin" . : donne la liste des fichiers
find . | xargs grep "coincoin" -sl : affiche le fichier et la ligne
find ./ -regex '\./[^.].+' -mtime -4 : fichier modifier il y a moins de 4 jours
find ./ -regex '\./[^.].+' -amin $((($(date --date='2013-12-28 16:45:00' +%0) - $(date --date='now' +%0)) (60)))
find -mtime -15

w : qui est connecté

# Bdd

mysqldump -u $db_user -p$db_pwd $db_name > file.sql
mysql -u $db_user -p$db_pwd $db_name < file.sql
  -h : permet d ajouterun remote host si c est pas en local
