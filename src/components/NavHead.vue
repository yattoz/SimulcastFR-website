<template>
  <!-- <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"> -->
  <div>
    <nav>
      <div class="nav-wrapper purple ">
        <router-link class="brand-logo smart" to="/">SimulcastFR</router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul class="hide-on-med-and-down right">
          <li class="waves-effect" :class="pathname === '/' ? 'active' : ''">
            <router-link class="" to="/"  @click="pathname='/'">Simulcasts de la saison</router-link>
          </li>
            <li class="waves-effect" :class="pathname === '/calendar' ? 'active' : ''">
            <router-link class="" to="/calendar" @click="pathname='/calendar'">Calendrier</router-link>
          </li>
          <li class="waves-effect" :class="pathname === '/full-lineup' ? 'active' : ''">
            <router-link class="" to="/full-lineup" @click="pathname='/full-lineup'">Catalogue</router-link>
          </li>
          <li class="waves-effect" :class="pathname === '/added-removed' ? 'active' : ''">
            <router-link class="" to="/added-removed" @click="pathname='/added-removed'">Ajouts / Retraits</router-link>
          </li>
          <li class="waves-effect"  :class="pathname === '/about' ? 'active' : ''">
            <router-link class="" to="/about" @click="pathname='/about'">A propos</router-link>
          </li>
        </ul>
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
            pathname: "/"
        };
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      var options = { edge: "left" };
      M.Sidenav.init(elems, options);
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