Linux - Default bin
###################

Two way to change bin called 

Alias
*****

Add in :code:`~/.bashrc`

:code:`alias python='/usr/bin/python3.4'`

reload term

:code:`. ~/.bashrc`

System
******

With Debian

:code:`update-alternatives --list python`
:code:`update-alternatives --install /usr/bin/python python /usr/bin/python2 1`
:code:`update-alternatives --install /usr/bin/python python /usr/bin/python3 2`
:code:`update-alternatives --config python`
:code:`update-alternatives --install /usr/bin/python python /usr/bin/python2`
