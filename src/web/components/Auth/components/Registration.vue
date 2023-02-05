<script>

import Input from './Common/Input.vue';

export default {
  data() {
    return {
      error: null,
      email: "",
      reg_username: "",
      reg_password: "",
      repeat_password: "",
      promo: ""
    }
  },
  methods: {
    openPage(page) {
      this.$events.emit('cef.auth:page:set', page)
    },
    sendClient() {
      if(this.email == '' || this.reg_username == '' || this.reg_password == '' || this.repeat_password == '') return this.error = 'Заполните пустые поля!';
      if(this.reg_password !== this.repeat_password) return this.error = 'Пароли не совпадают';

      let _data = JSON.stringify({
        email: this.email,
        username: this.reg_username,
        password: this.reg_password,
        referal_code: this.promo
      });
    
      this.$events.emitServer('server.auth:register:send', _data);
    }
  },
  mounted() {
    this.$events.on("cef.register:notify:set", (error) => {
      this.error = error[0]
    })
  },
  components: {
    Input
  }
}

</script>

<template>
  <div class="container">
    <div class="l__block">
      <div class="auth__container">
        <div class="title">
          Регистрация
        </div>
        <Input
          :is-password="false"
          icon="Email"
          title="Почта"
          id="email"
          v-model="email"
          class="input"
        ></Input>
        <Input
          :is-password="false"
          icon="Login"
          title="Логин"
          id="reg_login"
          v-model="reg_username"
          class="input"
        ></Input>
        <div class="hint">
          Логин должен содержать латинские буквы, цифры и состоять более чем из 4 символов
        </div>
        <Input
          :is-password="true"
          icon="Password"
          title="Пароль"
          id="reg_password"
          v-model="reg_password"
          class="input"
        ></Input>
        <Input
          :is-password="true"
          icon="Password"
          title="Повторите пароль"
          id="repeat_password"
          v-model="repeat_password"
          class="input"
        ></Input>
        <div class="hint">
          Пароль должен содержать латинские буквы, цифры, заглавную букву и специальный символ
        </div>
        <Input
          :is-password="false"
          icon="Promocode"
          title="Промокод"
          id="promocode"
          v-model="promo"
          class="input"
        ></Input>
        <div class="error" v-if="error">
          <div class="error_svg">
            <ErrorSVG/>
          </div>
          <div class="error_text">
            {{ error }}
          </div>
        </div>
        <div class="btn btn-auth" @click="sendClient">Создать аккаунт</div>
        <div class="select__page">
          <div class="sub__btn" @click="openPage('login')">
            <BackSVG fill="#fff" style="margin-right: 10px; margin-bottom: 0.9px;"/>Назад
          </div>
        </div>
      </div>
    </div>
    <div class="r__block">
      <img class="pers" src="../assets/pers_2.png" alt="">
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
  justify-content: center;
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

  height: 70px;
  width: 100%;

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

.input {
  margin-bottom: 15px;

  z-index: 2;
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

.hint {
  max-width: 400px;
  margin-top: -5px;
  margin-bottom: 10px;

  font-size: 12px;

  color: #FCFCFC73;
}

</style>
