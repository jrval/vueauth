import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home'
import Users from './components/user/Users'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'

Vue.use(VueRouter);


export default new VueRouter({

   routes:[
       {path:'/',
           name:'home',
           component:Home,
           meta: {
               title: 'Home',
               requiresAuth: true
           }},
       {path:'/login',
           name:'login',
           component:Login,
           meta: {
               title: 'Login',

           }},
       { path: '/users',
           name: 'users',
           component: Users,
           meta:{
               title: 'Users',
               requiresAuth: true
           }
       },
       { path: '/register',
           name: 'register',
           component: Register,
           meta:{
               title: 'Register',
           }
       },

   ],

    mode:'history',
    linkActiveClass: "active",
    linkExactActiveClass: "active",


});
