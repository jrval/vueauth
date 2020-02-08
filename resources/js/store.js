import {getLocalUser,getLocalPermissions,getLocalRoles} from "./helpers/auth";
import Vue from 'vue'



const user = getLocalUser();
const permissions = getLocalPermissions();
const roles = getLocalRoles();

export default {
    state:{
        currentUser:user,
        isLoggedIn: !!user,
        loading:false,
        auth_error:null,
        auth_permissions:permissions,
        auth_roles:roles
    },
    getters:{
        isLoading(state){
            return state.loading;
        },
        isLoggedIn(state){
            return state.isLoggedIn;
        },
        currentUser(state){
            return state.currentUser;
        },
        authError(state){
            return state.auth_error;
        },
        authPermissions(state) {
            return  Vue.CryptoJS.AES.decrypt( state.auth_permissions, process.env.MIX_CRYPTO_JS_PASSPHRASE).toString(Vue.CryptoJS.enc.Utf8)
        },
        authRoles(state) {
            return Vue.CryptoJS.AES.decrypt( state.auth_roles, process.env.MIX_CRYPTO_JS_PASSPHRASE).toString(Vue.CryptoJS.enc.Utf8);
        }
    },
    mutations:{
        login(state){
            state.loading = true;
            state.auth_error=null;
        },
        loginSuccess(state,payload){
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({},payload.user,{token:payload.access_token});
            state.auth_permissions = Vue.CryptoJS.AES.encrypt(JSON.stringify(Object.assign(payload.permissions)), process.env.MIX_CRYPTO_JS_PASSPHRASE).toString();
            state.auth_roles = Vue.CryptoJS.AES.encrypt(JSON.stringify(Object.assign(payload.roles)), process.env.MIX_CRYPTO_JS_PASSPHRASE).toString();

            localStorage.setItem("user",JSON.stringify(state.currentUser));
            $cookies.set("permissions",state.auth_permissions);
            $cookies.set("roles",state.auth_roles);
        },
        loginFailed(state,payload){
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state){
            localStorage.removeItem("user");
            $cookies.remove("permissions");
            $cookies.remove("roles");
            state.isLoggedIn = false;
            state.currentUser = null;
            state.auth_permissions = null;
            state.auth_roles = null;
        },

    },

    actions:{
        login(context){

            context.commit('login');
        },
    }
}
