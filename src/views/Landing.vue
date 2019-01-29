<template>
  <div class="layout">
    <div class="hero">
      <h3 class="heading">CovenantSQL TestNet 全新上线</h3>
    </div>
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
export default class Landing extends Vue {
  private $bar: any

  created() {
    this.$bar.start()
  }

  mounted() {
    this.$bar.finish()
  }
}
</script>

<style lang="scss" scoped>
.layout {
  margin: 0 auto;
  padding: 20px 15px 40px;
  width: 1200px;
  max-width: 100%;
  min-height: 55vh;
}
.hero::before {
  content: '';
  position: absolute;

  z-index: -1;

  display: block;
  background-image: url('../assets/bg.png');
  background-size: cover;
  width: 100%;
  height: 100%;

  filter: blur(2px);
}
.hero {
  height: 100px;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 6px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  overflow: hidden;

  .heading {
    text-align: center;
    color: white;
    font-size: 2em;
    font-weight: 600;
    padding: 0 25px;
    margin: 0;
  }
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
