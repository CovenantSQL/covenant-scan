<template>
  <div class="layout">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>区块详情</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="card">
      <p class="title">
        <span>交易：{{transaction.hash}}</span>
      </p>
      <div class="content">
        <div class="row">
          <label class="label">所属块高</label>
          <div class="data">#{{transaction.block_height}}</div>
        </div>
        <div class="row">
          <label class="label">所属块哈希</label>
          <div class="data">
            <router-link :to="'/block/' + transaction.block_hash">{{transaction.block_hash}}</router-link>
          </div>
        </div>
        <div class="row">
          <label class="label">时间</label>
          <div class="data">{{formatDate(transaction.timestamp_human)}}</div>
        </div>
        <div class="row">
          <label class="label">哈希</label>
          <div class="data">{{transaction.hash}}</div>
        </div>
        <div class="row">
          <label class="label">交易类型</label>
          <div class="data">{{transaction.type}}</div>
        </div>
        <div class="row">
          <label class="label">原始交易数据</label>
        </div>
        <div class="raw-wrapper">
          <div class="raw-tx">
            <div class="row">
              <span class="label">哈希</span>
              {{transaction.tx.DataHash}}
            </div>
            <div class="row">
              <span class="label">Gas</span>
              {{transaction.tx.GasPrice}}
            </div>
            <div class="row">
              <span class="label">CPU</span>
              {{transaction.tx.LoadAvgPerCPU}}
            </div>
            <div class="row">
              <span class="label">内存</span>
              {{transaction.tx.Memory}}
            </div>
            <div class="row">
              <span class="label">Space</span>
              {{transaction.tx.Space}}
            </div>
            <div class="row">
              <span class="label">NodeID</span>
              {{transaction.tx.NodeID}}
            </div>
            <div class="row">
              <span class="label">Nonce</span>
              {{transaction.tx.Nonce}}
            </div>
            <div class="row">
              <span class="label">TokenType</span>
              {{transaction.tx.TokenType}}
            </div>
            <div class="row">
              <span class="label">TxType</span>
              {{transaction.tx.TxType}}
            </div>
            <div class="row">
              <span class="label">TargetUser</span>
              {{transaction.tx.TargetUser || '-'}}
            </div>
            <div class="row">
              <span class="label">签名</span>
              <pre>{{JSON.stringify(transaction.tx.Signature, null, 2)}}</pre>
            </div>
            <div class="row">
              <span class="label">签名者</span>
              <pre>{{JSON.stringify(transaction.tx.Signee, null, 2)}}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Watch, Vue } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'
import moment from 'moment'
import HashTip from '@/components/HashTip.vue'

@Component({
  components: {
    HashTip,
  },
})
export default class Transaction extends Vue {
  @State('bp') bpState

  @Prop(String) hash!: string

  transaction = {}
  loading = false

  // lifecycle hook
  mounted() {
    this.$store.dispatch('bp/connectBP').then(this.fetchData)
  }

  // watch
  @Watch('hash')
  onRouteHashChanged() {
    this.fetchData()
  }

  // async
  async fetchData() {
    this.loading = true
    try {
      let result = await this.$store.dispatch(
        'bp/getTransactionByHash',
        this.hash
      )

      this.transaction = result
      this.loading = false
    } catch (error) {
      console.error(error)
    }
  }

  // private methods
  private formatDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }
}
</script>

<style lang="scss" scoped>
.layout {
  margin: 0 auto;
  padding: 20px 15px 40px;
  width: 1200px;
  max-width: 100%;
  min-height: 60vh;
  color: #252728;
}
.breadcrumb {
  margin-bottom: 15px;
}
.content {
  margin-top: 15px;
  .row {
    display: flex;
    margin-bottom: 5px;
    .label {
      color: #888;
      width: 120px;
    }
  }
  .raw-wrapper {
    margin: 5px 0 15px;
    padding: 15px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #efefef;
  }
  pre {
    font-size: 12px;
    font-family: 'Lucida Console', Monaco, monospace;
  }
}
</style>
