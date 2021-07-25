<template>
  <!-- Layout items -->
  <div>
    <div align="left">
      <div class="row">
      <div class = "datetime">
         <h5>
           {{ computedTime }} 
          </h5>
      </div>
        <div class="col s12 m12 l6 catalogue-col">
        <div align="center" class="col-title added-title">
            Nouvelles licences
        </div>
              <ul class="box" v-bind:class="{box_compact: FilterResults.isTitleShown}">
                <li
                  v-for="unit in computedAdded"
                  v-bind:key="unit.title.concat('_').concat(unit.service)"
                  class="textoverflow added"
                >
                  <a
                    :href="unit.link"
                    @click.prevent="open_link_in_tab(unit.link)"
                    v-tooltip.top="{content: unit.title, delay: 300}"
                    style="color: #000000"
                  >
                    <img class="service-icon" :src="'/icons/'+unit.service+'.png'" />
                    <span class="title">{{unit.title}}</span>
                  </a>
                </li>
              </ul>
              <div
                align="center"
                class="no_result"
                v-if="computedAdded.length <= 0  && !( (this.FilterResults.search.length === 0 || !(this.FilterResults.search.trim())))"
              >
                <p>Pas de changements avec ces filtres.</p>
              </div>
            <div
              align="center"
              class="no_result"
              v-if="computedAdded.length <= 0  && ( (this.FilterResults.search.length === 0 || !(this.FilterResults.search.trim())))"
            >
              <p>Pas de changements.</p>
            </div>
            <div style="margin-bottom: 0em;"/> <!-- a bit of spacing -->
        </div>
        <div class="col s12 m12 l6 catalogue-col">
          <div align="left"> <!-- a bit of spacing -->
            <div align="center" class="col-title removed-title">
                Licences expirées
            </div>
            <ul class="box"  v-bind:class="{box_compact: FilterResults.isTitleShown}">
              <li
                v-for="unit in computedRemoved"
                v-bind:key="unit.title.concat('_').concat(unit.service)"
                class="textoverflow removed"
              >
                <a
                  :href="unit.link"
                  @click.prevent="open_link_in_tab(unit.link)"
                  v-tooltip.top="{content: unit.title, delay: 300}"
                  style="color: #000000"
                >
                  <img class="service-icon" :src="'/icons/'+unit.service+'.png'" />
                  <span class="title">{{unit.title}}</span>
                </a>
              </li>
            </ul>

            <div
              align="center"
              class="no_result"
              v-if="computedRemoved.length <= 0  && ( (this.FilterResults.search.length === 0 || !(this.FilterResults.search.trim())))"
            >
              <p>Pas de changements.</p>
            </div>

            <div
              align="center"
              class="no_result"
              v-if="computedRemoved.length <= 0  && !( (this.FilterResults.search.length === 0 || !(this.FilterResults.search.trim())))">
              <p>Pas de changements avec ces filtres.</p>
            </div>
            <div style="margin-bottom: 0em;"/> <!-- a bit of spacing -->
          </div>
        </div>
      </div>
    </div>
    <div style = 'padding: 0.6em; padding-left: 4em; padding-right: 4em'>
    <!-- <div style='border: solid 1px rgba(0, 0, 0, 0.3);'/> -->
    </div>
  </div>
</template>

<script>

import StoreFilter from "@/components/StoreFilter";

/*
    const cr_lineup_url = "json/cr_lineup.json";
    const adn_lineup_url = ".son/adn_lineup.json";
    const waka_lineup_url = "json/waka_lineup.json";
     */
//const diff_catalogue_url = "json/full_lineup.json";
const proxy = "";
//const proxy = '';

