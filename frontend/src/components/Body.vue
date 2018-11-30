<template>
    <div id="body">
        <panel-component v-if="data.leftPanel"></panel-component>
        <div id="content">
            jghjdfdndf
        </div>
        <panel-component v-if="data.rightPanel"></panel-component>
    </div>
</template>

<script>
    import Panel from './Panel.vue';

    export default {
        name: 'Content',
        components: {
            'panel-component': Panel
        },
        props: ['data'],
        data: () => {
            return {
                title: 'right menu'
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