import Vue from 'vue'
import VueRouter from 'vue-router'
import VTooltip from 'v-tooltip';


import App from './App.vue'

import AnimeLineup from '@/components/AnimeLineup'
import AnimeCatalogue from "@/components/AnimeCatalogue"
import AnimeAddedRemoved from "@/components/AnimeAddedRemoved"
import APropos from "@/components/APropos"
import Calendar from "@/components/Calendar"


Vue.use(VueRouter)
Vue.use(VTooltip)

Vue.config.productionTip = true


const routes = [{
        path: '/',
        name: 'Full Lineup',
        component: AnimeLineup,
        props: { full_lineup_url: "https://www.calvinballconsortium.fr/simulcastfr/json/full_lineup.json" },
        beforeEnter: (to, from, next) => {
            // called before the route that renders this component is confirmed.
            // does NOT have access to `this` component instance,
            // because it has not been created yet when this guard is called
            next()
        },
    },
    {
        path: '/about',
        name: "A Propos",
        component: APropos,
        beforeEnter: (to, from, next) => {
            // called before the route that renders this component is confirmed.
            // does NOT have access to `this` component instance,
            // because it has not been created yet when this guard is called
            next()
        },
    },
    {
        path: '/full-lineup',
        name: "Catalogue",
        component: AnimeCatalogue,
        props: { full_lineup_url: "https://www.calvinballconsortium.fr/simulcastfr/json/full_catalogue.json" },
        beforeEnter: (to, from, next) => {
            // called before the route that renders this component is confirmed.
            // does NOT have access to `this` component instance,
            // because it has not been created yet when this guard is called
            next()
        },
    },
    {
        path: '/added-removed',
        name: 'Ajouts / Retraits',
        component: AnimeAddedRemoved,
        props: { diff_catalogue_url: "https://www.calvinballconsortium.fr/simulcastfr/json/full_diff_catalogue.json" },
        beforeEnter: (to, from, next) => {
            // called before the route that renders this component is confirmed.
            // does NOT have access to `this` component instance,
            // because it has not been created yet when this guard is called
            next()
        },
    },
    {
        path: '/calendar',
        component: Calendar,
        props: { full_calendar_url: "https://www.calvinballconsortium.fr/simulcastfr/json/full_calendar.json" },
        beforeEnter: (to, from, next) => {

            // called before the route that renders this component is confirmed.
            // does NOT have access to `this` component instance,
            // because it has not been created yet when this guard is called
            next()
        },
    },


]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')