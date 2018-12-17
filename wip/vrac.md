# Vrac

ajouter

```bash
<username> ALL=(ALL:ALL) NOPASSWD: ALL
```

to try

```bash
<username> ALL=NOPASSWD: ALL
```

to try

```bash
sudo echo "includedir /etc/sudoers.d" >> /etc/sudoers
sudo echo "username ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers.d/local
```

