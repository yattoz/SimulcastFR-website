<template>
    <div uk-filter="target: .js-filter">
        <!-- Filter controls
        -->
        <SearchBoxC id="SearchBox0"/>

        <!--
        <form class="uk-search">
            <div class="search-term">
                <form class="uk-search uk-search-default">
                    <span uk-search-icon></span>
                    <input id="searchBoxAnime" class="uk-search-input" type="search" placeholder="Rechercher..." v-on:input="processInput()">
                </form>
                <a href="#" id="hiddenSearchText" class="search-filter" uk-filter-control="[data-tags*='']" hidden>Search</a>
            </div>
        </form>
        -->

        <!-- Layout items -->
        <div uk-grid class="uk-grid-match uk-child-width-1-3@s uk-child-width-1-4@m  uk-child-width-1-6@l js-filter">
            <!--
            <AnimeCard v-for="unit in cr_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/>
            <AnimeCard v-for="unit in adn_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/>
            <AnimeCard v-for="unit in waka_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/> -->
            <AnimeCard v-for="unit in computedFullLineup" v-bind:anime="unit" v-bind:key="unit.image"/>
        </div>
    </div>

</template>

<script>
    import JQuery from 'jquery'
    let $ = JQuery
    import AnimeCard from "@/components/AnimeCard";
    import SearchBox from "@/components/SearchBox";
    const cr_lineup_url = "./json/cr_lineup.json";
    const adn_lineup_url = "./json/adn_lineup.json";
    const waka_lineup_url = "./json/waka_lineup.json";
    const proxy = '';

    var SearchBoxC = SearchBox;
    export default {
        name: "AnimeLineup",
        components: {
            AnimeCard,
            SearchBoxC
        },
        data() {
            return {
                cr_lineup: [],
                adn_lineup: [],
                waka_lineup: [],
                full_lineup: [],
                //search: ""
            }
        },
        mounted() {
            var self = this;
            $.getJSON(proxy + cr_lineup_url, function (json) {
                self.cr_lineup = json.sort(function (a, b) {
                    return a.title > b.title;});
                console.log(self.cr_lineup);
                $.getJSON(proxy + waka_lineup_url, function (json) {
                    self.waka_lineup = json.sort(function (a, b) {
                        return a.title > b.title; }); // sort by lexicographic order
                    console.log(self.waka_lineup);
                    $.getJSON(proxy + adn_lineup_url, function (json) {
                        self.adn_lineup = json.sort(function (a, b) {
                            return a.title > b.title; });
                        console.log(self.adn_lineup);
                        self.full_lineup = self.cr_lineup.concat(self.adn_lineup.concat(self.waka_lineup));
                        self.full_lineup = self.full_lineup.sort(function (a, b) {
                            return a.title > b.title; });
                    });
                });
            });
        },
        computed: {
            computedFullLineup(){
                console.log(SearchBoxC.data());
                var typedText = SearchBoxC.data().search;
                return this.full_lineup.filter(unit => {
                    let caught = typedText === "";
                    caught = caught || unit.title.toLowerCase().indexOf(typedText.toLowerCase()) > -1;
                    return caught;
                });
            }
        },
        methods:
        {
            processInput() {
                let typedText = document.getElementById('searchBoxAnime').value;
                this.search = typedText;
                console.log(this.search);
            }
        }
    }
</script>

<style scoped>

</style>