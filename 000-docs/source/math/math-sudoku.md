# Math sudoku

- simplet nu: intercection ne resultant qu'a un unique candidat
- TODO: [sudoku toread 1]: https://sudoku129.com/grilles/tips_44.php

## ChatGPT

1. Remplissage des chiffres évidents (Naked Singles) : Identifiez les cases où un chiffre n'est possible que dans une seule cellule en raison des chiffres déjà présents dans la ligne, la colonne et la région.
2. Candidats cachés (Hidden Singles) : Recherchez les candidats potentiels dans chaque cellule en fonction des chiffres déjà placés dans la ligne, la colonne et la région. Si un chiffre n'a qu'une possibilité dans une cellule donnée, placez-le.
3. Paires, triples, et plus (Naked Pairs, Naked Triples, etc.) : Identifiez des groupes de deux, trois, ou plus de cellules dans une ligne, une colonne ou une région qui ne peuvent contenir que les mêmes chiffres. Éliminez ensuite ces chiffres des autres candidats dans ces groupes.
4. Candidats cachés multiples (Hidden Pairs, Hidden Triples, etc.) : Recherchez des chiffres qui sont limités à un petit groupe de cellules, même si ces cellules ont d'autres candidats. Éliminez les autres candidats de ces cellules.
5. Chaînes liées (Chain Techniques) : Utilisez des chaînes de cellules liées par des candidats communs pour éliminer les candidats dans d'autres cellules.
6. Forçage (Forcing Chains) :Identifiez les bifurcations logiques où le placement d'un chiffre spécifique dans une cellule entraîne une série de déductions et permet d'éliminer d'autres candidats.
7. Groupe restreint (Subset) : Identifiez des sous-groupes de chiffres qui ne peuvent apparaître que dans un groupe particulier de cellules. Éliminez ensuite les autres candidats de ces cellules.
8. X-Wing, Swordfish, Jellyfish, etc. : Repérez des configurations spécifiques de candidats qui forment des motifs de X-Wing, Swordfish, Jellyfish, etc., pour éliminer certains candidats dans d'autres parties du puzzle.
9. Backtracking : Si toutes les méthodes ci-dessus échouent, recourez à une approche de force brute appelée backtracking. Essayez différents chiffres dans les cellules et revenez en arrière si une contradiction est atteinte jusqu'à ce que la solution soit trouvée.

## Sudoku.com

from [sudoku.com]

- Last free case: like line, column and squarre
- Last staying case: triplet + blocking
- Last possible number: Intersection
- Nude simplet: Intersection
- Nude pair: exclusive pair
- Nude triplet:like exclusive pair but with 3 number (could be 3 in the case or by pair but 3 cases 1-5, 1-8, 5-8)
- Hidding singleton: Multiple possibility, but the only case where a number can be (to check squarre, line, column)
- Hidding pair: like hiding singleton but with a nude pair
- Hidding triplet: like hiding singleton but with a nude triplet
- Pointing pair: when a number, in a squarre is on the same column or line, you can remove it on the rest of the column or line
- X-wing: if you can create a rectangle with an number as candidate, and this number is the 2 only candidate in the line (resp: column), you can remove it on all the column (resp: line) except the rectangle (can be the same way for squarre)
- Y-wing: like a X-wing but with 3 cases and 3 paires (AB, AC, AB or AB, AC, BC) find the 4th case to the rectangle, remove the candidate present in the 3 case (the exemple have been done with AC, AC, AB it remove A ... TODO: to test)
- Swordfish: WTF, if you have 3 columns with number align 2 by 2, you can remove the other candidate (TODO: to clarify)

## Source

- [TODO: Extend X-Wing (Swordfish)]
- [Good exemple for X-Wing]
- [Technique de base]
  - Line
  - Column
  - Squarre
  - Triplet
  - Blocking
  - Intersection
  - Exclusive pair
- [Traduction Mathematique du sudoku]
- [Top Sudoku]
  - Base - inclusive methode
  - Base - exclusive methode
  - Base - exclusive pair
  - Base - exclusive triplet
  - Indirect -  X-Wing (vertical/horizontal)
  - Pseudo - Multiple choice

[sudoku toread 1]: https://sudoku129.com/grilles/tips_44.php
[TODO: Extend X-Wing (Swordfish)]: https://sudoku129.com/grilles/tips_42.php
[Good exemple for X-Wing]:https://sudoku129.com/grilles/tips_41.php
[sudoku.com]: https://sudoku.com/fr/regles-du-sudoku
[Technique de base]: https://www.youtube.com/watch?v=w4ROAs0MfBQ
[Top Sudoku]: https://www.top-sudoku.com/sudoku/fr/techniques-de-resolution.php
[Traduction Mathematique du sudoku]: https://accromath.uqam.ca/2014/02/jouer-efficacement-au-sudoku/
