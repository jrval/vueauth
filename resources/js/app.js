require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueCryptojs from 'vue-cryptojs'
import VueCookies from 'vue-cookies'
import VuePageTransition from 'vue-page-transition'
import Permissions from './mixins/Permissions';
import Roles from './mixins/Roles';
import {routes} from './routes';
import StoreData from './store';
import {initialize} from './helpers/general';
import NProgress from 'vue-nprogress';
import App from './components/App'
import VueSweetAlert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VuePageTransition);
Vue.use(VueCryptojs);
Vue.use(VueCookies);
Vue.mixin(Permissions);
Vue.mixin(Roles);
Vue.use(require('vue-moment'));
Vue.use(VueSweetAlert2,options);
Vue.use(NProgress);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('pagination', require('laravel-vue-pagination'));

const nprogress = new NProgress({ parent: 'body' });
const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: "active",
    linkExactActiveClass: "active",
});

initialize(store, router,nprogress);


const app = new Vue({
    el: '#app',
    render:h =>h(App),
    nprogress,
    store,
    router,
    components:{
        App,
    },
});
