<template>
  <div id="app">
    <div uk-grid>
      <div class="uk-width-1-6@m">
        <div uk-sticky="media:@m">
          <div align="left" class="uk-background-muted uk-padding-small">
            <SearchBox/>
            <CheckboxFilters/>
          </div>
        </div>

      </div>
      <div class="uk-width-5-6@m">
        <div class=" uk-align-center">

          <AnimeLineup/>
        </div>
      </div>
    </div>




  </div>

</template>

<script>

import UIkit from '@/uikit/js/uikit';
import Icons from '@/uikit/js/uikit-icons';

import AnimeLineup from "@/components/AnimeLineup";
import SearchBox from "@/components/SearchBox";
import StoreFilter from '@/components/StoreFilter'
import CheckboxFilters  from "@/components/CheckboxFilters"

export default {
  name: 'app',
  components: {
    AnimeLineup,
    SearchBox,
    CheckboxFilters
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
