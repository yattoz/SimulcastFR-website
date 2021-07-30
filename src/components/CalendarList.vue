<template>
    <div>
        <span>List here, soon.</span>
        <div v-for="unit in computedCalendarItems"
             v-bind:key="unit">
             {{unit.title}}
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
    data () {
        return {
        }
    }
}
</script>

<style scoped>

</style>