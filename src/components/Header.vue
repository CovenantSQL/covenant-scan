<template>
  <header class="header">
    <div class="header-row">
      <div class="header-left">
        <router-link to="/">
          <img svg-inline class="logo" src="@/assets/logo.svg" alt="covenant-scan-logo">
        </router-link>
      </div>
      <div class="header-right">
        <a-input-search class="search" placeholder="交易/区块哈希/区块高度" @search="onSearch"/>
        <!-- <span class="lang-dropdown">
          <a-dropdown>
            <a class="lang-selected">简体中文
              <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="onLangSelected">简体中文</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="onLangSelected">繁体中文</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="onLangSelected">English</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  onSearch() {
    this.$notification.open({
      message: '搜索功能开发中...',
      description:
        '请直接补全URL: /block/$hash 或者 /tx/$hash 访问区块与交易页面',
    })
  }
  onLangSelected() {}
}
</script>

<style>
.ant-input-search {
  border-radius: 30px;
}
</style>
<style lang="scss" scoped>
.header {
  height: 64px;
  background: #fff;
  box-shadow: 0 2px 8px #dadcde;
  position: relative;
  z-index: 10;
  max-width: 100%;
}
.logo {
  height: 42px;
  margin-bottom: 4px;
  width: auto;
}
.header-row {
  line-height: 64px;
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.search {
  width: 300px;
  margin: 0 5px;
}
.lang-dropdown {
  margin-left: 5px;
  padding: 6px 14px;
  border-radius: 30px;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
.lang-selected {
  color: #333;
}
</style>
