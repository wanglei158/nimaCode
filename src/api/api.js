let baseUrl = 'http://192.168.9.113:8080'; // 基本url

// api文档管理
const apiUrl = {
  // 登录相关接口
  login: '/api/authenticate', // 登录接口
  loginOut: '/api/loginOut', // 退出登录接口
  verificationCode:'/api/get-code', // 验证码接口
  getUserInfo: '/api/get-userInfo', // 获取用户信息

  // 图片上传接口
  imgUrl: '/api/upload/file',

  // 新增商品
  // 平台分类接口
  selectGoodsList: '/api/goods-cats-findList',

  // 商家信息
  shopInfo: '/api/shops-findByUserId',

  // 查询地址信息
  findAreaList: '/api/areas-findList',

  // 查询全部商品
  findAllGoodsList: '/api/goods-locals-findAll',
  // 根据条件搜索查询数据
  findAllGoodsListBySearch: '/api/goods-locals-findBySearch'
}

export default {
  apiUrl: apiUrl,
  baseUrl: baseUrl
}
