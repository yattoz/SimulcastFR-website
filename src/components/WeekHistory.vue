<template>
        <!-- Layout items -->
    <div>

    <div align="left">

        <ul class="box">
            <li v-for="unit in computedAdded" v-bind:key="unit.title.concat('_').concat(unit.service)"  class="textoverflow">
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
        
        <div align="center" class="no_result" v-if="computedAdded.length <= 0  && !( (this.FilterResults.search.length === 0 || !(this.FilterResults.search.trim())))" >
        <p>Pas de changements.</p>
        </div>

    </div>
    <p>================================</p>
    <div align="left">

        <ul class="box">
            <li v-for="unit in computedRemoved" v-bind:key="unit.title.concat('_').concat(unit.service)"  class="textoverflow">
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
        
        <div align="center" class="no_result" v-if="computedRemoved.length <= 0  && !( (this.FilterResults.search.length === 0 || !(this.FilterResults.search.trim())))" >
        <p>Pas de changements.</p>
        </div>

    </div>
    <p>================================</p>
    <p>================================</p>
    <p>================================</p>

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
    //const diff_catalogue_url = "json/full_lineup.json";
    const proxy = 'https://jsonp.afeld.me/?url=';
    //const proxy = '';
    
    export default {
        name: "WeekHistory",
        components: {
        },
        props: {
            diff_catalogue_url: String,
            added_lineup: "",
            removed_lineup: "",
        },
        data() {
            return {
                FilterResults: StoreFilter.state
            }
        },
        mounted() {
            var self = this;
          /*
                json.forEach(period => {
                    console.log(period);
                     if (period["type"] == "added") {
                        period_data.forEach(anime => {
                            anime["time"] = period["time"]["begin"];
                            self.added_lineup.push(anime);
                        });
                     }
                    if (period["type"] == "removed") {
                        period_data.forEach(anime => {
                            anime["time"] = period["time"]["begin"];
                            self.removed_lineup.push(anime);
                        });
                     }
                     console.log(period_data);
                });
            });
            */
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
            computedAdded(){
                var typedText = this.FilterResults.search;
                var serviceSort = this.FilterResults.serviceSort;
                var tmp = this.added_lineup["data"];
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
            },
            computedRemoved(){
                var typedText = this.FilterResults.search;
                var serviceSort = this.FilterResults.serviceSort;
                var tmp = this.removed_lineup["data"];
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
    ul{margin:0; padding:0;}

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
        border: solid 1px rgba(0, 0, 0, 0.3);
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
