Git - For beginner
##################

Presentation
************

Ceci n'a pas vocation a etre un tuto, mais a donner les grandes lignes. Cette partie etant celle que je maitrise un peu plus et etant transverse aux differentes technos cette partie va etre un peu plus longue.

Git va gerer votre code grace aux modifications, il ne va pas enregistrer votre code, uniquement les modifications effectuees au projet.

**Cette gestion des modifications facilite la gestion des versions, le retour aux versions precedentes ainsi que la revue de code.**

Git va gerer votre code en 5 zones:

0. stash: une zone de sauvegarde temporaire que nous approfondirons un peu plus tard
1. workspace: la ou est indexe toutes vos modifications
2. staging: la ou va etre indexe les modifications pretes a etre sauvegardees
3. local repository: la ou est sauvegarde toutes les modifications
4. upstream repository: generalement un server distant dans lequel on envoie toutes les modifications pour les sauvegarder, les publier quand on travaille a plusieurs, ...

Chaque modification est stockee et referencee par un SHA-1 (ex: 5aaec3b2a305cc47af10e1fd35dfb9bc569cdc1c)

Les references peuvent etre appelees sous plusieurs formes:

- <nom de branche> : alias pour le commit le plus récent de la branche
- <tag> : alias de branche, jamais déplacé
- <SHA-1> : si non ambigu, le début du code suffit
- <nom>^ :  père du commit
- <nom>^n : nème parent (si parents multiples)
- <nom>~ : ancètre du dernier commit
- <nom>~n : nème ancêtre (HEAD~2=HEAD^^)

Utilisation basique
*******************

TLDR
====

* :code:`git clone <l url que vous aurez sur la page du projet>`: rapatrie le repository distant en local
* :code:`git add <le nom du fichier>`: cette commande passera le fichier du workspace vers le staging
* :code:`git commit -m "<un message traduisant les modifications misesdans le staging>"`: fait passer le staging en local repository
* :code:`git push origin master`: permet de passer de local a distant
* :code:`git pull`: rapatrie les modifications du server au local
* :code:`git status`: permet de voir les differentes area
* :code:`git diff`: affichera les differences au sein du fichier
* :code:`git diff <source branch> <target branch>`: permet de comprendre la difference entre les deux branches
* :code:`git checkout <branch name>`: place l environnement de travail sur la branch
* :code:`git checkout <ref>`: accede a n importe quel reference
* :code:`git checkout -`: revient a la reference precedente
* :code:`git merge <branch de integre dans la branch courante>`: pour ajouter les modifications de la branch :code:`ma-premiere-feature` dans la branch :code:`master`

Pour un nouveau projet
======================

* Creer un compte sur un serveur.
* creer un repository (ou depot en francais)

Rapatrier le depot sur votre ordinateur
=======================================

* :code:`git clone <l url que vous aurez sur la page du projet>`: rapatrie le repository distant en local
* creer un nouveau fichier par exemple :code:`README.md`
* ce fichier sera dans le workspace
* :code:`git add <le nom du fichier>` ici :code:`git add README.md`: cette commande passera le fichier du workspace vers le staging et dira a git de suivre les modifications du fichier
* :code:`git commit -m "<un message traduisant les modifications misesdans le staging>"` par exemple :code:`git commit -m "begin documentation"`: fait passer le staging en local repository
* :code:`git push origin master`: permet de passer de local a distant

Premiere edition
================

* editer votre fichier
* :code:`git status`: permet de voir les differentes area
* :code:`git diff`: affichera les differentes modifications au sein des fichiers
* :code:`git add <le nom du fichier>`
* :code:`git commit -m "<un message traduisant les modifications misesdans le staging>"` par exemple :code:`git commit -m "begin documentation"`: fait passer le staging en local repository
* :code:`git push origin master`: permet de passer de local a distant (le push n est pas necessaire a chaque commit, vous pouvez le faire toutes les heures, demi journee, jour (maximum))

Debut des branches
==================

