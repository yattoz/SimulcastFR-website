<template>
        <!-- Layout items -->

    <div align="left">
        <ul class="box">
            <li v-for="unit in computedLineup" v-bind:key="unit.title.concat('_').concat(unit.service)"  class="textoverflow">
                <a :href="unit.link"
                    @click.prevent="open_link_in_tab(unit.link)"
                    v-tooltip.top="{content: unit.title, delay: 300}"
                    style="color: #000000">
                    <img class="service-icon" :src="'/icons/'+unit.service+'.png'">
                    <span class="title">
                    {{unit.title}}
                    </span>
                </a>
            </li>
        </ul>
        <div align="center" class="no_result" v-if="computedLineup.length <= 0  && !( (this.FilterResults.search.length === 0 || !(this.FilterResults.search.trim())))" >
        <p>Aucun résultat pour la recherche.</p>
        </div>
    </div>
</template>

<script>
    import JQuery from 'jquery'
    let $ = JQuery;
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
        name: "AnimeCatalogue",
        components: {
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
            });
        },
        methods:{
            badgeColor(service) {
                //let service = this.anime.service;
                service = service.toLowerCase();
                if (service === "crunchyroll")
                    return "#df6300";
                if (service === "adn")
                    return "#0066ff";
                if (service === "wakanim")
                    return "#e0000a";
                if (service == "primevideo")
                    return "#00a8e0"
                if (service == "netflix")
                    return "#000000"
                return "#fefefe";
            },
            open_link_in_tab(url){
                window.open(url);
            }
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
                    return caught;
                });
            }
        }
    }
</script>

<style scoped>
    ul {
        margin:0; 
        padding:0;
    }

    .box {
        display: grid;
        grid-gap: 0em;
        grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
        /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
    }

    .textoverflow{
        overflow: hidden;
        font-size: 1.0em;
        padding: 2px;
        white-space: nowrap; /* Don't forget this one */
        text-overflow: ellipsis;
        border: solid 1px rgba(127, 127, 127, 0.6);
        z-index: 1;
    }

    .service-icon{
        width: 1.6em;
        margin-bottom: -0.3em;
        margin-left: 0px;
        margin-right: 2px;
        position: relative;
    }

    .title{
        margin-left: 0em;
    }

    .no_result{
        font-size: large
    }


</style>
