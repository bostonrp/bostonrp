
<script>
export default {
    name: 'AuthorizationLogin',

    data() {
        return {
            
        }
    },

    methods: {
        openPage(page) {
            this.$events.call('cef.auth:page:set', page);
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
                    <input type="text" placeholder="Введите свою почту" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Username</div>
                    <input type="text" placeholder="Введите логин" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Password</div>
                    <input type="password" placeholder="Введите пароль" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Repeat password</div>
                    <input type="password" placeholder="Повторите пароль" />
                </div>

                <div class="input-box">
                    <div class="sub-title">Referal code</div>
                    <input type="password" placeholder="Введите код-приглашение" />
                </div>
            </div>

            <div class="footer">
                <div class="button-next">Создать аккаунт</div>
                <div class="sub-button-box">Уже есть аккаунт? <span class="sub-button-box" @click="openPage('login')">Войти</span></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('../assets/css/main.css');
</style>