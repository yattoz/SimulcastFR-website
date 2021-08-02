<template>
    <div class="box">
        <h2>Semaine du {{days[0].replace("lundi ", "")}} au {{days[days.length - 1].replace("dimanche ", "")}}</h2>
        <div v-for="day in days"
             v-bind:key="day"
             class="box">
            <h3>{{day}}</h3>

            <span v-for="unit in computedDays[day]" 
                    v-bind:key="unit.title.concat('_').concat(unit.service)"  
                class="time-slot"
                :data-tippy-content="unit.title">
                <span class="hour">
                    {{unit.ep_localtime_str}}
                </span>
                <img class="service-icon" :src="'/icons/'+unit.service+'.png'" :alt="unit.service">

                <a :href="unit.link"
                    target="_blank"
                    class=""
                    >                    
                    <span class="title">
                    {{unit.title_and_eps}}
                    </span>
                </a>
            </span>
        </div>
    </div>
</template>

<script>

import StoreFilter from '@/components/StoreFilter'
import { ref, computed, toRefs, onMounted } from 'vue'

import "@/css/anime_single_line.css"


export default {
    components: {
        StoreFilter
    },
    props: {
        calendar: Array,
    },
    setup(props) {
        const { calendar } = toRefs(props)
        const filter = ref(StoreFilter.state)

        const computedCalendarItems = computed( () => { 
            let typedText = filter.value.search;
            let tableServices = filter.value.tableServices
            let isDubbedOn = filter.value.isDubbedOn

            return calendar.value.filter(unit => {
                    let caught = typedText === "";
                    caught = caught || unit.title.toLowerCase().indexOf(typedText.toLowerCase()) > -1;
                    caught = caught && tableServices.includes(unit.service);
                    caught = caught && (isDubbedOn || (unit.title.slice(-4) !== "Dub)" && unit.title.slice(-4) !== "(VF)"))
                    return caught;
            });
        })

        let computedFuncs = Array.from([1, 2, 3, 4, 5, 6, 0], (c) => 
            computed( () => {
                return computedCalendarItems.value.filter(unit => {
                    return unit.ep_time_date.getDay() == c
                })
            })
        )
        
        // generate a hash of "human readable day": computed_function_for_day
        // MAGIC!!
        let intl = new Intl.DateTimeFormat('fr-FR', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})
        let prevMonday = new Date();
        prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
        let days = Array.from({length: 7}, (v, k) => intl.format(new Date(prevMonday.getTime()).setDate(prevMonday.getDate() + k)));
        const computedDays = ref(Object.fromEntries(days.map((k, i) => [k, computedFuncs[i]])));

        let res =  {
            calendar,
            filter,
            computedCalendarItems,
            computedDays,
            days
        };
        return res;
    },
    methods: {

    },
    data () {
        return {
        }
    }
}
</script>

<style scoped>

.box {
    display: grid;
    grid-template-rows: 1fr;
    text-align: left;
    gap: 0.8em;
}

.time-slot {
    display: grid;
    gap: 0.8em;
    grid-template-columns: auto auto 1fr;
    word-wrap: break-word;
    align-items: center;
}

.hour {
    width: max-content;
}

</style>