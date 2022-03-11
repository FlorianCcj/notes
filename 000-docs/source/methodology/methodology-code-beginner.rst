Methodology - Code - Beginner
#############################

Bien sur on veut developper, creer des programmes, des logiciels, des applications. Par consequent, on apprend un langage de programmation, on developpe, on obtient notre logiciel.
L'idée est bonne, mais est-ce du bon code ? un bon logiciel ? du code qui perdurera dans le temps ?

Proprete de code
****************

Clean Code
==========

Pour avoir un code propre je recommande fortement la lecture de `Clean Code de Robert C. Martin <https\://github.com/SaikrishnaReddy1919/MyBooks/blob/master/%5BPROGRAMMING%5D%5BClean%20Code%20by%20Robert%20C%20Martin%5D.pdf>`_

Linter et correcteur
====================

La mise en place d un linter ou autre verificateur de qualite est indispensable, il en existe pour chaque langage. Le linter fera une analyse statique de votre code pour vous retourner les manquements aux regles.

Il permet d abord de respecter les regles de bonne pratique, ensuite d eviter de nombreuses erreurs classiques et enfin d homogeneiser le code ce qui permetera a tous les developpeurs d utiliser les memes conventions de developpement.

**De la meme maniere un correcteur que se soit pour vos commentaires, votre documentation ou autre est tres important, vous pouvez par exemple utiliser Antidote, Grammalecte, Grammarly ou LangageTool**

Bonnes pratiques
================

Que se soit soit lors de l apprentissage d un language, l utilisation d un library ou le developpement au travers d un framework, je ne saurais que trop recommender de regarder s il existe un guide des pratiques sur le sujet.

**Les bonnes pratiques peuvent passer par de multiple aspect**

* **des design patern a utiliser**
* **des conventions de nomage**
* **des consignes de securite**
* **et de nombreux autres**

Bien choisir son editeur
========================

Les editeurs de code sont nombreux, varies et offre de multiples fonctionnalites. Certains sont specialises dans un langage, d autres generiques, certains proposent des options annexes au code (gestion de scm, gestion de base de donnee), d autres permettent le developpement de plugin. Chaque editeur a ses points forts et ses points faibles et je vous recommande vivement de peser le pour et le contre de chacun et de vous habituer a plusieurs d entre eux (exemple d editeur: codeblock, clion, intelij, phpstorm, pycharm, vscode, sublime text, vim)

Versionning
***********

Qui dit developpement, dit debug, dit sauvegarde, dit open source, dit versionning, dit ... beaucoup de chose.

Les SCM (Sources Control Management) repondent a de nombreux problemes, et des que vous vous lancez dans un projet il est recommandé d'y faire appel.

Comme toutes applications de nombreuses alternatives existent. Je n ai jusqu alors utilise que `git <https\://git-scm.com/>`_ et je vous le recommande.

De nombreux sites permettent de creer des depots Git gratuitement

* `Gitlab <https\://gitlab.com/users/sign_in>`_ ,
* `Bitbucket <https\://bitbucket.org/product>`_ ,
* `Github <https\://github.com/>`_
* etc.

"Oui mais quel importance tout ca, je m'en fiche, moi je veux juste coder"

En fait ca va permetre **plusieurs** choses

* prendre des maintenant les bonnes habitudes meme si vous codez a peine des :code:`hello word`
* Partager facilement

  * que se soit pour collaborer ou faire de l open source, git decentralise met a disposition votre code et n importe qui peut vous proposer des evolutions, un clean up, un correction, etc
  * pour debug: si un jour vous avez un probleme vous pouvez mettre a disposition facilement le code et une partie de son contexte juste en renvoyant sur votre depot

* eviter la perte de donnee: il est bien plus dur de detruire un serveur qui ne nous appartient pas que faire tomber une tasse de cafe sur son ordinateur
* parcourir facillement l historique: annuler une modification, la re-appliquer,
* reduire les erreurs au coeur de notre logiciel: le systeme de git permet de creer des branches en parallele au coeur de notre logiciel, on peut bien evidement les appliquer, mais git permet d afficher facilement les modifications entre votre travail principale et celui fait en parallele pour savoir si vous avez generé des erreurs

`Ce que j ai appris sur git <https://florianccj.github.io/notes/git/git-for_beginner.html>`_

Documentation
*************

De nombreuses documentations existent:

* la documentation utilisateur
* la documentation administrateur
* la documentation developpeur
* la documentation contributeur
* etc

Je vais juste m attarder sur deux types de documentation.

Le README.md
============

Le readme est un fichier indispensable a tout projet. Il est la pour presenter l ensemble du projet.

Une excellent article a ete redige donc autant `vous redirigez dessus <https://dev.to/scottydocs/how-to-write-a-kickass-readme-5af9>`_

Sinon pour resumer

1. Name the thing
2. An introduction or summary
3. Prerequisites
4. How to install the thing
5. How to use the thing (if more doc detail, link here)
6. How to contribute to the thing
7. Add contributors
8. Add acknowledgements
9. Contact information
10. Add licence information
11. And more: logo, badges or shield, screenshot, emoji

Procedure de reproductibilite
=============================

Souvent on voit de magnifique message "excusez moi mais ca marche pas" ... Oui mais qu est ce qui marche ? Pourquoi ? dans quelle situation ? un peu de context est indispensable.

Souvent les grosses librairies, les grosses entreprises ou autres projets un peu fonctionnel on deja mis des choses en place. `Par exemple vous avez celui de symfony ici <https://symfony.com/doc/current/contributing/code/bugs.html>`_

De meme je vais copier coller au cas ou ca disparaise:

