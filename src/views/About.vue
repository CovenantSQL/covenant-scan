<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>life: {{ count }}s</p>
    <a-button @click="add1s">+1s</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class About extends Vue {
  count = 1

  add1s() {
    console.log(this.count)
    this.count = this.count + 1
  }

  // lifecycle hook
  mounted() {
    console.log('$message', this.$message)
    this.$message.loading('Loading about page')
  }
}
</script>
