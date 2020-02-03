import {getLocalUser} from "./helpers/auth";

const user = getLocalUser();

export default {
    state:{
        currentUser:user,
        isLoggedIn: !!user,
        loading:false,
        auth_error:null,
        auth_permissions:[],
        auth_roles:[]
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
            console.log('loginSuccess');
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({},payload.user,{token:payload.access_token});

            localStorage.setItem("user",JSON.stringify(state.currentUser));
        },
        loginFailed(state,payload){
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state){
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        updateAuthPermissions(state, payload) {
            state.auth_permissions = payload;
        },
        updateAuthRoles(state, payload) {
            state.auth_roles = payload;
        },
    },

    actions:{
        login(context){
            console.log(context);
            context.commit('login');
        },
        getUserAuth(context) {
            axios.get('/api/auth-user')
                .then((response) => {
                    console.log(context)
                     context.commit('updateAuthPermissions', JSON.stringify(response.data.permissions));
                     context.commit('updateAuthRoles', response.data.roles);
                })
        }

    }
}