* Les branches reviennent un peu a faire copier coller du dossier puis de modifier le projet, mais tout en gardant un lien avec le dossier d origin
* vous avez deja rencontrer une branche dans le paragraphe precedent :code:`git push origin master`, :code:`master` est le nom de la branche
* pour travailler il est recommande de ne jamais modifier directement sur la branche :code:`master`
* :code:`git branch ma-premiere-feature`: va creer la branch :code:`ma-premiere-feature`
* :code:`git checkout ma-premiere-feature`: place l environnement de travail sur la branch :code:`ma-premiere-feature`
* les deux precedentes commandes peuvent etre resume par :code:`git checkout -b ma-premiere-feature`
* tous les commit que vous ferez a partir de ce moment seront reference comme faisant partie de la branch :code:`ma-premiere-feature`
* :code:`git checkout master`: replace l environnement de travail sur la branch :code:`master`

  * il faut savoir que :code:`git checkout` permet d acceder a n importe quel reference: un tag, une branch, un commit, ...
  * de plus vous pouvez facilement revenir sur la reference precedente avec :code:`git checkout -`

* :code:`git pull` si :code:`master` a ete modifier sur le depot distant cela permet de rapatrier les modifications sur votre branch :code:`master` local
* :code:`git diff <source branch> <target branch>`: permet de comprendre la difference entre les deux branch
* :code:`git diff ma-premiere-feature master`
* :code:`git merge ma-premiere-feature`: pour ajouter les modifications de la branch :code:`ma-premiere-feature` dans la branch :code:`master`
* :code:`git push origin master`: permet d envoyer les modifications de la branch sur le depot distant
* l'idée sera a l avenir de dire a l un de vos collegue "j ai travailler sur la branch :code:`ma-premiere-feature` peux tu la recuperer la verifier et si tout te conviens alors on integrera les modifications dans :code:`master`"
* aujourd hui vous travaillez seul ? faites la meme chose "je verifie que j ai bien code, que je n ai pas laisse de commentaires inutiles, etc"

Un petit deuxieme pas
*********************

TLDR
====

* proposition de nommage de commit :code:`<type>(<scope>): <subject>`
* :code:`git add .`: a proscrire
* :code:`git add -p`: recommander, permet de commit portion par portion
* :code:`git diff --staged`: affiche le diff dans la :code:`staging area`
* :code:`git diff --color-words`: retire tout les espaces de l affichage et affiche le differenciel mot par mot
* :code:`git diff --color-words=.`: utilise les regex, du coup affiche le differenciel charactere par charactere
* :code:`git rebase <nom de branch>`: recupere les commit de retard par rapport a la branch d ou est issue votre branch
* :code:`git stash`: sauvegarde temporairement
* :code:`git stash list`: affichera les differents stash sauvegardees
* :code:`git show stash@{0}`: affichera les modifications enregistrees dans le stash
* :code:`git stash drop stash@{0}`: supprimera le dernier stash
* :code:`git stash pop`: supprimera le :code:`stash@{0}` et re-appliquera les modifications enregistrees

Bien nommer un commit
=====================

Tout d abord il faut bien conciderer que chaque commit doit sauvegarder un seul sujet, il ne faut pas avoir un commit :code:`creation des todos, management des listes, gestions des utilisateurs`. Ce commit devrait etre separer en au moins 3 commit.

Pour un bon nommage de commit je recommande `la convention que google a mis en place pour angular <https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit>`_

Pour resumer:
* :code:`<type>(<scope>): <subject>`
* type: la grande thematique du commit: :code:`build`, :code:`ci`, :code:`docs`, :code:`feat`, :code:`fix`, :code:`perf`, :code:`refactor`, :code:`style`, :code:`test` (non exclusif mais je pense que cela couvre une bonne majorite tout de meme)
* scope: plus metier, dans l exemple precedent cela peut etre :code:`todo`, :code:`list`, :code:`user`
* subject: la description precise de ce qui a ete modifie (generalement ne cite pas le nom des fichiers editees)

