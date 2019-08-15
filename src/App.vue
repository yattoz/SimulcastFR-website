<template>
  <div id="app">

  <NavHead/>


  <div class="uk-section uk-section-secondary uk-preserve-color uk-padding-remove-horizontal">
    <div class="uk-container uk-container-expand uk-padding-remove-horizontal">
      <div uk-grid>

        <div class="uk-width-1-6@m">
          <div uk-sticky="media:@m" class="uk-background-primary uk-light">
            <div align="left" class="uk-padding-small">
              <SearchBox/>
              <CheckboxFilters/>
            </div>
          </div>
        </div>
        <div class="uk-width-5-6@m">
          <div class="uk-background-secondary">
            <transition>
              <keep-alive>
                <!-- Component matched by the route will render here-->
                <router-view class="uk-light"></router-view>
              </keep-alive>
            </transition>
          </div>
        </div>
      </div>
      </div>
</div>

      </div>

</template>

<script>

import UIkit from '@/uikit/js/uikit';
import Icons from '@/uikit/js/uikit-icons';

import Router from 'vue-router';

import SearchBox from "@/components/SearchBox";
import StoreFilter from '@/components/StoreFilter';
import CheckboxFilters  from "@/components/CheckboxFilters";
import CalendarExample from "@/components/CalendarExample";
import NavHead from "@/components/NavHead";


export default {
  name: 'app',
  data() {
    return {
      loading: true
    }
  },
  components: {
    NavHead,
    SearchBox,
    CheckboxFilters,
    CalendarExample,
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
