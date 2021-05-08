<template>
    <div class="left container" align="left">
        <h3>A propos</h3>
        <p>
            Ceci est un site affichant les simulcasts des diffuseurs saisonniers principaux français.
            Il a la particularité d'utiliser des données automatiquement récupérées des sites de simulcast.
        </p>
        <h3>Liste des changements</h3>
        <p>
            <ul>
                <li><b>[14/07/2020]</b> Ajustement de la densité d'affichage pour tablettes et smartphones dans la vue des simulcasts. Fix du calendrier qui affiche les épisodes d'une même série dans une même ligne (plus lisible).</li>
                <li><b>[08/04/2020]</b> Nouvelle fonctionnalité : ajout de la page "Ajout/retraits" retraçant les nouvelles licences et licences expirées. Aussi : léger relooking de la navbar.</li>
                <li><b>[11/01/2020]</b> Ajout d'un filtre pour cacher les simulcasts re-doublés (désactivé par défaut). Lisibilité améliorée pour les filtres. Message "Aucun résultat" affiché seulement si une recherche est entrée.</li>
                <li><b>[06/12/2019]</b> Ajout du catalogue Netflix avec les données d'un site communautaire français. Aussi : ajout d'un message si la recherche est vide.</li>
                <li><b>[31/10/2019]</b> [Fix] Les interrupteurs pour filtrer la page se synchronisent maintenant correctement avec l'état du filtre quand on ferme puis restaure l'onglet. Aussi : renommage de la page pour meilleur référencement.</li>
                <li><b>[08/09/2019]</b> La zone de recherche perd le focus en appuyant sur Entrée. Permet de fermer le clavier virtuel des smartphones et évite de rafraichir la page.</li>
                <li><b>[07/09/2019]</b> Affichage des animes d'Amazon Prime Vidéo avec les données d'un site communautaire français.</li>
                <li><b>[06/09/2019]</b> Passage sur un déploiement automatique de Netlify par le dépot GitHub.</li>
                <li><b>[04/09/2019]</b> Le catalogue affiche les titres en noir et indique le service avec une icone (meilleure lisibilité).</li>
                <li><b>[03/09/2019]</b> Première annonce publique et mise à disposition du site. Fonctions simulcast, calendrier et catalogue.</li>
            </ul>
        </p>
        <h3>Contact</h3>
        <p>
            Pour me faire part des bugs de façon efficace, <a href="https://github.com/yattoz/SimulcastFR-website/issues">ouvrez une <i>issue</i> sur GitHub.</a>
        </p>
        <p>
            Mon Twitter est ouvert : <a href=https://www.twitter.com/yattoz>@yattoz</a> pour :
            <ul class="browser-default">
                <li> Problèmes,</li>
                <li> Bugs (si vous n'êtes pas familier avec GitHub),</li>
                <li> Messages d'encouragement,</li>
                <li> Propositions de me filer un coup de main,</li>
                <li> Suggestions (notamment sur l'ergonomie, je fais ça au flair).</li>
            </ul>
        </p>
    </div>
</template>

<script>
    export default {
        name: "APropos"
    }
</script>

<style scoped>

</style>
