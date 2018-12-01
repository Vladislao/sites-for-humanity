<template>
    <div id="panel" class="border-right border-left">
        <vertical-nav-component v-bind:config="config.nav"></vertical-nav-component>
    </div>
</template>

<script>
    import VerticalNav from './VerticalNav.vue'

    export default {
        name: 'Panel',
        props: ['config'],
        components: {
            'vertical-nav-component': VerticalNav
        }
    }
</script>

<style scoped>
    #panel {
        width: 150px;
    }
</style>