# Sphinx

## Install

### Debian/Ubuntu
apt-get install python3-sphinx

### Centos
yum install python-sphinx

## Update
pip install -U Sphinx

## Check

sphinx-build --version
sphinx-quickstart
make html

## Docker Build

```
cd ..
docker run -it -v $(pwd)/sphinx:/doc -e USER_ID=$UID ddidier/sphinx-doc bash
make html
```

```
rm -rf build
docker build -t sphinx-build .
container_name="$(date +"%s")"
container_id=$(docker run --name="sphinx-build-${container_name}" --rm -it -d -e USER_ID=$UID sphinx-build bash)
docker cp ${container_id}:/doc/build $(pwd)
docker stop $(docker ps -aq -f name=sphinx-build-${container_name})
```


## sources

* http://python.lecoinduprogrammeur.org/2018/02/18/installation_de_sphinx/
* archi sphinx: https://deusyss.developpez.com/tutoriels/Python/SphinxDoc/
* http://espe-rtd-reflexpro.u-ga.fr/docs/sandbox2/fr/latest/syntaxe_sphinx.html
* MOOT: http://pdessus.fr/projets/reflexpro/html/Diasreureflexpro.html#objets-de-la-presentation
* La doc python: http://sametmax.com/les-docstrings/
* faire du sphinx en md: https://www.mkdocs.org/
* ci python: http://www.xavierdupre.fr/app/ensae_teaching_cs/helpsphinx2/notebooks/td1a_unit_test_ci_correction.html

## Init

sphinx-quickstart
in `source/conf.py`:
    html_theme = 'classic'
in `Dockerfile`:
    FROM ddidier/sphinx-doc
    COPY . .
    RUN make html
in `Makefile`:
    docker-html:
        bash ./scripts/docker_build_sphinx.sh
in `scripts/docker_build_sphinx.sh`:
    #!/bin/bash

    rm -rf build
    docker build -t sphinx-build .
    container_name="$(date +"%s")"
    container_id=$(docker run --name="sphinx-build-${container_name}" --rm -it -d -e USER_ID=$UID sphinx-build bash)
    docker cp ${container_id}:/doc/build $(pwd)
    docker stop $(docker ps -aq -f name=sphinx-build-${container_name})
in `source/pages/.gitkeep`: ~
in `source/contents.rst`:
    .. toctree::
        :maxdepth: 3
        :caption: Contents:
        :numbered:

        index.rst
        fichier.rst


ou en resumer copier le fichier scripts/init_ccj.sh
le lancer
complétez en lisant la fin du script
