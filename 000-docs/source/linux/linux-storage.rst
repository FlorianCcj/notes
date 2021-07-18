lsblk: list all disk and partition

then find them in /dev/
sudo fdisk -l

mount: list all mount volume
sudo umount /dev/sdb1
or
sudo umount /media/me/mydisk

fdisk /dev/sdb1
sudo mkfs.exfat /dev/sdb1
sudo apt install exfat-utils exfat-fuse
sudo mkfs.exfat -n "label" /dev/sdb1
sudo mount /dev/sdb1 /mnt/disk1/
sudo ncdu /
sudo ncdu / -x
