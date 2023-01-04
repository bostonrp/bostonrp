
<script>
export default {
    name: 'AuthorizationLogin',

    data() {
        return {
            remember: false
        }
    },

    methods: {
        openPage(page) {
            this.$events.call('cef.auth:page:set', page);
        },

        sendClient() {
            
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
                    <input type="text" placeholder="Введите свой логин" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Password</div>
                    <input type="password" placeholder="Введите пароль" />
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
                <div class="button-next">Авторизация</div>
                <div class="sub-button-box">Еще не с нами? <span class="sub-button-box" @click="openPage('register')">Регистрация</span></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('../assets/css/main.css');
</style>