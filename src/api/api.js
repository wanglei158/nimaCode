let baseUrl = 'http://192.168.9.113:8080'; // 基本url

// api文档管理
const apiUrl = {
  // 登录相关接口
  login: '/api/authenticate', // 登录接口
  loginOut: '/api/loginOut', // 退出登录接口
  verificationCode: '/api/get-code', // 验证码接口
  getUserInfo: '/api/get-userInfo', // 获取用户信息

  // 图片上传接口
  imgUrl: '/api/upload/file',

  // 商家信息
  shopInfo: '/api/shops-findByUserId',

  // 查询地址信息
  area_findList: '/api/areas-findList',

  // 商品
  goods_classifyList: '/api/goods-cats-findList', // 商品分类接口
  // goods_findAllList: '/api/goods-locals-findAll', // 查询全部商品
  goods_findAllListBySearch: '/api/goods-locals-findBySearchMp', // 根据条件搜索查询数据
  goods_change: '/api/goods-locals-updata', // 修改商品
  goods_locals: '/api/goods-locals', // 查看商品详情

  goods_spec_cats_create: '/api/spec-cats-create', // 创建商品规格信息


  goods_local_changeGoodsStatus: '/api/goods-locals-changeGoodsStatus', // 删除商品
  goods_local_cancleOrApply: '/api/goods-locals-changeGoodsStatus', // 取消申请/申请
  goods_delete: '/api/goods-locals', // 商品删除
  goods_delete_all: '/api/goods-locals-all', // 全部商品删除

  sku_local_changeStatus: '/api/goods-locals-changeGoodsCatStatus', // 修改商品状态，上下架/默认


  goods_findSku: '/api/goods-skus', // 查看商品规格
}

export default {
  apiUrl: apiUrl,
  baseUrl: baseUrl
}
