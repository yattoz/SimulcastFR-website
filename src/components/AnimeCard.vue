<template>
    <a :href="anime.link" @click.prevent="open_link_in_tab(anime.link)" >
    <div class="card z-depth-1 inner hoverable" :class="cardView" >

        <div class="card-image inner card-inside">

            <span class="badge z-depth-1" :style="{ 'background-color': badgeColor} ">
                {{anime.service}}
            </span>
            <!--
            <div class="badge-icon z-depth-1" v-if="FilterResults.isTitleShown">
                <img class="service-icon" :src="'/icons/'+anime.service+'.png'">
            </div>
            -->
            <img class="anime-poster" :src="anime.image" :alt="anime.title">
        </div>
        <div class="extendview" v-if="!FilterResults.isTitleShown">
            <span class="adn-text" v-tooltip.top="{content: anime.title, delay: 300}">
                {{anime.title}}
            </span>
        </div>
         <transition name="slide">
            <div class="compactview z-depth-1"
                :style="{ 'background-color': badgeColor, opacity: 0.90 }"
                v-if="FilterResults.isTitleShown">
                    <span class="adn-text center-align" style="color: #ffffff, opacity: 0" v-tooltip.top="{content: anime.title, delay: 300}">
                    {{anime.title}}
                    </span>
            </div>
        </transition>   


     
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
    import M from "materialize-css";

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
                var instances = M.Tooltip.init(elems, options);
                
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
    .inner{
        overflow: hidden;
    }
    
    .inner div{
        overflow: hidden;
    }

    .inner .anime-poster{
        transition: all 0.2s ease;
    }
    
    .inner:hover .anime-poster{
         transform: scale(1.06); 
    }


    .adn-text{
         /* margin:5.33333333px 0 0 0;*/
        max-height:2.3em;
        font-size:0.9em;
        overflow:hidden;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        line-clamp:2;

        color: #222222;

        margin: 4px 4px 4px 4px;
        text-transform:uppercase;
        font-weight:bold;
        line-height:1.2em
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
            background-color: rgba(255, 255, 255, 0.9);
            position: absolute;
            display: flex;
            bottom: 0px;
            width: 100%;
            height: auto; /* */
            min-height: 2.8em;
            z-index: 10;
            
        }

        .extendview span {
            color: #121212;
            text-align: left;
            margin-left: 4px;
            margin-right: 4px;
            margin-bottom: auto;
        }

        .card-image span{
            position: absolute;
            top: -2px;
            right: -2px;
            z-index: 100;
            /* border: solid 1px #121212; */
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
        
        .card{
            /* border-radius: 10px; */
            margin: 0em 0em 0em 0em; /* margins set by father element grid-gap (AnimeLineup.vue) */
            padding: 0em 0em 0em 0em;
            width: auto;
            height: 100%;
            border: solid 1px rgba(0, 0, 0, 0.4);
            z-index: 1;
        }

        .mycard-extend{
            margin: 0em 0em 0em 0em; /* margins set by father element grid-gap (AnimeLineup.vue) */
            padding: 0em 0em 0em 0em;
            width: auto;
            height: 100%;
            border: solid 1px rgba(0, 0, 0, 0.4);
            z-index: 1;
            display: grid;
            grid-gap: 1em;
            grid-template-rows: 1fr 2em;
            /* grid-template-rows: repeat(auto-fill, minmax(225px, 1fr)); */
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



</style>