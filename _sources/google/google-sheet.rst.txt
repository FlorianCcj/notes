Google - Google-Sheet
#####################

Comment faire un format custom par rapport a une cellule
********************************************************

1. Selectionner la plage que l on veut customiser
2. Format -> Conditional Formatting
3. Add another rule
4. Single color
5. Apply to range: normalement deja selectionner, sinon :code:`<first cell>:<last cell>` (exemple :code:`B24:B33`)
6. Format cells if ... : :code:`Custom formula is`
7. value or formula: :code:`=[range first cells]>=[cell to compare]` (exemple: :code:`=$B24>=$B$35`)
7b. Les :code:`$` permettent de fixer la valeur
8. Choisir le formatting a appliquer

Copier le formatting
********************

1. Copier la cellule avec le format que l on souhaite
2. Aller sur la cellule sur laquelle on souhaite reproduire
3. Click droit -> Paste Special -> Paste Format Only (Ctrl + Alt + V)
