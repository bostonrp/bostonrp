
<script>
import './assets/fonts/style.css';

export default {
    name: 'App',

    data: function() {
        return {
            
        }
    },

    methods: {
        
    },

    components: {
        
    }
}
</script>

<template>
    <div id="bostonrp">
        <div class="server-build-tag">boston pre-aplha 0.0.1.16</div>
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

    background: radial-gradient(circle at center, rgba(0, 0, 0, 0), rgb(0, 0, 0, 0.35));
}

.server-build-tag {
    position: absolute;

    font-family: 'Montserrat Medium';
    font-size: 14px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 200px;
    height: auto;

    margin: auto;
    top: 5px;
    left: 0;
    right: 0;

    color: #FCFCFC;
    opacity: 0.25;
}
</style>