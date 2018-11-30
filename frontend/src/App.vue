<template>
    <div id="app">
        <img src="./assets/logo.png">
        <router-view/>
    </div>
</template>

<script>
    import io from 'socket.io-client';

    const socket = io('http://b8473681.ngrok.io/');

    socket.on('connect', () => {
        console.log('connect');
    });
    socket.on('command', (data) => {
        console.log(data);
    });
    socket.on('disconnect', () => {});
    export default {
        name: 'App'
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.clippy {
  position: absolute
}
</style>
