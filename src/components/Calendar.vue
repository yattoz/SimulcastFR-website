<template>

    <div class="">
        <p>Note : ce calendrier n'est actuellement pas filtrable.</p>
        <div>
        <a class="waves-effect waves-light btn" v-on:click="toggleCalendar('agenda')">Vue Agenda</a>
        <a class="waves-effect waves-light btn" v-on:click="toggleCalendar('list')">Vue Liste</a>
        </div>
                <FullCalendar
                        id="fullCalendarWidget"
                        class="demo-app-calendar"
                        ref="fullCalendar"
                        defaultView="listWeek"
                        weekNumberCalculation="ISO"
                        :views="{
                            timeGridWeek: { buttonText: 'Semaine (calendrier)' },
                            listWeek: { buttonText: 'Semaine (liste)' },
                            listDay: { buttonText: 'Aujourd\'hui (liste)' }
                        }"
                        :header="{
                            left: '',
                            center: 'Simulcast Ete 2019',
                            right: 'timeGridWeek,listWeek,listDay'
                          }"
                        :plugins="calendarPlugins"
                        :weekends="calendarWeekends"
                        :events="calendarEvents"
                        :locales="['fr']"
                        :height="'auto'"
                />
                <!--    @eventClick="eventClick"
                        @dateClick="handleDateClick"   -->

    </div>
</template>

<script>
    import StoreFilter from '@/components/StoreFilter';

    import FullCalendar from "@fullcalendar/vue";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import timeGridPlugin from "@fullcalendar/timegrid";
    import interactionPlugin from "@fullcalendar/interaction";
    //import frLocale from '@fullcalendar/core/locales/fr';
    import listPlugin from '@fullcalendar/list';
    // must manually include stylesheets for each plugin
    import "@fullcalendar/core/main.css";
    import "@fullcalendar/daygrid/main.css";
    import "@fullcalendar/timegrid/main.css";
    import "@fullcalendar/list/main.css";
    const proxy = '';


    export default {
        components: {
            FullCalendar // make the <FullCalendar> tag available
        },
        props: {
            full_calendar_url: String
        },
        data: function() {
            return {
                calendarPlugins: [
                    // plugins must be defined in the JS
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin, // needed for dateClick
                    listPlugin
                ],
                calendarWeekends: true,
                calendarEvents: [
                    // initial event dat
                ],
                full_calendar: [],
                FilterResults: StoreFilter.state
            };
        },
        mounted() {
            var self = this;
            function fillCalendar(json) {
                self.full_calendar = json["data"];
                self.full_calendar.forEach(function(anime){
                    let title_and_eps = anime.title
                    if (anime.ep_number.length == 1 && anime.ep_number[0].length > 0)
                        title_and_eps = anime.title + ' - épisode ' + anime.ep_number.join(', ')
                    else if (anime.ep_number.length > 1)
                        title_and_eps = anime.title + ' - épisodes ' + anime.ep_number.join(', ')

                    if (anime.title.slice(-4) !== "Dub)")
                    {
                        self.calendarEvents.push({
                            // add new event data
                            title: title_and_eps,
                            start: new Date(anime.ep_time),
                            url: anime.ep_link,
                            backgroundColor: self.badgeColor(anime),
                            borderColor: self.badgeColor(anime),
                            allDay: false,
                            service: anime.service
                        });
                    }
                });
                //console.log("mounted: " + self.calendarEvents);
            }
            let request = new XMLHttpRequest();
            request.open('GET', proxy + self.full_calendar_url, true);

            request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                let json = JSON.parse(this.response);

                fillCalendar(json)
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
        methods: {
            toggleWeekends() {
                this.calendarWeekends = !this.calendarWeekends; // update a property
            },
            badgeColor(anime) {
                let service = anime.service;
                service = service.toLowerCase();
                if (service === "crunchyroll")
                    return "#df6400d8";
                if (service === "adn")
                    return "#0066ffd8";
                if (service === "wakanim")
                    return "#e0000ad8";
                if (service == "primevideo")
                    return "#00a8e0d8"
                if (service == "netflix")
                    return "#000000d8"
                // catch-all
                return "#fefefe";
            },
            toggleCalendar(type) {
                let fullCalendar = document.getElementById("fullCalendarWidget")
                console.log(type)
                
                if (type === "list")
                    fullCalendar.hidden = true
                else
                    fullCalendar.hidden = false
            }
            /*
            handleDateClick(arg) {
                
                if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
                    this.calendarEvents.push({
                        // add new event data
                        title: "New Event",
                        start: arg.date,
                        allDay: arg.allDay
                    });
                }
            },
            eventClick: function(info) {
                info.jsEvent.preventDefault(); // don't let the browser navigate

                if (info.event.url) {
                window.open(info.event.url);
                }
            }*/
        },
        computed: {
            computedCalendarEvents() {
                var typedText = this.FilterResults.search;
                var tmp = this.calendarEvents;
                
                /*var tmp2 = */tmp.filter(event => {
                    let caught = typedText === "";
                    caught = caught || event.title.toLowerCase().indexOf(typedText.toLowerCase()) > -1;
                    caught = caught && this.FilterResults.tableServices.includes(event.service);
                    caught = caught && (this.FilterResults.isDubbedOn || unit.title.slice(-4) !== "Dub)");
                    return caught;
                });
                //console.log("computed: ", tmp2);
                return this.calendarEvents; 

            }
        }
    };
</script>

<style scoped>
    .demo-app {
        font-size: 14px;
    }

    .demo-app-top {
        margin: 0 0 3em;
    }

    .demo-app-calendar {
        margin: 0 auto;
        max-width: 900px;
    }
    tr {
        background-color: transparent;
        color: black;
    }
    
</style>