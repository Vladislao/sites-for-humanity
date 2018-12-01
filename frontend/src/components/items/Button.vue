<template>
    <b-button>{{data.text || ''}}</b-button>
</template>

<script>
    export default {
        name: 'ButtonComponent',
        props: ['data'],
    }
</script>

<style scoped>
.btn {
    color: purple;
    background-color: yellow;
}
</style>