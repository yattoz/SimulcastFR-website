<template>
  <div :nbr-elems="computedAdded.length + computedRemoved.length">
    <div align="left">
      <div class = "datetime">
         <h3>
           {{ computedTime }} 
          </h3>
      </div>
      <div class="two-columns">
        <div class="">
        <div align="center" class="col-title added-title">
            Nouvelles licences
        </div>
              <div class="box added" 
                   :class="{boxcompact: FilterResults.isTitleShown}"
                   v-if="computedAdded.length > 0">
                <span
                  v-for="unit in computedAdded"
                  :key="unit.title.concat('_').concat(unit.service)"
                  class="overflowhidden"
                >
                  <a
                    :href="unit.link"
                    @click.prevent="open_link_in_tab(unit.link)"
                    :data-tippy-content="unit.title"
                    style="color: #000000"
                  >
                    <img class="service-icon" :src="'/icons/'+unit.service+'.png'" />
                    <span class="title">{{unit.title}}</span>
                  </a>
                </span>
              </div>
              <div
                align="center"
                class="no_result"
                v-else-if="computedAdded.length <= 0  && !( (FilterResults.search.length === 0 || !(FilterResults.search.trim())))"
              >
                <p>Pas de changements avec ces filtres.</p>
              </div>
              <div
                align="center"
                class="no_result"
                v-if="computedAdded.length <= 0  && ( (FilterResults.search.length === 0 || !(FilterResults.search.trim())))"
              >
                <p>Pas de changements.</p>
              </div>
            <div style="margin-bottom: 0em;"/> <!-- a bit of spacing -->
        </div>
        <div class="">
          <div align="left"> <!-- a bit of spacing -->
            <div align="center" class="col-title removed-title">
                Licences expirées
            </div>
            <div class="box removed"  
                 :class="{boxcompact: FilterResults.isTitleShown}"
                 v-if="computedRemoved.length > 0">
              <span
                v-for="unit in computedRemoved"
                :key="unit.title.concat('_').concat(unit.service)"
                class="overflowhidden"
              >
                <a
                  :href="unit.link"
                  @click.prevent="open_link_in_tab(unit.link)"
                  :data-tippy-content="unit.title"
                  style="color: #000000"
                >
                  <img class="service-icon" :src="'/icons/'+unit.service+'.png'" />
                  <span class="title">{{unit.title}}</span>
                </a>
              </span>
            </div>

            <div
              align="center"
              class="no_result"
              v-else-if="computedRemoved.length <= 0  && ( (FilterResults.search.length === 0 || !(FilterResults.search.trim())))"
            >
              <p>Pas de changements.</p>
            </div>

            <div
              align="center"
              class="no_result"
              v-if="computedRemoved.length <= 0  && !( (FilterResults.search.length === 0 || !(FilterResults.search.trim())))">
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

const proxy = "";

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


@media (min-width: 768px) /* bigger than or equal to tablet */
 {
    .two-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
}

@media (max-width: 768px) {  /* smaller than tablet */
    .two-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
}

@media (max-width: 576px) {  /* smaller than smartphone */
    .two-columns {
        display: grid;
        grid-template-columns: 1fr
    }

}



.added {
  background-color: rgba(105, 201, 105, 0.331);
}

.removed {
  background-color: rgba(219, 115, 132, 0.331);
}

.added-title {
  color: rgb(7, 147, 7);
}

.removed-title {
  color: rgb(255, 82, 111);
}

.datetime{
  padding-left: 0.75em;
  padding-top: 2em;
}

.col-title {
    padding: 0.2em;
    font-size: 12pt;
    font-weight: 501;
    /* border: solid 1px rgba(0, 0, 0, 0.15); 
    border-top-left-radius: 1em;
    border-top-right-radius: 1em; */
}

.box {
    text-align: left;
    padding: 8px;
    border-radius: 16px;
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 3px 1px -2px rgba(0, 0, 0, 0.22), 0 1px 5px 0 rgba(0, 0, 0, 0.32);
}

.boxcompact {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
}

.overflowhidden{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Don't forget this one */
}

.service-icon{
    width: 1.6em;
    height: 1.6em;
    margin-bottom: -0.3em;
    margin-left: 0px;
    margin-right: 2px;
    position: relative;
    display: inline-block;
}

.title{
    font-size: 1.0em;
    padding: 2px;
    margin-left: 0em;
    display: inline;

}
.no_result {
  font-size: large;
}
</style>
