<template>
    <div id="app">
        <!-- <img src="./assets/logo.png">
        <router-view/> -->
        <div class="header"><button id="header" @click="moveToHeader">Header</button></div>
        <div class="container">
            <div class="navbar" ><button id="navbar" @click="moveToNavbar">Navbar</button></div>
            <div class="content">
                <button id="content" @click="moveToContent">Content</button>
                <button id="content" @click="moveToUnknown">Unknown</button>
                <button id="content" @click="speak">Speak</button>
            </div>
        </div>
        <div class="footer"><button id="footer" @click="moveToFooter">Footer</button></div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import Agent from '@/Agent'

    const socket = io('http://b8473681.ngrok.io/');

    socket.on('connect', () => {
        console.log('connect');
    });
    socket.on('command', (data) => {
        console.log(data);
    });
    socket.on('disconnect', () => {});
    export default {
        name: 'App',
        methods: {
            moveToNavbar: () => Agent.moveToNavbar(),
            moveToContent: () => Agent.moveToContent(),
            moveToFooter: () => Agent.moveToFooter(),
            moveToHeader: () => Agent.moveToHeader(),
            moveToUnknown: () => Agent.moveTo('unknown'),
            speak: () => Agent.speak('Hey! Wana make a cool web page? Then yoy came to the right place!'),
            // unk: () => Agent.moveToHeader(),
        }
    }
</script>

<style>
html, body {
    height: 100%;
    margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
