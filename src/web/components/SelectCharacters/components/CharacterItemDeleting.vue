<template>
    <div class="character-deleting">
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
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7446 15.2286L13.3826 13.3274V6.38626C13.3826 5.88076 12.9726 5.47095 12.4671 5.47095C11.9616 5.47095 11.5518 5.88096 11.5518 6.38626V13.8613C11.5518 13.873 11.5549 13.8842 11.5551 13.8959C11.5563 13.9282 11.5601 13.9594 11.5647 13.9912C11.5689 14.0203 11.573 14.0491 11.5798 14.0774C11.5868 14.1054 11.5961 14.1325 11.6055 14.1597C11.6156 14.1888 11.6254 14.2168 11.6381 14.2445C11.6502 14.2709 11.6648 14.2956 11.6795 14.3207C11.6944 14.3459 11.7089 14.3712 11.726 14.3951C11.7435 14.4193 11.7634 14.4418 11.7833 14.4645C11.8026 14.4864 11.8215 14.5077 11.8428 14.5275C11.8641 14.5476 11.887 14.5653 11.9102 14.5833C11.9353 14.6027 11.9606 14.6212 11.9878 14.6382C11.9982 14.6443 12.0061 14.6527 12.0167 14.6584L15.8434 16.8225C15.9859 16.9029 16.1404 16.9412 16.2932 16.9412C16.6125 16.9412 16.9225 16.7739 17.0908 16.4763C17.3396 16.0359 17.1845 15.4775 16.7446 15.2286Z" fill="white" fill-opacity="0.5"/>
                <path d="M12.5 0C5.60743 0 0 5.60743 0 12.5C0 19.3924 5.60743 25 12.5 25C19.3924 25 25 19.3924 25 12.5C25 5.60743 19.3924 0 12.5 0ZM13.2957 22.9774V21.1538H11.7043V22.9774C6.77659 22.6064 2.7873 18.8252 2.09719 13.992H3.97894V12.4005H1.99195C2.04328 6.91823 6.31207 2.42862 11.7043 2.02259V3.84625H13.2957V2.02259C18.6877 2.42862 22.9567 6.91823 23.008 12.4005H21.1207V13.992H22.9028C22.2127 18.8252 18.2236 22.6064 13.2957 22.9774Z" fill="white" fill-opacity="0.5"/>
                </svg>

                <span class="header__title_white">Персонаж</span>
                <span class="header__title_red">Удаляется</span>
            </div>
            <div class="footer">
                <span class="footer__label">будет удалён</span>
                <span class="footer__value">{{ deletedTime }}</span>
            </div>

            <div class="button-cancel">
                Отменить
            </div>  
        </div>

        
    </div>
    
</template>
  
<script>
import CharacterItemDefault from './CharacterItemDefault.vue'

export default {
name: 'CharacterItemDeleting',
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

    deletedTime: String,
}
}
</script>

<style scoped>
    .character-deleting {
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

    .button-cancel {
        width: 180px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(252, 252, 252, 0.03);
        border-radius: 5px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.25);
        cursor: pointer;
        transition: .3s;
    }

    .button-cancel:hover {
        background: rgba(255, 94, 94, 0.2);
    }

</style>