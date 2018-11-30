<template>
    <div class="wrapper">
        <header-component v-if="config.header.display" v-bind:config="config.header"></header-component>
        <body-component v-bind:data="config"></body-component>
        <footer-component v-if="config.footer"></footer-component>
    </div>
</template>

<script>
    import Header from './Header.vue';
    import Body from './Body.vue';
    import Footer from './Footer.vue';

    export default {
        name: 'Start',
        components: {
            'header-component': Header,
            'body-component': Body,
            'footer-component': Footer,
        },
        data: () => {
            return {
                config: {
                    header: {
                        display: true,
                        nav: {
                            display: true,
                            brand: {
                                display: true,
                                text: 'Brend',
                                imgSrc: 'https://placekitten.com/g/30/30'
                            },
                            nav: {
                                display: true,
                                items: [
                                    {
                                        text: 'Active',
                                        url: ''
                                    },
                                    {
                                        text: 'Link',
                                        url: '',
                                    },
                                    {
                                        text: 'Another Link',
                                        url: ''
                                    }
                                ]
                            }
                        }
                    },
                    rightPanel: false,
                    leftPanel: false,
                    footer: false
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>
