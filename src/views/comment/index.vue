<template>
  <div class='comment-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/comment' }">评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="commentList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
        >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          label="评论状态">
          <template slot-scope="scope">
            <span v-if="scope.row.comment_status">正常</span>
            <span v-else>关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="comment_status"
          label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeCommentStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="footerPag"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync ="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticleList, changeCommentStatus } from '@/api/article.js'
export default {
  name: 'CommentIndex',
  components: {
  },
  props: {
  },
  data () {
    return {
      commentList: [], // 评论列表
      totalCount: 0, // 总条数
      pageSize: 10, // 每页得条数
      currentPage: 1 // 当前页面
    }
  },
  methods: {
    // 获取评论列表
    loadGetComments () {
      getArticleList(
        {
          page: this.currentPage,
          per_page: this.pageSize,
          response_type: 'comment'
        }
      ).then(res => {
        // console.log(res)
        this.commentList = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },

    // 修改评论状态
    changeCommentStatus (data) {
      // console.log(data)
      changeCommentStatus(data.id, data.comment_status).then(res => {
        if (res.data.data.allow_comment) {
          this.$message({
            message: '开启评论状态',
            type: 'success'
          })
        } else {
          this.$message({
            message: '关闭评论状态',
            type: 'success'
          })
        }
      })
    },

    handleSizeChange (val) {
      this.pageSize = val
      this.loadGetComments()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadGetComments()
    }
  },
  computed: {
  },
  created () {
    this.loadGetComments()
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.footerPag {
  padding-top: 20px;
}
</style>
