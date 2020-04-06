<template>
  <!-- <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"> -->
  <div>
    <nav class="nav-extended">
      <div class="nav-wrapper purple ">
        <div class="nav-content">
        <router-link class="brand-logo smart" to="/">SimulcastFR</router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul class="tabs tabs-transparent hide-on-med-and-down">
          <li class="tab" @click="setPath('/')" id="/">
            <router-link :class="this.path == '/' ? 'active' : ''" to="/" >Simulcasts de la saison</router-link>
          </li>
            <li class="tab" @click="setPath('/calendar')" id="/calendar">
            <router-link :class="this.path == '/calendar' ? 'active' : ''" to="/calendar" >Calendrier</router-link>
          </li>
          <li class="tab" @click="setPath('/full-lineup')" id="/full-lineup">
            <router-link class="" to="/full-lineup" >Catalogue</router-link>
          </li>
          <li class="tab" @click="setPath('/added-removed')" id="/added-removed">
            <router-link class="" to="/added-removed" >Ajouts / Retraits</router-link>
          </li>
          <li class="tab" @click="setPath('/about')" id="/about">
            <router-link :class="this.path == '/about' ? 'active' : ''" to="/about">A propos</router-link>
          </li>
        </ul>
        </div>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li>
        <router-link class="waves-effect sidenav-close" to="/">Simulcasts de la saison</router-link>
      </li>
      <li>
      <router-link class="waves-effect sidenav-close" to="/calendar">Calendrier</router-link>
          </li>
      <li>
        <router-link class="waves-effect sidenav-close" to="/full-lineup">Catalogue</router-link>
      </li>
      <li>
        <router-link class="waves-effect sidenav-close" to="/added-removed">Ajouts / Retraits</router-link>
      </li>
      <li>
        <router-link class="waves-effect sidenav-close" to="/about">A propos</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
//import Router from "vue-router";
import M from "materialize-css";

export default {
  name: "NavHead",
  data() {
    return {
      path: ""
    };
  },
  methods: {
    setPath: function(str) {
      this.path = str;
      console.log("Path = " + this.path);
    }
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      var options = { edge: "left" };
      M.Sidenav.init(elems, options);

      var el = document.querySelectorAll(".tabs");
      console.log(el);
      options = { };
      var instance = M.Tabs.init(el, options);
      console.log(instance);

      this.path = window.location.pathname;
      console.log(this.path);

      instance[0].select(this.path);
      instance[0].updateTabIndicator();

    });
  }
};
</script>

<style scoped>

/*
.{
  color: #fefefe;
}
.:hover {
  color: #e3e3e3;
}
*/

@media (min-width: 993px) {
  .smart {
    position: relative;
  }
}




</style>