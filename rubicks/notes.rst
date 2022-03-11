*******
Rubicks
*******

source: Tuto de Victor Colin

* Debutant
    * Tutoriel - Résoudre le rubik's cube (solution complète pour débutants)
    * 01-bis-Tutoriel méthode &quot;débutant&quot; - compléments de l&#39;étape 8
    * Rubik&#39;s cube 3x3 - les notations internationales
    * Rubik's cube - aller plus vite avec la méthode pour débutants
* Intermediaire
    * Tutoriel - Résoudre les F2L intuitivement
    * Rubik's cube - Méthode intermédiaire (fridrich simplifiée)
* Pro
    * Tutoriel - Améliorer la croix du 3x3
    * Tutoriel F2L avancés

1 ok {
2 in nok
2 out R
2 out F
}
1 in nok R {
2 out R
2 out F
}
1 in nok F {
2 out R
2 out F
}
2 in ok {
1 in nok R
1 in nok F
1 out R
1 out F
1 out U
}
2 in nok {
1 in nok R
1 in nok F
1 out R
1 out F
1 out U
}
03 Aller plus vite avec la méthode pour debutant (pour passer sub60 {
	- avoir un bon rubiks (lubix.com : dayan zanshi, guyon v2, etc)
	- pour U et U' bien utiliser les index et pas toute la main
	- maitriser les formule ET leur symétrique
	
	- lors que l'on fait la premiere courone, la garder en dessous (vers le bas)
	- etre capable de positionner les aretes meme si elles sont sur la 2e couronne
	- les coins, le positionner au dessus (conciderons que l'on est en haut a droite)
		- si il est sur la droite RUR'
		- si il est en face URU'R'
		- au dessus RU2R'U'RUR'
		
	- La 2e courone, le belge plutot que de faire la face, tourner le rubik (6e mouveement) (URU'R'U'F'UF => URU'R'U'ZLUL')
	
	- la croix du dessus
		- si ligne : la prendre parallele a soit F(RUR'U')F'
		- si L, le mettre un coté vers soit un coté a droite : f(RUR'U')f'
		- si point : enchainer les 2 formule si dessus
}

04-Les F2L intuitivent {
	- La croit blanche doit etre deja faite et en bas
	- le coin face a soit a droite a resoudre, celui a placé positionné a sa verticale
	
	Cas de base :
		cas pouvant etre resolu en 3 mouvement
		- le coin et l'arete sont sur la face F en haut a gauche avec les couleurs adjacentes RU'R'
		- le coin et l'arete sont sur la face F en haut a droite avec les couleurs adjacentes (ZU')L'UL (ZU pour la praticité)
		- coin a droite arete en face avec la couleur de face du coin etant la meme que celle du dessus de l'arete RUR'
		- coin de face arete a gauche (Z') L'U'L
		
	La face vers le haut
		- l'arete 2e a l'envers RU'R' U L'UL
		- l'arete 2e bien placé 3* sexy move : (RUR'U')3
		
		- 3e et non adjacente au coin il faut la placer au dessus de sa couleur lever l'emplacement libre (lock de l'arete), amener le coin au dessus puis redescendre
		
		- 3e adjacente couleur differente (arete a droite) RU2R' (lock l'arete pour bouger le coin)
		- 3e adjacente couleur identique (arete a droite) U'RU'R' (lock coin pour bouger l'arete) on se retrouve sur une situation connu
		
	la face face a nous
		- 2e ligne en place : U'RU'R'
		- 2e ligne a l'envers : U'RUR'
		
		- 3e non adjacente couleur identique : blocage du coin arete a coté
		- 3e non adjacente couleur différente: cas de base ou bloque le coin et unquart de tourcar de tour
		
		- 3e adjacente droite couleur identique : cas de base
		- 3e adjacente  droite couleur différente: lock coin arete 2 mouv
		
		- 3e adjacente face couleur identique : lock arete U
		- 3e adjacente face couleur différente: lock coin et move a gauche
		
	face a droite :
		- 2e ligne ok, lock coin, arete a cote
		- 2e ligne nok, lock coin, arete a l'opposé d'a coté
		
		- 3e ligne non adjacent dessus differents : cas de base lock coin et U
		- 3e ligne non adjacent dessus pareil : lock coin place arete a cote
		
		- 3e ligne adjacent droite : lock coin puis U' ou lock arete et U'
		- 3e ligne adjacent dessus pareil : lock coin place arete a cote
}
05-Methode intermediaire fridrich simplifier {
	Les 7 OLL : oll cross ou 2look oll
		   YY
		   XX GG XX YY
		   GG GG GG		- R U R' U R U2 R'
		   GG GG XX
		         YY
		
		YY XX GG GG
		   GG GG GG		- R U2 R' U' R U' R'
		   XX GG XX YY
		   YY
		
		   GG GG GG
		   GG GG GG		- R2 D R' U2 R D' R' U2 R'
		   XX GG XX
		   YY    YY
		
		   GG GG GG
		   GG GG GG		- x' R U R' D R U' R' D'
		YY XX GG XX YY
		
		   YY
		   XX GG GG
		   GG GG GG		- x' R U' R' D R U R' D'
		   GG GG XX YY
		
		   YY    YY
		   XX GG XX
		   GG GG GG		- F (R U R' U') (R U R' U') (R U R' U') F'
		   XX GG XX
		   YY    YY
		
		         YY
		YY XX GG XX
		   GG GG GG		- R U2 R2' U' R2 U' R2' U2 R
		YY XX GG XX
		         YY
		

	Les 4 PLL :
		- arete horaire (la face face a soit ne bouge pas): R' U R' U' R' U' R' U R U R2'
		- arete antihoraire (la face face a soit ne bouge pas): R2 U' R' U' R U R U R U' R
		
		- coin horaire : x R' U R' D2 R U' R' D2 R2
		- coin anti horaire : x R2' D2 R U R' D2 R U' R
}

Ameliorer la croix {
	en place mais a l'envers : R'uR'u'
}

F2L avance {
	Mouvement a connaitre et s'entrainer a fond
	sexy move : RUR'U'
	sexy move gauche : L'U'LU
	sleatchemeur : R'FRF'
	sleatchemeur gauche : LF'L'F
	
	
	Partie 1, deconjugaison intelligente {
		Lorsqu'une arete est en 2e ligne, reflechir a comment la sortir pour faire un cas de base le plus rapidement possible
	}
	
	Partie 2, Insertions sous differents angles {
		ne plus faire aucun Y2, s'entrainer a les entrer sans retourner le cube
	}
	
	Partie 3, Utilisations des slots libres {
		quand les f2l ne sont pas encore fait, inutile de se placer au dessus du coin pour ressoudre la f2l
	}
	
	Partie 4, Eviter les rotations y et y'' {
		
	}
	
	Partie 5, Cas ou l arete et les coins sont conjugués {
		
	}
	
	Partie 6, Debuter avec le Xcross {
		
	}
	
	Partie 7, Supprimer certains regrips {
		
	}
	
	Partie 8, Améliorer son look ahead {
		
	}
	
	Partie 9, Complements sur le look ahead {
		
	}
	
	Partie 10, Debuter avec le multislotting {
		
	}
}