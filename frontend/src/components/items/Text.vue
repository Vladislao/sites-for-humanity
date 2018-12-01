<template>
    <p>{{data.text || ''}}</p>
</template>

<script>
    export default {
        name: 'TextComponent',
        props: ['data'],
    }
</script>

<style scoped>
</style>