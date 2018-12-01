<template>
    <div id="footer" class="footer">
        <component height="60" v-for="(data, index) in config" :key="index" :is="data.item" :data="data"  />
    </div>
</template>

<script>
    import * as components from './items'
    export default {
        name: 'Footer',
        components,
        props: ['config'],
    }
</script>

<style scoped>
    #footer {
        height: 100px;
        display: flex;
        padding: 20px;
        justify-content: space-around;
        background-color: dodgerblue;
    }
    #footer > *,
    #footer > * {
        align-self: flex-start;
    }
</style>