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
    /*
    let caught =  app4.search === "";
    caught = caught || unit.title.toLowerCase().indexOf(app4.search.toLowerCase()) > -1;
    return caught;
    */
    export default {
        name: "SearchBox",
        data() {
            return {
                search: ""
            };
        },
        methods: {
            processInput(){
                let typedText = document.getElementById('searchBoxAnime').value;
                this.search = typedText;
                console.log(this.search);
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