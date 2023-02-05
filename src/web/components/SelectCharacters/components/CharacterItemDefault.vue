<template>
    <div class="character-default">
      <div class="header">
        <div class="header__info">
            <span class="header__logo">
                Aspi
            </span>
            <span class="header__name">
                {{ characterName }}
            </span>
            <span class="header__number">
                #{{ number }}
            </span>
        </div>
        <div class="header__level">
            <span class="header__level-indicator">{{ level }}</span>
            <span class="header__level-title">УРОВЕНЬ</span>
        </div>
      </div>
      <div class="content">
        <div class="character-prop">
           <span class="character-prop__label">Часы в игре</span> 
           <span class="character-prop__value">{{ hoursInGame }} ч</span> 
        </div>
        <div class="character-prop">
           <span class="character-prop__label">Наличные</span> 
           <span class="character-prop__value">$ {{ cash }}</span> 
        </div>
        <div class="character-prop">
           <span class="character-prop__label">Деньги в банке</span> 
           <span class="character-prop__value">$ {{ moneyInBank }}</span> 
        </div>
        <div class="character-prop">
           <span class="character-prop__label">Организация</span> 
           <span class="character-prop__value">{{ organization }}</span> 
        </div>
      </div>
      <div class="controls">
        <div class="button-select">Выбрать</div>
        <div class="button-delet">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2125 1.73649H7.71035V0.459551C7.71035 0.205879 7.50447 0 7.2508 0H3.57439C3.32072 0 3.11484 0.205879 3.11484 0.459551V1.73649H0.612735C0.274505 1.73649 0 2.011 0 2.34923C0 2.68745 0.274505 2.96196 0.612735 2.96196H1.22578V11.8981C1.22578 12.3212 1.5686 12.664 1.99169 12.664H8.83349C9.25658 12.664 9.59941 12.3212 9.59941 11.8981V2.96196H10.2125C10.5507 2.96196 10.8252 2.68745 10.8252 2.34923C10.8252 2.011 10.5504 1.73649 10.2125 1.73649ZM3.4212 10.9281C3.4212 11.1818 3.21533 11.3877 2.96165 11.3877C2.70798 11.3877 2.5021 11.1818 2.5021 10.9281V4.49441C2.5021 4.24074 2.70798 4.03486 2.96165 4.03486C3.21533 4.03486 3.4212 4.24074 3.4212 4.49441V10.9281ZM5.87214 10.9281C5.87214 11.1818 5.66626 11.3877 5.41259 11.3877C5.15892 11.3877 4.95304 11.1818 4.95304 10.9281V4.49441C4.95304 4.24074 5.15892 4.03486 5.41259 4.03486C5.66626 4.03486 5.87214 4.24074 5.87214 4.49441V10.9281ZM6.79125 1.73649H4.03394V0.919102H6.79125V1.73649ZM8.32308 10.9281C8.32308 11.1818 8.1172 11.3877 7.86353 11.3877C7.60986 11.3877 7.40398 11.1818 7.40398 10.9281V4.49441C7.40398 4.24074 7.60986 4.03486 7.86353 4.03486C8.1172 4.03486 8.32308 4.24074 8.32308 4.49441V10.9281Z" fill="white" fill-opacity="0.25"/>
            </svg>
            <span>Удалить</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CharacterItemDefault',
    props: {
        level: Number,
        number: Number,
        hoursInGame: Number,
        cash: Number,
        moneyInBank: Number,
        organization: String,
        characterName: String,
    }
  }
  </script>
  
  <style scoped>
      .character-default {
        display: flex;
        flex-direction: column;
        padding-left: 50px;
        padding-right: 50px;
        padding-top: 50px;
        padding-bottom: 25px;
        width: 460px;

        background: linear-gradient(164.5deg, rgba(37, 66, 109, 0.45) -15.88%, rgba(5, 10, 18, 0) 100%);
        border: 1px solid rgba(157, 157, 157, 0.05);
        border-radius: 10px;
        cursor: pointer;
        transition: .3s;
      }

      @media screen and (max-width: 1440px) {
        .character-default {
          width: 300px;
          padding-left: 35px;
          padding-right: 35px;
          padding-top: 35px;
        }
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .header__info {
        display: flex;
        flex-direction: column;
      }

      .header__logo {
        font-weight: 500;
        font-size: 65px;
        line-height: 79px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(252, 252, 252, 0.9);
      }

      @media screen and (max-width: 1440px) {
        .header__logo {
          font-size: 40px;
          line-height: 50px;
        }
      }

      .header__name {
        font-weight: 900;
        font-size: 48px;
        line-height: 59px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(252, 252, 252, 0.9);
      }

      @media screen and (max-width: 1440px) {
        .header__name {
          font-size: 32px;
          line-height: 40px;
        }
      }

      .header__number {
        font-weight: 500;
        font-size: 24px;
        line-height: 29px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(252, 252, 252, 0.25);
      }

      @media screen and (max-width: 1440px) {
        .header__number {
          font-size: 20px;
          line-height: 25px;
        }
      }

      .header__level {
        position: relative;
        margin-right: 10px;
      }

      @media screen and (max-width: 1440px) {
        .header__level {
          margin-right: 6px;
        }
      }

      .header__level-indicator{
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: #FFFFFF;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        position: relative;
      }

      @media screen and (max-width: 1440px) {
        .header__level-indicator {
          width: 60px;
          height: 60px;
          font-size: 18px;
        }
      }

      .header__level-indicator::before{
        content: "";
        box-sizing: border-box;
        position: absolute;
        inset: 0px;
        border-radius: 50%;
        border: 6px solid #172A47;
        transform: rotate(45deg);
        clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%);
      }

      .header__level-indicator::after{
        content: "";
        box-sizing: border-box;
        position: absolute;
        inset: 0px;
        border-radius: 50%;
        border: 6px solid rgba(255, 255, 255, 0.05);
      }

      .header__level-title {
        top: 50%;
        bottom: 50%;
        right: -55%;
        position: absolute;
        display: flex;
        justify-content: center;
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        color: rgba(255, 255, 255, 0.5);
        transform: rotate(90deg);
      }

      @media screen and (max-width: 1440px) {
        .header__level-title {
          right: -70%;
        }
      }

      .content {
        margin-top: 60px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
      }

      .character-prop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(217, 217, 217, 0.02);
        border-radius: 5px;
        padding-right: 16px;
        padding-left: 16px;
        height: 50px;
      }

      @media screen and (max-width: 1440px) {
        .character-prop {
          height: 35px;
          padding-right: 10px;
          padding-left: 10px;
        }
      }

      .character-prop__label {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.25);
      }

      @media screen and (max-width: 1440px) {
        .character-prop__label {
          font-size: 12px;
        }
      }

      .character-prop__value {
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: #FFFFFF;
      }

      @media screen and (max-width: 1440px) {
        .character-prop__value {
          font-size: 14px;
        }
      }

      .controls {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      @media screen and (max-width: 1440px) {
        .controls {
          margin-top: 27px;
        }
      }

      .button-select {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(90deg, #25426D 0%, #14253F 100%);
        border-radius: 5px;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #FFFFFF;
        transition: all .3s;
      }

      @media screen and (max-width: 1440px) {
        .button-select {
          height: 55px;
          font-size: 18px;
        }
      }

      .button-select:hover {
        opacity: 0.9;
      }

      .button-delet {
        width: 180px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: rgba(252, 252, 252, 0.03);
        border-radius: 5px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.25);
        transition: .3s;
      }

      @media screen and (max-width: 1440px) {
        .button-delet {
          width: 120px;
          height: 30px;
          font-size: 10px;
        }
      }

      .button-delet:hover {
        background: rgba(255, 94, 94, 0.2);
      }

  </style>