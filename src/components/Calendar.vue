<template>

    <div class="">
        <h1>En construction !</h1>
        <p>Ce calendrier contient des données fixes pour démonstration.</p>
                <FullCalendar
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
                        @eventClick="eventClick"
                        @dateClick="handleDateClick"
                />
    </div>
</template>

<script>
    import JQuery from 'jquery'
    let $ = JQuery;
    import StoreFilter from '@/components/StoreFilter';

    import FullCalendar from "@fullcalendar/vue";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import timeGridPlugin from "@fullcalendar/timegrid";
    import interactionPlugin from "@fullcalendar/interaction";
    import frLocale from '@fullcalendar/core/locales/fr';
    import listPlugin from '@fullcalendar/list';

    // must manually include stylesheets for each plugin
    import "@fullcalendar/core/main.css";
    import "@fullcalendar/daygrid/main.css";
    import "@fullcalendar/timegrid/main.css";
    import "@fullcalendar/list/main.css";

    /*
    const cr_lineup_url = "json/cr_calendar.json";
    const adn_lineup_url = "json/adn_calendar.json";
    const waka_lineup_url = "json/waka_calendar.json";

     */
    const full_calendar_url = "json/full_calendar.json";
    const proxy = 'https://jsonp.afeld.me/?url=https://simulcastfr.netlify.com/';
    //const proxy = '';

    export default {
        components: {
            FullCalendar // make the <FullCalendar> tag available
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
                
                full_calendar_url: "json/full_calendar.json",
                full_calendar: [],
                FilterResults: StoreFilter.state

            };
        },
        mounted() {
            /*
            this.calendarEvents.push({
                // add new event data
                title: "New Event",
                start: new Date("2019-"),
                allDay: false
            });
            */
            var self = this;
            $.getJSON(proxy + self.full_calendar_url, function (json) {
                self.full_calendar = json;
                self.full_calendar.forEach(function(anime){
                    self.calendarEvents.push({
                        // add new event data
                        title: anime.title + ' ep. ' + anime.ep_number,
                        start: new Date(anime.ep_time),
                        url: anime.ep_link,
                        backgroundColor: self.badgeColor(anime),
                        allDay: false
                    });
                    
                });
                console.log(self.calendarEvents);
            })
        },
        methods: {
            toggleWeekends() {
                this.calendarWeekends = !this.calendarWeekends; // update a property
            },
            badgeColor(anime) {
                let service = anime.service;
                service = service.toLowerCase();
                if (service === "crunchyroll")
                    return "#df6400d0";
                if (service === "adn")
                    return "#0066ff";
                if (service === "wakanim")
                    return "#e0000a";
                // catch-all
                return "#fefefe";
            },
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
            }
        }
    };
</script>

<style scoped>
    .demo-app {
        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
        font-size: 14px;
    }

    .demo-app-top {
        margin: 0 0 3em;
        color: #df6400c5;

    }

    .demo-app-calendar {
        margin: 0 auto;
        max-width: 900px;
    }
    
</style>