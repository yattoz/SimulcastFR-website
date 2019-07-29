<template>
  <div id="app">
    <AnimeLineup/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

import UIkit from '@/uikit/js/uikit';
import Icons from '@/uikit/js/uikit-icons';

import HelloWorld from './components/HelloWorld.vue'
import AnimeLineup from "@/components/AnimeLineup";
import SearchBox from "@/components/SearchBox";

export default {
  name: 'app',
  components: {
    HelloWorld,
    AnimeLineup,
    SearchBox
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
