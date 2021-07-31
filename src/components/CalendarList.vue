<template>
    <div class="box">
        <div v-for="day in days"
             v-bind:key="day">
            <h3>{{day}}</h3>
            <div v-for="unit in computedDays[day]"
                v-bind:key="unit.ep_link">
                <a :href="unit.ep_link">
                    <span>{{unit.ep_time_date}}</span>
                    <span>{{unit.title}}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

import StoreFilter from '@/components/StoreFilter'
import { ref, computed, toRefs, onMounted } from 'vue'

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
                    caught = caught && (isDubbedOn || unit.title.slice(-4) !== "Dub)")
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
}

</style>