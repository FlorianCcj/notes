sudo apt-get install -y libqt5printsupport5 libqt5script5 libqt5xml5
sudo apt-get install texlive-full

sudo dpkg -i texmaker_5.0.3_ubuntu_18_04_amd64.deb

pdflatex -synctex=1 -interaction=nonstopmode %.tex

learn moderncv
https://blog.madrzejewski.com/creer-cv-elegant-latex-moderncv/

some moderncv option
https://lataix-sebastien.developpez.com/tutoriels/latex/tutoriel-moderncv/#LI-E

latex cv exemple:
* https://www.latextemplates.com/cat/curricula-vitae




    partie : l'instruction est \part{Titre de la partie} ;
    chapitre : \chapter{Titre du chapitre} ; n'existe pas avec la classe article ;
    section : \section{Titre de la section} ;
    sous-section : \subsection{Titre de la sous-section} ;
    sous-sous-section : \subsubsection{Titre de la sous-sous-section} ;
    paragraphe : \paragraph{Titre du paragraphe} ;
    sous-paragraphe : \subparagraph{Titre du sous-paragraphe}.


Lint

lacheck *.tex
chktex *.tex

http://www.nongnu.org/chktex/ChkTeX.pdf

unwanted spaced => add an empty comment after `{`
Wrong length of dash may have been used => add `-` or `--` before `-`

https://fr.wikibooks.org/wiki/LaTeX/Options_de_mise_en_forme_avanc%C3%A9es#Cadre_et_couleur_du_fond