Meme si ceci n est qu une proposition habituez-vous a bien separer vos commit et a bien les nommer.

La staging area
===============

* tres bien on doit separer les commit et bien les nommer mais :code:`git add <nom du fichier` ne le permet pas si j'ai plusieurs fonctionnalites dans le meme fichier.
* :code:`git add <nom du fichier>`: permet effectivement d ajouter tout un fichier, vous pouvez egalement ajouter une liste de fichier voir un dossier, tant qu il concerne bien une seule et meme fonctionnalitee
* :code:`git add .`: celui la est vu et revu dans de nombreux tutos, je vous recommande de ne l utiliser qu avec d immense precaution ... voir pas du tout
* :code:`git add -p`: mon chouchou, permet d ajouter portion de code par portion de code, git vous demandera de choisir

  * :code:`y`: yes, ajoute le a la staging area
  * :code:`n`: no
  * :code:`s`: split, permet de separer si c est faisable facilement par git
  * :code:`e`: edit, vous affichera les lignes avec des :code:`+` et des :code:`-` pour montrer les lignes ajoutees et retirees, il suffit de les supprimer pour ne pas mettre la modification de la staging area
  * vous avez les 4 options que j utilise principalement, les autres options peuvent peut etre vous aider mais je n ai pas encore apris a les utiliser

* :code:`git add -u`: ajoute les modifications des fichiers DEJA SUIVIS, les fichiers qui ne l etaient pas encore ne seront pas prit en compte
* :code:`git commit -a -m "mon super message"` revient a faire une :code:`git add -u` puis un :code:`git commit -m "mon super message"`

J ai des lignes en trop
=======================

Parfois le :code:`git diff` affiche des lignes ajoutees et supprimees ... mais c est quoi ? ce sont des ajouts et des retraits d espaces ou de tabulations ca peut etre ennuyeux. Voici quelques commandes supplementaires

* :code:`git diff --staged`: affiche le diff dans la :code:`staging area`
* :code:`git diff --color-words`: retire tout les espaces de l affichage et affiche le diffrenciel mot par mot
* :code:`git diff --color-words=.`: utilise les regex, du coup affiche le differenciel charactere par charactere

Recuperation de modification
============================

* c est bien beau tout ca mais moi je travaillais sur la branch :code:`ma-deuxieme-feature` comment je recupere tes modifications que tu as merge dans master, je fais un :code:`git merge` ?
* du tout, cela va creer un commit de merge qui n a rien a faire la
* :code:`git checkout master`
* :code:`git pull` pour rapatrier l ensemble des modifications
* :code:`git checkout ma-deuxieme-feature`
* :code:`git rebase master`: va permettre de recuperer sur votre branch l ensemble de commit qui aura ete envoye sur master (ou le nom de votre branch source si ce n est pas master)
* vous aurez desormais une branch a jour en local
* Attention au prochain :code:`push` que vous allez faire, il sera necessaire de le forcer avec un :code:`-f` car vous aller devoir ecraser l'historique de cette branche

J ai fait des modifications mais je n ai pas encore commit ... mais je dois recuperer les mises a jour de master
================================================================================================================

Le :code:`stash` est fait pour vous, ca revient un peu a un :code:`commit` temporaire

* :code:`git status`: faite ca avant et apre le :code:`git stash` ce sera plus parlant
* :code:`git stash`: va creer un commit temporaire de reference :code:`stash@{0}` et va retirer les modifications effectuees dans les fichiers suivi dans la working area
* :code:`git stash list`: affichera les differents stash sauvegardees
* :code:`git show stash@{0}`: affichera les modifications enregistrees dans le stash
* :code:`git stash drop stash@{0}`: supprimera le stash et decalera tout, l ancien :code:`stash@{1}` deviendra le :code:`stash@{0}` etc
* :code:`git stash pop`: supprimera le :code:`stash@{0}` et re-appliquera les modifications enregistrees

