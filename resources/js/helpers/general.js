import Vue from 'vue';

export function initialize(store, router,nprogress) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.currentUser;
        const currentPermissions = store.state.auth_permissions;
        const currentRoles = store.state.auth_roles;
        //const currentRoles = JSON.stringify(store.state.auth_roles);
        if (requiresAuth && !currentUser && !currentPermissions && !currentRoles) {
            next('/login');
        } else if (to.path === '/login' && currentUser && currentPermissions && currentRoles) {
            next('/');
        } else {
            let roles = '';
            if(currentRoles){
                roles = Vue.CryptoJS.AES.decrypt(currentRoles, process.env.MIX_CRYPTO_JS_PASSPHRASE).toString(Vue.CryptoJS.enc.Utf8);
            }

            if (!to.meta.roles) {
                return next()
            }else{
                if (JSON.parse(roles).some(r=>to.meta.roles.includes(r))) {
                    next();
                }else{
                    next('/404');
                }
            }


        }

    });

    router.beforeResolve((to, from, next) => {
        // If this isn't an initial page load.
        if (to.name) {
            // Start the route progress bar.
            nprogress.start()
        }
        next()
    });

    router.afterEach((to, from) => {
        // Complete the animation of the route progress bar.
        nprogress.done()
    });


    if (store.getters.currentUser) {
        setAuthorization(store.getters.currentUser.token);
    }

    axios.interceptors.request.use(config => {
        nprogress.start();
        return config
    });

    axios.interceptors.response.use(response => {
        nprogress.done();
        return response
    }, error => {
        const {status} = error.response;

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

        if (status === 403) {
            Vue.swal.fire({
                icon: 'danger',
                title: 'Error 403 Unauthorized',
                text: 'You don\'t have permission to proceed this action.',
                reverseButtons: true,
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.value) {
                    router.go(-1);
                }

            })
        }


        return Promise.reject(error)
    })
}

export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
