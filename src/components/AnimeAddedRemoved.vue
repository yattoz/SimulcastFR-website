<template>
        <!-- Layout items -->

    <div>
        <WeekAddedRemoved v-for="unit in computedWeek" 
            v-bind:added_lineup="unit.added" 
            v-bind:removed_lineup="unit.removed"
            v-bind:time_begin="unit.time_begin"
            v-bind:time_end="unit.time_end"
            v-bind:key="unit.time"/>
    </div>
</template>

<script>
    import StoreFilter from '@/components/StoreFilter';
    import WeekAddedRemoved from '@/components/WeekAddedRemoved';
    import tippy from 'tippy.js'
    
    const proxy = '';
    //const proxy = '';
    
    export default {
        name: "AnimeAddedRemoved",
        components: {
            WeekAddedRemoved
        },
        props: {
            diff_catalogue_url: String
        },
        data() {
            return {
                week: [],
                time_begin: [],
                time_end: [],
                FilterResults: StoreFilter.state
            }
        },
        mounted() {
            var self = this;
            tippy.setDefaultProps( { delay: [300, 100] } )
            function fillAddedRemoved(json) {
                json.forEach(period => {
                    // console.log(period);
                    self.week.push(period);
                });
                self.$nextTick(function () {
                    // Code that will run only after the
                    // entire view has been rendered
                    let instances = tippy('[data-tippy-content]');
                    console.log(instances)
                })
            }

            let request = new XMLHttpRequest()
            request.open('GET', proxy + self.diff_catalogue_url, true);

            request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                let json = JSON.parse(this.response);

                fillAddedRemoved(json)
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
            }
        },
        computed: {
            computedWeek(){
                var tmp = this.week;
                return tmp;
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
