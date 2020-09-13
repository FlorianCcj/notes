Linux - Tmux
############

tmux set-option -g history-limit 5000

command
*******

main
====

tmux ls
tmux kill-server: kill all tmux connexion
tmux: launch session
tmux new -s <session name>
tmux attach -t <session name>
tmux attach -d -t <session name>

ctrl+b
======

* window
    * c: new window
    * &: kill window with all panes
    * p: previous window
    * n: next window
    * <number>: go to window number <number>
    * ,: rename window
    * :code:`: -> swap-window -s 0 -t 3`: swap window 0 to 3
    * :code:`: -> swap-window -t 3`: swap current window to 3
    * :code:`: -> swap-window -t -1`: swap current window to left
    * :code:`[`: to scroll (q to quit)(or ctrl+b -> : -> set -g mouse on or set -g mode-mouse on)
* panes:
    * ": horizontal separation
    * %: vertical separation
    * x: kill pane
    * !: send pane to new window
* session:
    * s: switch session
    * d: detach session

Conf:
*****

in ~/.tmux.conf

Plugin
******

Plugin manager
==============

https://github.com/tmux-plugins/tpm

git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
echo "set -g @plugin 'tmux-plugins/tpm'" >> ~/.tmux.conf
echo "set -g @plugin 'tmux-plugins/tmux-sensible'" >> ~/.tmux.conf
echo "run -b '~/.tmux/plugins/tpm/tpm'" >> ~/.tmux.conf
tmux source ~/.tmux.conf

tmux-continuum

echo "set -g @plugin 'tmux-plugins/tmux-resurrect'" >> ~/.tmux.conf
echo "set -g @plugin 'tmux-plugins/tmux-continuum'" >> ~/.tmux.conf
echo "set -g @continuum-restore 'on'" >> ~/.tmux.conf

Conf
****

:code:`bind-key T swap-window -t 0` : permit to bind Ctrl+b -> T to add the current window in window 0
:code:`bind-key L swap-window -t -1`: to last
:code:`bind-key -n C-S-Left swap-window -t -1`: move the current window to left
:code:`bind-key -n C-S-Right swap-window -t +1`: move the current window to right


sources
*******

* https://www.linuxpedia.fr/doku.php/commande/tmux
