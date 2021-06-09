require('./bootstrap');

import Vue from 'vue';
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import "./../css/abc-theme/index.css";
import InfiniteLoading from 'vue-infinite-loading';

import router from './router/index';
import store from './store/index';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(InfiniteLoading);

new Vue({
    router,
    store,
    created () {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            const userData = JSON.parse(userInfo)
            this.$store.commit('auth/setAuthUser', userData)
        }
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    this.$store.dispatch('auth/logout')
                }
                return Promise.reject(error)
            }
        )
    },
    render: h => h(App),
}).$mount('#app');
