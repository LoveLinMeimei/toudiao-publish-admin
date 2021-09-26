<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">头条发布后台</h2>
      <el-form ref="userForm"
       :model="user"
       :rules="loginRules"
       class="el-form">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loginLoadig" @click="onSubmit('userForm')" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginLoadig: false,
      // 表单校验规则
      loginRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请正确输入手机号' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请同意用户协议'))
              }
              callback()
            }
          }
        ]
      }
    }
  },
  methods: {
    onSubmit (userForm) {
      // 获取表单数据（根据接口要求绑定数据）
      // const user = this.user
      // 表单验证
      // validate方法是异步的
      this.$refs[userForm].validate((valid) => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过，请求登录
        this.login()
      })
    },
    login () {
      // 开启登录中loading...
      this.loginLoadig = true
      login(this.user).then(res => {
        // console.log(res)

        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        // 登录成功以后将用户信息存储到本地存储
        // 本地存储只能存字符串
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        // 关闭loading
        this.loginLoadig = false

        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        // 登录失败
        console.log('登录失败' + err)
        this.$message.error('登录失败')
        // 关闭loading
        this.loginLoadig = false
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
