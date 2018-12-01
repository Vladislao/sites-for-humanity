<template>
    <div id="header" class="border-bottom bg-light text-dark">
        <nav-component v-if="config.display" v-bind:config="config.nav"></nav-component>
    </div>
</template>

<script>
    import Nav from './Nav.vue';

    export default {
        name: 'Header',
        props: ['config'],
        components: {
            'nav-component': Nav
        }
    }
</script>

<style scoped>
    #header {
        min-height: 50px;
    }
</style>