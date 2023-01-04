
<script>
import Login from './components/Login.vue';
import Register from './components/Register.vue';

export default {
    name: 'Authorization',

    data() {
        return {
            visible: false,

            page_id: '',
            page: ''
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
        },

        updatePage(page) {
            this.page_id = page;
            setTimeout(() => {
                this.page = page;
            }, 310);
        }
    },

    components: {
        Login,
        Register
    },

    mounted() {
        this.$events.add('cef.auth:visible:set', (status) => {
            if(!status) {
                this.updatePage('none');

                setTimeout(() => {
                    this.visible = status;
                }, 310);
            } else {
                this.visible = status;
            }
        });

        this.$events.add('cef.auth:page:set', (page) => {
            this.updatePage(page);
        });
    }
}
</script>

<template>
    <div id="auth" v-show="visible">
        <component :is="getComponentByID(0)" v-show="page == 'login'" :class="page_id == 'login' ? 'show' : 'hide'" />
        <component :is="getComponentByID(1)" v-show="page == 'register'" :class="page_id == 'register' ? 'show' : 'hide'" />
    </div>
</template>

<style scoped>
#auth {
    width: 100%;
    height: 100%;
    
    background: radial-gradient(circle at center, rgba(0, 0, 0, 0), rgb(0, 0, 0, 0.35));
}

.show {
    animation: showBlock 0.3s linear forwards;
}
.hide {
    animation: hideBlock 0.3s linear forwards;
}
@keyframes showBlock {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes hideBlock {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>