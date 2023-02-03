<script>
import SVGAye from '../../assets/icons/ayes.vue'
import LoginSVG from '../../assets/icons/username.vue'
import ErrorSVG from '../../assets/icons/error.vue'
import PasswordSVG from '../../assets/icons/password.vue'
import EmailSVG from '../../assets/icons/email.vue'
import BackSVG from '../../assets/icons/back.vue'
import PromocodeSVG from '../../assets/icons/promocode.vue'

export default {
    name: "AuthInput",
    data() {
        return {
            _input: null,
            ayes: false,
            isActive: false
        }
    },
    props: {
        title: String,
        id: String,
        modelValue: String,
        icon: String,
        isPassword: Boolean
    },
    mounted() {
        console.log(this.icon)
    },
    emits: ["update:modelValue"],
    methods: {
        clickInput(id) {
            let input = document.querySelector(`#${id}`)

            if(input.style.height == 0 || input.value == '' || input.value == ' ' || input.value.length <= 0) {
                input.style.height = '30px';
                input.focus();

                this.isActive = true

                let title = document.querySelector(`#title-${id}`)
                title.style.fontSize = '12px';
            }
        },
        unfocusInput(id) {
            let input = document.querySelector(`#${id}`)

            if (input.value.length < 1) {
                let title = document.querySelector(`#title-${id}`)
                title.style.fontSize = '14px';

                this.isActive = false

                input.style.height = '0px';
                input.blur();
            }
        }
    },
    components: {
        SVGAye,
        LoginSVG,
        ErrorSVG,
        PasswordSVG,
        EmailSVG,
        BackSVG,
        PromocodeSVG
    }
}
</script>

<template>
    <div class="input-box" @click="clickInput(id)">
        <div class="input-icon">
            <template v-if="icon">
                <component :is="icon + 'SVG'" fill="#FFFFFF" :opacity="isActive ? '1' : '0.25'" />
            </template>
        </div>

        <div class="input-sub-box">
            <div class="input-sub-title" :id="'title-' + id" :ref="_input">{{ title }}</div>
            <input 
                :type="isPassword ? ayes ? 'text' : 'password' : 'text'" 
                :value="modelValue"
                :id="id"
                @input="$emit('update:modelValue', $event.target.value)"
                :ref="id" 
                @blur="unfocusInput(id)" />
        </div>

        <div class="input-right-box" @click="ayes = !ayes" v-if="isPassword">
            <SVGAye class="svg" :fill="'#fcfcfc'" :status="ayes" />
        </div>
    </div>
</template> 

<style scoped>

.input-box {
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 400px;
    height: 65px;

    background: rgba(252, 252, 252, 0.02);
    border: 1px solid rgba(157, 157, 157, 0.05);
    border-radius: 5px;

    margin-bottom: 20px;
}

.input-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 65px;
    height: 100%;
}
.input-sub-box {
    display: flex;
    justify-content: center;
    align-items: center;

    width: auto;
    height: auto
}

.input-sub-box {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.input-sub-title {
    font-family: 'Montserrat';
    font-size: 14px;

    color: rgba(252, 252, 252, 0.45);
    transition: all 0.3s;
}

input {
    font-family: 'Montserrat';
    font-size: 16px;

    width: 100%;
    height: 0;

    color: rgba(252, 252, 252, 0.90);
    background: none;
    border: none;
    outline: none;
    transition: all 0.3s;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
}

.input-right-box {
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    right: 0;

    width: 65px;
    height: 100px;

    cursor: pointer;
}

.svg {
    cursor: pointer;
    z-index: 2;
}
</style>