# Site vitrine — Ameriack I.T. Solutions

Site public de la suite Ameriack : PaieGabon, États Financiers, Caisse, Projets et Ops.
Page statique, servie sur https://www.ameriack.com (aucun serveur d'application, aucun traceur).

## Fichiers
- `index.html` : la page.
- `assets/site.css`, `assets/site.js` : styles, menu mobile, onglets des six logiciels (toutes les fiches restent visibles sans script) et arrivée du visuel d'accueil (coupée si « moins d'animations »).
- `assets/visuels/` : rendus 3D (three.js) en WebP, deux tailles chacun. Écrans = vraies captures des logiciels, données de démonstration.
- `assets/brand/` : identité Ameriack I.T. Solutions (logo, logo inversé, symbole, favicon, icônes, image de partage 1200×630).
- `assets/apps/` : symboles des six logiciels (repris de chaque application).
- `assets/fonts/` : IBM Plex Sans et IBM Plex Sans Condensed, hébergées sur le site (licence SIL OFL).
- `site.webmanifest`, `robots.txt`, `sitemap.xml`.

## Identité
Même famille que les logiciels : vert forêt #0F3D36, or #E9B043, fond craie #F3F5F2 ;
IBM Plex Sans Condensed 600 pour les titres, IBM Plex Sans pour le texte. Symbole : un A tracé d'un trait, barre or.

## Mise à jour
Modifier, commit, push. Sur le serveur : `git pull` dans le dossier du site (pas de redémarrage).
Après une modification de `site.css` ou `site.js`, changer `?v=…` dans `index.html` pour forcer le rechargement.

## Téléchargements Windows
Liens GitHub Releases (v1.0.0) dans la section « Applications Windows » de `index.html`.

© 2026 Ameriack I.T. Solutions — Libreville, Gabon
