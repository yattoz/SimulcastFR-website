<template>

    <div class=" uk-align-center">
        <!-- Layout items -->

        <div uk-grid class="uk-flex-wrap uk-flex-center uk-grid-medium uk-padding-small" tabindex="0">
            <!--
            <AnimeCard v-for="unit in cr_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/>
            <AnimeCard v-for="unit in adn_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/>
            <AnimeCard v-for="unit in waka_lineup"  v-bind:anime="unit" v-bind:key="unit.image"/> -->
                <AnimeCard v-for="unit in computedLineup" v-bind:anime="unit" v-bind:key="unit.title.concat('_').concat(unit.service)"/>
        </div>
    </div>
</template>

<script>
    import JQuery from 'jquery'
    let $ = JQuery;
    import AnimeCard from "@/components/AnimeCard";
    import CheckboxFilters from "@/components/CheckboxFilters"
    import StoreFilter from '@/components/StoreFilter';
    /*
    const cr_lineup_url = "json/cr_lineup.json";
    const adn_lineup_url = ".son/adn_lineup.json";
    const waka_lineup_url = "json/waka_lineup.json";

     */
    //const full_lineup_url = "json/full_lineup.json";
    const proxy = '';

    export default {
        name: "AnimeLineup",
        components: {
            AnimeCard,
            CheckboxFilters,
        },
        props: {
            full_lineup_url: ""
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
                self.full_lineup = json.sort(function (a, b) {
                    return ('' + a.title.toLocaleString()).localeCompare(b.title.toLocaleString());
                });
                console.log(self.full_lineup);
            })
        },
        computed: {
            computedLineup(){
                var typedText = this.FilterResults.search;
                var serviceSort = this.FilterResults.serviceSort;
                var tmp;
                if (serviceSort) {
                    tmp = this.full_lineup.sort(function (a, b) {
                        return ('' + a.service.toLocaleString()).localeCompare(b.service.toLocaleString());
                    });
                } else {
                    tmp = this.full_lineup.sort(function (a, b) {
                        return ('' + a.title.toLocaleString()).localeCompare(b.title.toLocaleString());
                    });
                }
                return tmp.filter(unit => {
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