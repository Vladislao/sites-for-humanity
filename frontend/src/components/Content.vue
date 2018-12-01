<template>
    <div id="content" :style="`background-color: ${style.backgroundColor || 'white'}`">
        <div class="card" v-if="left.length + right.length">
            <div class="left-column">
                <component width="500" height="500" v-for="(data, index) in left" :key="index" :is="data.item" :data="data"  />
            </div>
            <div class="right-column">
                <component width="500" height="500" v-for="(data, index) in right" :key="index" :is="data.item" :data="data" />
            </div>
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
            },
            style: function () {
                return (this.data && this.data.style) || {}
            },
        }
    }
</script>

<style scoped>
    #content {
        flex: 1;
    }
    #content .card {
        margin: 40px;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border: 5px dashed green;
        flex-direction: row;
        background-color: transparent;
    }
    #content .card-body .left-column > *,
    #content .card-body .right-column > * {
        margin-bottom: 16px;
    }
    #content .card-body .left-column {
        text-align: left;
    }
    #content .card-body .right-column {
        text-align: right;
    }
</style>