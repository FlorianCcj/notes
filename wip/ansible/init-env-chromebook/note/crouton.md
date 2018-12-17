# Note pour manager crouton
(my chrootname: xenial)
## Mise en place
 * Download crouton
 * Open a shell (Ctrl+Alt+T, type shell and hit enter)

## management of the partition
### Version
#### Ubuntu
Trusty = 14.04
Saucy = 13.10
Raring = 13.04
Quantal = 12.10
Precise = 12.04 (LTS)
#### desktop
Cinnamon
e17
gnome
kde
lxde
unity
xfce
### supported os list
 * target list: sh ~/Downloads/crouton -r list or sh ~/Downloads/crouton -t help
 * release list: sh ~/Downloads/crouton -r list
 * chrootname list: sudo edit-chroot -a
 * chrootname list details: sudo edit-chroot -al
### Xfce
 * creation: sudo sh ~/Downloads/crouton -t xfce
 * launch: sudo enter-chroot startxfce4
 * launch-short: sudo startxfce4
### Unity
 * sudo sh ~/Downloads/crouton -t touch,unity
 * launch-short: sudo startunity
### Remove
 * shortcut: sudo delete-chroot evilchroot
 * sudo edit-chroot -d evilchroot
### Open it in a windows
 * sudo sh ~/Downloads/crouton -t xiwi -u -n chrootname
### Backup
 * create: sudo edit-chroot -b chrootname
 * create: sudo edit-chroot -f /media/removable/your_path_on_drive -b chrootname
 * restore: sudo edit-chroot -r chrootname
 * restore: sudo edit-chroot -f /media/removable/your_path_on_drive -r chrootname
### Vrac
 * sudo sh ~/Downloads/crouton -t keyboard,extension,unity -r trusty -n unitytrusty
 * sudo sh ~/Downloads/crouton -t keyboard,extension,gnome -r trusty -n gnometrusty
 * sudo sh ~/Downloads/crouton -t keyboard,xiwi,e17 -r trusty -n enlightenment
 * sudo startunity
 * sudo startgnome
 * -e: to encrypt
 * multi chroot: sudo sh ~/Downloads/crouton -r trusty -t lxde,xiwi -n testchroot
# Resources
 * https://github.com/dnschneid/crouton
 * https://github.com/dnschneid/crouton/wiki/Crouton-Command-Cheat-Sheet

raccourci
refresh + demarage : reinitialisation de paramettre
