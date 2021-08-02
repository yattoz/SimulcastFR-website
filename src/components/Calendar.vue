<template>

    <div class="">
        <div class="button-box">
        

        <span class="page-button" 
            :class="{active: !FilterResults.isAgendaShown}" 
            v-on:click="toggleCalendar('list')">Vue Liste
        </span>
        <span class="page-button" 
            :class="{active: FilterResults.isAgendaShown}" 
            v-on:click="toggleCalendar('agenda')">Vue Agenda
        </span>

        </div>
        <div class="agenda-container" v-if="FilterResults.isAgendaShown">
            <CalendarAgenda v-bind:calendarEvents="calendarEvents"/>
        </div>
        <div class="list-container" v-if="!FilterResults.isAgendaShown">
            <CalendarList v-bind:calendar="full_calendar"/>
        </div>
        <div style="font-style: italic; margin-top: 2em;">Crunchyroll n'affiche pas son calendrier en avance.<br/>SimulcastFR se met à jour périodiquement pour refléter les sorties quotidiennes.</div>

        <div style="font-style: italic; margin-top: 2em;">Note: toutes les heures sont données pour le fuseau horaire 'Europe/Paris'.</div>

    </div>
</template>

<script>
    import StoreFilter from '@/components/StoreFilter';
    import CalendarList from '@/components/CalendarList'
    import CalendarAgenda from '@/components/CalendarAgenda'


    const proxy = '';

 
    export default {
        components: {
            CalendarList, // make the <FullCalendar> tag available
            CalendarAgenda
        },
        props: {
            full_calendar_url: String
        },
        data: function() {
            return {
                full_calendar: [],
                calendarEvents: [],
                calendar: null,
                FilterResults: StoreFilter.state
            };
        },
        mounted() {
            var self = this;
            function fillCalendar(json) {
                self.full_calendar = json["data"];

                self.full_calendar.forEach(function(anime) {
                    let title_and_eps = anime.title
                    if (anime.ep_number.length == 1 && anime.ep_number[0].length > 0)
                        title_and_eps = anime.title + ' - épisode ' + anime.ep_number.join(', ')
                    else if (anime.ep_number.length > 1)
                        if (anime.ep_number.length == (anime.ep_number[anime.ep_number.length - 1] - anime.ep_number[0] + 1))
                            title_and_eps = `${anime.title} - tous les épisodes de ${anime.ep_number[0]} à ${anime.ep_number[anime.ep_number.length - 1]}`
                        else
                            title_and_eps = anime.title + ' - épisodes ' + anime.ep_number.join(', ')
                    
                    anime.title_and_eps = title_and_eps
                    anime.ep_time_date = new Date(anime.ep_time)  // create a new field with a Date object. Easier for the child to display.

                    self.calendarEvents.push({
                        // add new event data
                        title: title_and_eps,
                        start: anime.ep_time_date,
                        url: anime.ep_link,
                        backgroundColor: self.badgeColor(anime),
                        borderColor: self.badgeColor(anime),
                        allDay: false,
                        ex_service: anime.service, 
                        ex_title: anime.title
                    });
                });
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
            toggleCalendar(type) {
                StoreFilter.setAgendaShown(type === "agenda")
            },
            badgeColor(anime) {
                let service = anime.service;
                service = service.toLowerCase();
                if (service === "crunchyroll")
                    return "#df6300d8";
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
            }
        }
    };
</script>

<style scoped>


    .button-box {
        margin-bottom: 1em;
    }


</style>