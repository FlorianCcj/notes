Sphinx - My personnal custo
###########################

Scripts
*******
# Add :code:`<project>/docker/Dockerfile-sphinx-builder`

.. literalinclude:: ./docker/Dockerfile-sphinx-builder

# Scripts permiting to build without installing sphinx or dependancies :code:`<project>/scripts/docker_build_sphinx.sh`

.. literalinclude:: ./codes/docker_build_sphinx.sh

# Add it in makefile :code:`<project>/Makefile`

.. code-block:: console

    docker-html:
    	bash ./scripts/docker_build_sphinx.sh

Template
********

# Create :code:`<project>/requirements.txt`

.. code-block:: console

    Sphinx>=1.8.5
    sphinx-rtd-theme>=0.4.3

# Change Theme in :code:`<project>/source/conf.py`

.. code-block:: console

    html_theme = 'sphinx_rtd_theme'

# Abd be sure to custom it

.. code-block:: console

    html_static_path = ['_static']
    html_css_files = [
        'css/custom.css',
    ]

# Create file to custom css :code:`<project>/source/_static/css/custom.css`

.. code-block:: css

    .wy-nav-content {
        max-width: 90%;
    }

# Make :code:`toc.rst` file

.. literalinclude:: ./codes/toc.rst.inc

# Include :code:`toc.rst` file in :code:`index.rst`
# Create pages dir :code:`mkdir source/pages`

Don t forget
************

# Add build in :code:`.gitignore`

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.08.04 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
