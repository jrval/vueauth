require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Permissions from './mixins/Permissions';
import Roles from './mixins/Roles';
import {routes} from './routes';
import StoreData from './store';
import {initialize} from './helpers/general';


import App from './components/App'
import VueSweetAlert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.mixin(Permissions);
Vue.mixin(Roles);
Vue.use(require('vue-moment'));
Vue.use(VueSweetAlert2,options);
Vue.component('pagination', require('laravel-vue-pagination'));


const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: "active",
    linkExactActiveClass: "active",
});

initialize(store, router);


const app = new Vue({
    el: '#app',
    render:h =>h(App),
    store,
    router,
    components:{
        App,
    },
});
