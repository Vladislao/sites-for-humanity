<template>
    <b-img :src="data.url" :width="width || 100" :height="height || 100" />
</template>

<script>
    export default {
        name: 'ImageComponent',
        props: ['data'],
    }
</script>

<style scoped>
</style>