<template>
  <div class='article-container'>
    <el-card class="form-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/article' }">内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="list-cart">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 46160 条结果:
      </div>
      <el-table
      :data="articlsList"
      style="width: 100%">
        <el-table-column
          prop="date"
          label="封面">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
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
              class="el-icon-delete">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="footer-page"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articlsList: []
    }
  },
  methods: {
    getArticleList () {
      getArticleList().then(res => {
        this.articlsList = res.data.data.results
        console.log(this.articlsList)
      })
    },
    onSubmit () {
      console.log('submit!')
    }
  },
  computed: {
  },
  created () {
    this.getArticleList()
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
    .footer-page {
      padding: 20px 0;
      float: right;
    }
  }
}
</style>
