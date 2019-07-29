<template>
<!--
    <div class="uk-card uk-card-default" uk-grid :data-tags="anime.title.toLowerCase()">
        <div class="uk-card-media-left uk-cover-container">
            <img :src="anime.image" :alt="anime.title" uk-cover>
        </div>
        <div>
            <div class="uk-card-body uk-flex-wrap-around">
                <div class="uk-card-badge uk-label uk-position-top-right"> {{anime.link.substr(12,  anime.link.substr(12,anime.link.length).indexOf("."))}} </div>
                <div class="uk-position-bottom-right">
                <a :href="anime.link">
                    {{anime.title.trunc(25)}}
                </a>
                </div>
            </div>
        </div>
    </div>
-->
    <div>

        <div class="uk-inline">
            <div class="uk-card-badge uk-label uk-position-top-right" style="background-color: #EC9500">
                <small>
                        {{anime.link.substr(12,  anime.link.substr(12,anime.link.length).indexOf("."))}}
                </small>
            </div>
            <img :src="anime.image" :alt="anime.title">
            <div class="uk-overlay uk-overlay-default uk-position-bottom">
                <div class="">
                    <a :href="anime.link">
                        {{anime.title.trunc(25)}}
                    </a>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    // shamelessly ripped off https://stackoverflow.com/questions/1199352/smart-way-to-shorten-long-strings-with-javascript
    String.prototype.trunc =
        function( n, useWordBoundary ){
            if (this.length <= n) { return this; }
            var subString = this.substr(0, n-1);
            return (useWordBoundary
                ? subString.substr(0, subString.lastIndexOf(' '))
                : subString) + "[...]";
        };

    export default {
        name: "AnimeCard",
        props: {
            anime: {
                type: Object,
                default: {
                    title: "",
                    link: "",
                    image: ""
                }
            }
        }
    }
</script>

<style scoped>

</style>