<template>
  <div id="app">
  <a id="top"></a>

  <NavHead style="margin-bottom: 3em"></NavHead>


  <div class="">
    <div class="">
      <div class="two-columns-asymetric">
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

    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive>
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </keep-alive>
      </transition>
    </router-view>

          </div>
        </div>
      </div>
        <a href="#top">
          <div class="scroll-up">
          <svg style="width: 100%; height: 100%;" viewBox="0 0 24 24">
    <path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />        </svg>
          </div>
        </a>
      </div>
</div>
      </div>

</template>

<script>

import SearchBox from "@/components/SearchBox";
import CheckboxFilters  from "@/components/CheckboxFilters";
import NavHead from "@/components/NavHead";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import 'tippy.js/dist/tippy.css'; // styling for all tippies


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
  }
}

</script>

<style>
    #app {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      margin-top: 0px;
    }


    a:visited {
        color: inherit;
    }
    a:link {
        background-color: transparent;
        text-decoration: none;
        color: inherit;
    }

@media (min-width: 768px) {  /* smaller than tablet */

    .two-columns-asymetric {
        display: grid;
        grid-template-columns: 1fr 5fr;
        gap: 16px;
    }

}

@media (max-width: 768px) {  /* smaller than tablet */

    .two-columns-asymetric {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
    }

}


.scroll-up {
  display: block; /* you can remove this to make the scroll-up appear.*/
  position: fixed;
  z-index: 11000;
  bottom: 3%;
  right: 3%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 99em;
  background-color: green;
  color: white;
}

</style>
