
window._ = require('lodash');

window.axios = require('axios');

window.axios.defaults.headers.common['X-CSRF-TOKEN'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = process.env.MIX_APP_URL;

