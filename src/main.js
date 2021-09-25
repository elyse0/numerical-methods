import Vue from 'vue';
import Buefy from 'buefy';
// @ts-ignore
import VueIframe from 'vue-iframes';
// Stylesheet
import 'buefy/dist/buefy.css';
Vue.use(Buefy);
Vue.use(VueIframe);
Vue.config.productionTip = false;
import App from './App.vue';
new Vue({
    render: h => h(App),
}).$mount('#app');
//# sourceMappingURL=main.js.map