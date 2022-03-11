2018 - php tour - montpelier
############################

Bienvenue dans la matrice ! - Benoit Jacquemont
***********************************************

:source: https://www.youtube.com/watch?v=buA4opDfXOE

Launch process -> get pid
mais ce n est jamais le process qui va interagir avec les fichiers
ce n est jamais le process qui va interagir avec les binaire c est le kernel

Le programme n a jamais acces au onde reel

Les echanges entre le programme et le noyau on peut les espionner

outil uite pour les espionner : strace

strace (the syscalls snifer)
    * strace <my_program>
    * strace -p <my program pid>

Exemple strace hello word
=========================

.. code-block:: php

    <?php
    // hello_world.php
    echo 'hello_world';

:code:`strace php hello_world.php > /dev/null`

* on peut voir execve, on peut en trouver l explication grace a man
* on peut tout trouver y compris :code:`man man`
* dans :code:`man man` on a l explication du manuel et on peut y voir que dans la section 2 il y a les :code:`syscall`
* :code:`man 2 execve`
* sinon les :code:`mmap` sont utilisé pour memory management
* un moment on voit :code:`write(1, "Hello World\n", 12) = 12`
* :code:`man 2 write` -> la fonction ecrit sur un file descriptor
* 3 fd permanant
    * 0: standard input
    * 1: standard output
    * 2: error output

on trop verbeux donc filtrons
* :code:`strace -e "read,open" <prog>`: built-in filter
* :code:`strace -e "read,open" <prog> 2>&1 | cut ...`: strace output to stderr
* :code:`strace -o strace.out`: dump to file for latter analysis

Exemple d utilisation:
* ou va chercher php pour les valeurs de conf (:code:`strace -e "open" php -i > /dev/null`)
* why my homepage is so slow:

    * with strace

        * :code:`php slow_homepage.php`
        * :code:`ps awx`
        * :code:`strace -p 1132`
        * un blocage sur l apel poll -> :code:`man 2 poll`
        * :code:`strace -T -p 1132` pour  avoir le temps d execution des appel
        * effectivement le poll 5sec -> connection au fd 3 -> la premiere ouverture c est faite avec un connect a une url -> effectivement l url est lente a repondre
    * with lsod

        * lsof montre tout les fichiers ouverts
        * :code:`lsof -p 1132`

* what my process is doing

    * strace -e write -s -p 1161 le -s 1000 permet d augmenter les chaines de caracteres du retour de strace
* i am processing a huge file where my process is at

    * :code:`strace -p 1182` on voit au il fait des read sur le fd 3
    * :code:`lsod -p 1181` on voit bien aue c est le fichier qu il est en train de lire
    * le code est en train de faire un :code:`fgetcsv`
    * grace a strace on a l id juste apres le :code:`\n`, :code:`grep -n id-15458 example-file/huge-file.csv`

en realité le process va rarement faire appel au kernell, il va passer par des libs -> espionnage avec ltrace

* quel variable d environnement son lut par mon programme:

    * :code:`man man` -> les appels aux libs -> page 3
    * ltrace -e getenv php reading_env.php
* my webservice call seems to get strange response

    * :code:`strace -e "read,write,connect" php ws_call.php`
    * :code:`ltrace -e "SSL_read,SSL_write" php ws_call.php` on option des pointeurs sur la memoire ...
    * vi ~/.ltrace.conf

        * .. code-block:: ini

            int SSL_write(void *, string, int)
            # ne marche pas car c est apres que la command soit executé que l on a le string en clair
            # int SSL_read(void *, string, int)
            int SSL_read(void *, +string, int)

Going futher:
* gdb: the universal debuger
* perf: lightweight performance profiling
