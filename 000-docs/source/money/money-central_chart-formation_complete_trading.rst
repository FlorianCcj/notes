Money - Central Chart - formation complete trading
##################################################

1. Comprendre les marches financiers
====================================

1.1. Quels sont les mécanismes d'exécution d'un ordre de Bourse?
----------------------------------------------------------------

* Courtier: permet de passer des ordre d achat ou de vente sur differentes classes d actif
* Ordre:

    * l instrument financier traite: un futur, cfd, action, ...
    * sens de l operation (achat ou vente)
    * quantite offerte ou demandee
    * type d order: ordre marche, a court limite, ordre stop, ...

* le future:

    * marche organise: marche officiel comme la bourse de paris
    * courtier passe l ordre a une entreprise de marche (exemple euronext)
    * le marche le met sur un carnet d ordre
    * l ordre sera execute quand il y aura une contrepartie: si vous vendez un titre a 100e il faut qu il y ai un vendeur a 100e
    * la chambre de compensation traite les ordres

* cfd:

    * marche de gre a gre
    * contrat directement avec le courtier
    * c est le courtier qui gere tout en interne
    * le courtier se place a l oppose de votre tread l ordre est sur d etre execute

* carnet d ordre: regroupe l ensemble des ordres d achat ou de vente sur un titre

1.2. Comprendre les CFDs à risque limité
----------------------------------------

* CFD

    * speculer a la hausse ou a la baisse sans frais supplementaire
    * trader tous les actif via une seule platform
    * acces a de l effet de levier
    * cout de transaction tres faible
    * assurance de voir votre ordre execute

* CFD a risque limite

    * de la famille des produits derives
    * replique l evolution du cours de l actif auquel il est lie (actf sous jacent)
    * simple contrat entre vous et votre courtier (pas de detention physique de l actif -> pas de dividende, droit de vote)
    * vous payez et recevez la difference de cours entre l ouverture et la cloture de position
    * privilegiez des courtiers bien regules qui ne jouent pas contre vous (exemple IG, partenare de PRT)
    * limiter le risque pris par les traders sur le marche (oblige les stop loss)

        * stop loss garanti (en temps normal c est juste un ordre de vente)
            
            * extra spread

        * stop loss obligatoire
        * stop loss bloque

1.3. Comprendre les futures
---------------------------

* future: contrat negocie sur un marche organise definissant:

    * un sens
    * une date d echeance
    * un prix
    * une quantite
    * un sous jacent

* Pourquoi le sous jacent (court cash) et le future difere:

    * le taux d interet (si > 0  => future > cash, si < 0  => cash > future)
    * le dividende

* a date d echeance cash = future
* date d echance commune: trimestriel (3, 6, 9 12), le 3 vendredi du mois, mensuel
* a echeance la position est ferme

    * si on attend l echeance

        * marge immobilise inutilement pendant un temps
        * possibilite de livraisont physique du sous jacent

    * cloturer avant echeance

        * possibilite d ouvrir une nouvelle position

* avantages

    * cotation sur un marche reglemente
    * acces au carnet d ordre
    * acces a de l effet de levier
    * frais de transaction faible

1.4. Le spread sur CFD à risque limité et futures
-------------------------------------------------

* spread: difference entre cours d achat (ask) et le cours de vente (bid)
* Le spread est influencer par

  * la liquidite: plus il est liquidite plus le spread est faible
  * la volatilite: plus il est volatile plus le spread est eleve
  * type d instrument: sur cfd > sur les futures

* cours d achat: meilleur prix auquel un vendeur est pret a vendre
* cours de vente: meilleur prix auquel un acheteur est pret a acheter
* le cours d achat ne peut pas etre superieur au cours de vente
* le spread de marche: ecard entre la meilleur offre et la meilleur demande ne descend jamais en dessous du pas de cotasion (cotassion offisiel)
* le spread de courtier: spread de marche + ecartement potentiel du spread appliquer par le courtier
* pas de cotasion: ecard minimum imposer entre l offre et la demande

Pour avoir un cout nulle, dans un spread de courtier il va falloir que la variation du prix soit de la valeur du spread, alors que pour un spread de marche, il suffit qu un acheteur se place en opposition avec vous.

1.5. Qu'est ce que l'effet de levier et comment le calculer?
------------------------------------------------------------

