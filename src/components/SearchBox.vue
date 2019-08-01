<template>
    <form class="uk-search">
        <div class="search-term">
            <form class="uk-search uk-search-default uk-flex-1">
                <a class="uk-form-icon uk-form-icon-flip" uk-icon="icon: close" v-on:click="clearInput()"></a>
                <input id="searchBoxAnime" class="uk-search-input" type="search" placeholder="Rechercher..." v-on:input="processInput()">
            </form>
            <a href="#" id="hiddenSearchText" class="search-filter" uk-filter-control="[data-tags*='']" hidden>Search</a>
        </div>
    </form>
</template>

<script>
    import StoreFilter from '@/components/StoreFilter';
    export default {
        name: "SearchBox",
        data() {
            return {
                search: ""
            };
        },
        methods: {
            processInput(){
                var typedText = document.getElementById('searchBoxAnime').value;
                StoreFilter.setSearch(typedText);
            },
            clearInput() {
                document.getElementById('searchBoxAnime').value = "";
                StoreFilter.setSearch("");
            }
        }
    }
</script>

<style scoped>

</style>