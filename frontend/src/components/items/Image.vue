<template>
    <img :src="data.url"/>
</template>

<script>
    export default {
        name: 'ImageComponent',
        props: ['data'],
    }
</script>

<style scoped>
</style>