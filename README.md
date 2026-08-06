# Bread House — site web

Site vitrine de **Bread House**, boulangerie · pâtisserie · beldi à Salé, Maroc.

Site statique : HTML, CSS et JavaScript, sans dépendance ni étape de build.

## Voir le site en local

```bash
python -m http.server 8899
```

Puis ouvrez <http://localhost:8899>.

## Structure

```
index.html              La page complète
assets/css/style.css    Design system et mise en page
assets/js/main.js       Menu, apparitions au défilement, emplacements photo
assets/img/favicon.svg  Logo (peel + épi de blé)
media/                  Vos photos — voir PHOTOS.md
```

## Ajouter les photos

Voir **[PHOTOS.md](PHOTOS.md)**. Déposez vos images dans `media/` avec les noms
indiqués : elles s'affichent automatiquement. Tant qu'un fichier est absent,
son emplacement affiche un cadre doré nommant la photo attendue.

## Identité visuelle

Couleurs relevées sur l'enseigne de la boutique :

| Rôle | Hex |
|---|---|
| Four (fond le plus sombre) | `#1B1510` |
| Croûte (fond principal) | `#2C231E` |
| Or (le logo) | `#C9992B` |
| Or clair (titres) | `#E9C874` |
| Mie (texte, section éclairée) | `#F2E7D3` |
| Brique (accent beldi) | `#8C3A22` |

Typographie : **Fraunces** (titres), **Karla** (texte), **Space Mono** (horaires,
téléphone, libellés).

## À confirmer avant mise en ligne

- Les délais de commande dans la section « Commandes personnalisées »
- Les trois avis clients, actuellement non attribués
- Les horaires (7h–21h, 7j/7) et « Espèces uniquement »

## Coordonnées affichées

Bd Assalam, lot. Mabrouka n°2 — 11060 Salé
05 37 88 33 03
