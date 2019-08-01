<template>
    <transition name="fade">
        <div class="uk-panel uk-card"
             :style="{width: cardWidth + 'px'}"
             :data-tags="anime.service.toLowerCase()"
             :data-title="anime.title.toLowerCase()"
             v-if="FilterResults.tableServices.includes(anime.service)" >
            <a :href="anime.link">
            <div class="uk-inline-clip uk-transition-toggle uk-cover-container" tabindex="0">
                <canvas :key="FilterResults.forceRedraw" :width="cardWidth" :height="cardWidth*1.5"></canvas>
                <img uk-cover uk-img class="uk-position-top-left uk-transition-scale-up uk-transition-opaque"
                     :data-src="anime.image" :alt="anime.title">
                <transition name="slide">
                    <div class="uk-overlay uk-overlay-primary uk-position-bottom "
                         :style="{ 'background-color': badgeColor, opacity: 0.85 }"
                         v-if="FilterResults.isTitleShown">
                        <div class="uk-text-small uk-position-center ellipsisimple uk-text-uppercase uk-text-bold uk-text-emphasis" style="opacity: 1">
                            {{anime.title.trunc(30, true)}}
                        </div>
                    </div>
                </transition>
                <div class="uk-badge uk-label uk-position-top-right" :style="{ 'background-color': badgeColor }">
                    <small>
                        {{anime.service}}
                    </small>
                </div>
            </div>
            <div class="uk-light uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom uk-text-small uk-text-uppercase uk-text-bold uk-text-middle ellipsisimple uk-text-left" v-if="!FilterResults.isTitleShown">
                <p>{{anime.title}}</p>
            </div>
            </a>
        </div>
    </transition>
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

    import StoreFilter from "@/components/StoreFilter"

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
                cardWidthDef: 200,
            }
        },
        computed: {
            cardWidth() {
                return this.cardWidthDef * this.FilterResults.cardScaling;
            },
            badgeColor() {
                let service = this.anime.service;
                service = service.toLowerCase();
                if (service === "crunchyroll")
                    return "#ff7500";
                if (service === "adn")
                    return "#2140ed";
                if (service === "wakanim")
                    return "#e0000a";
            }
        }
    }
</script>

<style scoped>

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


    .ellipsisimple {
        height: 2.8em;
        line-height: 1.4em;
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ellipsis {
        overflow: hidden;
        height: 50px;
        line-height: 25px;
        margin: 10px;
        border: 5px #AAA;
    }
    .ellipsis::before {
        content: "";
        float: left;
        width: 5px;
        height: 50px;
    }
    .ellipsis > *:first-child {
        float: right;
        width: 100%;
        margin-left: -5px;
    }
    .ellipsis:after {
        content:"\02026";
        box-sizing: content-box;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        float: right;
        position: relative;
        top: -25px;
        left: 100%;
        width: 3em;
        margin-left: -3em;
        padding-right: 5px;
        text-align: right;
    }


</style>