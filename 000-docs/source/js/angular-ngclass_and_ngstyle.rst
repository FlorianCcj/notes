Angular - Ngclass and Ngstyle
#############################

Ngclass
*******

NgClass can take the following as input:
* A space-delimited String :code:`[ngClass]="is-info is-item has-border"`
* An Array of Strings :code:`[ngClass]="['is-info', 'is-item', 'has-border'"]`
* An Object :code:`[ngClass]="{'is-info': true, 'is-item': true}`
* Can be pass in a variable :code:`[ngClass]="myClasses"`
* or by ternary statement :code:`[ngClass]="name === 'erxk' ? 'is-author' : 'is-reader'`

Exemple
=======

.. code-block:: js

    <!-- Native Class and Style Attributes -->
    <input class="is-danger my-button" style="border: none; color: blue">

    <!-- Angular class and style Bindings -->
    <input [class.is-danger]="booleanProp" [style.border]="borderProp">

    <!-- ngClass -->
    <input [ngClass]="{'is-danger': booleanProp, 'myButton': true}">
    <input [ngClass]="isDangerButtonClass">

KeyPoint
========

* We can pass a Typescript property/method or write an expression inline to our NgClass Directive
* NgClass can take a String, Array of Strings, or Object Expression as input.
* Under the hood, NgClass is adding/removing classes via :code:`Renderer2` :code:`addClass()` and :code:`removeClass()`
* NgClass appends, it does not overwrite.

Ngstyle
*******

* NgStyle takes a key-value pair object as input.
* NgStyle applies styles and not classes.
* NgStyle will overwrite styles defined by the native style attribute.

Example
=======

.. code-block:: js

    <!-- ngStyle -->
    <input [ngStyle]="{'border': borderProp, 'color': colorProp}">
    <input [ngStyle]="hasColorBorder">

KeyPoint
========

* NgStyle can accept a key-value pair as input, where the key is a valid CSS Style
* NgStyle can be passed input via inline or a Typescript property or method
* NgStyle under the hood utilizes Angular’s Renderer2 to invoke setStyle() and removeStyle()
* NgStyle will overwrite existing styles on the element.
