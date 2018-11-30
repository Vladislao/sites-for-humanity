// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import clippy from "clippyjs";
import Vue from "vue";
import VueHead from "vue-head";

// initialize audio recoreder
// import audio from "./utils/audio";

import App from "./App";
import Agent from "./Agent";
import router from "./router";

Vue.config.productionTip = false;

clippy.load("Genie", agent => {
  agent.show();
  new Agent(agent);
});

Vue.use(VueHead);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});