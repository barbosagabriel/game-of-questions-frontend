import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.vuex'
import vuetify from './plugins/vuetify'
import { DialogPlugin } from './plugins/dialog'
import firebase from 'firebase/app'
import firebaseConfig from '@/config/firebase/FirebaseConfig'
import '@babel/polyfill'
import { Blank, Default } from '@/layouts/index'

Vue.config.productionTip = false
Vue.component('default-layout', Default)
Vue.component('blank-layout', Blank)

Vue.use(DialogPlugin, router)
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
