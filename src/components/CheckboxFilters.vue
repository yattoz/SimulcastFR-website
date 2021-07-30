<template>
    <div class="border background-on">
    <div class="filter-item" style="text-align: center; ">
        Filtres
    </div>
    <SearchBox class="filter-item" style="padding-left: 0.2em;" />

    <div class="filter-item ">
        <label class="label">
        <div>Crunchyroll</div>
        <input class="toggle toggle-crunchyroll" :checked="isCrunchyrollOn" type="checkbox" v-on:click="toggleServices('crunchyroll')">
        </label>
    </div>
    <div class="filter-item ">
        <label class="label">
        <div>ADN</div>
        <input class="toggle toggle-adn" :checked="isAdnOn" type="checkbox" v-on:click="toggleServices('adn')">

        </label>
    </div>
    <div class="filter-item ">
        <label class="label">
        <div>Wakanim</div>
        <input class="toggle toggle-wakanim" :checked="isWakanimOn" type="checkbox" v-on:click="toggleServices('wakanim')">

        </label>
    </div>
    <div class="filter-item ">
        <label class="label">
        <div>Amazon Prime Video</div>
        <input class="toggle toggle-prime" :checked="isPrimeVideoOn" type="checkbox" v-on:click="toggleServices('primevideo')">

        </label>
    </div>
        <div class="filter-item ">
        <label class="label">
        <div>Netflix</div>
        <input class="toggle toggle-netflix" :checked="isNetflixOn" type="checkbox" v-on:click="toggleServices('netflix')">

        </label>
    </div>
    <div class="filter-item ">
        <label class="label">
        <div>Vue compacte</div>
        <input class="toggle" :checked="isCompactModeOn" type="checkbox" v-on:click="toggleTitle()">

        </label>
    </div>
        <div class="filter-item">
        <label class="label">
        <div>Doublages</div>
        <input class="toggle" :checked="isDubbedOn" type="checkbox" v-on:click="toggleDubbed()">

        </label>
    </div>
    </div>
</template>

<script>
    import StoreFilter from "@/components/StoreFilter"
    import SearchBox from "@/components/SearchBox";

    export default {
        name: "CheckboxFilters",
        components: {
            SearchBox
        },
        data() {
            return {
                Filter: StoreFilter,
                isCrunchyrollOn: true,
                isAdnOn: true,
                isWakanimOn: true,
                isPrimeVideoOn: true,
                isNetflixOn: true,
                isCompactModeOn: false,
                isDubbedOn: false
            }
        },
        mounted() {
            //var self = this;
            this.isCrunchyrollOn = this.Filter.state.tableServices.includes('crunchyroll')
            this.isAdnOn = this.Filter.state.tableServices.includes('adn')
            this.isWakanimOn = this.Filter.state.tableServices.includes('wakanim')
            this.isPrimeVideoOn = this.Filter.state.tableServices.includes('primevideo')
            this.isNetflixOn = this.Filter.state.tableServices.includes('netflix')
            this.isCompactModeOn = this.Filter.state.isTitleShown
            this.isDubbedOn = this.Filter.state.isDubbedOn
        },
        methods: {
            toggleTitle(){
                this.Filter.toggleTitle()
                this.isCompactModeOn = this.Filter.state.isTitleShown // firefox bug at init, I set it all the time now...
            },
            toggleDubbed(){
                this.Filter.toggleDubbed()
                this.isDubbedOn = this.Filter.state.isDubbedOn // firefox bug at init, I set it all the time now...
            },
            updateScaling() {
                let value = document.getElementById('scaleRange').value;
                this.forceRedraw();
                this.Filter.updateScaling(value);
            },
            forceRedraw() {
                this.Filter.forceRedraw();
            },
            toggleServices(service) {
                this.Filter.toggleServices(service);
            },
            setServiceSort(type) {
                this.Filter.setServiceSort(type);
            }
        }
    }
</script>

<style scoped>

    .label {
        align-content: center;
        display: grid;
        grid-template-columns: max-content auto;
        gap: 8px;
        float: right;
        vertical-align: middle;
    }

    span{
        margin-right: 0em;
        float: right
    }

    .filter-item{
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.0em;
        padding: 0.4em 0em 0.4em 0em;
        z-index: 1;
    }
    
.toggle {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 40px;
  height: 20px;
  display: inline-block;
  position: relative;
  border-radius: 999px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #707070;
  transition: background-color ease 0.3s;
  vertical-align: middle;
}

.toggle:before {
  content: " ";
  display: block;
  position: absolute;
  z-index: 2;
  width: 16px;
  height: 16px;
  background: #fff;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  font: 10px/28px Helvetica;
  text-transform: uppercase;
  font-weight: bold;
  text-indent: -22px;
  word-spacing: 37px;
  color: #fff;
  text-shadow: 0px 0px 2px rgba(160, 124, 124, 0.8);
  white-space: nowrap;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.8);
  transition: background-color 0.15s ease-in-out, left 0.25s ease-in-out 0.25s;
}

.toggle:checked {
  background-color: #4CD964;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.70);
}

.toggle-crunchyroll:checked {
  background-color: #df6300;
}

.toggle-adn:checked {
  background-color: #0066ff;
}

.toggle-wakanim:checked {
  background-color: #e0000a;
}

.toggle-prime:checked {
  background-color: #00a8e0;
}

.toggle-netflix:checked {
  background-color: #000000;
}


.toggle:checked:before {
  left: 22px;
}
</style>