<template>
    <p><a href="">{{data.text || ''}}</a></p>
</template>

<script>
    export default {
        name: 'LinkComponent',
        props: ['data'],
    }
</script>

<style scoped>
a {
    color:purple;
    text-decoration: underline;
}
</style>