<template>
    <div class="border">
    <div class="switch textoverflow border-bottom">
        <label>
        Crunchyroll
        <input :checked="isCrunchyrollOn" type="checkbox" v-on:click="toggleServices('crunchyroll')">
        <span class="lever"></span>
        </label>
    </div>
    <div class="switch textoverflow border-bottom">
        <label>
        ADN
        <input :checked="isAdnOn" type="checkbox" v-on:click="toggleServices('adn')">
        <span class="lever"></span>
        </label>
    </div>
    <div class="switch textoverflow border-bottom">
        <label>
        Wakanim
        <input :checked="isWakanimOn" type="checkbox" v-on:click="toggleServices('wakanim')">
        <span class="lever"></span>
        </label>
    </div>
    <div class="switch textoverflow border-bottom">
        <label>
        Amazon Prime Video
        <input :checked="isPrimeVideoOn" type="checkbox" v-on:click="toggleServices('primevideo')">
        <span class="lever"></span>
        </label>
    </div>
        <div class="switch textoverflow border-bottom">
        <label>
        Netflix
        <input :checked="isNetflixOn" type="checkbox" v-on:click="toggleServices('netflix')">
        <span class="lever"></span>
        </label>
    </div>
    <div class="switch textoverflow border-bottom">
        <label>
        Vue compacte
        <input :checked="isCompactModeOn" type="checkbox" v-on:click="toggleTitle()">
        <span class="lever"></span>
        </label>
    </div>
        <div class="switch textoverflow">
        <label>
        Doublages
        <input :checked="isDubbedOn" type="checkbox" v-on:click="toggleDubbed()">
        <span class="lever"></span>
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

    .switch label{
        color: #121212;
        float:right;
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

    .border-bottom {
        border-bottom: solid 1px rgba(0, 0, 0, 0.15);
    }

    .border {
        border: solid 1px rgba(0, 0, 0, 0.15);
        border-radius: 1em;
    }

</style>