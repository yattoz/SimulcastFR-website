<template>
    <div class="box">
        <div v-for="unit in computedCalendarItems"
             v-bind:key="unit">
            <a :href="unit.ep_link">
                <span>{{getHumanTime(unit.ep_time)}}</span>
                <span>{{unit.title}}</span>
            </a>
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

        let res =  {
            calendar,
            filter,
            computedCalendarItems
        };
        return res;
    },
    methods: {
        getHumanTime(date_string_utc) {
            const intlDate = new Intl.DateTimeFormat('fr-FR', {month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'})
            const intlTime = new Intl.DateTimeFormat('fr-FR', {hour: 'numeric', minute: 'numeric'})
            return intlTime.format(new Date(date_string_utc))
        }
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