* Use the title field to clearly describe the issue;
* Describe the steps needed to reproduce the bug with short code examples (providing a unit test that illustrates the bug is best);
* If the bug you experienced is not simple or affects more than one layer, providing a simple failing unit test may not be sufficient. In this case, please provide a reproducer;
* Give as much detail as possible about your environment (OS, PHP version, Symfony version, enabled extensions, ...);
* If you want to provide a stack trace you got on an HTML page, be sure to provide the plain text version, which should appear at the bottom of the page. Do not provide it as a screenshot, since search engines will not be able to index the text inside them. Same goes for errors encountered in a terminal, do not take a screenshot, but copy/paste the contents. If the stack trace is long, consider enclosing it in a <details> HTML tag. Be wary that stack traces may contain sensitive information, and if it is the case, be sure to redact them prior to posting your stack trace.
* (optional) Attach a patch.

Tests
*****

Parfois des library existent pour faciliter la mise en place des tests (phpunit, jest, ctest, etc). Il est important de mettre en place ces test.

Un test permet de s’assurer du fonctionnement correct de tout ou partie d’une application ou programme. Il permet de verifier qu une fonction ou qu une classe a le comportement conforme.

Lors d un refacto, d un ajout de fonctionnalite, ou meme des que quelqu un decouvre le code de votre application, les tests permettent d'avoir un apercu simple des differentes fonctionnalitees que se soit des fonctions, des classes et meme de l application.

il y a de nombreux type de test

* **les tests unitaires: il permet de s’assurer du fonctionnement correct d’une partie isolee d’une application ou d’un programme. Il a pour objectif d’isoler le comportement de la partie de code à tester de tout facteur extérieur et de vérifier qu’il est conforme à ce qui est attendu. (extrait du site** `ici <https://www.nutcache.com/fr/blog/tests-unitaires/>`_)
* **les tests d integration: Ces tests sont exécutées pour valider l'intégration des différents modules entre eux et dans leur environnement exploitation définitif. Ils permettront de mettre en évidence des problèmes d'interfaces entre différents programmes (extrait de** `ce site <http://www-igm.univ-mlv.fr/~dr/XPOSE2000/TesTs/SiteWeb/typestests.htm>`_)
* **Smoke test ou sanity check: il consiste en des tests fonctionnels ou unitaires de fonctions logicielles critiques. Les tests de fumée viennent avant d'autres tests approfondis."Est-ce que le programme démarre correctement ?", "Est-ce que les boutons de contrôle principaux fonctionnent ?", "Est-ce que l api repond ?". Si cette fonctionnalité de base échoue, il est inutile d'investir du temps dans un travail plus détaillé à ce stade. (extrait de** `ce site <https://developer.mozilla.org/fr/docs/Glossaire/Test_de_fum%C3%A9e>`_)
* **les tests fonctionnels: Si les tests fonctionnels parlent d’eux-mêmes (est-ce que l’utilisateur peut faire ou ceci ou cela ?), les tests non fonctionnels sont des vérifications techniques liées à la performance, l’adaptabilité ou à la sécurité du système**
* **les tests e2e, de validation ou d'acceptation ou encore systeme:  il consiste à simuler des tests à plus grande échelle, en intégrant un nombre important d’éléments, de systèmes différents pour valider l’alimentation successive de bout en bout. En finance, il est usuel de tester la chaîne « Front to Back », c’est-à-dire depuis les systèmes en lien avec les marchés/les clients jusqu’aux outils de valorisation ou de génération de confirmation automatique par exemple. (extrait de** `ce site <https://meritis.fr/methodo/tests-informatiques-bonnes-pratiques/>`_)
* **les tests manuels: cela revient a utiliser le logiciel vous meme et voir a quel moment une erreur ressort, les tests precedents sont la pour automatiser le plus possible, mais generalement un test manuel reste necessaire**
* **les tests utilisateurs de design: ce test s adresse principalement pour les logiciels grand publique. Le test conciste a demander a 2-3-5 personnes de realiser divers scenario sur le logiciel. Observer leurs reactions, ne pas leur donner d explication sur le logiciel et noter les axes d amelioratione**
* **les tests de performance ou test de charge: ils ont pour principal objectif la validation d'une solution logicielle et de son architecture sous-jacente liées à une utilisation simultanée multi-utilisateurs, permettant ainsi d'éviter certains problèmes en production. Ils permettent de garantir une qualité de service applicative dans des conditions réelles d'utilisation (extrait de** `ce site <https://www.tests-performance.fr/?page_id=691>`_)
* **les tests d intrusion: il permet d’évaluer le niveau global de sécurité du système (extrait de** `ce site <https://www.cnpp-cybersecurity.com/pages/audit-technique.php>`_)

Le scan de securite
===================

**De la meme maniere que le linter, des analyses de vulnerabilites peuvent etre effectuees automatiquement.**

**Rechercher les outils d analyses de code concernant les technologies employees en rapport avec la securite ou les vulnerabilites. Ces analyses degrossiront la recherche de vulnerabilite mais il sera toujours necessaire de se tenir a jour.**

**Prenez donc l habitude de rechercher les vulnerabilites cela ne peut etre que benefique et ameliorera votre culture de la technologie que vous utilisez et ameliorera votre maniere de coder.**

Sources
*******

* http://www.nathalievialaneix.eu/doc/pdf/presentationGit.pdf
* https://symfony.com/doc/current/contributing/code/bugs.html
* https://dev.to/scottydocs/how-to-write-a-kickass-readme-5af9
* https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
* https://www.nutcache.com/fr/blog/tests-unitaires/
* https://medium.com/@koffisani/pourquoi-vous-devez-apprendre-git-aujourdhui-df773a7e1159
* My crazy mad little head
