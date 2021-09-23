<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="aside">
      <Aside class="asideCom"></Aside>
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './aside/index.vue'

export default {
  name: 'LayOut',
  components: {
    Aside
  },
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.layout-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .header {
    background-color: #B3c0D1;
  }
  .aside {
    background-color: #D3DCE6;
    .asideCom {
      height: 100%;
    }
  }
  .main {
    background-color: #E9EEF3;
  }
}
</style>