Utilisation avancee
*******************

Les points touchy et les points moins urgents a voir.

TLDR
====

* :code:`git commit --amend`: va prendre ce que vous avez mit dans la staging area pour l ajouter dans le precedent commit
* :code:`git reset <nom du fichier dans la staging area>`: permet de passer un fichier de la staging area vers la working area
* :code:`git reset HEAD`: va effectuer la command precedente pour l ensemble de la staging area
* :code:`git reset HEAD^`: va supprimer le dernier commit
* :code:`git reset HEAD^^`: va supprimer les 2 derniers commit
* :code:`git reset HEAD~25`: va supprimer les 25 derniers commit
* :code:`git rebase -i <branch source>` ou :code:`git rebase -i HEAD~10`: permet de re-aranger les commit
* :code:`git show <ref de commit>` pour voir les commits
* :code:`git fetch` rapatrie les modifications sans ecraser votre branch
* :code:`git blame <nom du fichier>` permet d afficher le nom du dernier modificateur des differentes lignes du fichiers
* :code:`git log`: affichera les differents derniers commit
* :code:`git log -1`: affichera uniquement LE dernier commit
* :code:`git log --oneline`: affichera les commit mais en simplifier
* :code:`git log --graph --oneline --decorate`: avec plusieur branch cela permet d avoir une visualisation d ensemble

J ai oublier une portion de code dans mon commit comment je fais
================================================================

* le moyen hardcore mais tout est a refaire

  * :code:`git stash`: va sauvegarder les modifications qui n ont rien a voir avec le commit
  * :code:`git reset HEAD^`: va supprimer le commit et vous re-affichera les modifications dans la working area
  * :code:`git add <vos fichiers de-commiter>`: les remettra dans la staging area
  * :code:`git stash pop`: re-affichera les midufications stash
  * :code:`git add <ce que vous aviez oublie>`
  * :code:`git commit -m <votre message>`

* le moyen soft

  * :code:`git add <vos fichiers oublies>`
  * :code:`git commit --amend`: va prendre ce que vous avez mit dans la staging area pour l ajouter dans le precedent commit

* je profite de ce paragraph pour presenter :code:`reset`

  * :code:`git reset <nom du fichier dans la staging area>`: permet de passer un fichier de la staging area vers la working area
  * :code:`git reset HEAD`: va effectuer la command precedente pour l ensemble de la staging area
  * :code:`git reset --hard <nom du fichier dans la staging area>`: **supprime la modification du fichier present dans la staging area**
  * :code:`git checkout <nom du fichier dans la working area>`: **supprime la modification du fichier present dans la working area**
  * :code:`git reset HEAD^`: va supprimer le dernier commit
  * :code:`git reset HEAD^^`: va supprimer les 2 derniers commit
  * :code:`git reset HEAD~25`: va supprimer les 25 derniers commit

Bon rearangeons nos commit
==========================

Plusieurs problemes se posent avec ce qu on a vu

* :code:`git commit -m "list todo"`
* :code:`git commit -m "fix list"`
* :code:`git commit -m "fix list"`
* :code:`git commit -m "fix list"`
* :code:`git commit -m "fix list"`
* 15 commit sur le sujet des list
* les commits de fix qui n en finissent plus
* ramener sur la branch :code:`master` ca donnerait 50% de commit de fix 49% de commit de merge ... pas tres lisible
* une solution serait a :code:`git reset HEAD~<le nombre de commit fait dans la branche>` ?
* c est moche mais oui ca marcherait, il ne restera plus qu a tout recommit sujet par sujet

