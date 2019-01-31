<template>
  <a-tooltip>
    <template slot="title">{{hash}}</template>
    <div class="hash">{{hash.slice(0, cutLength)}}.</div>
  </a-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class HashTip extends Vue {
  @Prop(Number) cutLength!: string
  @Prop(String) hash!: string
}
</script>

<style lang="scss" scoped>
.hash {
  display: inline;
  font-family: 'Lucida Console', Monaco, monospace;
  color: #666;
  font-size: 12px;
  padding-bottom: 1px;
  border-bottom: 1px dashed #0c5cea;
}
</style>
