<template>
  <div id="app">

    <div uk-grid>
      <div class="uk-width-1-6@m">
        <div uk-sticky="media:@m" class="uk-background-muted">
          <div align="left" class="uk-padding-small">
            <SearchBox/>
            <CheckboxFilters/>
          </div>
        </div>
      </div>

      <div class="uk-width-5-6@m">
        <div class="uk-background-muted">
          <ul uk-tab>
            <li class="uk-active"><router-link to="/">Simulcasts de la saison</router-link></li>
            <li><router-link to="/full-lineup">Catalogue</router-link></li>
            <li><router-link to="/about">A propos</router-link></li>
          </ul>
        </div>
        <!-- Component matched by the route will render here-->
        <router-view></router-view>

      </div>
    </div>
  </div>

</template>

<script>

import UIkit from '@/uikit/js/uikit';
import Icons from '@/uikit/js/uikit-icons';

import Router from 'vue-router';

import AnimeLineup from "@/components/AnimeLineup";
import SearchBox from "@/components/SearchBox";
import StoreFilter from '@/components/StoreFilter';
import CheckboxFilters  from "@/components/CheckboxFilters";
import CalendarExample from "@/components/CalendarExample";
import APropos from "@/components/APropos";

export default {
  name: 'app',
  components: {
    AnimeLineup,
    SearchBox,
    CheckboxFilters,
    CalendarExample,
    APropos
  },
  methods: {
    goBack () {
      window.history.length > 1
              ? this.$router.go(-1)
              : this.$router.push('/')
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
