<template>
  <div class="info_1_1">
    <h3>账户信息</h3>
    <div class="k5">
      <p>
        <i>*</i>
        <span>商家状态：{{userInfo.shopStauts==1?'启用':'冻结'}}</span>
      </p>
      <p>
        <i>*</i>
        <span>商家账号：{{userInfo.shopSn}}</span>
      </p>
      <p>
        <i>*</i>
        <span>密码：******</span>
        <span class="qian" @click="changePassword">重置密码</span>
      </p>
    </div>
    <h3>商户信息</h3>
    <div class="k6">
      <p>
        <i>*</i>
        <span>商家类型：普通</span>
      </p>
      <p>
        <i>*</i>
        <span>公司名称：{{userInfo.shopCompany}}</span>
      </p>
      <p>
        <i>*</i>
        <span>法人名称：{{userInfo.legalPerson}}</span>
      </p>
      <p>
        <i>*</i>
        <span>公司地址：{{userInfo.companyAddress}}</span>
      </p>
      <p>
        <i>*</i>
        <span>详情地址：{{userInfo.shopAddress}}</span>
      </p>
      <p>
        <i>*</i>
        <span>经营范围：{{userInfo.goodsCatsInfo}}</span>
      </p>
      <p>
        <span>企业证件：</span>
        <img :src="baseUrl+userInfo.kaihuXuke" alt="">
        <img :src="baseUrl+userInfo.yingyeZhizhao" alt="">
      </p>
    </div>
    <h3>联系人信息</h3>
    <div class="k7">
      <p>
        <i>*</i>
        <span>姓名：{{userInfo.cotectUserName}}</span>
      </p>
      <p>
        <i>*</i>
        <span>联系电话：{{userInfo.telephone}}</span>
      </p>
      <p>
        <span>固定电话：{{userInfo.shopTel}}</span>
      </p>
      <p>
        <span>邮箱：{{userInfo.contectEmail}}</span>
      </p>
      <p>
        <span>QQ：{{userInfo.shopQQ}}</span>
      </p>
    </div>
    <h3>结算信息</h3>
    <div class="k8">
      <p>
        <i>*</i>
        <span>开户名：{{userInfo.shopCompany}}</span>
      </p>
      <p>
        <i>*</i>
        <span>开户地区：{{userInfo.bankAddress}}</span>
      </p>
      <p>
        <i>*</i>
        <span>开户银行：{{userInfo.bankName}}</span>
      </p>
      <p>
        <i>*</i>
        <span>开户账号：{{userInfo.bankNo}}</span>
      </p>
      <p>
        <span>持卡人：{{userInfo.bankUserName}}</span>
      </p>
      <p>
        <i>*</i>
        <span>结算方式：{{userInfo.countType==1?'款到发货':'账期结算'}}</span>
      </p>
      <p>
        <el-button @click="changeShopInfo">修改</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { Button } from "element-ui";
import api from "../../api/api";
export default {
  components: {
    "el-button": Button
  },
  // props:['num'], // 父组件传入的值
  data() {
    return {
      baseUrl: api.baseUrl,
      userInfo: {
        // 账户信息
        shopStauts: "", // 商家状态
        shopSn: "", // 商家账号

        // 商户信息
        shopSn: "", // 商家类型，写死，为普通
        shopCompany: "", // 公司名称，也为开户名
        legalPerson: "", // 法人名称
        companyAddress: "", // 公司地址
        shopAddress: "", // 详情地址
        goodsCatsInfo: "", // 经营范围
        kaihuXuke: "", // 开户企业证件
        yingyeZhizhao: "", // 营业执照证件

        // 联系人信息
        cotectUserName: "", // 联系人姓名
        telephone: "", // 联系电话
        shopTel: "", // 固定电话
        contectEmail: "", // 邮箱
        shopQQ: "", // QQ

        // 结算信息
        bankAddress: "", // 开户地区
        bankName: "", // 开户银行
        bankNo: "", // 开户账号
        bankUserName: "", // 持卡人
        countType: "" // 结算方式
      }
    };
  },
  mounted() {
    this.axios.get(api.apiUrl.shopInfo).then(res => {
      console.log(res);
      this.userInfo = res.data;
    });
  },
  methods:{
    // 跳转至修改密码
    changePassword(){
      this.$router.push({
        path:'/info/changepwd'
      })
    },
    changeShopInfo(){
      this.$emit('changeShopInfo')
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/color.scss";
.info_1_1 {
  text-align: left;
  font-size: 14px;
  color: $textcolor;
  padding-bottom: 40px;
  & > div {
    margin-left: 72px;
  }
  p {
    i {
      color: $errcolor;
    }
    margin-bottom: 32px;
  }
  .el-button {
    margin-left: 72px;
    background: $themeC;
    color: #fff;
  }
  .k5 {
    p:nth-of-type(3) i {
      margin-left: 2em;
    }
    .qian {
      color: $qian;
      margin-left: 12px;
    }
  }
  .k6 {
    p:last-of-type span {
      margin-left: 6px;
    }
  }
  .k7 {
    p:nth-child(1) i {
      margin-left: 2em;
    }
    p:nth-child(3) {
      margin-left: 6px;
    }
    p:nth-child(4),
    p:nth-child(5) {
      margin-left: 34px;
    }
  }
  .k8 {
    p:nth-child(1) i {
      margin-left: 14px;
    }
    p:nth-last-child(3) {
      margin-left: 20px;
    }
  }
}
</style>

