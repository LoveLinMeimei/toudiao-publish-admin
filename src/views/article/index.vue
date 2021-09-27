<template>
  <div class='article-container'>
    <el-card class="form-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/article' }">内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <!-- <el-radio :label="4">已删除</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择">
            <el-option label="全部" :value="null"></el-option>
            <el-option v-for="(channel, index) in channels" :key="index" :label="channel.name" :value="channel.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateRange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="loadArticleList(1)">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="list-cart">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ this.totalCount }} 条结果:
      </div>
      <el-table
        size="mini"
        :data="articlsList"
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              lazy
              :src="scope.row.cover.images[0]"
              fit="cover">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              circle
              class="el-icon-edit">
            </el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              class="el-icon-delete"
              @click="delArticle(scope.row.id)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="footer-page"
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
        @current-change="changePage">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticleList, getArticleChannels, delArticle } from '@/api/article.js'
export default {
  name: 'Article',
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
        desc: '',
        value1: ''
      },
      articlsList: [], // 文章列表
      // 文章状态列表
      articleStatus: [
        {
          status: 0,
          text: '草稿',
          type: 'warning'
        },
        {
          status: 1,
          text: '待审核',
          type: ''
        },
        {
          status: 2,
          text: '审核通过',
          type: 'success'
        },
        {
          status: 3,
          text: '审核失败',
          type: 'danger'
        },
        {
          status: 4,
          text: '已删除',
          type: 'info'
        }
      ],
      status: null, // 状态
      totalCount: 1, // 总条数
      pageSize: 10, // 每页的大小
      channels: [], // 文章频道列表数据
      channelId: null, // 查询文章的频道
      dateRange: null, // 日期范围
      loading: true, // 加载
      page: 1 // 当前页面
    }
  },
  methods: {
    // 获取文章列表数据
    loadArticleList (page = 1) {
      // 打开loading
      this.loading = true

      getArticleList(
        {
          status: this.status,
          page,
          per_page: this.pageSize,
          channel_id: this.channelId,
          begin_pubdate: this.dateRange ? this.dateRange[0] : null,
          end_pubdate: this.dateRange ? this.dateRange[0] : null
        }
      ).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articlsList = results
        this.totalCount = totalCount
        // console.log(res)

        // 请求成功 关闭loading
        this.loading = false
      })
    },

    // 获取文章频道数据
    loadArticleChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
        // console.log(this.channels)
      })
    },

    // 删除文章
    delArticle (articleId) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认执行这里
        delArticle(articleId).then(res => {
          // 删除成功，更新当前页的文章数据列表
          this.loadArticleList(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 页面改变
    changePage (page) {
      this.loadArticleList(page)
    },

    onSubmit () {
      console.log('submit!')
    }
  },
  computed: {
  },
  created () {
    this.loadArticleList()
    this.loadArticleChannels()
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.article-container {
  .form-card {
    margin-bottom: 15px;
  }
  .list-cart {
    margin-bottom: 15px;
    .cover {
      width: 80px;
    }
    .footer-page {
      padding: 20px 0;
      float: right;
    }
  }
}
</style>
