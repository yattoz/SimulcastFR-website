<template>
    <!--
    <div class="">
        <ul class="uk-nav uk-nav-default">
            <li class="uk-active"><a href="#">Active</a></li>
            <li>
            <label>
                <input class="uk-checkbox" type="checkbox" v-on:click="toggleTitle()">
                Vue compacte
            </label>

            </li>
            <li>
                <label>
                    <input checked class="uk-checkbox" type="checkbox" v-on:click="toggleServices('crunchyroll')">
                    Crunchyroll
                </label>
            </li>
            <li>
                <label>
                    <input checked class="uk-checkbox" type="checkbox" v-on:click="toggleServices('adn') ">
                    ADN
                </label>
            </li>
            <li>
                <label>
                    <input checked class="uk-checkbox uk-active" type="checkbox" v-on:click="toggleServices('wakanim')">
                    Wakanim
                </label>
            </li>


            <div class="uk-form-label">Tri :</div>
            <div class="uk-form-controls">
                <label><input checked class="uk-radio" type="radio" name="radio1" v-on:click="setServiceSort(false)"> Alphabétique</label><br>
                <label><input class="uk-radio" type="radio" name="radio1" v-on:click="setServiceSort(true)"> Par site</label>
            </div>
            <div class="uk-margin">
            <div class="uk-form-label">Zoom :</div>
                <div class="uk-form-controls">
                    <input id="scaleRange" class="uk-range" type="range" :value="sliderValue" min="0.6" max="1.4" step="0.1" v-on:input.prevent="updateScaling()">
                </div>
            </div>

        </ul>
    </div>
    -->
    <div>
    <div class="switch">
        <label>
        Crunchyroll
        <input :checked="isCrunchyrollOn" type="checkbox" v-on:click="toggleServices('crunchyroll')">
        <span class="lever"></span>
        </label>
    </div>
    <div class="switch">
        <label>
        ADN
        <input :checked="isAdnOn" type="checkbox" v-on:click="toggleServices('adn')">
        <span class="lever"></span>
        </label>
    </div>
    <div class="switch">
        <label>
        Wakanim
        <input :checked="isWakanimOn" type="checkbox" v-on:click="toggleServices('wakanim')">
        <span class="lever"></span>
        </label>
    </div>
    <div class="switch">
        <label>
        Amazon Prime Video
        <input :checked="isPrimeVideoOn" type="checkbox" v-on:click="toggleServices('primevideo')">
        <span class="lever"></span>
        </label>
    </div>
    <div class="switch">
        <label>
        Vue compacte
        <input :checked="isCompactModeOn" type="checkbox" v-on:click="toggleTitle()">
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
                isCompactModeOn: false,
            }
        },
        mounted() {
            var self = this;
            this.isCrunchyrollOn = this.Filter.state.tableServices.includes('crunchyroll')
            this.isAdnOn = this.Filter.state.tableServices.includes('adn')
            this.isWakanimOn = this.Filter.state.tableServices.includes('wakanim')
            this.isPrimeVideoOn = this.Filter.state.tableServices.includes('primevideo')
            this.isCompactModeOn = this.Filter.state.isTitleShown
        },
        methods: {
            toggleTitle(){
                this.Filter.toggleTitle()
                this.isCompactModeOn = this.Filter.state.isTitleShown // firefox bug at init, I set it all the time now...
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
    }

    .switch input{
        margin-right: 0em;
    }

</style>