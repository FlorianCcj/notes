:source: http://openalea.gforge.inria.fr/doc/openalea/doc/_build/html/source/sphinx/rest_syntax.html

**************************
_rst_tutorial: Decoration
**************************

``
*italic*
**bold**
``

``
This ``*`` character is not interpreted
``

``
This is how to create hyperlinks (see later)  `OpenAlea wiki <openalea.gforge.inria.fr>`_
``

*******
Heading
*******

Two rules:
        use at least as many characters as the length of the title
        characters usage is quite flexible but be consistent

``
*****
Title
*****

subtitle
########

subsubtitle
***********
and so on
    # with overline, for parts
    * with overline, for chapters
    =, for sections
    -, for subsections
    ^, for subsubsections
    “, for paragraphs
``

**********
Directive
**********

``
.. <name>:: <arguments>
    :<option>: <option values>

    content
``

Exemple:
.. image:: ../images/test.png
    :width: 200pt

*****
.. _test: Link
*****

``
Link
`<http://www.python.org/>`_

Link with label
`Python <http://www.python.org/>`_

Link to title
`Heading`_
``

``
Add id
.. _rst_tutorial: hi

Link to id
rst_tutorial_
:ref:`rst_tutorial`_
``

******
List
******

``
* This is a bulleted list.
* It has two items, the second
  item uses two lines. (note the indentation)

1. This is a numbered list.
2. It has two items too.

#. This is a numbered list.
#. It has two items too.


#. Finaly this one don t continue the number.
#. Yeah.

``

******
Codes
******

``
.. code-block:: html
    :linenos:

    <h1>code block example</h1>
``

``
This is a simple example:
::

    import math
    print 'import done'
``

includes code s file
``
.. literalinclude:: filename
    :linenos:
    :language: python
    :lines: 1, 3-5
    :start-after: 3
    :end-before: 5
``

*******
Tables
*******

``
+---------+---------+-----------+
| 1       |  2      |  3        |
+---------+---------+-----------+

+---------------------+---------+---+
|1                    |        2| 3 |
+---------------------+---------+---+

+------------+------------+-----------+
| Header 1   | Header 2   | Header 3  |
+============+============+===========+
| body row 1 | column 2   | column 3  |
+------------+------------+-----------+
| body row 2 | Cells may span columns.|
+------------+------------+-----------+
| body row 3 | Cells may  | - Cells   |
+------------+ span rows. | - contain |
| body row 4 |            | - blocks. |
+------------+------------+-----------+

=====  =====  ======
   Inputs     Output
------------  ------
  A      B    A or B
=====  =====  ======
False  False  False
True   False  True
=====  =====  ======
``

Other synthax
##############

``
.. tabularcolumns:: |l|c|p{5cm}|

+--------------+---+-----------+
|  simple text | 2 | 3         |
+--------------+---+-----------+
``

``
.. csv-table:: a title
   :header: "name", "firstname", "age"
   :widths: 20, 20, 10

   "Smith", "John", 40
   "Smith", "John, Junior", 20
``

********************
Include other RST files with the toctree directive
********************

``
.. toctree::
    :maxdepth: 2
    :numbered:
    :titlesonly:
    :glob:
    :hidden:

    intro.rst
    chapter1.rst
    chapter2.rst
``

* maxdepth is used to indicates the depth of the tree.
* numbered adds relevant section numbers.
* titlesonly adds only the main title of each document
* glob can be used to indicate that * and ? characters are used to indicate patterns.
* hidden hides the toctree. It can be used to include files that do not need to be shown (e.g. a bibliography).

``
.. toctree::
    :glob:

    intro*
    recipe/*
    *
``

************
Autodoc
*************

``
def square(a):
    """short description of the function square

    longish explanation: returns the square of a: :math:`a^2`

    :param a: an input argument

    :returns: a*a
    """
    return a*a
``

``
.. currentmodule:: sample
.. autofunction:: square
``

******
Boxes
******

``
.. seealso:: This is a simple **seealso** note.
.. note::  This is a **note** box.
.. warning:: note the space between the directive and the text
.. topic:: Your Topic Title

    Subsequent indented lines comprise
    the body of the topic, and are
    interpreted as body elements.
.. sidebar:: Sidebar Title
    :subtitle: Optional Sidebar Subtitle

    Subsequent indented lines comprise
    the body of the sidebar, and are
    interpreted as body elements.
.. comments
``

***********************
Glossary, index and co
***********************

``
:Whatever: this is handy to create new field
.. glossary::
     apical
        at the top of the plant.
.. index::
``

Footnote
``
Some text that requires a footnote [#f1]_ .

.. rubric:: Footnotes

.. [#f1] Text of the first footnote.
``

::
    ref
    [CIT2002] A citation
              (as often used in journals).

    called
    ..[CIT2002]_

*********
Download
*********

``
:download:`download samplet.py <notes.rst>`
``

*****************
Usefull extension
******************

In the special file called conf.py, there is a variable called extensions. You can add extension in this variable. For instance:

``
extensions = [-
    'easydev.copybutton',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.coverage',
    'sphinx.ext.graphviz',
    'sphinx.ext.doctest',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.coverage',
    'sphinx.ext.pngmath',
    'sphinx.ext.ifconfig',
    'matplotlib.sphinxext.only_directives',
    'matplotlib.sphinxext.plot_directive',
 ]
 ``
