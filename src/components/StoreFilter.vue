<template>
    <!-- empty -->
</template>

<script>
    export default {
        name: "StoreFilter",
        state: {
            search: ""
        },
        setSearch: function(str) {
            this.state.search = str;
            console.log(this.state.search);
        },
        getSearch: function() {
            console.log("getter called : " + this.state.search);
            return this.state.search.toLowerCase();
        }
    }
</script>