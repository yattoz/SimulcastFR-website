<template>
    <div class="border">
    <div class="switch textoverflow border-bottom">
        <label>
        Crunchyroll
        <input class="toggle toggle-crunchyroll" :checked="isCrunchyrollOn" type="checkbox" v-on:click="toggleServices('crunchyroll')">
        </label>
    </div>
    <div class="switch textoverflow border-bottom">
        <label>
        ADN
        <input class="toggle toggle-adn" :checked="isAdnOn" type="checkbox" v-on:click="toggleServices('adn')">

        </label>
    </div>
    <div class="switch textoverflow border-bottom">
        <label>
        Wakanim
        <input class="toggle toggle-wakanim" :checked="isWakanimOn" type="checkbox" v-on:click="toggleServices('wakanim')">

        </label>
    </div>
    <div class="switch textoverflow border-bottom">
        <label>
        Amazon Prime Video
        <input class="toggle toggle-prime" :checked="isPrimeVideoOn" type="checkbox" v-on:click="toggleServices('primevideo')">

        </label>
    </div>
        <div class="switch textoverflow border-bottom">
        <label>
        Netflix
        <input class="toggle toggle-netflix" :checked="isNetflixOn" type="checkbox" v-on:click="toggleServices('netflix')">

        </label>
    </div>
    <div class="switch textoverflow border-bottom">
        <label>
        Vue compacte
        <input class="toggle" :checked="isCompactModeOn" type="checkbox" v-on:click="toggleTitle()">

        </label>
    </div>
        <div class="switch textoverflow">
        <label>
        Doublages
        <input class="toggle" :checked="isDubbedOn" type="checkbox" v-on:click="toggleDubbed()">

        </label>
    </div>
    </div>
</template>

<script>
    import StoreFilter from "@/components/StoreFilter"

    export default {
        name: "CheckboxFilters",
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

    label {
        align-content: center;
    }
    
    .switch label{
        float: right;
    }

    .switch span{
        margin-right: 0em;
        float: right
    }

    .textoverflow{
        overflow: hidden;
        font-size: 1.0em;
        padding: 0.4em;
        z-index: 1;
    }

    .switch label {
        display:inline-block;
        vertical-align: middle;
    }

    .border-bottom {
        border-bottom: solid 1px rgba(127,127,127, 1);
    }

    .border {
        border: solid 1px rgba(127,127,127, 1);
        border-radius: 1em 1em 1em 1em;
        margin: 0.4em
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
  box-shadow: 0px 0px 11px rgba(255, 255, 255, 0.65);
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