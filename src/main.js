import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import AnimeLineup from '@/components/AnimeLineup'
import APropos from "@/components/APropos"
import AnimeCatalogue from "@/components/AnimeCatalogue"

Vue.use(VueRouter)

Vue.config.productionTip = false


const routes = [
  {
    path: '/',
    name: 'Full Lineup',
    component: AnimeLineup,
    props:  { full_lineup_url: "json/full_lineup.json"}
  },
  {
    path: '/about',
    name: "A Propos",
    component: APropos
  },
  {
    path: '/full-lineup',
    component: AnimeCatalogue,
    props: { full_lineup_url: "json/full_catalogue.json"}
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

/*
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute]
    }
  },
  render (h) { return h(this.ViewComponent) }
})
*/