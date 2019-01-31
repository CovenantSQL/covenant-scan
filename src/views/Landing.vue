<template>
  <div class="layout">
    <div class="hero">
      <h3 class="heading">CovenantSQL TestNet 全新上线</h3>
    </div>
    <div class="card metrics">
      <p class="title">
        全网预览
        <span class="version">v0.3.0</span>
      </p>
      <div class="status">
        <div class="status-item">
          <router-link to="/blocks">
            <label class="name">总区块数</label>
            <div class="data">{{this.latestHeight || '-'}}</div>
          </router-link>
        </div>
        <div class="status-item">
          <label class="name">已创建账户数</label>
          <div class="data">{{this.runningStatus.count_accounts || '-'}}</div>
        </div>
        <div class="status-item">
          <label class="name">已创建数据库数</label>
          <div class="data">{{this.runningStatus.count_databases || '-'}}</div>
        </div>
        <div class="status-item">
          <label class="name">每秒查询率(QPS)</label>
          <div class="data">{{this.runningStatus.qps || '-'}}</div>
        </div>
      </div>
    </div>
    <div class="chain">
      <div class="card blocks">
        <div class="header">
          <p class="title">最新区块</p>
          <router-link to="/blocks">查看全部</router-link>
        </div>
        <div class="wrapper">
          <div v-if="landingBlocks.length" class="recent-blocks">
            <div :key="block.hash" v-for="block in landingBlocks" class="block item">
              <div class="left">
                <div class="height">#{{block.height}}</div>
                <div class="tx-count">交易数：{{block.tx_count}}</div>
                <div class="producer">
                  <span>生产者：</span>
                  <hash-tip :hash="block.producer" :cutLength="16"/>
                </div>
              </div>
              <div class="right">
                <div class="hash">
                  <hash-tip :hash="block.hash" :cutLength="16"/>
                </div>
                <div class="time">{{formatDate(block.timestamp_human)}}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <a-icon slot="indicator" type="loading" style="padding: 20px; font-size: 16px" spin/>
          </div>
        </div>
      </div>
      <div class="card txs">
        <div class="header">
          <p class="title">最新转账</p>
          <router-link to="/txs">查看全部</router-link>
        </div>
        <div v-if="landingTxs.length" class="recent-txs">
          <div :key="tx.hash" v-for="tx in landingTxs" class="tx item">
            <div class="left">
              <div class="hash">
                <span>交易哈希：</span>
                <hash-tip :hash="tx.hash" :cutLength="20"/>
              </div>
              <div class="address">
                <span>地址：</span>
                <hash-tip :hash="tx.address" :cutLength="10"/>
              </div>
              <div>
                <span>类型：</span>
                {{tx.type}}
              </div>
            </div>
            <div class="right">
              <div class="block_hash">所在区块：#{{tx.block_height}}</div>
              <div class="time">{{formatDate(tx.timestamp_human)}}</div>
              <div>
                <raw-tx :tx="tx.tx"/>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <a-icon slot="indicator" type="loading" style="padding: 20px; font-size: 16px" spin/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import moment from 'moment'
import HashTip from '@/components/HashTip.vue'
import RawTx from '@/components/RawTx.vue'

@Component({
  components: {
    HashTip,
    RawTx,
  },
})
export default class Landing extends Vue {
  @namespace('bp').Getter latestHeight
  @namespace('bp').Getter landingBlocks
  @namespace('bp').Getter landingTxs

  public runningStatus = {}
  private interval

  mounted() {
    this.$store.dispatch('bp/connectBP').then(this.fetchData)
    this.interval = setInterval(this.fetchData, 3000)
  }

  // methods
  formatDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }

  fetchData() {
    this.$store.dispatch('bp/getBlocks', { page: 1, size: 10 })
    this.$store.dispatch('bp/getTxs', { page: 1, size: 10 })
  }

  destroyed() {
    clearInterval(this.interval)
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

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .wrapper {
      max-height: 100%;
      overflow: auto;
    }
    .item {
      display: flex;
      padding: 15px 5px;
      justify-content: space-between;
      border-top: solid 1px #f7ebeb;
      &:hover {
        background: #f8fcff;
      }
      .producer {
        white-space: nowrap;
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
