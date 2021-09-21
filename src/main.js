import Vue from 'vue'
import VueIframe from 'vue-iframes'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueIframe)

new Vue({
  render: h => h(App),
}).$mount('#app')
