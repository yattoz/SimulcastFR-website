<template>
        <!-- Layout items -->

    <div align="left">
        <ul class="box">
            <li v-for="unit in computedLineup" v-bind:key="unit.title.concat('_').concat(unit.service)"  class="textoverflow">
                <a :href="unit.link"
                    @click.prevent="open_link_in_tab(unit.link)"
                    v-tooltip.top="{content: unit.title, delay: 300}"
                    >
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
        <div class="pagination">
            <div v-for="page in computedPages" v-bind:key="page">
                <button :id="'button-page-' + page" v-on:click="setPage(page)">
                    {{page}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>

    import StoreFilter from '@/components/StoreFilter';
    
    const proxy = '';
    
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
                FilterResults: StoreFilter.state,
                elementsPerPage: 200,
                currentPage: 0
            }
        },
        mounted() {
            var self = this;
            
            function fillCatalogue(json) {
                let data = json["data"]
                /* .sort(function (a, b) {
                    return ('' + a.title.toLocaleString()).localeCompare(b.title.toLocaleString());
                });
                */
               self.full_lineup = data
                //console.log();
                console.log(self.full_lineup)

            }

            let request = new XMLHttpRequest();
            request.open('GET', proxy + self.full_lineup_url, true);

            request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                let json = JSON.parse(this.response);

                fillCatalogue(json)
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
            },
            setPage(pageNumber) {
                this.currentPage = pageNumber
            }
        },
        computed: {
            fullComputedLineup(){
                let typedText = this.FilterResults.search;
                let serviceSort = this.FilterResults.serviceSort;
                let tmp = this.full_lineup;
                if (serviceSort) {
                    tmp = tmp.sort(function (a, b) {
                        return ('' + a.service.toLocaleString()).localeCompare(b.service.toLocaleString());
                    });
                } else {
                    tmp = tmp.sort(function (a, b) {
                        return ('' + a.title.toLocaleString()).localeCompare(b.title.toLocaleString());
                    });
                }
                tmp = tmp.filter(unit => {
                    let caught = typedText === "";
                    caught = caught || unit.title.toLowerCase().indexOf(typedText.toLowerCase()) > -1;
                    caught = caught && this.FilterResults.tableServices.includes(unit.service);
                    return caught;
                });
                console.log(tmp.length)
                return tmp
            },
            computedLineup(){
                return this.fullComputedLineup.slice(this.currentPage * this.elementsPerPage, (this.currentPage + 1) * this.elementsPerPage)
            },
            computedPages(){
                let numberOfItems = this.fullComputedLineup.length
                let res = Array()
                let numberOfPages = numberOfItems / this.elementsPerPage
                for(let i = 0; i < numberOfPages; i++) {
                    res.push(i)
                }
                console.log(numberOfItems, this.elementsPerPage, numberOfPages)
                return res
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
        height: 1.6em;
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

    .pagination {
        display: grid;
        gap: 0px;
        grid-template-columns: repeat(auto-fill, minmax(3em, 1fr));
    }

    .pagination button {
        width: 100%
    }


</style>
