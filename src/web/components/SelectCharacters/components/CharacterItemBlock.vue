<template>
    <div class="character-block">
        <CharacterItemDefault 
            :level="this.level"
            :number="this.number"
            :hoursInGame="this.hoursInGame"
            :cash="this.cash"
            :moneyInBank="this.moneyInBank"
            :organization="this.organization"
            :characterName="this.characterName"
        />
        <div class="wrapper">
            <div class="header">
                <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.2222 13.5H3.77778C2.24365 13.5 1 14.7437 1 16.2778V26C1 27.5341 2.24365 28.7778 3.77778 28.7778H23.2222C24.7563 28.7778 26 27.5341 26 26V16.2778C26 14.7437 24.7563 13.5 23.2222 13.5Z" stroke="white" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.88232 11.2941V6.71895C6.88232 5.20219 7.57954 3.74755 8.82059 2.67504C10.0616 1.60253 11.7449 1 13.5 1C15.2551 1 16.9383 1.60253 18.1794 2.67504C19.4204 3.74755 20.1176 5.20219 20.1176 6.71895V11.2941" stroke="white" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                </svg>
                <span class="header__title_white">Персонаж</span>
                <span class="header__title_red">заблокирован</span>
            </div>
            <div class="content">
                <div class="content__item">
                    <span class="content__item-label">Причина блокировки:</span>
                    <span class="content__item-value">{{ reasonBlock }}</span>
                </div>
                <div class="content__item">
                    <span class="content__item-label">Администратор</span>
                    <span class="content__item-value">{{ administratorName }}</span>
                </div>
            </div>
            <div class="footer">
            <span class="footer__label">заблокирован до</span>
            <span class="footer__value">{{ unlockTime }}</span>
        </div>
        </div>

        
    </div>
    
</template>
  
<script>
import CharacterItemDefault from './CharacterItemDefault.vue'

export default {
name: 'CharacterItemBlock',
components: {
    CharacterItemDefault
},
props: {
    level: Number,
    number: Number,
    hoursInGame: Number,
    cash: Number,
    moneyInBank: Number,
    organization: String,
    characterName: String,

    reasonBlock: String,
    administratorName: String,
    unlockTime: String,
}
}
</script>

<style scoped>
    .character-block {
        position: relative;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(15px);
        border-radius: 10px;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header__title_white {
        margin-top: 20px;
        font-weight: 500;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(252, 252, 252, 0.5);
    }

    .header__title_red {
        font-weight: 500;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #6D2525;
    }

    .content {
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 5px;
        padding: 20px;
    }

    .content__item {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .content__item-label {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.25);
    }

    .content__item-value {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.9);
    }

    .footer {
        display: flex;
        gap: 10px;
    }

    .footer__label {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.25);
    }

    .footer__value {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        letter-spacing: 0.05em;
        text-decoration-line: underline;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.9);
    }

</style>