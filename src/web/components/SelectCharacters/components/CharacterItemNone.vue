<template>
  <div class="character-none">
    <div class="character-none__icon">
      <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.5 49.5V17.5M49.5 33.5H17.5H49.5Z" stroke="#9D9D9D" stroke-opacity="0.5" stroke-width="2" stroke-linecap="square"/>
        <path d="M33.5 66C51.4493 66 66 51.4493 66 33.5C66 15.5507 51.4493 1 33.5 1C15.5507 1 1 15.5507 1 33.5C1 51.4493 15.5507 66 33.5 66Z" stroke="#9D9D9D" stroke-opacity="0.5" stroke-width="2" stroke-linecap="square"/>
      </svg>
    </div>
    <span class="character-none__title">Создать персонажа</span>
  </div>
</template>

<script>
export default {
  name: 'CharacterItemNone',
  props: {
  }
}
</script>

<style scoped>
    .character-none {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: 560px;
      height: 709px;
      background: rgba(252, 252, 252, 0.02);
      border: 1px solid rgba(157, 157, 157, 0.05);
      border-radius: 10px;
      cursor: pointer;
      transition: .3s;
    }

    @media screen and (max-width: 1440px) {
        .character-none {
          width: 372px;
          height: 529px;
        }
      }

    .character-none:hover {
      background: rgba(252, 252, 252, 0.05);
    }

    .character-none__title {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(157, 157, 157, 0.5);
      transition: .3s;
    }

    .character-none__title:hvoer {
      color: rgba(157, 157, 157, 0.9);
    }

</style>