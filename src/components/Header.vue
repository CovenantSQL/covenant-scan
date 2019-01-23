<template>
  <header class="header">
    <a-row class="header-row">
      <a-col class="header-left" :md="8" :sm="24" :xs="24">
        <router-link to="/" id="logo">
          <img
            alt="logo"
            height="32"
            src="https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/logo.png"
          >
          <span style="color: black;font-size: 16px;font-weight: 400;">CovenantScan</span>
        </router-link>
      </a-col>
      <a-col class="header-right" :md="16" :sm="0">
        <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch"/>
        <a-button
          size="small"
          class="header-lang-button"
          @click="onClick"
          key="lang-button"
        >{{isCN ? 'English' : '中文'}}</a-button>
      </a-col>
    </a-row>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(240, 241, 242, 65);
  position: relative;
  z-index: 10;
  max-width: 100%;
}
.header-row {
  line-height: 64px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
