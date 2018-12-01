<template>
    <div id="nav">
        <b-navbar toggleable="md" v-if="config.display">
            <b-navbar-brand id="brand" href="#" v-if="config.brand.display">
                <span v-if="config.brand.text">{{ config.brand.text }}</span>
                <img v-else-if="config.brand.imgSrc" v-bind:src="config.brand.imgSrc">
            </b-navbar-brand>
            <b-navbar-nav>
                <b-nav-item v-for="(item, index) in config.nav.items" :key="index" v-bind:href="item.url">{{ item.text }}</b-nav-item>
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
        props: ['config']
    }
</script>

<style scoped>

</style>