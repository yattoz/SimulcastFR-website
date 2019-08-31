<template>
  <div id="app">

  <NavHead style="margin-bottom: 3em"></NavHead>


  <div class="">
    <div class="">
      <div class="row">

        <div class="col m12 l2">
          <div class="">
            <div align="left" class="">
              <SearchBox/>
              <CheckboxFilters/>
            </div>
          </div>
        </div>
        <div class="col m12 l10">
          <div class="" >
            <transition>
              <keep-alive>
                <!-- Component matched by the route will render here-->
                <router-view></router-view>
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

</style>
