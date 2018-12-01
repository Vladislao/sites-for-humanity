<template>
    <div id="nav">
        <b-nav class="navbar-nav" v-bind:vertical="config.position !== 'top'"
            v-bind:style="{ 
                backgroundColor: style.backgroundColor || 'dodgerblue', 
                color: style.color || 'purple'
            }"
        >
            <b-nav-item 
                v-for="(item, index) in items"
                :key="index" 
                v-bind:href="item.url"
                v-bind:style="{ 
                    backgroundColor: style.backgroundColor || 'dodgerblue', 
                    color: style.color || 'purple'
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
        computed: {
            items: function () {
                return (this.config && this.config.items) || []
            },

            style: function () {
                return (this.config && this.config.style) || {}
            },
        }
    }
</script>
<style scoped>
.navbar-nav {
    height: 100%;
    padding: 20px;
}

.navbar-nav .nav-link {
    color: inherit;
}
</style>