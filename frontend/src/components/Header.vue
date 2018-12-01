<template>
    <div id="header" class="border-bottom bg-light text-dark">
        <b-navbar 
            v-bind:variant="style.variant" 
            v-bind:type="style.type" 
            toggleable="md" 
            v-bind:style="{ backgroundColor: style.backgroundColor }">
            <b-navbar-brand id="brand" href="#" v-if="brand.display">
                <span v-if="brand.text">
                    {{ brand.text }}
                </span>
                <img v-else-if="brand.imgSrc" v-bind:src="brand.imgSrc">
                <span v-else>&copy; Narod.ucoz.com</span>
            </b-navbar-brand>
            <nav-component v-if="navbarConfig.position === 'top'" v-bind:config="navbarConfig"></nav-component>
            <!-- <b-nav class="navbar-nav">
                <b-nav-item 
                    v-for="(item, index) in config.nav.items"
                    :key="index" 
                    v-bind:href="item.url"
                    v-bind:style="{ 
                        backgroundColor: config.nav.style.backgroundColor, 
                        color: config.nav.style.color
                    }">
                    {{ item.text }}
                </b-nav-item>                
            </b-nav> -->
        </b-navbar>        
    </div>
</template>

<script>
    import Nav from './Nav.vue';
    export default {
        name: 'Header',
        props: ['config', 'navbarConfig'],
        components: {
            'nav-component': Nav
        },
        computed: {
            brand: function () {
                return (this.config && this.config.brand) || {}
            },

            style: function () {
                return (this.config && this.config.style) || {}
            },
        }
    }
</script>

<style scoped>
    #header {
        min-height: 50px;
    }
    #brand {
        color: purple;
        text-decoration: underline;
    }
</style>