<template>
    <div>
        <select class="selector" name="whichMonth" v-on:change="setMonth($event)">
            <option 
                v-for="unit in computedMonths"
                v-bind:key="unit"
                :value="unit.value">
                {{unit.text}}
            </option>
        </select>
        <div id="week-added-removed">
        <WeekAddedRemoved 
            v-for="unit in computedWeek" 
            v-bind:added_lineup="unit.added" 
            v-bind:removed_lineup="unit.removed"
            v-bind:time_begin="unit.time_begin"
            v-bind:time_end="unit.time_end"
            v-bind:key="unit.time"/>
        </div>
    </div>
</template>

<script>
    import StoreFilter from '@/components/StoreFilter';
    import WeekAddedRemoved from '@/components/WeekAddedRemoved';
    import tippy from 'tippy.js'
    import { nextTick } from 'vue'
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
                months: [],
                currentMonth: new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1),
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
                nextTick(function () {
                    // Code that will run only after the
                    // entire view has been rendered
                    let instances = tippy('[data-tippy-content]');
                    console.log(instances)
                })
                self.week.forEach(week =>
                {
                    let dateBegin = new Date(week.time_begin)
                    let dateEnd = new Date(week.time_end)
                    let beginMonth = new Date(dateBegin.getFullYear(), dateBegin.getMonth(), 1)
                    // let endMonth = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), 1)
                    if (self.months.filter(x => x.getTime() == beginMonth.getTime()).length == 0)
                        self.months.push(beginMonth)
                })
                // self.currentMonth = self.months[0] // useless since we initialize it to current month with new Date()
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
            },
            setMonth(event) {
                let dateIsoString = event.target.value
                this.currentMonth = new Date(dateIsoString)
            }
        },
        computed: {
            computedWeek(){
                var tmp = this.week;
                let nextMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1)
                nextTick(function() {
                    console.log("tippy")
                    tippy('[data-tippy-content]')
                })
                return tmp.filter(x => {
                    let begin = new Date(x.time_begin)
                    let end = new Date(x.time_end)
                    let isBeginningOutOfMonth = begin.getTime() > nextMonth.getTime()
                    let isEndOutOfMonth = end.getTime() < this.currentMonth.getTime()
                    return !(isBeginningOutOfMonth) && !(isEndOutOfMonth)
                })
            },
            computedMonths(){
                const options = {month: 'long', year: 'numeric' };
                return this.months.map(x =>
                    {
                        let res = {
                            value: x.toISOString(),
                            text: x.toLocaleDateString('fr-FR', options)
                        }
                        return res
                    })
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
