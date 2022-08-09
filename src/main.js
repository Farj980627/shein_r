import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'bootstrap/dist/css/bootstrap.min.css'
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);
Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  JsonExcel,
  render: h => h(App)
}).$mount('#app')