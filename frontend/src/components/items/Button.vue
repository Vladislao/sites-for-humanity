<template>
    <button>{{data.text || ''}}</button>
</template>

<script>
    export default {
        name: 'ButtonComponent',
        props: ['data'],
    }
</script>

<style scoped>
</style>