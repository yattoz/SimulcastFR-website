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
                <li><b>[08/09/2019]</b> La zone de recherche perd le focus en appuyant sur Entrée. Permet de fermer le clavier virtuel des smartphones et évite de rafraichir la page.</li>
                <li><b>[07/09/2019]</b> Affichage des animes d'Amazon Prime Vidéo avec les données de Nautiljon.</li>
                <li><b>[06/09/2019]</b> Passage sur un déploiement automatique de Netlify par le dépot GitHub.</li>
                <li><b>[04/09/2019]</b> Le catalogue affiche les titres en noir et indique le service avec une icone (meilleure lisibilité).</li>
                <li><b>[03/09/2019]</b> Première annonce publique et mise à disposition du site. Fonctions simulcast, calendrier et catalogue.</li>
            </ul>
        </p>
        <h3>Contact</h3>
        <p>
            Pour me faire part des bugs de façon efficace, <a href="https://github.com/simulcastfr/SimulcastFR-website/issues">ouvrez une <i>issue</i> sur GitHub.</a>
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