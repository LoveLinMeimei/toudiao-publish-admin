<template>
  <div class='image-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/image' }">素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <image-list/>
    </el-card>
  </div>
</template>

<script>
import ImageList from './components/image-List'
export default {
  name: 'ImageIndex',
  components: {
    ImageList
  },
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
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
</style>
