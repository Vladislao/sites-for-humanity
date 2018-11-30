// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import clippy from "clippyjs";
import Agent from "./Agent";
import VueHead from "vue-head";
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import io from 'socket.io-client';

// const socket = io('http://b8473681.ngrok.io/');

// socket.on('command', (data) => {
//     console.log(data);
// });

Vue.use(BootstrapVue);
Vue.use(VueHead);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
