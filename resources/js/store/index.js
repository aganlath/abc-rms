import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth/index';
import customers from './customers/index';
import users from './users/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth: auth,
        customers: customers,
        users: users
    }
})

export default store;
