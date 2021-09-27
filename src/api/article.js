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

// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const delArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
