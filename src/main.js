import App from './App'
// import axios from 'axios'
import '@/utils/request.js'
import store from './store'
import messages from './locale/index'

let i18nConfig = {
  locale: 'en_us', // en_us
  messages
}

// import UniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";



// Vue.component('UniNavBar', UniNavBar)


// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import uView from "uview-ui"
Vue.use(uView)
Vue.use(VueI18n)
Vue.prototype.$store = store
// Vue.prototype.$axios = axios
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  i18n,
  ...App
})
app.$mount()
// #endif
