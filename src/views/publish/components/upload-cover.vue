<template>
  <div class='uploadCover-container'>
    <div class="cover-wrap" @click="openDialog">
      <img class="cover-img" ref="cover-img" :src="value">
    </div>
    <el-dialog
      title="选择封面"
      append-to-body
      :visible.sync="dialogVisible"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <image-list ref="image-list" :isShowAdd='false' :isShowAction="false" :isShowSelected="true" />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input
            type="file"
            ref="inputFile"
            id="inputFile"
            @change="inputChange"
          >
          <img width="150px" ref="preview-image" class="preImg"/>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image.js'
import ImageList from '@/views/image/components/image-List'
export default {
  name: 'UploadCoverIndex',
  components: {
    ImageList
  },
  // props: ['cover-image'],
  props: ['value'],
  data () {
    return {
      dialogVisible: false, // 弹窗的显示
      activeName: 'first'
    }
  },
  methods: {
    // 打开弹窗
    openDialog () {
      this.dialogVisible = true
    },

    inputChange () {
      // 获取file对象
      const file = this.$refs.inputFile.files[0]
      // 预览图片
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
    },

    updateCoverConfirm () {
      /*
        判断是不是上传图片（上传图片需要上传到后端拿到线上图片地址进行预览）
      */
      if (this.activeName === 'second') {
        // 获取文件对象
        const file = this.$refs.inputFile.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        // 执行上传文件操作
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.$refs['cover-img'].src = res.data.data.url
          this.dialogVisible = false
          // 把图片地址发送给父组件
          // this.$emit('update-cover', res.data.data.url)
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const index = this.$refs['image-list'].selected
        this.dialogVisible = false
        // 把图片地址发送给父组件
        this.$emit('input', this.$refs['image-list'].images[index].url)
      }
    }
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
.cover-wrap {
  width: 150px;
  height: 120px;
  border: 1px dotted #000;
  .cover-img {
    max-width: 100%;
    height: 120px;
  }
}
.preview-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 120px;
  border: 1px solid #ccc;
  .preview-icon {
    font-size: 40px;
  }
  .preImg {
    min-width: 150px;
    height: 120px;
  }
}
</style>
