import Vue from 'vue'
import App from './App'
import api from './common/api/index'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$api = api

const app = new Vue({
	store,
	...App
})
app.$mount()
