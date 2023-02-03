
<script>
export default {
    name: 'SVG_Login_username',

    props: {
        fill: String,
        opacity: String
    }
}
</script>

<template>
    <svg width="19" height="21" fill="none" viewBox="0 0 19 21" xmlns="http://www.w3.org/2000/svg">
        <path class="svg" d="M18 20.125V18C18 16.8728 17.5522 15.7918 16.7552 14.9948C15.9582 14.1978 14.8772 13.75 13.75 13.75H5.25C4.12283 13.75 3.04183 14.1978 2.2448 14.9948C1.44777 15.7918 1 16.8728 1 18V20.125" :stroke="fill" :stroke-opacity="opacity" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path class="svg" d="M9.5 9.5C11.8472 9.5 13.75 7.59721 13.75 5.25C13.75 2.90279 11.8472 1 9.5 1C7.15279 1 5.25 2.90279 5.25 5.25C5.25 7.59721 7.15279 9.5 9.5 9.5Z" :stroke="fill" :stroke-opacity="opacity" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<style scoped>
.svg {
    transition: all 0.3s;
}
</style>