<template>
    <div id="content">
        <div>
            <component v-for="(data, index) in left" :key="index" :is="data.item" :data="data" />
        </div>
        <div>
            <component v-for="(data, index) in right" :key="index" :is="data.item" :data="data" />
        </div>
    </div>
</template>

<script>
    import * as components from './items'

    export default {
        name: 'Content',
        components,
        props: ['data'],
        computed: {
            left: function () {
                return (this.data && this.data.left) || []
            },
            right: function () {
                return (this.data && this.data.right) || []
            }
        }
    }
</script>

<style scoped>
    #content {
        flex: 1;
        display: flex;
    }
</style>