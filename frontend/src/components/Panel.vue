<template>
    <div id="panel" class="border-right border-left"></div>
</template>

<script>
    export default {
        name: 'Panel',
        props: ['title']
    }
</script>

<style scoped>
    #panel {
        width: 150px;
    }
</style>