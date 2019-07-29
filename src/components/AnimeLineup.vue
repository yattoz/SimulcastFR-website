<template>

    <div uk-filter="target: .js-filter">
        <!-- Layout items -->
        <div uk-grid class="uk-grid-match uk-child-width-1-3@s uk-child-width-1-4@m  uk-child-width-1-6@l js-filter">
            <!--
            <AnimeCard v-for="unit in cr_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/>
            <AnimeCard v-for="unit in adn_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/>
            <AnimeCard v-for="unit in waka_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/> -->
            <AnimeCard v-for="unit in computedLineup" v-bind:anime="unit" v-bind:key="unit.image"/>
        </div>
    </div>
</template>

<script>
    import JQuery from 'jquery'
    let $ = JQuery
    import AnimeCard from "@/components/AnimeCard";
    import StoreFilter from '@/components/StoreFilter';

    const cr_lineup_url = "./json/cr_lineup.json";
    const adn_lineup_url = "./json/adn_lineup.json";
    const waka_lineup_url = "./json/waka_lineup.json";
    const proxy = '';

    export default {
        name: "AnimeLineup",
        components: {
            AnimeCard,
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
            computedLineup(){
                var typedText = this.FilterResults.search;
                return this.full_lineup.filter(unit => {
                    let caught = typedText === "";
                    caught = caught || unit.title.toLowerCase().indexOf(typedText.toLowerCase()) > -1;
                    return caught;
                });
            }
        }
    }
</script>

<style scoped>

</style>