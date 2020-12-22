import Vue from 'vue'
import App from './App'
import http from '@/common/js/request.js'
import url from '@/common/js/url.js'
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$url = url
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
