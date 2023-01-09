
<script>
export default {
    name: 'AuthorizationRegister',

    data() {
        return {
            email: '',
            username: '',
            password: '',
            repeat_password: '',
            referal_code: ''
        }
    },

    methods: {
        openPage(page) {
            this.$events.call('cef.auth:page:set', page);
        },

        sendClient() {
            if(this.email == '' || this.username == '' || this.password == '' || this.repeat_password == '') return this.$mp.trigger('client.hud:notify:send', '~r~Заполните пустые поля!');
            if(this.password !== this.repeat_password) return this.$mp.trigger('client.hud:notify:send', '~r~Пароли не совпадают');

            let _data = JSON.stringify({
                email: this.email,
                username: this.username,
                password: this.password,
                referal_code: this.referal_code
            });

            this.$mp.trigger('client.auth:register:send:server', _data);
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
                <div class="sub-title">Регистрация</div>
                <div class="title">Создание аккаунта</div>
            </div>

            <div class="inputs-content-box">
                <div class="input-box">
                    <div class="sub-title">Email</div>
                    <input type="text" placeholder="Введите свою почту" v-model="email" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Username</div>
                    <input type="text" placeholder="Введите логин" v-model="username" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Password</div>
                    <input type="password" placeholder="Введите пароль" v-model="password" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Repeat password</div>
                    <input type="password" placeholder="Повторите пароль" v-model="repeat_password" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Referal code</div>
                    <input type="password" placeholder="Введите код-приглашение" v-model="referal_code" />
                </div>
            </div>

            <div class="footer">
                <div class="button-next" @click="sendClient()">Создать аккаунт</div>
                <div class="sub-button-box">Уже есть аккаунт? <span class="sub-button-box" @click="openPage('login')">Войти</span></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('../assets/css/main.css');
</style>