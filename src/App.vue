<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import 'ant-design-vue/dist/antd.less'
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: lighten(#eceef1, 30%);
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
