<template>
  <div class="layout">
    <div class="hero">
      <h3 class="heading">CovenantSQL TestNet 全新上线</h3>
    </div>
    <div class="card metrics">
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
      <div class="card blocks">
        <div class="header">
          <p class="title">最新区块</p>
          <router-link to="/blocks">查看全部</router-link>
        </div>
        <div class="recent-blocks">
          <div class="block item">
            <div class="left">
              <div class="height">#12</div>
              <div class="tx-count">6</div>
              <div class="producer">4io8u9v9nydaQPXtmqibg8gJbkNFd7Dd</div>
            </div>
            <div class="right">
              <div class="hash">v9nydaQPXtm...</div>
              <div class="time">3 minutes ago</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card txs">
        <div class="header">
          <p class="title">最新转账</p>
          <a>查看全部</a>
        </div>
        <div class="tx item">
          <div class="left">
            <div class="hash">u9v9nydaQPXtmqibg8gJ</div>
            <div class="type">6</div>
            <div class="address">4io8u9v9nydaQPXtmqibg8gJbkNFd7Dd</div>
          </div>
          <div class="right">
            <div class="block_hash">v9nyda...</div>
            <div class="time">3 minutes ago</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class Landing extends Vue {
  public runningStatus = this.$store.state.runningStatus
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
  box-shadow: 0 2px 8px #dadcde;

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
  .blocks,
  .txs {
    flex: 1;
    height: 650px;

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .item {
      display: flex;
      padding: 15px 15px;
      margin: 0 -20px;
      justify-content: space-between;
      border-top: solid 1px #f7ebeb;
      &:hover {
        background: #f8fcff;
      }
      .right {
        text-align: right;
      }
    }
  }
  .blocks {
    margin-right: 16px;

    .block {
    }
  }
}
</style>
