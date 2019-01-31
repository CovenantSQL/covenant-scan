<template>
  <div id="app">
    <Header/>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <Footer/>
  </div>
</template>

<script lang="ts">
import 'ant-design-vue/dist/antd.less'
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f0f2f5;
  min-height: 100vh;
  color: #2c3e50;
}
.view {
  min-height: 65vh;
}
.card {
  padding: 20px;
  background: white;
  box-shadow: 0 2px 8px #dadcde;
  border-radius: 6px;

  .title {
    font-size: 16px;
    margin-bottom: 5px;
  }
}
</style>
