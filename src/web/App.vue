
<script>
import './assets/fonts/style.css';

import Auth from './components/Auth/Auth.vue';

export default {
    name: 'App',

    data: function() {
        return {
            
        }
    },

    methods: {
        
    },

    components: {
        Auth
    }
}
</script>

<template>
    <div id="bostonrp">
        <Auth />
    </div>
</template>

<style lang="scss" scoped>
#bostonrp {
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    background: radial-gradient(circle at center, rgba(0, 0, 0, 0), rgb(0, 0, 0, 0.15));
}

.test {
    position: absolute;

    width: 100%;
    height: 100%;
}
</style>