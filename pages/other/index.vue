<template>
  <div>
    <h1>Other Page</h1>
    <ol>
      <to-do v-for="item in groceryList" :key="item.id" :todo="item"></to-do>
    </ol>
    <NuxtLink to="/"><button>戻る</button></NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ToDo from '~/components/ToDo.vue'

export default Vue.extend({
  components: { ToDo },
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' },
      ],
    }
  },
})
</script>

<style scoped></style>
