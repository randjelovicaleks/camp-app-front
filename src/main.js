import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
import * as VueGoogleMaps from 'vue2-google-maps';
import VueGeolocation from 'vue-browser-geolocation';
import axios from 'axios';

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("en", en);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDFPh89LEYEvNeGj3gkugEsSQFapZ8STnU',
    libraries: "places"
  }
});

Vue.component('google-map', VueGoogleMaps.Map);

Vue.use(VueGeolocation);

axios.interceptors.request.use(config => {
  let token = JSON.parse(sessionStorage.getItem("token"));
  if(token != null){
      config.headers.common["Authorization"] = `Bearer ${token.accessToken}`;
  }
  return config;
})

Vue.config.productionTip = false

new Vue({
  router,
  VueGoogleMaps,
  vuetify,
  render: h => h(App)
}).$mount('#app')
