import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { configureCompat, createApp, h } from 'vue'
import App from './App.vue'

import AnimeLineup from '@/components/AnimeLineup'
import AnimeCatalogue from "@/components/AnimeCatalogue"
import AnimeAddedRemoved from "@/components/AnimeAddedRemoved"
import APropos from "@/components/APropos"
import Calendar from "@/components/Calendar"


configureCompat(
    {
        WATCH_ARRAY: false,
        RENDER_FUNCTION: false
    }
)

const routes = [{
        path: '/',
        name: 'Full Lineup',
        component: AnimeLineup,
        props: { full_lineup_url: "https://www.calvinballconsortium.fr/simulcastfr/json/full_lineup.json" },
        meta: {
            title: 'SimulcastFR - Les animés diffusés en ce moment'
        },
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
        meta: {
            title: "SimulcastFR - A propos"
        },
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
        meta: {
            title: "SimulcastFR - Catalogue complet des animés en France"
        },
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
        meta: {
            title: "SimulcastFR - Liste des changements"
        },
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
        meta: {
            title: "SimulcastFR - Calendrier des sorties"
        },
        beforeEnter: (to, from, next) => {
            // called before the route that renders this component is confirmed.
            // does NOT have access to `this` component instance,
            // because it has not been created yet when this guard is called
            next()
        },
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
    next()
});

// 5. Create and mount the root instance.
const app  = createApp({
    render: ()=>h(App)
});

// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.mount('#app')