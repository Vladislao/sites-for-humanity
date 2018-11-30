<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
// import io from 'socket.io-client';

// const socket = io('http://b8473681.ngrok.io/');

// socket.on('connect', () => {
//     console.log('connect');
// });
// socket.on('command', (data) => {
//     console.log(data);
// });
// socket.on('disconnect', () => {});

import AudioRecorder from "./utils/audio";
import defaultState, { dispatch } from "./utils/state";

export default {
  name: "App",

  head: {
    title: {
      inner: "Sites for Humanity"
    },
    script: [{ type: "text/javascript", src: "/static/recorder.js" }]
  },

  data() {
    return {
      state: defaultState
    };
  },

  methods: {
    onAction: function(commands) {
      const nextState = dispatch(this.state, commands);
      this.state = nextState;
    }
  },

  mounted() {
    const recorder = new AudioRecorder(this.onAction);

    this.recorder = recorder;
    this.available = recorder.init();

    window.addEventListener("keydown", e => {
      if (e.keyCode === 32 && this.available) {
        e.stopPropagation();
        this.recorder.startRecording();
      }
    });
    window.addEventListener("keyup", e => {
      if (e.keyCode === 32 && this.available) {
        e.stopPropagation();
        this.recorder.stopRecording();
      }
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.clippy {
  position: absolute;
}
</style>
