<template>
    <div class="top-bar">
      <div class="">
        <div class="">
          <div class="logo-bar">
              <router-link to="/" >
              <img class="logo-small" src="@/assets/logo_small.png"/>
                <span class="" @click="setPath('/')" >SimulcastFR<span class="hide-subtitle"> —  le catalogue de l'animation simulcast</span></span>
              </router-link>
              <ToggleDarkMode class="toggle-dark-mode"/>
          </div>

          <div class="navbar">
            <div class="tab" @click="setPath('/')" id="/">
              <router-link to="/">Saison en cours</router-link>
            </div>
            <div class="tab" @click="setPath('/calendar')" id="/calendar">
              <router-link to="/calendar"
              >Calendrier</router-link>
            </div>
            <div class="tab" @click="setPath('/full-lineup')" id="/full-lineup">
              <router-link to="/full-lineup">Catalogue</router-link>
            </div>
            <div class="tab" @click="setPath('/added-removed')" id="/added-removed">
              <router-link to="/added-removed">Ajouts / Retraits</router-link>
            </div>
            <div class="tab" @click="setPath('/about')" id="/about">
              <router-link to="/about">A propos</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import ToggleDarkMode from "@/components/ToggleDarkMode"
  export default {
  name: "NavHead",
  components: {
    ToggleDarkMode
  },
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
  },
  watch:{
    $route (to, from){
        let previousLink = document.getElementById(from.path)
        let activeLink = document.getElementById(to.path)
        if (previousLink)
          previousLink.classList.remove("active-tab")
        activeLink.classList.add("active-tab")
    }
} 
};
</script>

<style scoped>

.toggle-dark-mode {
  position: absolute;
  right: 0.2em;
  top: -0.6em;
}

.active-tab {
    font-weight: bolder;
    text-decoration: underline;
    text-decoration-thickness: 0.15em;
    text-underline-offset: 0.4em;
  }

@media (max-width: 768px) {
  .hide-subtitle {
    display: none;
  }
}

@media (max-width: 576px) {
  .navbar {
    padding-top: 1em;
    padding-bottom: 1em;
    text-align: center;
  }
  .tab {
    display: table;
    margin: 1em;
    font-size: 14pt;
    white-space: nowrap;
    margin-left: 2em;
  }
  .active-tab {
    transform: translateX(0em);
  }
  .active-tab::before {
    position: absolute;
    transform: translate(-1.2em, 0);
    content: '▶';
    margin-left: 0em;
    width: max-content;
    height: max-content;
    text-decoration: none;
    text-decoration-thickness: 0px;
    padding-right: 0.4em;
  }
}

@media (min-width: 576px) {

  .navbar {
    overflow-y: hidden;
    overflow-x: auto;
    scrollbar-width: thin;

    padding-top: 1em;
    padding-bottom: 1em;
    /* overwrite border, background-on*/
    background-color: inherit;
    box-shadow: none;
  }

  body.dark-mode .navbar {
    overflow-y: hidden;
    overflow-x: auto;
    scrollbar-width: thin;

    padding-top: 1em;
    padding-bottom: 1em;
    /* overwrite border, background-on*/
    background-color: inherit;
    box-shadow: none;
  }

  .navbar::-webkit-scrollbar {
      width: 0.4em;
      height: 0.4em;
  }

  .navbar::-webkit-scrollbar-thumb {
      background: rgba(85, 85, 85, 0.4);
      border-radius: 1em;
      visibility:visible;
  }
  .navbar:hover::-webkit-scrollbar-thumb {
      visibility:visible;
  }

  .tab {
    display: inline;
    margin: 1em;
    font-size: 14pt;
    white-space: nowrap;
  }
}

.top-bar {
  /* box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4); */
  margin-bottom: 2em;
}

.logo-bar {
  font-size: 16pt;
  height: 2.2em;
  white-space: nowrap;
}

.logo-bar::after {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  height: inherit;
  width: 100%;
  background-color: var(--active-white);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);
  z-index: -1;
}

body.dark-mode .logo-bar::after {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  height: inherit;
  width: 100%;
  background-color: var(--active-black);
  z-index: -1;
}

.logo-bar-content {
  background-color: transparent;
} 


.logo-small {
  height: 1.3em;
  padding-right: 0.4em;
  padding-left: 0.4em;
  vertical-align: text-bottom;
}

</style>