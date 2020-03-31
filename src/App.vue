<template>
  <div id="app">

  <NavHead style="margin-bottom: 3em"></NavHead>


  <div class="">
    <div class="">
      <div class="row">
        <div class="col s12 m12 l3">
          <div class="container" style="margin-bottom: 1em">
            <div align="left" class="">
                <SearchBox/>
                <CheckboxFilters/>
            </div>
          </div>
        </div>
        <div class="col s12 m12 l9">
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

import SearchBox from "@/components/SearchBox";
import CheckboxFilters  from "@/components/CheckboxFilters";
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
