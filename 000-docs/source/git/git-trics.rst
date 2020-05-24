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

git log
*******

git log --graph --oneline --decorate

git rebase
**********

git rebase <branch>
git rebase -i <branch>

git remote
**********

git remote -v: print remote origin
git remote prune origin: remoev useless branch
