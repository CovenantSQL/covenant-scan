<template>
  <div class="layout">
    <div class="hero"></div>
    <div class="metrics"></div>
    <div class="chain">
      <div class="card blocks"></div>
      <div class="card txs"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class Landing extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
  min-height: 55vh;
}
.hero {
  height: 100px;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 6px;
  background: rgba($color: #000000, $alpha: 0.1);
}
.metrics {
  height: 160px;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 6px;
  background: rgba($color: #000000, $alpha: 0.1);
}
.chain {
  display: flex;
  min-height: 650px;
  .card {
    flex: 1;
    height: 650px;
    border-radius: 6px;
    background: rgba($color: #000000, $alpha: 0.1);
  }
  .blocks {
    margin-right: 16px;
  }
}
</style>

