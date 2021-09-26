<template>
  <el-container class="layout-container">
    <el-aside width="auto" class="aside">
      <Aside class="asideCom" :is-collapse="isCollapse"></Aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i :class="{'el-icon-s-fold': isCollapse, 'el-icon-s-unfold': !isCollapse}"
           @click="isCollapse = !isCollapse"
           >
           </i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown @command="handleCommand">
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人设置</el-dropdown-item>
            <el-dropdown-item command="b">登录退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './aside/index.vue'
import { getUserProfile } from '@/api/user.js'

export default {
  name: 'LayOut',
  components: {
    Aside
  },
  props: {
  },
  data () {
    return {
      // 用户信息
      user: {},
      isCollapse: false
    }
  },
  methods: {
    handleCommand (command) {
      this.$message('click on item ' + command)
    },
    getUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  },
  computed: {
  },
  created () {
    this.getUserProfile()
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
    height: 60px;
    // background-color: #B3c0D1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar-wrap {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 5px;
      }
    }
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
