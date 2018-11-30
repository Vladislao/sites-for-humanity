// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import clippy from "clippyjs";
import Vue from "vue";
import VueHead from "vue-head";

import App from "./App";
import Agent from "./Agent";
import router from "./router";

Vue.use(VueHead);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
