<template>
  <div class="select-character" v-show="visible">
    <CharacterItem/>
    <CharacterItem/>
  </div>
</template>

<script>
import CharacterItem from './components/CharacterItem.vue';

export default {
  name: 'App',
  components: {
    CharacterItem
  },
  data() {
    return {
      data: null,
      visible: false
    }
  },
  mounted() {
    this.$events.on('cef.select_characters:visible:set', (status) => {
      this.visible = status[0];
    });

    this.$events.on('cef.select_characters:data:set', (data) => {
      this.data = data[0]
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

.select-character {
  font-family: 'Montserrat', sans-serif;

  width: 100vw;
  height: 100vh;

  background-image: url('./assets/bg.png');

  background-color: rgba(0, 0, 0, 0.8);
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  gap: 40px;
}

@media screen and (max-width: 1440px) {
  .select-character {
    gap: 20px;
  }
}


</style>
