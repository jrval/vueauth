export default function (Vue) {
    let authenticatedUser = {};

    Vue.auth = {

        setToken(token, expiration) {
            localStorage.setItem('token', token);
            localStorage.setItem('expiration', expiration)
        },


        getToken() {
            var token = localStorage.getItem('token');
            var expiration = localStorage.getItem('expiration');

            if (!token || !expiration)
                return null;

            if (Date.now() > parseInt(expiration)) {
                this.destroyToken();
                return null;
            } else {
                return token;
            }

        },

        getHeaders() {
            var token = localStorage.getItem('token');
            if (token) {
                return {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                };
            }
        },

        destroyToken() {
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            localStorage.removeItem('auth-name');
            localStorage.removeItem('auth-email');
        },

        isAuthenticated() {
            if (this.getToken())
                return true;
            else
                return false;
        },

        setAuthenticatedUser(data) {
            if (this.getToken()) {
                localStorage.setItem('auth-name', data.name);
                localStorage.setItem('auth-email', data.email);
            } else {
                localStorage.removeItem('auth-name');
                localStorage.removeItem('auth-email');
            }

        },

        getAuthenticatedUser() {
            return {
                'name': localStorage.getItem('auth-name'),
                'email': localStorage.getItem('auth-email'),
            };
        }
    };

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get() {
                return Vue.auth
            }
        }
    })
}
