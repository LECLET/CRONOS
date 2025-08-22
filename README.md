
# CRONOS – V1 (structure)

Base statique prête à déployer sur **GitHub Pages** (aucune dépendance externe).

## Fonctionnalités livrées
- Page de **connexion plein écran** avec logo.
- **Rôles démo** : `admin/admin` (voit Paramétrages) et `agence/agence` (ne voit pas Paramétrages).
- **Menu** et pages : Planifications, Agents, Gestion commerciale, Internet, Paramétrages (placeholders).
- **App shell** sombre, compatible mobile.
- **Sans CDN** (évite l'erreur *nosniff*).

> Cette V1 ne contient pas de backend (auth et données simulées via localStorage).

## Installer
1. Télécharger le ZIP puis dézipper.
2. Ouvrir `index.html` dans un navigateur.

## Déployer sur GitHub Pages
1. Créer un dépôt (par ex. `cronos`), y **ajouter tous les fichiers** de ce dossier (y compris `assets/`).
2. Dans *Settings → Pages*, sélectionner **Deploy from a branch** puis la branche (par ex. `main`) et le dossier **root**.
3. La page sera publiée sous l'URL fournie par GitHub Pages.

## Prochaines étapes (V2)
- Schéma de données (PostgreSQL) + API (Node/Express ou Django).
- Page **Agents** complète (fiches, fichiers, diplômes, exports PDF).
- **Planification** avec FullCalendar (drag&drop), gestion des indisponibilités et trames.
- **Commercial** (clients, sites, devis, facturation).
- **Journal d'audit** et exports Excel.
