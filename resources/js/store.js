import {getLocalUser,getLocalPermissions,getLocalRoles} from "./helpers/auth";

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
            return state.auth_permissions;
        },
        authRoles(state) {
            return state.auth_roles;
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
            state.auth_permissions = Object.assign(payload.permissions);
            state.auth_roles = Object.assign(payload.roles);
            localStorage.setItem("user",JSON.stringify(state.currentUser));
            localStorage.setItem("permissions",JSON.stringify(state.auth_permissions));
            localStorage.setItem("roles",JSON.stringify(state.auth_roles));
        },
        loginFailed(state,payload){
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state){
            localStorage.removeItem("user");
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
