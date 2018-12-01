<template>
    <div id="body">
        <panel-component v-if="config.leftPanel.display" v-bind:config="config.leftPanel"></panel-component>
        <content-component v-bind:data="config.content" />
        <panel-component v-if="config.rightPanel.display" v-bind:config="config.rightPanel"></panel-component>
    </div>
</template>

<script>
    import Panel from './Panel.vue';
    import Content from './Content.vue';

    export default {
        name: 'Content',
        components: {
            'panel-component': Panel,
            'content-component': Content
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