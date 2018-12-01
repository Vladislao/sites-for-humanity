<template>
    <div id="nav">
        <b-nav class="navbar-nav" v-bind:vertical="config.position !== 'top'">
            <b-nav-item 
                v-for="(item, index) in config.items"
                :key="index" 
                v-bind:href="item.url"
                v-bind:style="{ 
                    backgroundColor: config.style.backgroundColor, 
                    color: config.style.color
                }">
                {{ item.text }}
            </b-nav-item>                
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: 'Nav',
        props: ['config'],
        data: function () {
            return {};
        }
    }
</script>

<style scoped>

</style>