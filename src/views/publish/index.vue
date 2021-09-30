<template>
  <div class='publish-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/publish' }">发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="articleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
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
export default {
  name: 'PublishIndex',
  components: {
  },
  props: {
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      channels: [], // 频道
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 0, // 0-无图，-1-自动，1-单图，3-三图
          images: []
        },
        channel_id: null
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
    },

    // 通过文章id获取数据
    loadArticleById () {
      getArticleById(this.$route.query.id).then(res => {
        // console.log(res)
        this.articleForm = res.data.data
      })
    }
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
