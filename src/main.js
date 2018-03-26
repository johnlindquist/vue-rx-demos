import "buefy/lib/buefy.css"

import Vue from "vue"
import Buefy from "buefy"
import Rx from "rxjs/Rx"
import VueRx from "vue-rx"
import VueAxios from "vue-axios"
import axios from "axios"
import App from "./App.vue"

Vue.use(Buefy)
Vue.use(VueRx, Rx)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#app")
