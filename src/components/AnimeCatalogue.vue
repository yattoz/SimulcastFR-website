<template>

    <div class="catalog">
        <div class="selector-box">
            <span class="text-right">
                Éléments par page
            </span>
        <select class="selector" name="nbrElemsPerPage" v-on:change="setNumberOfElementsPerPage($event)">
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
            <option value="99999">Tout afficher</option>
        </select>
        </div>
        <div class="pagination" v-if="computedPages.length > 1">
            <div v-for="page in computedPages" v-bind:key="page">
                <div class="page-button" :class="{ active: page == currentPage }" :id="'button-page-' + page + 1" v-on:click="setPage(page)">
                    {{page + 1}}
                </div>
            </div>
        </div>
        <div class="box">
            <span v-for="unit in computedCatalog" v-bind:key="unit.title.concat('_').concat(unit.service)"  
                class="overflowhidden"
                :data-tippy-content="unit.title">
                <a :href="unit.link"
                    target="_blank"
                    >
                    <img class="service-icon" :src="'/icons/'+unit.service+'.png'" :alt="unit.service">
                    <span class="title">
                    {{unit.title}}
                    </span>
                </a>
            </span>
        </div>
        <div align="center" class="no_result" v-if="computedCatalog.length <= 0  && !( (FilterResults.search.length === 0 || !(FilterResults.search.trim())))" >
        <p>Aucun résultat pour la recherche.</p>
        </div>
        <div class="pagination" v-if="computedPages.length > 1">
            <div v-for="page in computedPages" v-bind:key="page">
                <div class="page-button" :class="{ active: page == currentPage }" :id="'button-page-' + page + 1" v-on:click="setPage(page)" >
                    {{page + 1}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import StoreFilter from '@/components/StoreFilter';
    import tippy from 'tippy.js'
    import { nextTick } from 'vue' 
    const proxy = '';
    import "@/css/anime_single_line.css"
    
    export default {
        name: "AnimeCatalogue",
        components: {
        },
        props: {
            full_lineup_url: String
        },
        data() {
            return {
                full_lineup: [],
                FilterResults: StoreFilter.state,
                currentPage: 0
            }
        },
        mounted() {
            var self = this;
            tippy.setDefaultProps( { delay: [300, 100] } )
            function fillCatalogue(json) {
                let data = json["data"]
                self.full_lineup = data
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
            open_link_in_tab(url){
                window.open(url);
            },
            setPage(pageNumber) {
                this.currentPage = pageNumber
            },
            setNumberOfElementsPerPage(event) {
                let number = event.target.value
                StoreFilter.setItemsPerPage(number)
            }
        },
        activated() {
            nextTick(function () { tippy('[data-tippy-content]') })
        },
        computed: {
            computedFullCatalog(){
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
                let numberOfItems = tmp.length
                let numberOfPages = numberOfItems / this.FilterResults.itemsPerPage
                this.currentPage = Math.min(this.currentPage, Math.floor(numberOfPages))
                return tmp
            },
            computedCatalog(){
                let res = this.computedFullCatalog.slice(this.currentPage * this.FilterResults.itemsPerPage, (this.currentPage + 1) * this.FilterResults.itemsPerPage)
                nextTick(function () { tippy('[data-tippy-content]') })
                return res
            },
            computedPages(){
                let numberOfItems = this.computedFullCatalog.length
                let res = Array()
                let numberOfPages = numberOfItems / this.FilterResults.itemsPerPage
                for(let i = 0; i < numberOfPages; i++) {
                    res.push(i)
                }
                return res
            }
        }
    }
</script>

<style scoped>

    .catalog {
        display: grid;
        grid-template-rows: auto;
        gap: 1em;
    }


    .box {
        text-align: left;
        margin:0; 
        padding:0;
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
        /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
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

    .selector-box {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.4em;
    }

    .text-right {
        text-align: right;
        font-size: large;
    }

    .selector {
        text-align: left;
        width: min-content;
    }


</style>
