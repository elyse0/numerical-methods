import Vue from 'vue'
import Buefy from 'buefy'
// @ts-ignore
import VueIframe from 'vue-iframes'
// @ts-ignore
import VueKatex from 'vue-katex';

// Stylesheet
import 'buefy/dist/buefy.css'
import 'katex/dist/katex.min.css';

Vue.use(Buefy)
Vue.use(VueIframe)
Vue.use(VueKatex)

Vue.config.productionTip = false

import App from './App.vue'

new Vue({
  render: h => h(App),
}).$mount('#app')
