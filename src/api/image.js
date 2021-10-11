import request from '@/utils/request.js'

// 上传图片
export const uploadImage = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

// 获取用户图片素材
export const getImages = data => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params: {
      data
    }
  })
}

// 收藏图片素材
export const onCollectImg = (imgId, boolean = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imgId}`,
    data: {
      collect: boolean
    }
  })
}

// 删除图片素材
export const deleteImgs = (imgId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imgId}`
  })
}
