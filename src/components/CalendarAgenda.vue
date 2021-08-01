<template>
        <div class="agenda" id="fullCalendarWidget">
            <div ref="cal" :computed="setCalendar(computedCalendarEvents)" >
                <!-- this simply forces the setCalendar to be re-run every time the computed changes. -->
            </div>
        </div>
</template>

<script>

import { ref, computed, toRefs, onMounted, onActivated, onUpdated } from 'vue'
import { Calendar } from '@fullcalendar/core';
import StoreFilter from '@/components/StoreFilter'

import timeGridPlugin from "@fullcalendar/timegrid";

import tippy from 'tippy.js'

export default {
    components: {
        StoreFilter
    },
    props: {
        calendarEvents: Array,
    },
    data () {
        return {
            calendarWidget: null
        }
    },
    setup(props) {
        const { calendarEvents } = toRefs(props)
        const filter = ref(StoreFilter.state)
        const cal = ref(null) 
        let calendarWidget = ref(null)

        let renderTooltip = ref(function(info) {
            info.el.style.color = "white"
            info.el.style.lineHeight = "1em"
            info.el.style.fontSize = "10pt"
            info.el.style.height = "4.2em"
            let intl = new Intl.DateTimeFormat('fr-FR', {month: 'numeric', day: 'numeric', hour: 'numeric', 'minute': 'numeric'})

            let tooltip = tippy(info.el, {
                content: `${intl.format(info.event.start)}<br/>${info.event.title}`,
                allowHTML: true,
            })            
        })

        onMounted( () => {
            let calendarPlugins = [ timeGridPlugin ]
            let calendarWeekends = true
            let calendarEl = cal.value// document.getElementById("fullCalendarWidget")
            console.log(calendarEl)

            

            calendarWidget.value = new Calendar(calendarEl, {
                    initialView: "timeGridWeek",
                    weekNumberCalculation: "ISO",
                    headerToolbar: {
                        start: 'title', // will normally be on the left. if RTL, will be on the right
                        center: '',
                        end: '' //'today prev,next' // will normally be on the right. if RTL, will be on the left
                        },
                    eventDidMount: renderTooltip.value,
                    viewClassNames: ["background-on"],
                    plugins: calendarPlugins,
                    weekends: calendarWeekends,
                    events: [],
                    locales: ['fr'],
                    height: 'auto'
            })
            console.log(calendarWidget)
            
        })

        onUpdated( () => {
            // if the calendar is created, the component is deactivated, the window resized, then re-activated,
            // fullCalendar hasn't listened to window resizes so we should re-render it.
            if (calendarWidget.value != null) 
                calendarWidget.value.render()

        });

        let computedCalendarEvents = computed( () => {
            let typedText = filter.value.search;
            let tableServices = filter.value.tableServices
            let isDubbedOn = filter.value.isDubbedOn

            let res = calendarEvents.value.filter(unit => {
                        let caught = typedText === "";
                        caught = caught || unit.ex_title.toLowerCase().indexOf(typedText.toLowerCase()) > -1;
                        caught = caught && tableServices.includes(unit.ex_service);
                        caught = caught && (isDubbedOn || (unit.ex_title.slice(-4) !== "Dub)" && unit.ex_title.slice(-4) !== "(VF)"))
                        return caught;
            });
            return res;
        })


        return {
            calendarEvents,
            cal,
            calendarWidget,
            renderTooltip,
            filter,
            computedCalendarEvents
        }

    },
    methods: {
        setCalendar(newEvents) {
            if (this.calendarWidget) {
                let oldEvents = this.calendarWidget.getEvents()
                oldEvents.forEach(e => {
                    e.remove()
                })
                newEvents.forEach(e => {
                    this.calendarWidget.addEvent(e)
                })
            }
        }
    }
}
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
</style>