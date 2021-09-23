<template>
  <div class='aside-container'>
    <h1 class="title">
      <img src="./favicon.jpg" alt="">
      头条发布后台
    </h1>
    <el-menu
      class="el-menu"
      default-active="2"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="iconfont icon-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
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
.aside-container {
  .title {
    background-color: #002033;
    margin: 0;
    padding: 20px 0 0 0;
    color: #fff;
    text-align: center;
    line-height: 46px;
    img {
      width: 20px;
      height: 20px;
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
