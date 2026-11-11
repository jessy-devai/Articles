/* ==========================================================================
   in — CATALOGUE DES ARTICLES
   --------------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour qu'un nouvel article apparaisse
   sur la page d'accueil et dans la navigation « article précédent / suivant ».

   Pour publier : copier un bloc { … }, le coller EN HAUT de la liste,
   puis remplir les champs. L'ordre de la liste n'a pas d'importance :
   le site trie automatiquement du plus récent au plus ancien (champ « date »).

     numero    : numéro de l'article (affiché « N°03 »)
     dossier   : nom du dossier dans /articles/ (= l'adresse de la page)
     titre     : titre complet
     chapo     : une ou deux phrases d'accroche
     rubrique  : petite étiquette au-dessus du titre
     date      : "AAAA-MM" (sert au tri et à l'affichage « Novembre 2026 »)
     lecture   : temps de lecture en minutes
     extra     : (facultatif) mention complémentaire, ex. "3 extraits vidéo"
   ========================================================================== */

window.IN_CATALOGUE = [
  {
    numero: 2,
    dossier: "prisonnier-de-notre-langage",
    titre: "Intelligence artificielle : prisonnier de notre langage ?",
    chapo: "Le langage nous permet de décrire le monde, de transmettre nos connaissances, mais aussi de construire notre manière de le percevoir.",
    rubrique: "Essai · Langage & IA",
    date: "2026-11",
    lecture: 6,
    extra: "3 extraits vidéo"
  },
  {
    numero: 1,
    dossier: "pensez-comme-une-ia",
    titre: "Est-ce que vous pensez comme une IA ?",
    chapo: "Ce que le langage naturel change dans la conception — et ce qu’il pourrait changer dans notre manière de penser la valeur humaine.",
    rubrique: "Essai · IA & cognition",
    date: "2026-09",
    lecture: 9
  }
];
