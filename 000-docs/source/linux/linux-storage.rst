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

mkdir /mnt/mydisk
vi /etc/fstab
```
/dev/sdb1 /mnt/mydisk ext4 default,noauto 0 1
# default = rw,suid,dev,exec,auto,nouser,async
```
sudo mount /mnt/mydisk
sudo mount -a: mount everything in fstab
sudo blkid #get uid if you want to replace the device name
