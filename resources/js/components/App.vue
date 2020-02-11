<template>

    <div id="app">

        <template v-if="currentUser">
            <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <TopBar></TopBar>
                        <div class="container-fluid">
                                <vue-page-transition name="fade-in-right">
                                    <router-view></router-view>
                                </vue-page-transition>
                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </div>
        </template>

        <template v-else>
            <vue-page-transition name="fade-in-right">
                <Login></Login>
            </vue-page-transition>
        </template>
    </div>
</template>

<script>


    import Sidebar from "./layout/Sidebar";
    import TopBar from "./layout/TopBar";
    import Footer from "./layout/Footer";

    import Login from "./authentication/Login";
    import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

    export default {
        name: "App",
        components: {
            NprogressContainer,
            Footer,
            TopBar,
            Sidebar,
            Login
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser
            }
        },
    }
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
    #nprogress .bar {
        background: red !important;
    }
    #nprogress .spinner-icon {
        border-left-color: green !important;
        border-top-color: yellow  !important;
    }
</style>
