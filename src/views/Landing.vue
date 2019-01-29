<template>
  <div class="layout">
    <div class="hero">
      <h3 class="heading">CovenantSQL TestNet 全新上线</h3>
    </div>
    <div class="metrics">
      <p class="title">
        全网预览
        <span class="version">v0.2.0</span>
      </p>
      <div class="status">
        <div class="status-item">
          <label class="name">最新区块</label>
          <div class="data">{{this.runningStatus.block_height}}</div>
        </div>
        <div class="status-item">
          <label class="name">已创建账户数</label>
          <div class="data">{{this.runningStatus.count_accounts}}</div>
        </div>
        <div class="status-item">
          <label class="name">已创建数据库数</label>
          <div class="data">{{this.runningStatus.count_databases}}</div>
        </div>
        <div class="status-item">
          <label class="name">每秒查询率(QPS)</label>
          <div class="data">{{this.runningStatus.qps}}</div>
        </div>
      </div>
    </div>
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
  public runningStatus = this.$store.state.runningStatus

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
  color: #252728;
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
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 6px;
  background: white;

  .title {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .version {
    font-size: 16px;
    margin-left: 6px;
    color: #8f9193;
  }
  .status {
    display: flex;
    justify-content: space-between;
    .status-item {
      flex: 1;
      border-radius: 6px;
      padding: 15px 0;
      margin: 0 20px;
      text-align: center;
      .name {
        font-size: 14px;
        color: #8f9193;
      }
      .data {
        font-size: 26px;
        color: #2249c6;
      }
      &:hover {
        background: #f8fcff;
      }
    }
  }
}
.chain {
  display: flex;
  min-height: 650px;
  .card {
    flex: 1;
    height: 650px;
    border-radius: 6px;
    background: rgba($color: black, $alpha: 0.1);
  }
  .blocks {
    margin-right: 16px;
  }
}
</style>
