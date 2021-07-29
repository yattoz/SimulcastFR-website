<template>
    <div>
    <div class="box" tabindex="0">
        <AnimeCard v-for="unit in computedLineup" 
                    v-bind:anime="unit" 
                    v-bind:key="unit.title.concat('_').concat(unit.service)"/>
            
    </div>

    <div align="center" v-if="(computedLineup.length <= 0  && !( (FilterResults.search.length === 0 || !(FilterResults.search.trim()))) ) ">
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

    import AnimeCard from "@/components/AnimeCard";
    import StoreFilter from '@/components/StoreFilter';
    import { nextTick } from 'vue'
    import tippy from 'tippy.js'
    const proxy = '';
    
    export default {
        name: "AnimeLineup",
        components: {
            AnimeCard
        },
        props: {
            full_lineup_url: String
        },
        data() {
            return {
                full_lineup: [],
                FilterResults: StoreFilter.state
            }
        },
        mounted() {
            let self = this;
            tippy.setDefaultProps( { delay: [300, 100] } )
            let request = new XMLHttpRequest();
            request.open('GET', proxy + self.full_lineup_url, true);

            request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                let json = JSON.parse(this.response);

                self.full_lineup = json["data"].sort(function (a, b) {
                    return ('' + a.title.toLocaleString()).localeCompare(b.title.toLocaleString());
                });
            } else {
                // 
                console.log("We reached our target server, but it returned an error")
            }
            };

            request.onerror = function() {
                // There was a connection error of some sort
                console.log("There was a connection error of some sort")
            };

            request.send();
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
                nextTick(function () {
                    // Code that will run only after the
                    // entire view has been rendered
                    let instances = tippy('[data-tippy-content]');
                })
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
            gap: 1.25em;
            grid-template-columns: repeat(auto-fill, minmax(8em,1fr)); /* 120px */
            /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
        }

    }

    @media (max-width: 768px) {  /* smaller than tablet */
        .box {
            display: grid;
            gap: 1em;
            grid-template-columns: repeat(auto-fill, minmax(7.5em,1fr)); /* 120px */
            /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
        }
    }

    @media (max-width: 576px) {  /* smaller than smartphone */
        .box {
            display: grid;
            gap: 1em;
            grid-template-columns: repeat(auto-fill, minmax(6.4em,1fr)); /* 120px */
            /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
        }

    }

    .no_result{
        font-size: large
    }
</style>
