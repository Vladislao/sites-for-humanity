<template>
    <div><b-img :src="data.url" :width="width || 100" :height="height || 100" /></div>
</template>

<script>
    export default {
        name: 'ImageComponent',
        props: ['data', 'width', 'height'],
    }
</script>

<style scoped>
</style>