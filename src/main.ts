import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import HeaderComponent from './components/Header/Header.vue'


Vue.component('HeaderComponent', HeaderComponent)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
