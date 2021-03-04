Réaliser un puissance4 sur framework Angular 10.x (ivy) et Angular Material 10.x.

- Intégration HTML5 (syntaxe BEM) + SCSS.
- Gestion du responsive et des animations: les utilisateurs doivent pouvoir jouer sur leur mobile.
- Mise en place des composants, services, directives en lien avec la logique du jeu.
- L'utilisation de store(s) via ngxs est également requis.
- Documentation du code.

L'utilisation de librairies/frameworks tierces est entièrement libre.
Aucune IA n'est présente, chaque joueur joue l'un après l'autre.

Bonus:

- Préférences utilisateurs: gestion de thèmes (mode dark / light) selon la logique material design.
- Mise en place de tests unitaires et/ou end to end (cypress).
- Animation(s) SVG.
- i18n/a11y friendly.
- Compatibilité ie11.

Règles du jeu:

Le but du jeu est d'aligner une suite de 4 pions de même couleur sur une grille comptant 6 rangées et 7 colonnes. 

Chaque joueur dispose de 21 pions d'une couleur (par convention, en général jaune ou rouge). Tour à tour les deux joueurs placent un pion dans la colonne de leur choix, le pion coulisse alors jusqu'à la position la plus basse possible dans la dite colonne à la suite de quoi c'est à l'adversaire de jouer.

Le vainqueur est le joueur qui réalise le premier un alignement (horizontal, vertical ou diagonal) consécutif d'au moins quatre pions de sa couleur. Si, alors que toutes les cases de la grille de jeu sont remplies, aucun des deux joueurs n'a réalisé un tel alignement, la partie est déclarée nulle.