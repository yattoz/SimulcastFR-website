<template>
    <!-- <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"> -->
    <div>
        <div class=" uk-position-top uk-navbar-container tm-navbar-container" >
            <div class="uk-container uk-container-expand uk-background-primary uk-light ">
                <nav class="uk-navbar" uk-navbar="mode: click; dropbar: true">
                    <div class="uk-navbar-left">
                        <ul class="uk-navbar-nav ">
                            <li><router-link class=" uk-active" to="/">
                                <span class="uk-icon uk-margin-small-right" uk-icon="icon: tv"></span>
                                <span class="uk-icon uk-margin-small-right" uk-icon="icon: arrow-right"></span>
                                <span class="uk-icon uk-margin-small-right" uk-icon="icon: laptop"></span>
                                SimulcastFR</router-link>
                            </li>
                        </ul>

                        <ul uk-tab class="uk-flex-center uk-visible@m uk-margin-large-left">
                            <li><router-link class="uk-active " to="/">Simulcasts de la saison</router-link></li>
                            <li><router-link class="" to="/full-lineup">Catalogue</router-link></li>
                            <li><router-link class="" to="/about">A propos</router-link></li>
                        </ul>
                    </div>
                    <div class="uk-navbar-center">

                    </div>
                    <div class="uk-navbar-right uk-hidden@m">
                        <a href="#offcanvas-slide" class="uk-button uk-button-default uk-margin-small" uk-toggle>Menu <span class="uk-light uk-icon " uk-icon="icon: menu">
                        </span></a>

                    </div>
                </nav>
            </div>
        </div>

        <div id="offcanvas-slide" uk-offcanvas="" class="uk-offcanvas" style="display: block;">

            <div class="uk-offcanvas-bar uk-flex uk-flex-column uk-text-center uk-offcanvas-bar-animation uk-offcanvas-slide">
                <button class="uk-offcanvas-close uk-icon uk-close" type="button" uk-close="">
                    <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon">
                        <line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
                        <line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg></button>
                <ul class="uk-nav uk-nav-default">
                    <li class="uk-nav-header" uk-toggle="target: #offcanvas-slide"><router-link class="uk-active" to="/">Simulcasts de la saison</router-link></li>
                    <li class="uk-nav-header" uk-toggle="target: #offcanvas-slide"><router-link class="" to="/full-lineup">Catalogue</router-link></li>
                    <li class="uk-nav-header" uk-toggle="target: #offcanvas-slide"><router-link class="" to="/about">A propos</router-link></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- </div> -->

</template>

<script>
    import Router from 'vue-router';
    export default {
        name: "NavHead"
    }
</script>

<style scoped>
    . {
        color: #FEFEFE
    }
    .:hover {
        color: #E3E3E3
    }
</style>