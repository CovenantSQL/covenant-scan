<template>
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
    <a-tag color="green">Raw</a-tag>
  </a-popover>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class HashTip extends Vue {
  @Prop(Object) tx!: object
}
</script>

<style lang="scss" scoped>
.raw-tx {
  font-size: 12px;
  .row {
    .label {
      color: #888;
      margin-right: 5px;
    }
  }
  pre {
    font-size: 10px;
    font-family: 'Lucida Console', Monaco, monospace;
  }
}
</style>
