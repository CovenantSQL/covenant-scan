<template>
  <div class="layout">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>区块列表</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="card txs">
      <p class="title">区块列表</p>
      <p>当前已产出区块数量 {{latestHeight}}</p>

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
          <hash-tip :hash="text" :cutLength="16"/>
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
export default class Blocks extends Vue {
  @State('bp') bpState
  @namespace('bp').Getter latestHeight
  @namespace('bp').Getter landingBlocks

  // table columns definition
  private columns = [
    {
      title: '块高',
      dataIndex: 'height',
      scopedSlots: { customRender: 'height' },
    },
    {
      title: '交易数',
      dataIndex: 'tx_count',
    },
    {
      title: '哈希',
      dataIndex: 'hash',
      scopedSlots: { customRender: 'cutHash' },
    },
    {
      title: '生产者',
      dataIndex: 'producer',
      scopedSlots: { customRender: 'cutHash' },
    },
    {
      title: '默克尔树根',
      dataIndex: 'merkle_root',
      scopedSlots: { customRender: 'cutHash' },
    },
    {
      title: '父节点',
      dataIndex: 'parent',
      scopedSlots: { customRender: 'cutHash' },
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

  updateLocalPagination() {
    let bpPagination = this.bpState.pagination
    this.pagination.total = bpPagination.total
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
    console.log('////////fetchData', page)
    this.loading = true
    try {
      let result = await this.$store.dispatch('bp/getBlocks', {
        page: page,
        size: 16,
      })
      this.data = result.blocks
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
</style>
