import Vue from 'vue'
import VueRouter from 'vue-router'
import VTooltip from 'v-tooltip';


import App from './App.vue'

import AnimeLineup from '@/components/AnimeLineup'
import AnimeCatalogue from "@/components/AnimeCatalogue"
import APropos from "@/components/APropos"
import Calendar from "@/components/Calendar"


Vue.use(VueRouter)
Vue.use(VTooltip)

Vue.config.productionTip = false


const routes = [
  {
    path: '/',
    name: 'Full Lineup',
    component: AnimeLineup,
    props:  { full_lineup_url: "json/full_lineup.json"},
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
    component: AnimeCatalogue,
    props: { full_lineup_url: "json/full_catalogue.json"},
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

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
