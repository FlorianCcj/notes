Travis
######

Make github pages with sphinx and Travis
****************************************

On `<Github https://github.com/>`_ :

# Log in to your GitHub account and go into :code:`Settings` > :code:`Developer settings` > :code:`Personal access tokens`
# Click :code:`Generate new token`, add a description, such as Travis token and tick the :code:`repo` checkbox then click :code:`Generate token`.
# Save the token (called it :code:`github-token`).

On `<Travis https://travis-ci.org/>`_ :

# When you click on :code:`Travis CI` on the top left, you will see :code:`Current`, :code:`Branches`, :code:`Build History`, :code:`Pull Request` and :code:`More Options`
# :code:`More Options` > :code:`Settings` -> Environment variables
# Name: :code:`token`
# Value: :code:`<github-token>`
# Click on :code:`Add`

On Your code:

# Create a file :code:`.travis.yml` at the root of your repository.

.. literalinclude:: ./codes/.travis.yml

# commit and push
# enjoy
# You can read more details on `<Github https://github.com/>`_ > :code:`Your repos` > :code:`Settings` > :code:`Github Pages`

Sources
=======

* https://sphinxtechnicalwriting.readthedocs.io/en/latest/cd/config-travis.html