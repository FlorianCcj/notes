Todo - Projects
***************

Folder in sulfur
================

* RFC design
* tenserflow
* todolist
* stuff-optimisation
* revision program
* stack:
  * gitlab
  * ci
  * nexus
  * telegraph
  * kinana
  * fluentd/fluentbit
  * elastic search
  * kibana
* docker:
  * faire une doc pour docker symfony

todolist
--------

first run (todo)
""""""""""""""""

* [todo][base] create a todo (title/desc (optional))
* [todo][base] edit a todo
* [todo][base] remove a todo
* [todo][workflow] pass a todo "done" <-> "undone"
* [todo][base] in list add a checkbox to print "done" todo

2 run (user)
""""""""""""

* [user] sign up page
* [user] sign in page
* [user] change personnal data form
* [user] remove personnal data button
* [user] change pwd form
* [todo][user] todo creation -> link to a user
* [todo] todo list -> by user
* [todo] todo list -> total
* [todo] todo list -> filter (title/desc)

3 run (todo-tags)
"""""""""""""""""

* [todo][tags] add tags to todo (title + color)
* [tags][groups of tags] permit to group tag under tag (//!\\ circular)
* [tags][template todo] print tags show parent/child
* [tags][todo filter] when filter print tags then tags child ...

4 run (user-group)
""""""""""""""""""

* [group][group] add group to user (title + color)
* [group][groups of group] permit to group group under group (//!\\ circular)
* [group][template todo] print groups show parent/child
* [groups][user filter] when filter print group then group child ...

5 run (shared todo)
"""""""""""""""""""

more
""""

* [todo][end date] dead line
* [user][name] usage name
* [todo][maker] attribute todo to someone
* [todo][shared] permit to choose, shared with group, with group and child, with group and parent


stuff-optimisation
------------------
* inventaire des equipements:
  * ecriture du json
  * lecture du json
  * affichage des equipements
  * filtre par

    * possesseur
    * type
    * stat > < =
    * qualité
    * classe pouvant la tenir
    
* choix des priorités:

  * formulaire de priorisation de stat
  * en fonction de la priorisation retourner les stuffs optimaux

* exclure des equipements:

  * pourvoir choisir des equipements que l'on ne veux pas mettre dans l'opti
  * mettre une checkbox pour dire que l'on ne veux pas

revision program
----------------

* from md to yml

  * lire les md
  * les parser
  * generer un objet
  * le dumper en yml

* cli questions:

  * lire les yml
  * selectionner 10 questions aleatoires
  * les afficher au fur et a mesure
  * donner la possibilité de choisir les reponses
  * afficher si la reponse est bonne ou non
  * si elle est mauvaise, afficher l'aide
  * afficher un bouton spoiler si l'user veut afficher directement la reponse

* param:

  * permettre de paramettrer le nombre de question journaliere que l'on veut
  * permettre de choisir le theme que l'on veut reviser

* stockage:

  * permettre d afficher la liste des questions
  * permettre de filtrer les questions pour cibler celle qui nous interesse:
  
    * mot inclut dans le titre
    * mot inclus dans le corps
    * question mono/multiple
    * theme
    
  * faire des stats
  * permettre exclure des questions les prochaines fois
  * permetttre de remettre les questions exclu


..
  - * + create a todo (titre, status, deadline/rappel, color)
  - * + edit a todo
  - * ajouter une dead line
  - * + check a todo
  - * + uncheck a todo
  * ordonner les todos/hierarchiser
  * * show user todo
  * * show multiple user todo
  * ++ categories (multiple category to one todo) todo
  * ++ share a category of todo with some one
  * * filter list of todo by category
  * show history of a todo
  * show history of a category
  * show list of shared category (you, mona (lesson), mona (video), ...)
  * hide our todo & show a list of shared
  * avoir un suivi du deroulement de la tache (workflow, ou %)

          
Document history
================

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.08.10 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+

