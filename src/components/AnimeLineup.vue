<template>
    <div>
    <div class="box" tabindex="0">
        <!-- Layout items -->

        <!--
        <AnimeCard v-for="unit in cr_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/>
        <AnimeCard v-for="unit in adn_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/>
        <AnimeCard v-for="unit in waka_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/> -->
            
        <AnimeCard v-for="unit in computedLineup" v-bind:anime="unit" v-bind:key="unit.title.concat('_').concat(unit.service)"/>
            
    </div>
<!--
     <div align="center">
        <p>
        SimulcastFR est en maintenance (je paye les pots cassés de mon architecture déplorable).
        </p>
        <p>
        Je tenterai d'apporter les réparations qui s'imposent d'ici mi-octobre.
        </p>
        <p>
        Merci pour votre patience !
        </p>
     </div>
-->
    <div align="center" class="no_result" v-if="(computedLineup.length <= 0) && !( (this.FilterResults.search.length === 0 || !(this.FilterResults.search.trim()))) ">
        <p>Aucun résultat pour la recherche dans les simulcasts de cette saison.</p>
        <p>
        Si vous cherchez une œuvre dont la diffusion est terminée,
            <router-link to="/full-lineup">
            recherchez plutôt dans le catalogue.
            </router-link></p>
    </div>
    </div>

</template>

<script>
    import JQuery from 'jquery'
    import lozad from 'lozad'

    let $ = JQuery;
    import AnimeCard from "@/components/AnimeCard";
    import StoreFilter from '@/components/StoreFilter';
    
    
    /*
    const cr_lineup_url = "json/cr_lineup.json";
    const adn_lineup_url = ".son/adn_lineup.json";
    const waka_lineup_url = "json/waka_lineup.json";

     */
    //const full_lineup_url = "json/full_lineup.json";
    const proxy = '';
    //const proxy = '';
    
    export default {
        name: "AnimeLineup",
        components: {
            AnimeCard,
        },
        props: {
            full_lineup_url: String
        },
        data() {
            return {
                cr_lineup: [],
                adn_lineup: [],
                waka_lineup: [],
                full_lineup: [],
                FilterResults: StoreFilter.state
            }
        },
        mounted() {
            var self = this;
            /*
            $.getJSON(proxy + cr_lineup_url, function (json) {
                self.cr_lineup = json.sort(function (a, b) {
                    return ('' + a.title.toLocaleString()).localeCompare(b.title.toLocaleString()); });
                console.log(self.cr_lineup);
                $.getJSON(proxy + waka_lineup_url, function (json) {
                    self.waka_lineup = json.sort(function (a, b) {
                        return ('' + a.title.attr).localeCompare(b.title.attr); }); // sort by lexicographic order
                    console.log(self.waka_lineup);
                    $.getJSON(proxy + adn_lineup_url, function (json) {
                        self.adn_lineup = json.sort(function (a, b) {
                            return ('' + a.title.attr).localeCompare(b.title.attr);  });
                        console.log(self.adn_lineup);
                        let full_lineup_tmp = self.cr_lineup.concat(self.adn_lineup.concat(self.waka_lineup));
                        self.full_lineup = full_lineup_tmp.sort(function (a, b) {
                            return ('' + a.title.toLocaleString()).localeCompare(b.title.toLocaleString());  })
                        console.log(self.full_lineup);
                    });
                });
            });
            */
            $.getJSON(proxy + self.full_lineup_url, function (json) {
                self.full_lineup = json["data"].sort(function (a, b) {
                    return ('' + a.title.toLocaleString()).localeCompare(b.title.toLocaleString());
                });
                //console.log(self.full_lineup);
            })
            const observer = lozad(); // lazy loads elements with default selector as '.lozad'
            observer.observe();
        },
        computed: {
            computedLineup(){
                var typedText = this.FilterResults.search;
                var serviceSort = this.FilterResults.serviceSort;
                var tmp = this.full_lineup;
                if (serviceSort) {
                    tmp = tmp.sort(function (a, b) {
                        return ('' + a.service.toLocaleString()).localeCompare(b.service.toLocaleString());
                    });
                } else {
                    tmp = tmp.sort(function (a, b) {
                        return ('' + a.title.toLocaleString()).localeCompare(b.title.toLocaleString());
                    });
                }
                return tmp.filter(unit => {
                    let caught = typedText === "";
                    caught = caught || unit.title.toLowerCase().indexOf(typedText.toLowerCase()) > -1;
                    caught = caught && this.FilterResults.tableServices.includes(unit.service);
                    caught = caught && (this.FilterResults.isDubbedOn || unit.title.slice(-4) !== "Dub)")
                    return caught;
                });
            }
        }
    }
</script>

<style scoped>

    @media (min-width: 768px) {  /* bigger than or equal to tablet */
        .box {
            display: grid;
            grid-gap: 1em;
            grid-template-columns: repeat(auto-fill, minmax(9em,1fr)); /* 120px */
            /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
        }

    }

    @media (max-width: 768px) {  /* smaller than tablet */
        .box {
            display: grid;
            grid-gap: 0.8em;
            grid-template-columns: repeat(auto-fill, minmax(7em,1fr)); /* 120px */
            /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
        }
    }

    @media (max-width: 576px) {  /* smaller than smartphone */
        .box {
            display: grid;
            grid-gap: 0.6em;
            grid-template-columns: repeat(auto-fill, minmax(6em,1fr)); /* 120px */
            /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
        }

    }

    .no_result{
        font-size: large
    }
</style>
