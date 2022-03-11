Python - Venv
#############

Venv
****

:code:`sudo apt-get install python-venv`

python -m venv <appli venv name>
. ./<appli venv name>/bin/activate
python -m venv --system-site-packages <appli venv name> # inherit system packages
deactivate

pip freeze > requirements.txt
pip install -f requirements.txt

Pipenv
******

Merge between pip and venv

pip install pipenv
# active autocompletion
cat 'eval "$(pipenv --completion)"' >> ~/.zshrc

pipenv install # create new env
pipenv shell
pipenv --python 3.6
pipenv check

pipenv update
pipenv update --outdated

pipenv install django
pipenv install pylint --dev
pipenv install -r requirements.txt
pipenv uninstall django
pipenv uninstall --all
pipenv uninstall --all-dev

exit
pipenv --rm

add script

.. code-block:: ini
  
    [scripts]
    serve = "python manage.py runserver"

then

:code:`pipenv run serve`

:more:https://pipenv.readthedocs.io/en/latest/advanced/

Virtualwrapper
**************

Desc
====

* centralize venv and associate project
* easy venv management (create, sup, copy)
* easy venv switch
* autocompletion on venv
* venv hook

install
=======

pip install virtualwrapper

export WORKON_HOME=~/.virtualenv
mkdir -p $WORKON_HOME
export PROJECT_HOME=~/pyprojects
mkdir -p $PROJECT_HOME
source /usr/local/bin/virtualwrapper.sh

use
===

# Create an venv
mkvirtualenv project1
pip install django>=1.8
mkvirtualenv project2
cdvirtualenv
pwd
cdsitepackages
pwd
lsvirtualenv -b
workon project2
deactivate
rmvirtualenv project2
