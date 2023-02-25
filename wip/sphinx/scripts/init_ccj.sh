#!/bin/bash
# file in sphinx/scripts/init_ccj.sh
# launch script from sphinx: bash ./scripts/init_ccj.sh

content_file="./source/toc.rst"
docker_buid_script_file="./scripts/docker_build_sphinx.sh"
dockerfile="Dockerfile"
gitignore_file=".gitignore"

rm ${docker_buid_script_file};
cat >> ${docker_buid_script_file} <<EOL
#!/bin/bash

rm -rf build
docker build -t sphinx-build .
container_name="\$(date +"%s")"
container_id=\$(docker run --name="sphinx-build-\${container_name}" --rm -it -d -e USER_ID=\$UID sphinx-build bash)
docker cp \${container_id}:/doc/build \$(pwd)
docker stop \$(docker ps -aq -f name=sphinx-build-\${container_name})

EOL

mkdir ./source/pages;
touch ./source/pages/.gitkeep;

rm ${content_file};
cat >> ${content_file} <<EOL

.. toctree::
   :maxdepth: 3
   :caption: Table of Contents
   ..:numbered:

   pages/page1.rst
   .. ajouter les autres fichiers
   .. fichier.rst
   .. test.rst
EOL


rm ${dockerfile};
cat >> ${dockerfile} <<EOL
FROM ddidier/sphinx-doc
COPY . .
RUN make html

EOL

rm ${gitignore_file};
cat >> ${gitignore_file} <<EOL
build/
EOL

echo "-------------------------------------"
echo "changer dans source/conf.py html_theme = 'classic'"
echo "changer dans source/index.rst include"
echo "ajouter dans Makefile docker-html:"
echo "       bash ./scripts/docker_build_sphinx.sh"
