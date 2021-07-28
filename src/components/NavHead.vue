<template>
  <!-- <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"> -->
  <div>
    <nav class="nav-extended  z-depth-3">
      <div class="nav-wrapper purple">
        <div class="nav-content ">
          
          <router-link class="brand-logo smart" to="/" ><span @click="setPath('/')" >SimulcastFR
          <span class="hide-on-med-and-down"> —  le catalogue de l'animation simulcast</span></span></router-link>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul class="tabs tabs-transparent hide-on-med-and-down">
            <li class="tab" @click="setPath('/')" id="/">
              <router-link to="/">Simulcasts de la saison</router-link>
            </li>
            <li class="tab" @click="setPath('/calendar')" id="/calendar">
              <router-link to="/calendar"
              >Calendrier</router-link>
            </li>
            <li class="tab" @click="setPath('/full-lineup')" id="/full-lineup">
              <router-link to="/full-lineup">Catalogue</router-link>
            </li>
            <li class="tab" @click="setPath('/added-removed')" id="/added-removed">
              <router-link to="/added-removed">Ajouts / Retraits</router-link>
            </li>
            <li class="tab" @click="setPath('/about')" id="/about">
              <router-link to="/about">A propos</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!--
    <ul class="sidenav" id="mobile-demo">
      <li @click="setPath('/')" :class="this.path == '/' ? 'active' : ''" to="/">
        <router-link class="waves-effect sidenav-close" to="/">Simulcasts de la saison</router-link>
      </li>
      <li @click="setPath('/calendar')" :class="this.path == '/calendar' ? 'active' : ''" to="/">
        <router-link class="waves-effect sidenav-close" to="/calendar">Calendrier</router-link>
      </li>
      <li @click="setPath('/full-lineup')" :class="this.path == '/full-lineup' ? 'active' : ''" to="/">
        <router-link class="waves-effect sidenav-close" to="/full-lineup">Catalogue</router-link>
      </li>
      <li @click="setPath('/added-removed')" :class="this.path == '/' ? 'added-removed' : ''" to="/">
        <router-link class="waves-effect sidenav-close" to="/added-removed">Ajouts / Retraits</router-link>
      </li>
      <li @click="setPath('/about')" :class="this.path == '/' ? 'active' : ''" to="/">
        <router-link class="waves-effect sidenav-close" to="/about">A propos</router-link>
      </li>
    </ul>-->
  </div>
</template>

<script>

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
      var el = document.querySelector(".tabs");
    }
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelector(".sidenav");
      var options = { edge: "left" };

      var el = document.querySelector(".tabs");
      console.log(el);
      options = {};
      this.path = window.location.pathname;
      console.log(this.path);
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