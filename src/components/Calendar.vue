<template>

    <div class="">
        <p>Note : ce calendrier n'est actuellement pas filtrable.</p>
        <div>
        <button class="" v-on:click="toggleCalendar('agenda')">Vue Agenda</button>
        <button class="" v-on:click="toggleCalendar('list')">Vue Liste</button>
        <v-popover offset="16">
        <!-- This will be the popover target (for the events and position) -->
        <button class="tooltip-target b3">Click me</button>

        <!-- This will be the content of the popover -->
        <template slot="popover">
            Voix ambigüe au coeur d'un zéphyr qui préfère aux jattes les kiwis.
        </template>
        </v-popover>
        </div>
            <div class="agenda" id="fullCalendarWidget">
            
                            <!--    @eventClick="eventClick"
                        @dateClick="handleDateClick"   -->
            </div>
    </div>
</template>

<script>
    import StoreFilter from '@/components/StoreFilter';

    import { Calendar } from '@fullcalendar/core';
    import timeGridPlugin from "@fullcalendar/timegrid";

    //import frLocale from '@fullcalendar/core/locales/fr';
    // must manually include stylesheets for each plugin
    import "@fullcalendar/core/main.css";
    import "@fullcalendar/timegrid/main.css";

    import tippy from 'tippy.js'

    const proxy = '';


    export default {
        // components: {
        //     FullCalendar // make the <FullCalendar> tag available
        // },
        props: {
            full_calendar_url: String
        },
        data: function() {
            return {
                calendarPlugins: [
                    // plugins must be defined in the JS
                    timeGridPlugin
                ],
                calendarWeekends: true,
                calendarEvents: [
                    // initial event dat
                ],
                full_calendar: [],
                calendar: null,
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
                let calendarEl = document.getElementById("fullCalendarWidget")
                self.calendar = new Calendar(calendarEl, {
                        class: "demo-app-calendar",
                        ref: "fullCalendar",
                        defaultView: "timeGridWeek",
                        weekNumberCalculation: "ISO",
                        header: {
                            left: '',
                            center: 'Simulcasts',
                            right: ''
                          },
                        eventRender: self.renderTooltip,
                        plugins: self.calendarPlugins,
                        weekends: self.calendarWeekends,
                        events: self.calendarEvents,
                        locales: ['fr'],
                        height: 'auto'
            })
                self.calendar.render()
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
            },
            renderTooltip(info) {
                console.log(info)
                info.el.style.color = "white"
                info.el.style.lineHeight = "1em"
                info.el.style.fontSize = "10pt"
                info.el.style.height = "4.2em"
                
                let tooltip = tippy(info.el, {
                    content: info.event.title
                })                
            }
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
    .agenda {
        width: 100%;
        height: 900px;
    }

    .demo-app {
        font-size: 12px;
    }

    .demo-app-top {
        margin: 0 0 3em;
    }

    .demo-app-calendar {
        margin: 0 auto;
        max-width: 900px;
    }
    
</style>