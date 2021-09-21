<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">头条发布后台</h2>
      <el-form ref="user" :model="user" class="el-form">
        <el-form-item>
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="user.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loginLoadig" @click="onSubmit" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        checked: false
      },
      loginLoadig: false
    }
  },
  methods: {
    onSubmit () {
      // 获取表单数据（根据接口要求绑定数据）
      const user = this.user
      // 表单验证
      // 验证通过，提交登录
      this.loginLoadig = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        console.log(res)
        this.loginLoadig = false
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      }).catch(err => {
        console.log('登录失败' + err)
        this.loginLoadig = false
        this.$message.error('登录失败')
      })
    }
  }
}

</script>
<style lang="less" scoped>
.login-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
  .login-box {
    background-color: #fff;
    width: 400px;
    height: 340px;
    .login-title {
      text-align: center;
      height: 33px;
      line-height: 33px;
      color: #409EFF;
    }
    .el-form {
      padding: 0 50px 50px 50px;
      margin: 0 auto;
      width: 75%;
    }
  }
}
</style>
