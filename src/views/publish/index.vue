<template>
  <div class='publish-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/publish' }">发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form ref="article-form" :model="articleForm" :rules="articleRules" label-width="60px" size="mini">
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="articleForm.content"></el-input> -->
          <el-tiptap
            v-model="articleForm.content"
            :extensions="extensions"
            placeholder="请输入文章内容"
            height="250px"
            lang="zh"
          >
          </el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="articleForm.cover.type > 0">
            <upload-cover
              :key="cover"
              v-for="(cover, index) in articleForm.cover.type"
              v-model="articleForm.cover.images[index]"
            >
            </upload-cover>
            <!-- <upload-cover
              :key="cover"
              v-for="(cover, index) in articleForm.cover.type"
              @update-cover="updateCover(index, $event)"
              :cover-image="articleForm.cover.images[index]"
            >
            </upload-cover> -->
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="articleForm.channel_id" placeholder="请选择">
            <el-option v-for="(channel, index) in channels" :key="index" :label="channel.name" :value="channel.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onpublishArticle(false)">发表</el-button>
          <el-button @click="onpublishArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, AddpublishArticle, getArticleById, editArticle } from '@/api/article.js'
import UploadCover from './components/upload-cover.vue'
import { uploadImage } from '@/api/image.js'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  props: {
  },
  data () {
    return {
      channels: [], // 频道
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 0, // 0-无图，-1-自动，1-单图，3-三图
          images: []
        },
        channel_id: null
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            fd.append('image', file)
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then(res => {
              // 这个 return 是返回最后的结果
              res.data.data.url = 'https://img2.baidu.com/it/u=1258772524,851579652&fm=26&fmt=auto'
              return res.data.data.url
            }).catch(err => {
              return '上传失败' + err
            })
          } // 图片的上传方法，返回一个 Promise<url>
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ],
      // 表单验证
      articleRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5到30之间', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
    }
  },
  methods: {
    // 获取文章频道
    loadArticleChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },

    // 发表文章
    onpublishArticle (draft = false) {
      this.$refs['article-form'].validate(valid => {
        // 验证失败，停止提交表单
        if (!valid) {
          return
        }
        // 验证通过，提交表单
        const articleId = this.$route.query.id
        if (articleId) {
          // 有文章id 说明是从文章编辑跳转过来的
          editArticle(articleId, this.articleForm, draft).then(res => {
            this.$message({
              showClose: true,
              message: `${draft ? '草稿' : ''}` + '发布成功',
              type: 'success'
            })
            this.$router.push('/article')
          })
        } else {
          AddpublishArticle(this.articleForm, draft).then(res => {
            // console.log(res)
            this.$message({
              showClose: true,
              message: `${draft ? '草稿' : ''}` + '发布成功',
              type: 'success'
            })
            this.$router.push('/article')
          })
        }
      })
    },

    // 通过文章id获取数据
    loadArticleById () {
      getArticleById(this.$route.query.id).then(res => {
        // console.log(res)
        this.articleForm = res.data.data
      })
    }

    // 接收子组件数据
    /* updateCover (index, url) {
      this.articleForm.cover.images[index] = url
    } */
  },
  computed: {
  },
  created () {
    this.loadArticleChannels()

    // 如果路由路径中有id ，则请求获取文章
    if (this.$route.query.id) {
      this.loadArticleById()
    }
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
</style>
