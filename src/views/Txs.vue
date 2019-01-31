<template>
  <div class="layout">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>交易列表</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="card txs">
      <p class="title">交易列表</p>
      <p>当前已产出交易数量 {{latestTxCount}}</p>
      <a-table
        :columns="columns"
        :rowKey="record => record.height"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        size="middle"
      >
        <a slot="height" slot-scope="text" href="javascript:;">#{{text}}</a>
        <span slot="cutHash" slot-scope="text">
          <hash-tip :hash="text" :cutLength="20"/>
        </span>
        <span slot="raw" slot-scope="tx">
          <a-popover title="交易数据">
            <template slot="content">
              <div class="raw-tx">
                <div class="row">
                  <span class="label">哈希</span>
                  {{tx.DataHash}}
                </div>
                <div class="row">
                  <span class="label">Gas</span>
                  {{tx.GasPrice}}
                </div>
                <div class="row">
                  <span class="label">CPU</span>
                  {{tx.LoadAvgPerCPU}}
                </div>
                <div class="row">
                  <span class="label">内存</span>
                  {{tx.Memory}}
                </div>
                <div class="row">
                  <span class="label">Space</span>
                  {{tx.Space}}
                </div>
                <div class="row">
                  <span class="label">NodeID</span>
                  {{tx.NodeID}}
                </div>
                <div class="row">
                  <span class="label">Nonce</span>
                  {{tx.Nonce}}
                </div>
                <div class="row">
                  <span class="label">TokenType</span>
                  {{tx.TokenType}}
                </div>
                <div class="row">
                  <span class="label">TxType</span>
                  {{tx.TxType}}
                </div>
                <div class="row">
                  <span class="label">TargetUser</span>
                  {{tx.TargetUser || '-'}}
                </div>
                <div class="row">
                  <span class="label">签名</span>
                  <pre>{{JSON.stringify(tx.Signature, null, 2)}}</pre>
                </div>
                <div class="row">
                  <span class="label">签名者</span>
                  <pre>{{JSON.stringify(tx.Signee, null, 2)}}</pre>
                </div>
              </div>
            </template>
            <a-tag color="green">raw</a-tag>
          </a-popover>
        </span>
        <span slot="date" slot-scope="text">{{formatDate(text)}}</span>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'
import moment from 'moment'
import HashTip from '@/components/HashTip.vue'

@Component({
  components: {
    HashTip,
  },
})
export default class Txs extends Vue {
  @State('bp') bpState
  @namespace('bp').Getter latestTxCount

  // table columns
  private columns = [
    {
      title: '所属块高',
      dataIndex: 'block_height',
      scopedSlots: { customRender: 'height' },
    },
    {
      title: '地址',
      dataIndex: 'address',
      scopedSlots: { customRender: 'cutHash' },
    },
    {
      title: '哈希',
      dataIndex: 'hash',
      scopedSlots: { customRender: 'cutHash' },
    },

    {
      title: '交易类型',
      dataIndex: 'type',
    },
    {
      title: '交易原始数据',
      dataIndex: 'tx',
      scopedSlots: { customRender: 'raw' },
    },
    {
      title: '时间',
      dataIndex: 'timestamp_human',
      scopedSlots: { customRender: 'date' },
    },
  ]

  data = []
  pagination = {
    total: 0,
    pageSize: 16,
    page: 1,
    current: 1,
  }
  loading = false

  // lifecycle hook
  mounted() {
    this.$store.dispatch('bp/connectBP').then(() => this.fetchData(1))
  }

  handleTableChange(pagination: any) {
    console.log(pagination)
    const current: number = pagination.current
    this.pagination.current = current
    this.fetchData(current)
  }

  // methods
  formatDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }

  // async
  async fetchData(page = this.pagination.current) {
    this.loading = true
    try {
      let result = await this.$store.dispatch('bp/getTxs', {
        page: page,
        size: this.pagination.pageSize,
      })
      this.data = result.transactions
      this.pagination.total = result.pagination.total
      this.loading = false
    } catch (error) {
      console.error(error)
    }
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
.breadcrumb {
  margin-bottom: 15px;
}
.raw-tx {
  font-size: 12px;
  .row {
    .label {
      color: #888;
      margin-right: 5px;
    }
  }
}
</style>
