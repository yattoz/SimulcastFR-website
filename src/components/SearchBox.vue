<template>

    <form class="">
        <div class="input-field">
            <input id="searchBoxAnime" type="text" v-model="search">
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
                console.log("search changed");
                this.processInput();
            }
        },
        methods: {
            processInput: debounce(function (){
                //var typedText = document.getElementById('searchBoxAnime').value;
                var typedText = this.search;
                StoreFilter.setSearch(typedText);
            }, 100),
            clearInput() {
                document.getElementById('searchBoxAnime').value = "";
                StoreFilter.setSearch("");
            }
        }
    }
</script>

<style scoped>
    .input-field .prefix.right{
    right: 0;
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