* Arrivé du :code:`git rebase`
* Mais qu est ce qu il raconte ... :code:`git rebase` ca permet juste de ratraper le retard de la branch source ?
* je vous presente :code:`git rebase -i <branch source>` ou :code:`git rebase -i HEAD~10`
* cette commande vous affichera l ensemble des commit de votre branch et vous permettra de les reorganiser, les editer, les renommers etc
* generalement vous aurez les explications de chaque command dans le texte qui s affichera. Lisez bien l integralite.
* c est tout ce que tu as a dire ? utilisez :code:`git rebase -i` ? c est pas terrible
* quatre choses

  * d abord si vous ne connaissez pas les commandes vous ne pourez pas les utilisez, il fallait bien au moins vous l introduire
  * apres un :code:`git rebase -i` tout l historique est boulverse, il faudra un :code:`git push -f` pour l imposer au server
  * attention si vous reorganiser les commit alors que vous avez modifier deux fois la meme portion de code :code:`git rebase -i` va vous demandez beaucoup de modification de commit, ne prenez pas peur, lisez ce que git vous dit et corrigez tranquillement vos fichiers
  * utilisez :code:`git show <ref de commit>` pour voir les commits, meme si vous les avez bien nommees, revoir ce que vous avez fait dedans permettra de vous rassurer

Verifiez avant de pull
======================

Le :code:`git pull` va rapatrier les modifications du serveur distant et ecraser votre branch local. En realite on peut rapatrier les references sans ecraser la notre.

par exemple sur votre branch :code:`master`,

* :code:`git checkout master`
* :code:`#git pull` ecraserait votre branch
* :code:`git fetch` rapatrie les modifications sans ecraser votre branch
* :code:`git diff master origin/master`: vous pourrez alors demander a git la difference entre le distant et le local

Des supers fichiers
===================

.gitconfig
----------

c est dans ce fichier que vous trouverez vos configurations, vos alias, vos parametres d authentifications (sous linux generalement il est dans l home de l utilisateur :code:`~/.gitconfig`)

.gitignore
----------

Quand vous builder, quand vous rapatriez des library externe, ou autre, vous creer des fichiers qui n ont rien a faire dans git.

Grace a ce fichier :code:`.gitignore` vous pourrez les lister pour bien preciser a git de ne jamais les prendre en compte.

.gitkeep
--------

Dans certaine situation nos scripts ont besoin d un dossier pour stocker des fichiers generes ou des fichiers uploades, malheureusement git ne prend pas en compte les dossiers vides.

On creer donc un fichier vide dans ces dossiers a concerver pour faire comprendre aussi bien a git qu au autre contributeur de ne pas supprimer ce dossier. Par convention on appelle ces fichiers :code:`.gitkeep`

Qui qu a fait quoi?
===================

Quand vous travaillez seul ce n est pas tres important. Mais quand vous travaillez a plusieurs, parfois vous ne comprenez pas certain code ... bon outre le fait que si ce code est trop complique il faudrait peut etre le refactorer, pour le comprendre il suffit de demander a son autheur de l expliquer.

:code:`git blame <nom du fichier>` permet d afficher le nom du dernier modificateur des differentes lignes du fichiers

Qu est ce qui c est passe?
==========================

Pour ceux qui ont regarder des tutos, vous l aurez vite vu, moi je l aborde que maintenant.

* :code:`git log`: affichera les differents derniers commit
* :code:`git log -1`: affichera uniquement LE dernier commit
* :code:`git log --oneline`: affichera les commit mais en simplifier
* :code:`git log --graph --oneline --decorate`: avec plusieur branch cela permet d avoir une visualisation d ensemble

Que et Quand verifier
=====================

* Avant de commit toujours verifier ce que vous allez commit avec :code:`git diff --staged`
* avant de recuperer un :code:`stash`, toujours verifier le continue avec :code:`git show stash@{0}`
* avant de merge toujours verifier que l on a bien recuperer la branch source, sur la branch en cours de developpement faire :code:`git rebase <branch source>`
* avant de merge, toujours verifier le diff entre les deux branch :code:`git diff <branch source> <branch target>`
* en cours de :code:`git rebase -i`, toujours verifier les commit que l on va manipuler avec :code:`git show <numero du commit>`

Aller plus loin
***************

Regarder

* git cherry-pick
* git flow
* git hook
* git submodule
* la specification semver
