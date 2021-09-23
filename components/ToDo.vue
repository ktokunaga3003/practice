<template>
  <div>
    <li>{{ todo.text }}</li>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: `ToDo`,
  model: {
    prop: 'todo',
  },
  props: {
    todo: {
      type: Object,
      default() {
        return { id: Number, text: String }
      },
    },
  },
})
</script>

<style scoped></style>
