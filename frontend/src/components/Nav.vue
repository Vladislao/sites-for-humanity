<template>
    <div id="nav">
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
            <b-navbar-nav>
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
            </b-navbar-nav>
            <!-- <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form> -->
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: 'Nav',
        props: ['config'],
        data: function () {
            console.log(this);
            return {};
        }
    }
</script>

<style scoped>

</style>