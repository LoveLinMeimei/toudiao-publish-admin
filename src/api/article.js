import request from '@/utils/request.js'

// 获取文章列表
export const getArticleList = (params) => {
  // 携带参数时
  // body用data
  // query用params
  // headers用headers
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
