# Site vitrine — Ameriack I.T. Solutions

Site public de la suite Ameriack : PaieGabon, États Financiers, Caisse, Projets et Ops.
Page statique, servie sur https://www.ameriack.com (aucun serveur d'application, aucun traceur).

## Fichiers
- `index.html` : la page.
- `assets/site.css`, `assets/site.js` : styles et menu mobile.
- `assets/brand/` : identité Ameriack I.T. Solutions (logo, logo inversé, symbole, favicon, icônes, image de partage 1200×630).
- `assets/apps/` : symboles des cinq logiciels (repris de chaque application).
- `assets/fonts/` : Fraunces et IBM Plex Sans, hébergées sur le site (licence SIL OFL).
- `site.webmanifest`, `robots.txt`, `sitemap.xml`.

## Identité
Même famille que les logiciels : vert #0F3D36, crème #FAF8F2, or #E9B043, brun #7A5200 ;
Fraunces 600 pour les titres, IBM Plex Sans pour le texte. Symbole : un A tracé d'un trait, barre or.

## Mise à jour
Modifier, commit, push. Sur le serveur : `git pull` dans le dossier du site (pas de redémarrage).
Après une modification de `site.css` ou `site.js`, changer `?v=…` dans `index.html` pour forcer le rechargement.

## Téléchargements Windows
Liens GitHub Releases (v1.0.0) dans la section « Applications Windows » de `index.html`.

© 2026 Ameriack I.T. Solutions — Franceville, Gabon
