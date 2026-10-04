---
title: "Factur-X expliqué : ce que c'est, comment ça marche, et ce que son développement m'a appris"
description: Un regard concret sur le format de facture électronique obligatoire en France. Ce qu'est Factur-X, comment fonctionne ce format hybride PDF/XML, et ce que sa mise en œuvre implique vraiment.
date: 2026-06-24
slug: facturx-explained
readTime: 4 min de lecture
---

Depuis le 1er septembre 2026, toutes les entreprises en France doivent pouvoir recevoir des factures électroniques, et les grandes entreprises et les ETI doivent déjà les émettre. Les PME et les micro-entreprises suivront le 1er septembre 2027. Si vous travaillez sur la facturation pour des clients français ou européens, Factur-X va vite devenir incontournable. Voici ce que c'est réellement, parce qu'il y a beaucoup de confusion à ce sujet.

Factur-X est un format de facture hybride. En apparence, c'est un PDF normal, un document que l'on peut ouvrir, lire et imprimer comme n'importe quel autre. Mais à l'intérieur du fichier PDF se trouve un document XML structuré qui contient toutes les mêmes données de facturation, sous une forme lisible par une machine. Le format repose sur PDF/A-3, une norme ISO pour l'archivage des PDF, et le XML suit le schéma Cross Industry Invoice (CII).

La partie PDF est pour les humains. La partie XML est pour les machines. Les deux vivent dans le même fichier, et c'est ce qui en fait un format hybride.

C'est en fait une solution astucieuse à un vrai problème. Une facture doit être envoyée une seule fois, puis traitée différemment selon qui la reçoit. Un petit fournisseur sans aucune automatisation peut ouvrir le PDF et le lire. Une grande organisation équipée d'un logiciel comptable peut extraire le XML et le traiter directement. Pas besoin de deux fichiers ni de deux circuits différents : un seul fichier fait les deux.

Factur-X existe en plusieurs profils, chacun exigeant une quantité de données différente dans le XML. Le profil MINIMUM ne demande presque rien, juste des identifiants et des totaux. Le profil EN16931 suit la norme européenne et exige le détail complet des lignes, les taux de TVA, les conditions de paiement, les informations de l'acheteur et du vendeur, et plus encore. Le profil dont vous avez besoin dépend de qui vous facturez et de ce qu'attendent ses systèmes.

C'est là que ça se complique en pratique. Le schéma XML a l'air simple jusqu'au moment où l'on commence à l'implémenter. Les noms de champs ne sont pas évidents, la structure d'imbrication demande un temps d'adaptation, et certaines règles de validation ne sont pas clairement documentées en un seul endroit. J'ai passé beaucoup de temps sur des choses comme la bonne structure pour la ventilation de la TVA, les champs obligatoires selon le niveau de profil, et la raison pour laquelle un fichier qui me semblait correct échouait encore et encore à la validation.

La génération du PDF a ses propres difficultés. Il faut produire un PDF/A-3 valide, ce qui est plus strict qu'un PDF classique. Les polices de caractères doivent être incorporées dans le fichier, certaines fonctionnalités sont interdites, et les métadonnées du fichier doivent suivre des conventions précises. Si l'un de ces points est faux, le résultat ne passera pas la validation, même si le XML à l'intérieur est parfait.

Si vous voulez valider un fichier Factur-X vous-même, le validateur de la FNFE (la FNFE-MPE est l'association française à l'origine de la norme) est l'outil le plus fiable que j'ai trouvé. Les documents de spécification officiels sont aussi disponibles gratuitement, même s'ils supposent une certaine familiarité avec le XML et le schéma CII de l'UN/CEFACT.

J'ai intégré la génération Factur-X dans Einvoicer pour le préparer à l'échéance réglementaire de septembre 2026. La partie Factur-X fonctionne à côté de la sortie Peppol BIS 3.0 et de l'intégration avec le réseau Super PDP, qui gère l'infrastructure de transmission en France. C'est un autre sujet, mais il est bon de savoir que Factur-X est le format du document et que Peppol est le réseau d'acheminement. Les deux sont liés, mais ce n'est pas la même chose.

Si vous développez un logiciel de facturation pour le marché français, Factur-X n'est pas optionnel à partir de septembre 2026. Pour la facturation aux administrations publiques, c'est déjà obligatoire. Pour le B2B, le déploiement se fait selon la taille de l'entreprise, les plus grandes en premier.

La bonne nouvelle, c'est que l'approche hybride vous évite de jeter votre génération de PDF existante. Si vous produisez déjà vos factures en PDF, vous avez fait une partie du chemin. Le gros du travail consiste à générer un XML CII valide, à l'intégrer correctement dans un conteneur PDF/A-3, et à valider le résultat. Une fois cette chaîne en place, le format lui-même est bien moins intimidant que la documentation ne le laisse paraître.

N'hésitez pas à me poser vos questions si vous travaillez sur quelque chose de similaire.

*Andrew Watts, développeur full stack basé en Nouvelle-Aquitaine, France.*
