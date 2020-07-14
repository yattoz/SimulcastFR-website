<template>

    <form class="" @submit.prevent="blurInput()" id="searchForm">
        <div class="input-field">
            <input id="searchBoxAnime" type="text" v-model="search" v-on:input="processInput" >
            <label for="searchBoxAnime">Rechercher...</label>
            <i class="material-icons btn-flat prefix right" v-on:click="clearInput()">clear</i>
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
                StoreFilter.setSearch("");
            }
        }
    }
</script>

<style scoped>
    .input-field .prefix.right{
        position: absolute;
        right: 0px;
        margin-left: 0px;
        padding: 0px
    }
    .input-field .prefix {
        position: absolute;
        width: 2rem;
        font-size: 2rem;
        -webkit-transition: color .2s;
        transition: color .2s;
        top: .5rem;
    }

    .input-field input{
        /* background-color: cyan; */
        width: calc(100% - 2rem);
    }
</style>