import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn'
  // baseURL: 'http://toutiao-app.itheima.net'
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // config是当前请求相关的配置信息对象
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 如果有登录用户信息，则统一设置token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // return config之后请求才会真正的发出去
  return config
}, function (error) {
  return Promise.reject(error)
})
export default request
