<template>
    <div class="">
        <h1>En construction !</h1>
         <button class="btn" @click="toggleWeekends">toggle weekends</button>
                <FullCalendar
                        class="demo-app-calendar"
                        ref="fullCalendar"
                        defaultView="timeGridWeek"

                        :header="{
                            left: '',
                            center: 'Simulcast Ete 2019',
                            right: 'timeGridWeek,timeGridDay'
                          }"
                        :plugins="calendarPlugins"
                        :weekends="calendarWeekends"
                        :events="calendarEvents"
                        :locales="['fr']"
                        :height="100"
                        @dateClick="handleDateClick"
                />
    </div>
</template>

<script>
    import FullCalendar from "@fullcalendar/vue";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import timeGridPlugin from "@fullcalendar/timegrid";
    import interactionPlugin from "@fullcalendar/interaction";
    import frLocale from '@fullcalendar/core/locales/fr';

    // must manually include stylesheets for each plugin
    import "@fullcalendar/core/main.css";
    import "@fullcalendar/daygrid/main.css";
    import "@fullcalendar/timegrid/main.css";

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
                    interactionPlugin // needed for dateClick
                ],
                calendarWeekends: true,
                calendarEvents: [
                    // initial event data
                    { title: "Event Now", start: new Date() }
                ]
            };
        },
        mounted() {
            this.calendarEvents.push({
                // add new event data
                title: "New Event",
                start: new Date("2019-"),
                allDay: false
            });
        },
        methods: {
            toggleWeekends() {
                this.calendarWeekends = !this.calendarWeekends; // update a property
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

    }

    .demo-app-calendar {
        margin: 0 auto;
        max-width: 900px;
    }
</style>