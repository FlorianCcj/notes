Git - Submodule
###############

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

Sources
*******

* `My colleague Frank <https://perdu.com/>`_


Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.10.08 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
