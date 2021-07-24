<template>
    <a :href="anime.link" @click.prevent="open_link_in_tab(anime.link)" >
    <div class="card" :class="cardView" >

        <div class="anime-poster-container">

            <span class="anime-service" :style="{ 'background-color': badgeColor} ">
                {{anime.service}}
            </span>
            <img class="" :data-src="anime.image" loading="lazy" :src="anime.image" :alt="anime.title" data-loaded="true">
        </div>
        <div class="anime-title" v-if="!FilterResults.isTitleShown">
            <span class="" v-tooltip.top="{content: anime.title, delay: 300}">
                {{anime.title}}
            </span>
        </div>
        <!-- 
         <transition name="slide">
            <div class="compactview"
                :style="{ 'background-color': badgeColor, opacity: 0.90 }"
                v-if="FilterResults.isTitleShown">
                    <span class="adn-text center-align" style="color: #ffffff, opacity: 0" v-tooltip.top="{content: anime.title, delay: 300}">
                    {{anime.title}}
                    </span>
            </div>
        </transition> 
        -->


     
    </div>
    
 
    </a>
</template>

<script>

    // shamelessly ripped off https://stackoverflow.com/questions/1199352/smart-way-to-shorten-long-strings-with-javascript
    String.prototype.trunc =
        function( n, useWordBoundary ){
            if (this.length <= n) { return this; }
            var subString = this.substr(0, n-1);
            return (useWordBoundary
                ? subString.substr(0, subString.lastIndexOf(' '))
                : subString) + "...";
        };

    import StoreFilter from "@/components/StoreFilter";

    export default {
        name: "AnimeCard",
        props: {
            anime: {
                //type: Object,
                default: {
                    title: "",
                    link: "",
                    image: "",
                    service: ""
                }
            }
        },
        data() {
            return {
                FilterResults: StoreFilter.state,
                cardWidthDef: 150,
            }
        },
        mounted() {
            document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.tooltipped');
                var options = {enterDelay: 200};
            });
        },
        computed: {
            cardWidth() {
                return this.cardWidthDef * this.FilterResults.cardScaling;
            },
            cardView(){
                return this.FilterResults.isTitleShown ? "mycard-compact" : "mycard-extend"
            },
            badgeColor() {
                let service = this.anime.service;
                service = service.toLowerCase();
                if (service === "crunchyroll")
                    return "#df6300";
                if (service === "adn")
                    return "#0066ff";
                if (service === "wakanim")
                    return "#e0000a";
                if (service == "primevideo")
                    return "#00a8e0"
                if (service == "netflix")
                    return "#000000"                    
                // catch-all
                return "#fefefe";
            }
        },
        methods: {
            open_link_in_tab(url){
                window.open(url);
            }
        }
    }
</script>

<style scoped>
    .card{
        background-color: transparent;
        border-radius: 4px;
        margin: 0em 0em 0em 0em; /* margins set by father element grid-gap (AnimeLineup.vue) */
        padding: 0em 0em 0em 0em;
        width: auto;
        height: 100%;
        border: solid 1px rgba(0, 0, 0, 0.4);
        position: relative;
        z-index: 1;
        overflow: hidden;
        height: 100%;
        border: solid 1px rgba(0, 0, 0, 0.4);
        z-index: 1;
        display: grid;
        grid-gap: 0em;
        grid-template-rows: 1fr 2.8em;
    }
    
    .card img{
        display: block;
        transition: all 0.2s ease;
        position: relative;
        object-fit: cover;
        overflow: hidden;
        height: 100%;
        width: 100%;
        z-index: 1;
        top: 0px;
    }
    
    .card:hover img{
         transform: scale(1.07); 
    }

    a:link {
        background-color: transparent;
        text-decoration: none;
    }

    body.dark-mode {
        color: white;
    }
    
    .anime-title{
        /* margin:5.33333333px 0 0 0;*/
        top: 0px;
        z-index: 1000;
        font-size:0.8em;
        overflow:hidden;
        display:-webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        line-clamp:3;
        margin: 4px 4px 4px 4px;
        text-transform:uppercase;
        font-weight:bold;
        line-height:1em;
        height: auto;
        color: black;
        text-align: left;
        font-family: sans-serif;
    }

    .anime-poster-container {
        height: inherit;
        width: inherit;
        display: flex;
        overflow: hidden;
    }

        .slide-enter-active {
            transition: all .3s ease;
        }
        .slide-leave-active {
            transition: all .3s;
        }
        .slide-enter, .slide-leave-to {
            transform: translateY(100%);
            opacity: 0;
        }

        .fade-enter-active {
            transition: all .4s;
        }
        .fade-leave-active {
            transition: all .4s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }

        .compactview{
            position: absolute;
            display: flex;
            bottom: 0px;
            width: 100%;
            height: auto; /* */
            min-height: 2.8em;
            z-index: 10;
        }

        .compactview span{
            color: #fefefe;
            margin-top: 4px;
            margin-bottom: auto;
            margin-left: auto;
            margin-right: auto;
        }


        .extendview{
            position: absolute;
            display: flex;
            bottom: 0px;
            width: 100%;
            height: auto; /* */
            min-height: 2.8em;
            z-index: 10;
            
        }

        .extendview span {
            text-align: left;
            margin-left: 4px;
            margin-right: 4px;
            margin-bottom: auto;
        }

        .anime-service{
            position: absolute;
            top: -2px;
            right: -2px;
            z-index: 100000;
            /* border: solid 1px #121212; */
        }

        .badge-icon{
            position: absolute;
            top: 2px;
            right: 2px;
            z-index: 100;
            background-color: #fefefefe;
            border-radius: 30%;
            border: solid 1px rgba(0, 0, 0, 0.5);
            /* border: solid 1px #121212; */
        }


        .service-icon{
            height: 2em;
            padding: 3px;
            position: relative;
        }

        span.badge{
            text-transform:uppercase;
            font-weight: 500; 
            font-size: 0.8rem;
            color: #fff;
            border-radius: 2px;
            padding: auto;
            /* padding: 0 6px;*/
            margin-left: 14px;
        }
        

        .mycard-compact{
            margin: 0em 0em 0em 0em; /* margins set by father element grid-gap (AnimeLineup.vue) */
            padding: 0em 0em 0em 0em;
            width: auto;
            height: 100%;
            border: solid 1px rgba(0, 0, 0, 0.4);
            z-index: 1;
            display: grid;
            grid-gap: 1em;
            grid-template-rows: 1fr;
            /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
        }


        .card-inside{
            height: 100%;
            top: 0px;
            z-index: 1;
        }
        
        img{
            object-fit: cover;
            height: 100%;
            z-index: 1;
        }





</style>