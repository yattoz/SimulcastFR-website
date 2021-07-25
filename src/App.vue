<template>
  <div id="app">

  <NavHead style="margin-bottom: 3em"></NavHead>


  <div class="">
    <div class="">
      <div class="row">
        <div class="col s12 m12 l3">
          <div class="" style="margin: 0.4em; margin-bottom: 0.6em">
            <div align="left" class="">
                <SearchBox/>
                <CheckboxFilters/>
                <div class="toggleDarkModeButton">
                <ToggleDarkMode/>
                </div>
            </div>
          </div>
        </div>
        <div class="col s12 m12 l9">
          <div class="" style="margin: 0.4em" >
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
import ToggleDarkMode from "@/components/ToggleDarkMode";


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
    ToggleDarkMode,
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
  margin-top: 0px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}


    a:visited {
        color: inherit;
    }
    a:link {
        background-color: transparent;
        text-decoration: none;
        color: inherit;
    }
    
.toggleDarkModeButton {
  position: absolute;
  right: 1em;
  top: -0.2em;
}

</style>
