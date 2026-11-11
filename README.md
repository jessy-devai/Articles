# in

Essais indépendants · IA, langage & apprentissage.

Site en ligne : https://jessy-devai.github.io/Articles/

Site statique (HTML, CSS, un peu de JavaScript), sans outil de construction : ce qui est dans le dépôt est exactement ce qui est publié par GitHub Pages.

## Arborescence

```
index.html                  Page d'accueil
404.html                    Page « introuvable »
assets/
  css/in.css                Socle commun : couleurs, typographie, barre de navigation, pied de page
  css/home.css              Page d'accueil
  css/article.css           Pages article (tous les composants de mise en page)
  js/catalogue.js           ← LISTE DES ARTICLES (le seul fichier JS à modifier)
  js/home.js                Accueil : construit les cartes depuis le catalogue
  js/article.js             Articles : vidéos, progression de lecture, « À lire ensuite »
  img/                      Logo, favicon, couverture, image de partage par défaut
articles/
  _modele/                  Modèle d'article (non publié)
  pensez-comme-une-ia/      N°01, septembre 2026
  prisonnier-de-notre-langage/  N°02, novembre 2026
```

Chaque article vit dans son propre dossier, avec ses images. L'adresse de l'article est le nom du dossier, par exemple `…/Articles/articles/prisonnier-de-notre-langage/`.

## Landing et articles : deux gestions séparées

- **Landing** (`index.html`, `assets/css/home.css`, `assets/js/home.js`) : la vitrine. On n'y touche que pour changer le design de l'accueil.
- **Articles** (`articles/<dossier>/`, `assets/css/article.css`, `assets/js/article.js`) : un dossier par essai.
- **Le lien entre les deux** : `assets/js/catalogue.js`. Ajouter un article = un dossier + un bloc dans le catalogue ; l'accueil se met à jour tout seul.
- **Socle commun** (`assets/css/in.css`) : couleurs (vert, turquoise, bleu, dégradé `--grad`), typographie, barre et pied de page.

## Publier un nouvel article

1. **Copier** le dossier `articles/_modele` et le renommer, par exemple `articles/mon-nouvel-article`. Pas d'accents, pas d'espaces, des tirets.
2. **Ouvrir** `index.html` dans ce dossier et remplacer `mon-nouvel-article` par le nom du dossier (Ctrl+H dans VS Code).
3. **Remplir** le titre, la description, le chapeau, la date et le temps de lecture en haut du fichier. Écrire ensuite le texte dans `<article>` avec les composants du modèle (citation, grande question, vidéo à extraits, image défilante…), puis les sources dans « Références ». Les images de l'article vont dans son dossier.
4. **Annoncer** l'article dans `assets/js/catalogue.js` : copier un bloc `{ … }`, le coller en haut de la liste et le remplir.
5. **Publier** depuis VS Code : *Source Control* → message → **Commit** → **Sync Changes**. GitHub Pages met le site à jour en une minute environ.

L'accueil (carte « Dernier essai », liste « Tous les essais », raccourci dans le hero) et les liens « À lire ensuite » se mettent à jour d'eux-mêmes à partir du catalogue.

### Image de partage (facultatif)

Par défaut, un article partagé sur LinkedIn ou ailleurs affiche `assets/img/og-in.jpg`. Pour une image dédiée, ajouter un `partage.jpg` (1200 × 630 px) dans le dossier de l'article et remplacer `assets/img/og-in.jpg` par `articles/<dossier>/partage.jpg` dans la balise `og:image`.

### Vérifier avant de publier

Ouvrir le dossier du dépôt dans VS Code, installer l'extension **Live Server**, faire un clic droit sur `index.html` puis **Open with Live Server**. Le site s'ouvre en local dans le navigateur.

## Accessibilité et compatibilité

- Navigation complète au clavier, lien d'évitement, focus visible, landmarks et titres hiérarchisés.
- Contrastes AA minimum sur fond noir.
- Animations désactivées si le système demande de réduire les animations.
- Vidéos YouTube chargées seulement au clic (sans cookie de suivi avant lecture).
- Effets récents (transitions entre pages, animations liées au défilement) en amélioration progressive : les navigateurs qui ne les gèrent pas affichent simplement le site sans eux.
