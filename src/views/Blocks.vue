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
      <p>当前已产出区块数量 40,107,220</p>

      <a-table
        :columns="columns"
        :rowKey="record => record.login.uuid"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        size="middle"
      >
        <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Blocks extends Vue {
  // table columns definition
  private columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ]

  data = []
  pagination = {
    total: 200,
    pageSize: 20,
    page: 1,
    current: 1,
  }
  loading = false

  // lifecycle hook
  mounted() {
    this.fetchData()
  }

  handleTableChange(pagination: any) {
    const current = pagination.current
    this.pagination.current = current
    this.fetchData(current)
  }

  // async
  async fetchData(page = this.pagination.current) {
    this.loading = true
    return fetch('https://randomuser.me/api?results=20')
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.loading = false
        this.data = data.results
      })
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
