sudo apt-get install -y libqt5printsupport5 libqt5script5 libqt5xml5
sudo apt-get install texlive-full

sudo dpkg -i texmaker_5.0.3_ubuntu_18_04_amd64.deb

pdflatex -synctex=1 -interaction=nonstopmode %.tex
