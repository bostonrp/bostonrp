
<script>
import Login from './components/Auth.vue';
import Register from './components/Registration.vue';
import Recovery from './components/Recovery.vue';

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
                Register,
                Recovery
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
        Register,
        Recovery
    },

    mounted() {
        this.$events.add('cef.auth:visible:set', (status) => {
            if(!status) {
                this.updatePage('none');

                setTimeout(() => {
                    this.visible = status[0];
                }, 310);
            } else {
                this.visible = status[0];
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
        <component :is="getComponentByID(2)" v-show="page == 'recovery'" :class="page_id == 'recovery' ? 'show' : 'hide'" />
    </div>
</template>

<style scoped>
@import url('./assets/base.css');
@import url('./assets/main.css');

#auth {
  width: 100vw;
  height: 100vh;

  background-image: url('./assets/bg.png');

  background-color: rgba(0, 0, 0, 0.8);
  background-size: cover;
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