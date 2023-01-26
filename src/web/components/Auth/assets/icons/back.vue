
<script>
export default {
    name: 'SVG_Register_email',

    props: {
        fill: String,
        opacity: String
    }
}
</script>

<template>
    <svg width="6" height="13" viewBox="0 0 6 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25 11.5625L0.75 6.5L5.25 1.4375" :stroke="fill" :stroke-opacity="opacity" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>