<template>
  <div class='setting-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/comment' }">个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="50">
        <el-col :span="16">
          <el-form ref="settingsForm" :rules="settingsRules" :model="userProfile" label-width="80px">
            <el-form-item label="编号" prop="id">
              <el-input v-model="userProfile.id"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="userProfile.mobile"></el-input>
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="userProfile.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="userProfile.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userProfile.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="updateUserProfileLoading"
                @click="onSettingUserProfile"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <label for="inputFile">
            <el-avatar
              shape="square"
              :size="150"
              fit="cover"
              :src="userProfile.photo"
            >
            </el-avatar>
            <!-- <p @click="$refs.inputFile.click()">点击修改头像</p> -->
            <p>点击修改头像</p>
            <input
              type="file"
              id="inputFile"
              ref="inputFile"
              hidden
              @change="onFileChange"
            >
          </label>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      @opened="openedDialog"
    >
      <div>
        <img class="imagecropper" ref="imagecropper" :src="previewImg">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="updateUserLoading"
          @click="onUpdatePhoto"
        >
        确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, updateUserImg, updateUserProfile } from '@/api/user.js'
import globalBus from '@/utils/global-bus.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'SettingIndex',
  components: {
  },
  props: {
  },
  data () {
    return {
      userProfile: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }, // 用户个人信息
      previewImg: '', // 预览得图片
      dialogVisible: false,
      cropper: null, // 裁切器实例
      updateUserLoading: false, // 用户loading状态
      updateUserProfileLoading: false, // 用户保存loading状态
      settingsRules: {
        id: [
          { required: true, message: '请输入用户id', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '请输入正确的手机号' }
        ],
        name: [
          { required: true, message: '请输入媒体姓名', trigger: 'blur' },
          { pattern: /^.{1,7}$/, message: '媒体姓名应在1到7个字符内' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/, message: '请输入正确的邮箱格式' }
        ]
      }
    }
  },
  methods: {
    // 获取用户个人资料
    loadUserProfile () {
      getUserProfile().then(res => {
        // console.log(res)
        this.userProfile = res.data.data
      })
    },

    // 更新用户资料
    updateUserProfile (userProfile) {
      const { name, intro, email } = userProfile
      updateUserProfile({
        name,
        intro,
        email
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新用户信息成功'
        })
        this.updateUserProfileLoading = false
        // 通过事件总线告诉其它组件数据发生变化
        globalBus.$emit('userProfileBus', this.userProfile)
      })
    },

    onFileChange () {
      const file = this.$refs.inputFile
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImg = blobData
      // 展示出弹窗
      this.dialogVisible = true
      // 解决选择相同文件不触发change事件问题
      this.$refs.inputFile.value = ''
    },

    openedDialog () {
      // 图片裁切器必须基于 img 进行初始化
      // 注意：img 必须是可见状态才能正常完成初始化
      //       因为我们这里要在对话框里面初始化裁切器
      //       所以务必要在对话框完全打开的状态去进行初始化。
      // 获取图片 DOM 节点
      // const image = document.getElementById('image')
      const image = this.$refs.imagecropper

      // 第1次初始化好以后，如果预览裁切的图片发生了变化，裁切器默认不会更新
      // 如果需要预览图片发生变化更新裁切器：
      //    方式一：裁切器.replace 方法
      //    方式二：销毁裁切器，重新初始化
      // 初始化裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImg)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        rotatable: true,
        dragMode: 'none',
        cropBoxResizable: false
        /* crop (event) {
          console.log(event.detail.x)
          console.log(event.detail.y)
          console.log(event.detail.width)
          console.log(event.detail.height)
          console.log(event.detail.rotate)
          console.log(event.detail.scaleX)
          console.log(event.detail.scaleY)
        } */
      })
    },

    onUpdatePhoto () {
      // 开启loading状态
      this.updateUserLoading = true
      // 获取裁切的图片对象
      // 请求更新用户头像
      // 关闭对话框
      // 更新视图展示
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updateUserImg(fd).then(res => {
          // console.log(res)
          this.dialogVisible = false
          // 直接把裁切结果的文件对象转为 blob 数据本地预览
          this.userProfile.photo = window.URL.createObjectURL(file)
          // this.userProfile.photo = res.data.data.photo
          // console.log(window.URL.createObjectURL(file))
          this.$message({
            type: 'success',
            message: '更新头像成功'
          })
          // 关闭loading状态
          this.updateUserLoading = false
          globalBus.$emit('userProfileBus', this.userProfile)
        })
      })
    },

    onSettingUserProfile () {
      this.updateUserProfileLoading = true
      // 表单验证
      this.$refs.settingsForm.validate(value => {
        if (!value) {
          // 验证不通过
          return
        }
        // 验证通过
        // 更新用户资料
        this.updateUserProfile(this.userProfile)
      })
    }
  },
  computed: {
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
/* Ensure the size of the image fit the container perfectly */
.imagecropper {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
  height: 200px;
}

</style>
