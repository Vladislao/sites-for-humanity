<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Agent from "@/Agent";
import AudioRecorder from "@/utils/audio";
import defaultState, { dispatch } from "@/utils/state";

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
  font-family: "Comic Sans MS", "cursive", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: purple;
  background-color: white;

  display: flex;
  flex-direction: column;
  min-height: 100%;
}
/* .header {
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
} */
/* .clippy, .clippy-balloon {
  position: absolute
} */
</style>
