<template>
    <div id="verticalNav">
        <b-nav vertical>
            <b-nav-item v-for="(item, index) in config.items" :key="index" v-bind:href="item.url">{{ item.text }}</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: 'VerticalNav',
        props: ['config'],
        data: () => {
            return {
            }
        }
    }
</script>

<style scoped>

</style>