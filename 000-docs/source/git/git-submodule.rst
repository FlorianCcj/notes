Git - Multi Repo management (submodule and fork)
################################################

Git Submodule
**************

.. code-block:: bash

    git clone <my_root_project>.git
    cd <my_root_project>
    git submodule add <my_leaf_project>.git
    git status
    cd <my_leaf_project>
    git checkout <the_branch_i_need>
    cd ..
    git status

.. code-block:: bash

    git clone --recurse-submodules <my_root_project>
    # or
    git clone <my_root_project>
    git submodule update --init --recursive

Fork
****

Get your fork master up to date
================================

* :code:`git remote add upstream <main_repo>`: Add the main repo
* :code:`git fetch upstream`: Get info
* :code:`git pull --rebase upstream master`: Update your master
* :code:`git checkout master && git rebase upstream/master`: 2nd way
* :code:`git push -f origin master`: Do not forget to forcepush

Keep main upstream master
=========================

* :code:`git checkout -b upstream_master upstream/master`
* :code:`git pull`

Sources
*******

* `My colleague Frank <https://perdu.com/>`_
* `<https://statnmap.com/fr/2019-05-12-garder-a-jour-fork-github-gitlab/>`_

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.10.08 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
