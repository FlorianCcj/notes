***********
Python-doc
***********

``
def foo():
    """
        Docstring d'une ligne.
    """
``

``
def foo():
    """
        Résumé de la docstring de plusieurs lignes.

        Contenu détaillé de la doctstring.
        Contenu détaillé de la doctstring.
        Contenu détaillé de la doctstring.
    """
``

``
>>> def foo():
...     """
...         Can foo a bar with ease
...     """
...     pass
...
>>> foo.__doc__
'\n        Can foo a bar with ease\n    '
>>>
``

``
balise a disposition
:param arg1: description
:param arg2: description
:type arg1: type
:type arg1: type
:return: description de la valeur de retour
:rtype: type de la valeur de retour

:Example:

Un exemple écrit après un saut de ligne.

.. seealso:: Référence à une autre partie du code
.. warning:: Avertissement
.. note:: Note
.. todo:: A faire
``

``
#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
    The ''obvious'' module
    ======================

    Use it to import very obvious functions.

    :Example:

    >>> from obvious import add
    >>> add(1, 1)
    2

    This is a subtitle
    -------------------

    You can say so many things here ! You can say so many things here !
    You can say so many things here ! You can say so many things here !
    You can say so many things here ! You can say so many things here !
    You can say so many things here ! You can say so many things here !

    This is another subtitle
    ------------------------

    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


"""

def add(a, b):
    """
        Adds two numbers and returns the result.

        This add two real numbers and return a real result. You will want to
        use this function in any place you would usually use the ``+`` operator
        but requires a functional equivalent.

        :param a: The first number to add
        :param b: The second number to add
        :type a: int
        :type b: int
        :return: The result of the addition
        :rtype: int

        :Example:

        >>> add(1, 1)
        2
        >>> add(2.1, 3.4)  # all int compatible types work
        5.5

        .. seealso:: sub(), div(), mul()
        .. warning:: This is a completly useless function. Use it only in a
                      tutorial unless you want to look like a fool.
        .. note:: You may want to use a lambda function instead of this.
        .. todo:: Delete this function. Then masturbate with olive oil.
    """
    return a + b
``

``
Pour les todos
# TODO: un truc à faire

    Je pense que vos TODO n’ont rien à foutre dans la doc.
    Il faut mieux avoir un TODO le plus proche du truc qu’il doit modifier. Le mettre en haut de la fonction n’a pas toujours de sens.
    De très nombreux outils et services détectent ce format automatiquement et en font quelque chose d’utile.
``