Linux - History
###############

bash
****

add in .bashrc :code:`HISTTIMEFORMAT="%Y-%m-%dT%T%z "`

no need export

zsh
***

.. code-block:: bash
    
    #!/bin/zsh
    \history -i
    # or
    fc -li 1
