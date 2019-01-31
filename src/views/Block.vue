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
        <span>#{{block.height}}</span>
      </p>
      <div class="content">
        <div class="row">
          <label class="label">块高</label>
          <div class="data">{{block.height}}</div>
        </div>
        <div class="row">
          <label class="label">时间</label>
          <div class="data">{{formatDate(block.timestamp_human)}}</div>
        </div>
        <div class="row">
          <label class="label">哈希</label>
          <div class="data">{{block.hash}}</div>
        </div>
        <div class="row">
          <label class="label">交易数</label>
          <div class="data">{{block.tx_count}}</div>
        </div>
        <div class="row">
          <label class="label">父块</label>
          <div class="data">
            <router-link :to="'/block/' + block.parent">{{block.parent}}</router-link>
          </div>
        </div>
        <div class="row">
          <label class="label">生产者</label>
          <div class="data">{{block.producer}}</div>
        </div>
        <div class="row">
          <label class="label">默克尔树根</label>
          <div class="data">{{block.merkle_root}}</div>
        </div>
        <div class="row">
          <label class="label">版本</label>
          <div class="data">{{block.version}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
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

  @Prop(String) hash!: string

  block = {}
  loading = false

  // lifecycle hook
  mounted() {
    this.$store.dispatch('bp/connectBP').then(this.fetchData)
  }

  updated() {
    this.fetchData()
  }

  // async
  async fetchData() {
    this.loading = true
    try {
      let result = await this.$store.dispatch('bp/getBlockByHash', this.hash)
      this.block = result
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
  min-height: 55vh;
  color: #252728;
}
.breadcrumb {
  margin-bottom: 15px;
}
.content {
  .row {
    display: flex;
    margin-bottom: 5px;
    .label {
      color: #888;
      width: 120px;
    }
  }
}
</style>
