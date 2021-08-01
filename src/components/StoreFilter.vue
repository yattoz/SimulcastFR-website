<template>
    <div></div>
</template>

<script>
    import {reactive} from 'vue';
    export default {
        name: "StoreFilter",
        state: reactive({
            search: "",
            isTitleShown: false,
            isDubbedOn: false,
            isAgendaShown: true,
            cardScaling: 1.0,
            serviceSort: false,
            tableServices: ['crunchyroll', 'adn', 'wakanim', 'primevideo', 'netflix'],
            forceRedraw: false,
            itemsPerPage: 200
        }),
        setSearch: function(str) {
            this.state.search = str;
            //console.log("StoreFilter.search = " + this.state.search);
        },
        toggleTitle: function() {
            this.state.isTitleShown = !this.state.isTitleShown;
            //console.log("StoreFilter.isTitleShown = " + this.state.isTitleShown)
        },
        toggleDubbed: function() {
            this.state.isDubbedOn = !this.state.isDubbedOn
            //console.log("StoreFilter.isDubbedOn = " + this.state.isDubbedOn)
        },
        updateScaling: function(value) {
            this.state.cardScaling = value;
            //console.log("StoreFilter.cardScaling = " + this.state.cardScaling)
        },
        forceRedraw: function() {
            this.state.forceRedraw = !this.state.forceRedraw;
            //console.log("Force redraw")
        },
        setServiceSort: function(type) {
            this.state.serviceSort = type;
            //console.log("StoreFilter.serviceSort = " + this.state.serviceSort)
        },
        toggleServices: function(service) {
            if (this.state.tableServices.includes(service))
            {
                this.state.tableServices = this.state.tableServices.filter(function (s) {
                    return !s.match(service);
                });
            } else {
                this.state.tableServices.push(service);
            }
        },
        setItemsPerPage: function(number) {
            this.state.itemsPerPage = number
        },
        setAgendaShown: function(bool) {
            this.state.isAgendaShown = bool
        }
    }
</script>