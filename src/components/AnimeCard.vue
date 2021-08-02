<template>
    <a class="" :href="anime.link" target="_blank" >
    <div class="card card-shadow">
        <div class="card-inside background-on">
        <div class="anime-poster-container">

            <span class="anime-service" :style="{ 'background-color': badgeColor} ">
                {{anime.service}}
            </span>
            <img class="" :data-src="anime.image" loading="lazy" 
                :src="anime.image" 
                :alt="anime.title">
        </div>
        <div class="anime-title" v-if="!FilterResults.isTitleShown">
            <span :data-tippy-content="anime.title">
                {{anime.title}}
            </span>
        </div>
         <transition name="slide">
            <div class="anime-title compact-anime-title"
                :style="{ 'background-color': badgeColor, opacity: 0.90 }"
                v-if="FilterResults.isTitleShown">
                    <span class="" style="color: #ffffff, opacity: 0" :data-tippy-content="anime.title">
                    {{anime.title}}
                    </span>
            </div>
        </transition> 


        </div>
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
                    return "#f46621";
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

    *::before, *::after {
        box-sizing: inherit;
    }

    .card {
        width: auto;
        height: 100%;
        position: relative;
        text-transform:uppercase;
        font-weight:bold;
    }

    .card-inside{
        border-radius: 8px;
        width: auto;
        height: 100%;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 3px 1px -2px rgba(0, 0, 0, 0.22), 0 1px 5px 0 rgba(0, 0, 0, 0.32);
        position: relative;
        height: 100%;
        display: grid;
        grid-gap: 0em;
        grid-template-rows: 1fr auto;
        overflow: hidden;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    
    .card img{
        display: block;
        transition: all 0.15s ease-in-out 0.1s;
        position: relative;
        object-fit: cover;
        height: 102%;
        width: 102%;
        z-index: 1;
        top: 0px;
        box-sizing: border-box;
    }

    .card:hover img{
         transform: scale(1.1);
    }

    /* Pre-render the bigger shadow, but hide it */
    .card-shadow::after {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        content: '';
        background-color: transparent;
        border-radius: 8px;
        opacity: 0;
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        transition: all 0.15s ease-in-out 0s;
    }

    /* Transition to showing the bigger shadow on hover */
    .card-shadow:hover::after {
        opacity: 1;
    }
    

    .card-shadow::before {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        content: '';
        background-color: #ffffff;
        border-radius: 8px;
        opacity: 0;
        transition: 0.15s ease-in-out 0.1s;
        z-index: 1100;
    }

    .card-shadow:hover::before {
        opacity: 0.33;
    }

    
    .anime-title{
        /* margin:5.33333333px 0 0 0;*/
        top: 0px;
        z-index: 2000; /* display over white veil */
        font-size:0.8em;
        overflow:hidden;
        display:-webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        line-clamp:3;
        margin: 0.4em;
        line-height:1.2em;
        height: calc(3.6em); /* 3 * line-height*/
        text-align: left;
    }

    .anime-poster-container {
        height: inherit;
        width: inherit;
        display: flex;
        overflow: hidden;
    }

    .compact-anime-title {
        position: absolute;
        top: unset;
        bottom: 0px;
        width: calc(100% - 0.4em - 0.4em); /* removing padding from both sides.*/
        margin: 0px;
        height: 3.38em;
        padding: 0.4em;
    }

    .compact-anime-title span {
        color: var(--white-text)
    }

        .anime-service{
            position: absolute;
            top: -0.1em;
            right: -0.1em;
            z-index: 1000;
            border-radius: 0.3em;
            padding: 0.3em;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 1);
            color: rgba(255, 255, 255, 0.87);
            font-size: 0.8em;
            /* border: solid 1px #121212; */
        }

        .slide-enter-active {
            transition: all .3s ease-in-out;
        }
        .slide-leave-active {
            transition: all .3s;
        }
        .slide-enter, .slide-leave-to {
            transform: translateY(100%);
            opacity: 0;
        }
</style>