* Effet de levier: pret accorde par votre courtier
* si vous utilisez l effet de levier, vos gains et pertes sont multiplier
* taille de position pour une actions = cours de l actif * quantitee achetee ou vendue
* taille de position pour un indice = cours de l actif * valeur du point
* effet de levier = taille de votre position / capital disponible sur votre compte
* la taille minimum sur les indices est importante

1.6. Qu'est ce que la marge ou couverture?
------------------------------------------

marge = marge requise, marge utilisee, ou couverture
marge disponible = le disponible avant l appel de marge

Somme dont on doit disposer sur un compte pour prendre position.
Garantie contre un solde negatif

1.7. Comparaison entre CFD à risque limité et futures sur indices
-----------------------------------------------------------------

cfd a risque limite pour:
* ceux souhaitant des niveaux de stops garantis
    * stop loss obligatoire
    * deplacement uniquement dans le sens du trade
* swing traders
    * protection contre les gaps d ouverture
    * pas besoin d echeance
* les days traders
    * pas de cotation reduit (spread)
* ceux souhaitant traders des petites position
    * marge plus faible

1.8. Les différents types d'ordres de bourse
--------------------------------------------

* ordre au marche

  * execute sur sa totalite
  * prioritaire
  * prix d achat ou vente connu lors de l execusion

* ordre limit

  * maitrise du cours d execution
  * indication d un prix max a l achat
  * indication d un prix min a la vente
  * execution partielle selon les stock

* ordre a la meilleur limite

  * ne pas s exposer a un trou de cotation
  * execution limitee a la meilleure offre ou demande
  * execution partiel selon les stock

* ordre stop ou a seuil de declenchement

  * placez un seuil d execution
  * fixer un prix min a l achat ou max a la vente
  * cours d exec non connu
  * ordre au marche declenche

* ordre a plage de declenchement

  * l ordre qui est declenche au niveau du seuil est un ordre limit
  * fixer une borne seuil et une limite

1.9. Comment faire de la vente à découvert? 
--------------------------------------------

VAD: vente a decouvert
SRD: service de reglement differe
cfd a risque limite > SRD

2. A la découverte de l'analyse technique
=========================================

2.1. Les chandeliers japonais: une mine d'informations
------------------------------------------------------

un chandelier = une periode de temps
indique
* cours d ouverture
* cours d de cloture
* plus haut
* plus bas
* les meches sont appeler ombre

chandelier sans ombre (doji) => chance de retournement

figure
* https://www.centralcharts.com/fr/gm/1-apprendre/7-analyse-technique/28-chandeliers-japonais

2.2. Savoir identifier la tendance
----------------------------------

2.3. Comment tracer les résistances et supports
-----------------------------------------------

2.4. Trader les figures chartistes
----------------------------------

throwback/pullback: verification d une figure

figure de retournement
""""""""""""""""""""""

* L ete ou etei (epaule tete epaule (inverse)): 
    * une petite bosse, une grosse bosse, une petite bosse, un throwback, puis redessent
    * lors d un ete remontant le prix remontera au minimum de la difference entre le seuil de la tete et la resistance des epaules
* le biseau ascendant ou descendant
    * les courbes doivent contacter au minimum trois fois
    * puis lors du break il y aura un pullback qui touchera le seuil
    * l objectif est le premier seuil ou la premiere resistance du biseau
* double bottom ou double top
    * avec un throw/pullback apres puis retournement
    * objectif doubler la difference seuil resistance du double

figure de continuation
""""""""""""""""""""""

* canal haussier/baissier: range mais montant descandant
* drapeau: comme un canal, plus court et dans le sens conraire de la tendance
* fanion: comme un drapeau

figure chartiste
* https://www.centralcharts.com/fr/signaux-de-trading/ts_4-france-actions--sc_2-central-patterns
* https://www.centralcharts.com/fr/gm/1-apprendre/7-analyse-technique/27-figure-chartiste

2.5. Utilisation des indicateurs techniques
-------------------------------------------

Un indicateur
* mesure la qualite de la tendance
    * moyenne mobile
    * macd
    * point pivot
* repere les zones de retournement
    * rsi ou stostochastique
    * zone de sur achat ou de sur vente
    * detecte creux ou sommets
    * ne donne pas d objectif de cours precis
* identifie un exces
    * bande de bolinger oumomentum
    * indicateur tres reactif
    * permette de juger la force du mouvement
    * offre peu de signal d acaht ou de vente

