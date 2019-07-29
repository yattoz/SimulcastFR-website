<template>
    <form class="uk-search">
        <div class="search-term">
            <form class="uk-search uk-search-default">
                <span uk-search-icon></span>
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

                /*
                var search = document.querySelector('.search-term .uk-search-input');
                var searchVal = document.querySelector('.search-filter');
                var value = search.value.toLowerCase();
                var searchTerm = '';

                if(value.length) searchTerm = '[data-tags*="' + search.value.toLowerCase() + '"]';

                searchVal.setAttribute('uk-filter-control', searchTerm);
                searchVal.click();

                 /**/

            }
        }
    }
</script>

<style scoped>

</style>