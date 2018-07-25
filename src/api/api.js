let baseUrl = 'http://192.168.9.113:8080'; // 基本url

// api文档管理
const apiUrl = {
  // 登录相关接口
  login: '/api/authenticate', // 登录接口
  loginOut: '/api/loginOut', // 退出登录接口
  verificationCode:'/api/get-code', // 验证码接口

  // 图片上传接口
  imgUrl: '/api/upload/file',

  // 新增商品
  // 平台分类接口
  selectGoodsList: '/api/goods-cats-findAll',
}

export default {
  apiUrl: apiUrl,
  baseUrl: baseUrl
}
