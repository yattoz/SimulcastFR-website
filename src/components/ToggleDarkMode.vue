<!-- brutally scavenged from https://yonkov.github.io/post/add-dark-mode-to-vuepress/ --> 
<template>
  <div class="dark-mode-widget">
    <input type="checkbox" id="theme-toggle" @click="toggleDarkTheme" />
    <label for="theme-toggle"><span></span></label>
  </div>
</template>

<script>
export default {
  name: "ToggleDarkMode",
  mounted() {
    this.checkUserPreference();
  },
  methods: {
    toggleDarkTheme() {
      const body = document.body;
      body.classList.toggle("dark-mode");
      //If dark mode is selected
      if (body.classList.contains("dark-mode")) {
        //Save user preference in storage
        localStorage.setItem("dark-theme", "true");
        //If light mode is selected
      } else {
        body.classList.remove("dark-mode");
        setTimeout(function () {
          localStorage.removeItem("dark-theme");
        }, 100);
      }
    },
    checkUserPreference() {
      //Check Storage on Page load. Keep user preference through sessions
      if (localStorage.getItem("dark-theme")) {
        document.body.classList.add("dark-mode");
        document.getElementById("theme-toggle").checked = true;
      }
    },
  },
};
</script>

<style>
.dark-mode-widget {
  display: table;
  margin: 1em auto;
}
body.dark-mode {
  background: #323232;
}

body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3,
body.dark-mode p,
body.dark-mode label {
  color: #f1f1f1;
}


body.dark-mode .extendview {
    color:#f1f1f1;
}

body.dark-mode .extendview,
body.dark-mode .card {
    background-color: #555555;
}




#theme-toggle {
  display: none;
}
#theme-toggle + label {
  font-size: 1rem;
  display: flex;
  width: 4em;
  border-radius: 2em;
  background-size: auto 8em;
  background-position: bottom;
  background-image: linear-gradient(
    180deg,
    #021037 0%,
    #20206a 19%,
    #4184b1 66%,
    #62e7f7 100%
  );
  transition: 0.2s;
  border: 0.125em solid #eef3f6;
  overflow: hidden;
}
#theme-toggle + label span {
  background: #fffad8;
  border-radius: 50%;
  height: 2em;
  width: 2em;
  transform: translateX(-0.125em) scale(0.65);
  transition: 0.2s;
  cursor: pointer;
  box-shadow: 0 0 0.25em 0.0625em #fbee8d, 0 0 2em 0 #ffeb3b,
    inset -0.25em -0.25em 0 0 #fbee8e,
    inset -0.3125em -0.3125em 0 0.625em #fff5b2;
  margin-top: -0.125em;
}
#theme-toggle:checked {
  font-size: 10rem;
}
#theme-toggle:checked + label {
  background-position: top;
  border-color: #5983a6;
}
#theme-toggle:checked + label span {
  background: transparent;
  transform: translateX(calc(100%)) scale(0.65);
  box-shadow: inset -0.1875em -0.1875em 0 0 #fbe7ef,
    inset -0.5625em -0.5625em 0 0 #fffff7;
}
</style>