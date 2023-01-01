
<script>
import Login from './components/Login.vue';
import Register from './components/Register.vue';

export default {
    name: 'Authorization',

    data() {
        return {
            visible: true,
            page: 'login'
        }
    },

    methods: {
        //? Функция, которая отдает нужный компонент
        getComponentByID(id) {
            let _components = [
                Login,
                Register
            ];

            return _components[id];
        }
    },

    components: {
        Login
    },

    mounted() {
        this.$events.add('cef.auth:page:set', (page) => {
            this.page = page;
            console.log(page);
        });
    }
}
</script>

<template>
    <div id="auth" v-show="visible">
        <component :is="getComponentByID(0)" v-show="page == 'login'" />
        <component :is="getComponentByID(1)" v-show="page == 'register'" />
    </div>
</template>

<style scoped>
#auth {
    width: 100%;
    height: 100%;
    
    background: radial-gradient(circle at center, rgba(0, 0, 0, 0), rgb(0, 0, 0, 0.35));
}
</style>