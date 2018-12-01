<template>
    <div id="body">
        <nav-component v-if="config.navBar.position === 'left'" v-bind:config="config.navBar"></nav-component>
        <div id="content">
            content
        </div>
        <nav-component v-if="config.navBar.position === 'right'" v-bind:config="config.navBar"></nav-component>
    </div>
</template>

<script>
    import Nav from './Nav.vue';

    export default {
        name: 'Content',
        components: {
            'nav-component': Nav
        },
        props: ['config'],
        data: () => {
            return {
            }
        }
    }
</script>

<style scoped>
    #body {
        flex: 1;
        display: flex;
    }
    #content {
        flex: 1
    }
</style>