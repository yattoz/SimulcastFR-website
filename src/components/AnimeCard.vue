<template>
    <a :href="anime.link" >
    <div class="card z-depth-1 inner hoverable">

        <div class="card-image inner" :class="titleView">
            <span class="badge z-depth-1" :style="{ 'background-color': badgeColor}">
                {{anime.service}}
            </span>
            <img :src="anime.image" :alt="anime.title">

        </div>
        <div class="extendview" :style="{'background-color': 'fefefe'}" v-if="!FilterResults.isTitleShown">
            <span class="adn-text">
                {{anime.title}}
            </span>
        </div>   

        <transition name="slide">
            <div class="compactview z-depth-1"
                :style="{ 'background-color': badgeColor, opacity: 0.95 }"
                v-if="FilterResults.isTitleShown">
                    <span class="adn-text center-align" style="color: #ffffff, opacity: 0" >
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
                console.log("tooltip initialized");
            });
        },
        computed: {
            cardWidth() {
                return this.cardWidthDef * this.FilterResults.cardScaling;
            },
            titleView(){
                return this.FilterResults.isTitleShown ? "card-compact" : "card-expand"
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

    .inner img{
        transition: all 0.2s ease;
    }
    
    .inner:hover img{
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

        color: #000000;
        opacity: 87%;

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
            position: relative;
            display: flex;
            width: 100%;
            height: auto; /* */
            min-height: 2.8em;
            z-index: 100;
            
        }

        .extendview span {
            
            color: #121212;
            text-align: left;
            margin: 2px 4px 2px 4px;
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


        .card-expand{
            height: 80%;
            z-index: 1;
        }

        .card-compact{
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