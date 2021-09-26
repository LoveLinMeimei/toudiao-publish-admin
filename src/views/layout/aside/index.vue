<template>
  <div class='aside-container'>
    <el-menu
      class="el-menu"
      default-active="2"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      router>
        <h1 class="title">
          <img src="./favicon.jpg" alt="">
          <span :class="[isCollapse ? 'isOpen' : '']">头条发布后台</span>
        </h1>
        <el-menu-item index="/">
          <i class="iconfont icon-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="iconfont icon-article"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="iconfont icon-img"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="iconfont icon-ic-published"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="iconfont icon-comments"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="iconfont icon-icon_fans"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="iconfont icon-set"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  components: {
  },
  props: ['is-collapse'],
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
.aside-container {
  .title {
    background-color: #002033;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    .isOpen {
      display: none;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
  .el-menu {
    height: 100%;
    .iconfont {
      margin-right: 5px;
    }
  }
}
</style>
