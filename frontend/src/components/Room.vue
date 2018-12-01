<template>
  <div class="wrapper">
    <header-component v-if="config.header.display" v-bind:config="config.header"></header-component>
    <body-component v-bind:data="config"></body-component>
    <footer-component v-if="config.footer"></footer-component>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Body from "./Body.vue";
import Footer from "./Footer.vue";
import defaultState, { dispatch } from "@/utils/state";

export default {
  name: "Room",
  components: {
    "header-component": Header,
    "body-component": Body,
    "footer-component": Footer
  },
  data: () => {
    return {config: defaultState};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