un indicateur ne repond qu a une seule de ses fonctions

2.6. Comment identifier les creux et sommets?
---------------------------------------------

regarder les dojis et le dojis imparfaits

si un doji apparait (dans le sens de la tendance ou a ombres egales) alors c est un signal de retournement
la confirmation se fait avec le chandelier suivant

si, sut une portion de temps donne, les plus haut et bas sont dans le sens contraire a la tedance, c est une divergence

une divergence in dique un potentiel retournement

les bandes de bolinger permettent de donner un signal d achat ou de vente
si le cours sort de la bande puis la reintegre alors c est un signal

le rsi donnera une indication si on est en zone de sur achat ou de survente

2.7. D'un graphique vierge à une analyse technique 
---------------------------------------------------

3. Money management
===================

3.1. Le ratio rendement/risque et le pourcentage de trades gagnants
-------------------------------------------------------------------

ratio rendement/risque
rendement = nombre de points entre votre prix d entree et objectif de cours
risque = nombre de points entre prix d entree et stop loss

choisir un ratio rendement minimum

ratio rendement/risque global = gain moyen/perte moyenne
si gain moyen/perte moyenne < 1 ... est ce que le traading est fait pour vous ?

3.2. L'importance du stop loss
------------------------------

le stop loss permet de proteger sa perte ou son gain

- definir votre risque max en % (combien vous misez)
- definir votre risque sur le trade (eccard de l entree et du SL * cours du point)
* comparer les 2
* si risque max en % > risque sur le trade => prendre position
* si risque max en % < risque sur le trade => reduire la taille de la position

3.3. Comment déterminer la taille de votre position?
----------------------------------------------------

generalement on ne mise pas plus de 2%
les debutants, mieux a 1%

taille de position = cours * valeur du points

3.4. Le drawdown: Un indicateur de risque majeur
------------------------------------------------

drawdown: perte maximal historique entre un point bas et un point haut sur un compte sur une periode.

Ex 4 trade
- -100
- +50
- -200
- +300

drawdown =
trade 1: -100
trade 2: -50 (-100+50)
trade 3: -250 (-50-200)
trade 4: 0 (-250+300) (ne peux pas etre >0)

le drawdown est de -250e, vous avez risquer 250e pour gagner 50e

un bon drawndown
- il ne doit jamais etre superieur a la perf de votre compte de trading sur une periode donnee sinon changer de strat
- regarder le rapport perf/drawdown max

3.5. Le profit factor pour mesurer la qualité de votre trading
--------------------------------------------------------------

profit factor ou ratio gain perte

profit factor = la somme des gains/la somme des pertes

sur la periode que vous souhaitez, le plus fiable est sur l integralite de vos trades

un bon trader est > 2

3.6. Les règles de gestion du risque 
-------------------------------------

1. Ne pas perdre d argent, faire du + c est cool mais si vous faites du - vous perdez votre outils de travail
2. envisager la moins value comme un fait et la plus value comme une possibilite
3. Definir un seuil de perte max par jour/semaine/ mois (pour eviter les coups d emotions)
4. Definir ses propres regles de gestion du risque. Ce qui est valable pour quelqu un n est pas forcement vrai pour vous

4. Définir sa stratégie de trading
==================================

4.1. L'importance du compte démo
--------------------------------

4.2. Comment choisir l'unité de temps sur vos trades?
-----------------------------------------------------

Timeframe: unité de temps

Moins on a de temps a y concacrer plus la timeframe doit etre grande
Attention il est necessaire de suveiller cotre trade a la fin de chaque timeframe

Si petit capitale: petite timeframe

4.3. La méthode de Dow: une stratégie de swing trading
------------------------------------------------------

Methode de swing trading
Prise de position a chaque cassure de sommet 
avec stop loss au niveau du precedent

bonne perf dans unmarche en tendance

4.4. A la découverte du scalping
--------------------------------

Une session < 30 min
Ne depend pas de la tedance

* Utiliser des outils techniques que vous maitriser

4.5. La technologie au service de votre trading
-----------------------------------------------

* proscreener: scan complet du marche en fonction de critere de recherche
* scanner de detection central charts
    * central patern: scanner de figure chartiste
    * central candlesticks: chandelier japonais
    * central indicator: indicateur technique
    * central gap: gap d ouverture
    * central volume: volume anormaux
    * central records: records historiques
* analyse publier sur central charts

