<template>

    <div class="">
        <div>
        <button class="" v-on:click="toggleCalendar('agenda')">Vue Agenda</button>
        <button class="" v-on:click="toggleCalendar('list')">Vue Liste</button>

        </div>
            <div class="agenda-container" :class="{invisible: !FilterResults.isAgendaShown}">
                <p> Cet agenda n'est pas filtrable. </p>
                <div class="agenda" id="fullCalendarWidget">
                </div>
            </div>
        </div>
</template>

<script>
    import StoreFilter from '@/components/StoreFilter';

    import { Calendar } from '@fullcalendar/core';
    import timeGridPlugin from "@fullcalendar/timegrid";

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
            tippy.setDefaultProps( { delay: [0, 0] } )
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
                        initialView: "timeGridWeek",
                        weekNumberCalculation: "ISO",
                        headerToolbar: {
                            start: 'title', // will normally be on the left. if RTL, will be on the right
                            center: '',
                            end: '' //'today prev,next' // will normally be on the right. if RTL, will be on the left
                          },
                        eventDidMount: self.renderTooltip,
                        viewClassNames: ["background-on"],
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
        activated() {
            // if the calendar is created, the component is deactivated, the window resized, then re-activated,
            // fullCalendar hasn't listened to window resizes so we should re-render it.
            if (this.calendar != null) {
                this.calendar.render()
            }
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
                StoreFilter.setAgendaShown(type === "agenda")
            },
            renderTooltip(info) {
                info.el.style.color = "white"
                info.el.style.lineHeight = "1em"
                info.el.style.fontSize = "10pt"
                info.el.style.height = "4.2em"
                let intl = new Intl.DateTimeFormat('fr-FR', {month: 'numeric', day: 'numeric', hour: 'numeric', 'minute': 'numeric'})

                let tooltip = tippy(info.el, {
                    content: `${intl.format(info.event.start)}<br/>${info.event.title}`,
                    allowHTML: true,
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
                return this.calendarEvents; 
            }
        }
    };
</script>

<style scoped>
    .agenda {
        width: 100%;
        height: 1400px;
    }

    .demo-app {
        font-size: 12px;
    }

    .demo-app-top {
        margin: 0 0 3em;
    }


    .invisible {
        visibility: hidden;
        height: 0px;
    }
</style>