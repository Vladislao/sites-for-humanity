<template>
    <div id="footer" class="footer" :style="`background-color: ${style.backgroundColor || 'dodgerblue'}`">
        <component height="60" v-for="(data, index) in items" :key="index" :is="data.item" :data="data"  />
    </div>
</template>

<script>
    import * as components from './items'
    export default {
        name: 'Footer',
        components,
        props: ['config'],
        computed: {
            items: function () {
                return (this.config && this.config.items) || []
            },

            style: function () {
                return (this.config && this.config.style) || {}
            },
        }
    }
</script>

<style scoped>
    #footer {
        height: 100px;
        display: flex;
        padding: 20px;
        justify-content: space-around
    }
    #footer > *,
    #footer > * {
        align-self: flex-start;
    }
</style>