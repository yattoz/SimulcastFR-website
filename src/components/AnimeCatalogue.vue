<template>
    <div class="uk-align-left">
        <!-- Layout items -->

            <div id="native">
                <ul class="uk-list uk-list-striped cols_auto">
                    <li v-for="unit in computedLineup" v-bind:key="unit.title.concat('_').concat(unit.service)"  class="textoverflow">
                        <a :href="unit.link" :style="{ 'color': badgeColor(unit.service) }">
                            {{unit.title}}
                        </a>
                    </li>
                </ul>
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
        methods:{
            badgeColor(service) {
                //let service = this.anime.service;
                service = service.toLowerCase();
                if (service === "crunchyroll")
                    return "#ff7500";
                if (service === "adn")
                    return "#2140ed";
                if (service === "wakanim")
                    return "#e0000a";
            }
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
                    caught = caught && this.FilterResults.tableServices.includes(unit.service);
                    return caught;
                });
            }
        }
    }
</script>

<style scoped>
    ul{margin:0; padding:0;}

    .cols_s{
        -webkit-column-count: 1; /* Chrome, Safari, Opera */
        -moz-column-count: 1; /* Firefox */
        column-count: 1;
    }
    .cols_m{
        -webkit-column-count: 2; /* Chrome, Safari, Opera */
        -moz-column-count: 2; /* Firefox */
        column-count: 2;
    }
    .cols_l{
        -webkit-column-count: 3; /* Chrome, Safari, Opera */
        -moz-column-count: 3; /* Firefox */
        column-count: 3;
    }
    .cols_auto{
        column-count: 3;
        column-width: 300px;
    }
    .textoverflow{
        overflow: hidden;
        white-space: nowrap; /* Don't forget this one */
        text-overflow: ellipsis;
    }
</style>
