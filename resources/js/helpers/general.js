import Vue from 'vue';


export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.currentUser;

        if(requiresAuth && !currentUser) {
            next('/login');
        } else if(to.path === '/login' && currentUser) {
            next('/');
        } else {
            next();
        }
    });


    if (store.getters.currentUser) {
        setAuthorization(store.getters.currentUser.token);
    }

    axios.interceptors.response.use(response => response, error => {
        const { status } = error.response;

        if (status >= 500) {
            Vue.swal.fire({
                icon: 'error',
                title: 'Error 500',
                text: 'Internal Server Error!',
                reverseButtons: true,
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel'
            })
        }

        if (status === 401) {
            Vue.swal.fire({
                icon: 'warning',
                title: 'Token Expired',
                text: 'token expired',
                reverseButtons: true,
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.value) {
                    store.commit('logout');
                    router.push('/login');
                }

            })
        }

        return Promise.reject(error)
    })
}

export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
