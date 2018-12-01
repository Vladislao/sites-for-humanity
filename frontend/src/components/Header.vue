<template>
    <div id="header" class="border-bottom bg-light text-dark">
        <b-navbar 
            v-bind:variant="config.style.variant" 
            v-bind:type="config.style.type" 
            toggleable="md" 
            v-bind:style="{ backgroundColor: config.style.backgroundColor }">
            <b-navbar-brand id="brand" href="#" v-if="config.brand.display">
                <span 
                    v-if="config.brand.text" 
                    v-bind:style="{ 
                        backgroundColor: config.brand.style.backgroundColor, 
                        color: config.brand.style.color
                    }">
                    {{ config.brand.text }}
                </span>
                <img v-else-if="config.brand.imgSrc" v-bind:src="config.brand.imgSrc">
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
        data: function () {
            console.log(this);
            return {}
        }
    }
</script>

<style scoped>
    #header {
        min-height: 50px;
    }
</style>