4.6. Faut-il trader les annonces économiques?
---------------------------------------------



4.7. Peut-on copier une stratégie de trading?
---------------------------------------------

4.8. Les etapes d'un trade
--------------------------

4.9. Trader les crypto monnaies 
--------------------------------

5. Méthode du "Trading à sens unique"
=====================================

5.1. Méthode du trading à sens unique
-------------------------------------

5.2. Trading à sens unique - Les fondamentaux
---------------------------------------------

5.3. Trading à sens unique - La tendance
----------------------------------------

5.4. Trading à sens unique - Les signaux 
-----------------------------------------

6. Psychologie dans le trading
==============================

6.1. Les emotions: le pire ennemi du trader
-------------------------------------------

la peur: la peur de perdre de l argent
    * l argent est l outil de travail
    * refus de prendre ses pertes
* la frustration
    * engendre la colere
* la deprime
    * perte de confiance en soi
    * doute de strategie
        * paralysie
        * augmentation du levier
        * perte totale du capitale
* la panique
    * suite a un mouvement brutal imprevu
    * le trader devient passif
* l euphorie
    * intervient suite a une serie de trades gagnant
    * exces de confiance

6.2. Passage du compte démo au compte réel
------------------------------------------

6.3. Comment réagir face à une lourde perte?
--------------------------------------------

Comprendre l emotion qui a casser les pieds
comprendre les principes de money management non respectee

areter de trade, le temps que l enervement retombe
chercher a retrouver sa routnie

6.4. L'importance de la discipline dans le trading
--------------------------------------------------

6.5. Devenir trader c'est être un chef d'entreprise
---------------------------------------------------

6.6. Surmonter un blocage psychologique
---------------------------------------

6.7. Faut-il définir des objectifs de gains dans son trading?
-------------------------------------------------------------

7. Comment choisir son courtier?
================================

7.1. Qu'est qu'un courtier bien régulé?
---------------------------------------

7.2. Sécurisation des fonds avec les comptes ségrégés
-----------------------------------------------------

7.3. Le poids des frais de transactions dans le trading
-------------------------------------------------------

7.4. Quels sont les avantages du stop garanti?
----------------------------------------------

7.5. Les critères à prendre en compte pour choisir son courtier 
----------------------------------------------------------------

8. Devenez un trader performant
===============================

8.1. Ne faites pas de trading si vous n'en n'avez pas les moyens
----------------------------------------------------------------

8.2. L'effet de levier n'est pas votre allié
--------------------------------------------

8.3. Ne pensez pas à gagner mais à durer!
-----------------------------------------

8.4. A chaque trader sa stratégie
---------------------------------

8.5. Oubliez les gros coups, cherchez la régularité!
----------------------------------------------------

8.6. Installez une routine dans votre trading
---------------------------------------------

8.7. Un trader en forme, c'est un trader performant
---------------------------------------------------

8.8. Pensez par vous même
-------------------------

8.9. Faites votre auto critique
-------------------------------

8.10. Ne pas être en position, c'est déjà être en position
----------------------------------------------------------

8.11. Le meilleur moyen de trader une news, c'est de ne pas en tenir compte
---------------------------------------------------------------------------

8.12. Apprendre à gagner, c'est apprendre à perdre
--------------------------------------------------

8.13. N'ayez aucune certitude
-----------------------------

8.14. Acceptez d'avoir tord 
----------------------------

9. BONUS: Fonctionnement des cryptomonnaies
===========================================

9.1. La blockchain : fonctionnement et avantages
------------------------------------------------

9.2. Les différents types de crypto-monnaies
--------------------------------------------

9.3. Les solutions actuelles pour investir ou spéculer sur les crypto-monnaies
------------------------------------------------------------------------------

9.4. Introduction aux plateformes de crypto-monnaies
----------------------------------------------------

9.5. Sécurisez vos accès plateforme 
------------------------------------

10. BONUS: Trading sur les cryptomonnaies
=========================================

10.1. Créer un wallet - Clé privée et clé publique de wallet
------------------------------------------------------------

10.2. Acheter des crypto-monnaie (CAS PRATIQUE)
-----------------------------------------------

10.3. Les 10 erreurs à ne pas commenttre sur les crypto-monnaies
----------------------------------------------------------------

10.4. Quelles crypto-monnaies acheter?
--------------------------------------

10.5. Les airdrops de crypto-monnaies 
--------------------------------------