export default {
  name: "WeekAddedRemoved",
  components: {},
  props: {
    diff_catalogue_url: String,
    added_lineup: "",
    removed_lineup: "",
    time_begin: "",
    time_end: ""
  },
  data() {
    return {
      FilterResults: StoreFilter.state
    };
  },
  mounted() {
    var self = this;
    /*
                json.forEach(period => {
                    console.log(period);
                     if (period["type"] == "added") {
                        period_data.forEach(anime => {
                            anime["time"] = period["time"]["begin"];
                            self.added_lineup.push(anime);
                        });
                     }
                    if (period["type"] == "removed") {
                        period_data.forEach(anime => {
                            anime["time"] = period["time"]["begin"];
                            self.removed_lineup.push(anime);
                        });
                     }
                     console.log(period_data);
                });
            });
            */
  },
  methods: {
    badgeColor(service) {
      //let service = this.anime.service;
      service = service.toLowerCase();
      if (service === "crunchyroll") return "#df6300";
      if (service === "adn") return "#0066ff";
      if (service === "wakanim") return "#e0000a";
      if (service == "primevideo") return "#00a8e0";
      if (service == "netflix") return "#000000";
      return "#fefefe";
    },
    open_link_in_tab(url) {
      window.open(url);
    }
  },
  computed: {
    computedTime() {
        var period_beg = new Date(this.time_begin);
        var period_end = new Date(this.time_end);
        //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const options = {month: 'long', day: 'numeric' };
        return "Entre le ".concat(period_beg.toLocaleDateString('fr-FR', options)).concat(" et ").concat(period_end.toLocaleDateString('fr-FR', options));
    },
    computedAdded() {
      var typedText = this.FilterResults.search;
      var serviceSort = this.FilterResults.serviceSort;
      var tmp = this.added_lineup["data"];
      if (serviceSort) {
        tmp = tmp.sort(function(a, b) {
          return ("" + a.service.toLocaleString()).localeCompare(
            b.service.toLocaleString()
          );
        });
      } else {
        tmp = tmp.sort(function(a, b) {
          return ("" + a.title.toLocaleString()).localeCompare(
            b.title.toLocaleString()
          );
        });
      }
      return tmp.filter(unit => {
        let caught = typedText === "";
        caught =
          caught ||
          unit.title.toLowerCase().indexOf(typedText.toLowerCase()) > -1;
        caught =
          caught && this.FilterResults.tableServices.includes(unit.service);
        return caught;
      });
    },
    computedRemoved() {
      var typedText = this.FilterResults.search;
      var serviceSort = this.FilterResults.serviceSort;
      var tmp = this.removed_lineup["data"];
      if (serviceSort) {
        tmp = tmp.sort(function(a, b) {
          return ("" + a.service.toLocaleString()).localeCompare(
            b.service.toLocaleString()
          );
        });
      } else {
        tmp = tmp.sort(function(a, b) {
          return ("" + a.title.toLocaleString()).localeCompare(
            b.title.toLocaleString()
          );
        });
      }
      return tmp.filter(unit => {
        let caught = typedText === "";
        caught =
          caught ||
          unit.title.toLowerCase().indexOf(typedText.toLowerCase()) > -1;
        caught =
          caught && this.FilterResults.tableServices.includes(unit.service);
        return caught;
      });
    }
  }
};
</script>

<style scoped>
.added {
  background-color: rgba(181, 231, 181, 0.5);
}

.removed {
  background-color: rgba(255, 185, 197, 0.5);
}

.added-title {
  color: rgb(0, 165, 0);
}

.removed-title {
  color: rgb(156, 0, 26);
}

.datetime{
  padding-left: 0.75em;
}

.col-title {
    padding: 0.2em;
    font-size: 12pt;
    font-weight: 501;
    /* border: solid 1px rgba(0, 0, 0, 0.15); 
    border-top-left-radius: 1em;
    border-top-right-radius: 1em; */
}

ul {
  margin: 0;
  padding: 0;
}

.box {
  display: grid;
  grid-gap: 0em;
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
}

.box_compact {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
}

.textoverflow {
  overflow: hidden;
  font-size: 1em;
  padding: 2px;
  white-space: nowrap; /* Don't forget this one */
  text-overflow: ellipsis;
  border: solid 1px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.service-icon {
  width: 1.6em;
  margin-bottom: -0.3em;
  margin-left: 0px;
  margin-right: 2px;
  position: relative;
}

.title {
  margin-left: 0em;
}

.no_result {
  font-size: large;
}
</style>
