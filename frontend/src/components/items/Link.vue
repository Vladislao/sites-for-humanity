<template>
    <a href="">{{data.text || ''}}</a>
</template>

<script>
    export default {
        name: 'LinkComponent',
        props: ['data'],
    }
</script>

<style scoped>
</style>