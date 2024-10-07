Git - Tricks
############

edit a file
***********

.. code-block:: bash

    git rebase -i <oldsha>
    # mark the commit to edit as edit
    git reset HEAD^
    # then do as usual
    git add <file_to_add>
    git commit <commit_name>
    git add <file_to_add>
    git commit <commit_name>
    ...
    git rebase --continue

git config
**********

git config core.filemode false

git config --global core.filemode false

git config --global user.name florianccj
git config --global user.email xxx@aaa.bbb

git config --global core.excludesfile ~/.gitignore_global

git diff
********

git diff --staged
git diff --color-words
git diff --color-words=.

List commit diff between local and remote: git log master..@{u}

git log
*******

git log --graph --oneline --decorate

git pull-request
*****************

:source: https://dev.to/karaluton/a-guide-to-perfecting-pull-requests-2b66

A pull request should tell a story
To help you to write good commit permiting to tell a good story, conventionnal commit is a good practice to adopt to have explicit commit

Think about the Single Responsability principe
Avoid more than 400 line modification

Introducte your PR, do not think that other know your mind. Describe what, why and how to use/test your change

Be your first reviewer

git rebase
**********

git rebase <branch>
git rebase -i <branch>

git remote
**********

git remote -v: print remote origin
git remote prune origin: remoev useless branch

get interesection between 2 branch
***********************************

git merge-base --fork-point develop
git merge-base myfeature develop

TODO
To read: https://www.hostinger.fr/tutoriels/commandes-git
