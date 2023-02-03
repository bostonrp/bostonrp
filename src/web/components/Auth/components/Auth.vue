<script>

import Input from './Common/Input.vue';
import LoginSVG from '../assets/icons/username.vue'
import ErrorSVG from '../assets/icons/error.vue'
import PasswordSVG from '../assets/icons/password.vue'

export default {
  name: "AuthPage",
  data() {
    return {
      username: "",
      password: "",
      error: null
    }
  },
  methods: {
    sendClient() {
      if (this.username === '' || this.password === '') return this.error = 'Заполните пустые поля!'

      let _data = JSON.stringify({
        username: this.username,
        password: this.password
      })

      this.$events.emitServer('server.auth:login:send', _data);
    },
    openPage(page) {
      this.$events.emit('cef.auth:page:set', page);
    }
  },
  mounted() {
    this.$events.on("cef.auth:notify:set", (error) => {
      this.error = error[0]
    })
  },
  components: {
    Input,
    LoginSVG,
    ErrorSVG,
    PasswordSVG
  },
}

</script>

<template>
  <div class="container">
    <div class="l__block">
      <div class="auth__container">
        <div class="logo">
          <span class="color">Boston</span> RolePlay
        </div>
        <div class="title">
          Авторизация
        </div>
        <Input
          :is-password="false"
          icon="Login"
          v-model="username"
          title="Логин"
          id="login"
        ></Input>
        <Input
          :is-password="true"
          icon="Password"
          v-model="password"
          title="Пароль"
          id="password"
        ></Input>
        <div class="error" v-if="error">
          <div class="error_svg">
            <ErrorSVG/>
          </div>
          <div class="error_text">
            {{ error }}
          </div>
        </div>
        <div class="btn btn-auth" @click="sendClient">Войти</div>
        <div class="select__page">
          <div class="sub__btn" @click="openPage('register')">Региcтрация</div>
          <div class="sub__btn" @click="openPage('recovery')">Восстановление</div>
        </div>
      </div>
    </div>
    <div class="r__block">
      <img class="pers" src="../assets/pers_1.png" alt="">
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;

  font-family: 'Montserrat';
  font-style: normal;

  color: white;
}

.l__block {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pers {
  position: relative;

  bottom: 0;
  right: 0;

  height: 100vh;

  z-index: 0;
}

.color {
  font-weight: 700;
  color: #318784;

  font-size: 32px;
}

.title {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  text-transform: uppercase;

  color: rgba(255, 255, 255, 0.9);

  text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.6);
  margin-bottom: 15px;
}

.logo {
  font-weight: 700;
  font-size: 32px;

  margin-bottom: 15px;
}

.select__page {
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  width: 100%;
}

.btn-auth {
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;

  text-transform: uppercase;

  height: 80px;

  width: 100%;

  background: linear-gradient(90deg, #25426D 0%, #14253F 100%);
  border-radius: 5px;

  margin-bottom: 15px;
}

.sub__btn {
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 47%;
  height: 45px;

  border-radius: 5px;

  transition: all 0.5s;
}

.sub__btn:hover {
  background-color: rgba(252, 252, 252, 0.03);
}

.error {

  display: flex;

  justify-content: space-around;
  align-items: center;

  min-height: 80px;
  max-width: 400px;
  min-width: 400px;

  background: linear-gradient(90deg, rgba(153, 25, 25, 0.5) 0%, rgba(106, 9, 9, 0.5) 100%);
  border-radius: 5px;

  margin-bottom: 15px;
}

.error_svg {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20%;
}

.error_text {
  width: 80%;
}

</style>
