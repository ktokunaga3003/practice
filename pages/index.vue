<template>
  <div>
    <label for="text-area">テスト用のinputエリアです</label>
    <input
      id="text-area"
      v-model="inputValue"
      class="input-area"
      type="text"
    /><span class="input-value-show-area">{{ inputValue }}</span>
    <button class="reverse-button" @click="reverseInputValue">Reverse</button>
    <div>
      <NuxtLink to="/other"><button>Other</button></NuxtLink>
      <a href="http://www.google.com">google</a>
    </div>
    <div>
      <button class="switch-button" @click="testSwitch">switch</button>
      <button class="switch-clear-button" @click="testSwitchClear">
        clear
      </button>
    </div>
    <div v-if="error" class="show-error-message">{{ errorMessage }}</div>
    <div>
      <button class="sum-button" @click="sum">sum</button>
      <button class="sum-clear-button" @click="sumClear">clear</button>
    </div>
    <div v-if="sumValue" class="show-sum">{{ sumValue }}</div>
    <div>
      <input v-model="listValue" class="list-input" type="text" />
      <button class="add-list-button" @click="addList">addList</button>
      <ol class="to-do-lists">
        <li v-for="todo in todos" :key="todo.id" class="to-do">
          {{ todo.text }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      inputValue: '',
      textValue: '',
      errorMessage: '',
      error: false,
      sumValue: 0,
      listValue: '',
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' },
      ],
    }
  },
  computed: {
    copyInputValue(): string {
      // @ts-ignore
      const value = this.inputValue
      return value
    },
  },
  methods: {
    inputBlur() {
      this.inputValue = this.textValue
    },
    sum() {
      const value1 = Math.floor((100 - 1) * Math.random())
      const value2 = Math.floor((100 - 1) * Math.random())
      this.sumValue = value1 + value2
    },
    testSwitch() {
      this.error = false
      const value = 1 + Math.floor((6 - 1) * Math.random())

      switch (value) {
        case 1:
          break
        case 2:
          break
        case 3:
        case 4:
          this.showErrorMessage()
          break
        default:
          break
      }
    },
    showErrorMessage() {
      this.error = true
      this.errorMessage = 'error'
    },
    testSwitchClear() {
      this.error = false
      this.errorMessage = ''
    },
    sumClear() {
      this.sumValue = 0
    },
    addList() {
      if (!(!this.listValue || !this.listValue.trim()))
        this.todos.push({ text: this.listValue })
      this.listValue = ''
    },
    reverseInputValue() {
      this.inputValue = this.inputValue.split('').reverse().join('')
    },
  },
})
</script>

<style scoped></style>
