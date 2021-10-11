import Vue from 'vue'

export default new Vue()

/*
  事件总线： 用于非父子组件的通讯
  如a组件要向b组件发送数据
  则a组件:
  import globalBus from '@/util/global-bus.js'
  globalBus.$emit('自定义事件名称'， 数据)
  b组件：
  import globalBus from '@/util/global-bus.js'
  globalBus.$on('自定义事件名称', data => {
    // 处理函数
  })
*/
