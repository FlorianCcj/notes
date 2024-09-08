Microsoft - Excel
##################

Functions
**********

recherchev
===========

recherchev avec valeur proche
==============================

sierreur
=========

index equiv/index equiv equiv
==============================

somme.si.env
=============

si
===

Auditer une formule avec f9
============================

Sommeprod
==========

Make today day conditionnal formal
-----------------------------------

=B4=1*TEXT(TODAY(),"d")

Extract only Friday
--------------------

=INDEX('Before_2022.11-step/weight'!$A3:$E999, SMALL(IF((INDEX('Before_2022.11-step/weight'!$A3:$E999, , 2)="F"), MATCH(ROW('Before_2022.11-step/weight'!$A3:$E999), ROW('Before_2022.11-step/weight'!$A3:$E999)), ""), ROWS($A$47:A47)), COLUMNS('Before_2022.11-step/weight'!$A$1:A1))

=INDEX('step/weight'!$A3:$E999, SMALL(IF((INDEX('step/weight'!$A3:$E999, , 2)="F"), MATCH(ROW('step/weight'!$A3:$E999), ROW('step/weight'!$A3:$E999)), ""), ROWS($A$47:A47)), COLUMNS('step/weight'!$A$1:A1))

=INDEX('step/weight2'!$A3:$E999, SMALL(IF((INDEX('step/weight2'!$A3:$E999, , 2)="F"), MATCH(ROW('step/weight2'!$A3:$E999), ROW('step/weight2'!$A3:$E999)), ""), ROWS($A$47:A47)), COLUMNS('step/weight2'!$A$1:A1))

=INDEX('step/weight'!$A3:$C999, SMALL(IF((INDEX('step/weight'!$A3:$C999, , 2)="F"), MATCH(ROW('step/weight'!$A3:$C999), ROW('step/weight'!$A3:$C999)), ""), ROWS($A$47:A47)), COLUMNS('step/weight'!$A$1:A1))

=INDEX('step/weight'!$A3:$C999, SMALL(IF((INDEX('step/weight'!$A3:$C999, , 2)=Config!$B$3), MATCH(ROW('step/weight'!$A3:$C999), ROW('step/weight'!$A3:$C999)), ""), ROWS($A$48:A48)), COLUMNS('step/weight'!$A$1:A1))

=INDEX(
  'step/weight'!$A3:$E999,
  SMALL(
    IF(
      (
        INDEX('step/weight'!$A3:$E999, , 2)="F"
      ),
      MATCH(
        ROW('step/weight'!$A3:$E999),
        ROW('step/weight'!$A3:$E999)
      ),
      ""
    ),
    ROWS($A$47:B47)
  ),
  COLUMNS('step/weight'!$A$1:B1)
)
