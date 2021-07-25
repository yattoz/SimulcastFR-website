<template>

    <form class="" @submit.prevent="blurInput()" id="searchForm">
        <div class="input-field">
            <input id="searchBoxAnime" type="text" v-model="search" v-on:input="processInput" >
            <!-- <label for="searchBoxAnime">Rechercher...</label> -->
            <i class="prefix" v-on:click="clearInput()">
            <svg style="" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
            </i>
        </div>
    </form>

</template>

<script>


    import StoreFilter from '@/components/StoreFilter';
    import debounce from '@/helpers';

    export default {
        name: "SearchBox",
        data() {
            return {
                search: ""
            };
        },
        watch: {
            search() {
                //this.processInput(); //old input processor, does not work with IME (so not on smartphones)
            }
        },
        methods: {
            processInput: debounce(function (){
                var typedText = document.getElementById('searchBoxAnime').value;
                //var typedText = this.search;
                StoreFilter.setSearch(typedText);
            }, 100),
            blurInput() {
                document.getElementById('searchBoxAnime').blur()
            },
            clearInput() {
                document.getElementById('searchBoxAnime').value = "";
                console.log("clear input")
                StoreFilter.setSearch("");
            }
        }
    }
</script>

<style scoped>

    .input-field {
        display: grid;
        gap: 1em;
        grid-template-columns: auto 2rem;
    }
    .input-field .prefix.right{
        position: relative;
        right: 0px;
        margin-left: 0px;
        padding: 0px
    }
    .input-field .prefix {
        position: relative;
        height: 100%;
        vertical-align: middle;
        width: 2rem;
        font-size: 2rem;
        -webkit-transition: color .2s;
        transition: color .2s;
        top: .5rem;
    }

</style>