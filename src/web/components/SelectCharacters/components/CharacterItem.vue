<template>
  <CharacterItemNone v-if="!status"/>
  <CharacterItemDefault 
    v-else-if="status === 'default'"
    :level="this.level"
    :number="this.number"
    :hoursInGame="this.hoursInGame"
    :cash="this.cash"
    :moneyInBank="this.moneyInBank"
    :organization="this.organization"
    :characterName="this.characterName"
  />
  <CharacterItemBlock 
    v-else-if="status === 'block'"
    :level="this.level"
    :number="this.number"
    :hoursInGame="this.hoursInGame"
    :cash="this.cash"
    :moneyInBank="this.moneyInBank"
    :organization="this.organization"
    :characterName="this.characterName"

    :reasonBlock="this.reasonBlock"
    :administratorName="this.administratorName"
    :unlockTime="this.unlockTime"
  />
  <CharacterItemDeleting 
    v-else-if="status === 'deleting'"
    :level="this.level"
    :number="this.number"
    :hoursInGame="this.hoursInGame"
    :cash="this.cash"
    :moneyInBank="this.moneyInBank"
    :organization="this.organization"
    :characterName="this.characterName"
    
    :deletedTime="this.deletedTime"
  />  
</template>

<script>
import CharacterItemNone from './CharacterItemNone.vue';
import CharacterItemDefault from './CharacterItemDefault.vue'
import CharacterItemBlock from './CharacterItemBlock.vue';
import CharacterItemDeleting from './CharacterItemDeleting.vue';

export default {
  name: 'CharacterItem',
  components: {
    CharacterItemNone,
    CharacterItemDefault,
    CharacterItemBlock,
    CharacterItemDeleting
  },
  props: {
    status: String,
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

    deletedTime: String,
  }
}
</script>

<style scoped>

</style>
