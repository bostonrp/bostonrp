
<script>
export default {
    name: 'AuthorizationLogin',

    data() {
        return {
            remember: false,
            username: '',
            password: ''
        }
    },

    methods: {
        openPage(page) {
            this.$events.call('cef.auth:page:set', page);
        },

        sendClient() {
            console.log(this.username, this.password)
            if (this.username === '' || this.password === '') return this.$mp.trigger('client.hud:notify:send', '~r~Заполните пустые поля!');

            let _data = JSON.stringify({
                username: this.username,
                password: this.password
            })

            console.log(this.username, this.password)
            this.$mp.trigger('client.auth:login:send:server', _data);
        }
    },

    components: {

    }
}
</script>

<template>
    <div id="container-box">
        <div class="header">Boston<span class="header">RP</span></div>

        <div class="content-box">
            <div class="header">
                <div class="sub-title">Авторизация</div>
                <div class="title">Вход в аккаунт</div>
            </div>

            <div class="inputs-content-box">
                <div class="input-box">
                    <div class="sub-title">Username</div>
                    <input type="text" v-model="username" placeholder="Введите свой логин" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Password</div>
                    <input type="password" v-model="password" placeholder="Введите пароль" />
                </div>
            </div>

            <div class="sub-footer-box">
                <div class="remember-box" @click="remember = !remember">
                    <div class="icon-svg">
                        <svg v-show="remember" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5.23077L6.14286 9L13 2" stroke="white" stroke-width="3"/>
                        </svg>
                    </div>
                    <div class="title">Запомнить</div>
                </div>

                <div class="recovery-password">Забыли пароль?</div>
            </div>

            <div class="footer">
                <div class="button-next" @click="sendClient()">Авторизация</div>
                <div class="sub-button-box">Еще не с нами? <span class="sub-button-box" @click="openPage('register')">Регистрация</span></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('../assets/css/main.css');
</style>