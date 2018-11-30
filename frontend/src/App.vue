<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/>-->
    <div class="header">
      <button id="header" @click="moveToHeader">Header</button>
    </div>
    <div class="container">
      <div class="navbar">
        <button id="navbar" @click="moveToNavbar">Navbar</button>
      </div>
      <div class="content">
        <button id="content" @click="moveToContent">Content</button>
        <button id="content" @click="moveToUnknown">Unknown</button>
        <button id="content" @click="speak">Speak</button>
      </div>
    </div>
    <div class="footer">
      <button id="footer" @click="moveToFooter">Footer</button>
    </div>
  </div>
</template>

<script>
import Agent from "@/Agent";

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
      this.state = dispatch(this.state, commands);
    },
    moveToNavbar: () => Agent.moveToNavbar(),
    moveToContent: () => Agent.moveToContent(),
    moveToFooter: () => Agent.moveToFooter(),
    moveToHeader: () => Agent.moveToHeader(),
    moveToUnknown: () => Agent.moveTo("unknown"),
    speak: () =>
      Agent.speak(
        "Hey! Wana make a cool web page? Then yoy came to the right place!"
      )
  },

  created() {
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
  },

  mounted() {}
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.header {
  border: 1px solid black;
  min-height: 100px;
}
.footer {
  border: 1px solid black;
  min-height: 100px;
}
.container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}
.navbar {
  border: 1px solid black;
  min-width: 100px;
}
.content {
  border: 1px solid black;
  flex-grow: 1;
}
/* .clippy, .clippy-balloon {
  position: absolute
} */
</style>
