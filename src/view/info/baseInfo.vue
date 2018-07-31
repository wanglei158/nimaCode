<template>
  <div id="info_1">
    <template v-if="isChange">
      <h3>账户信息</h3>
      <div class="k1">
        <p>
          <i>*</i>
          <span>商家状态：</span>
          <el-radio v-model="userInfo.shopStauts" :label="1">启用</el-radio>
        </p>
        <p>
          <i>*</i>
          <span>商家账号：</span>
          <el-input v-model="userInfo.shopSn" :disabled="true"></el-input>
        </p>
        <p>
          <i>*</i>
          <span>密码：</span>
          <el-input :disabled="true" value="******"></el-input>
        </p>
      </div>
      <h3>商户信息</h3>
      <div class="k2">
        <p>
          <i>*</i>
          <span>商家类型：</span>
          <el-radio checked>普通</el-radio>
        </p>
        <p>
          <i>*</i>
          <span>公司名称：</span>
          <el-input v-model="userInfo.shopCompany"></el-input>
        </p>
        <p>
          <i>*</i>
          <span>法人姓名：</span>
          <el-input v-model="userInfo.legalPerson"></el-input>
        </p>
        <p>
          <i>*</i>
          <span>公司地址：</span>
          <el-select v-model="companyIdList.provinceId" placeholder="请选择" @focus.stop="findProvinceList">
            <el-option v-for="item in provinceList" :key="item.areaId" :label="item.areaName" :value="item.areaId" >
            </el-option>
          </el-select>
          <el-select v-model="companyIdList.cityId" placeholder="请选择" @focus.stop="findCityList">
            <el-option v-for="item in cityIdList" :key="item.areaId" :label="item.areaName" :value="item.areaId" >
            </el-option>
          </el-select>
          <el-select v-model="companyIdList.areaId" placeholder="请选择" @focus.stop="findAreaList">
            <el-option v-for="item in areaIdList" :key="item.areaId" :label="item.areaName" :value="item.areaId" >
            </el-option>
          </el-select>
        </p>
        <p>
          <i>*</i>
          <span>详细地址：</span>
          <el-input v-model="userInfo.shopAddress"></el-input>
        </p>
        <p class="salearea">
          <i>*</i>
          <span>经营范围：</span>
          <el-checkbox-group @change="getall" v-model="checkedCities1">
            <el-checkbox v-for="city in cities" :label="city.label" :key="city.label">{{city.name}}</el-checkbox>
            <el-input v-model="input"></el-input>
          </el-checkbox-group>
        </p>
        <div class="salearea opd">
          <i>*</i>
          <span>企业证件：</span>
          <p>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-input class="namel" v-model="input" placeholder="请填写名称"></el-input>
          </p>

        </div>
      </div>
      <h3>联系人信息</h3>
      <div class="k3">
        <p>
          <i>*</i>
          <span>姓名：</span>
          <el-input v-model="userInfo.contectUserName"></el-input>
        </p>
        <p>
          <i>*</i>
          <span>联系电话：</span>
          <el-input v-model="userInfo.telephone"></el-input>
        </p>
        <p>
          <span>固定电话：</span>
          <el-input v-model="userInfo.shopTel"></el-input>
        </p>
        <p>
          <span>邮箱：</span>
          <el-input v-model="userInfo.contectEmail"></el-input>
        </p>
        <p>
          <span>QQ：</span>
          <el-input v-model="userInfo.shopQQ"></el-input>
        </p>
      </div>
      <h3>结算信息</h3>
      <div class="k4">
        <p>
          <i>*</i>
          <span>开户名：</span>
          <el-input v-model="userInfo.shopCompany"></el-input>
        </p>
        <p>
          <i>*</i>
          <span>开户地区：</span>
          <el-select v-model="accountIdList.provinceId" placeholder="请选择" @focus.stop="findProvinceList">
            <el-option v-for="item in provinceList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
            </el-option>
          </el-select>
          <el-select v-model="accountIdList.cityId" placeholder="请选择" @focus.stop="findAccountCityList">
            <el-option v-for="item in cityIdList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
            </el-option>
          </el-select>
        </p>
        <p>
          <i>*</i>
          <span>开户银行：</span>
          <el-input v-model="userInfo.bankName"></el-input>
        </p>
        <p>
          <i>*</i>
          <span>开户账号：</span>
          <el-input v-model="userInfo.bankNo"></el-input>
        </p>
        <p>
          <span>持卡人：</span>
          <el-input v-model="userInfo.bankUserName"></el-input>
        </p>
        <p>
          <i>*</i>
          <span>结算方式：</span>
          <el-radio-group v-model="userInfo.countType">
            <el-radio :label="1">款到发货</el-radio>
            <el-radio :label="2">账期结算</el-radio>
          </el-radio-group>
        </p>
        <p>
          <el-button>保存</el-button>
          <el-button>返回</el-button>
        </p>
      </div>
    </template>
    <template v-else>
      <!-- 子组件给父组件传值，触发修改操作 -->
      <info-watch v-on:changeShopInfo="changeShopInfo" />
    </template>
  </div>
</template>

<script>
import {
  Button,
  Radio,
  Input,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
  Upload,
  radioGroup
} from "element-ui";
import Watch from "@/components/Info/watch.vue";
import api from "../../api/api";

export default {
  components: {
    "el-radio": Radio,
    "el-input": Input,
    "el-select": Select,
    "el-option": Option,
    "el-checkbox": Checkbox,
    "el-checkbox-group": CheckboxGroup,
    "el-upload": Upload,
    "el-button": Button,
    "info-watch": Watch,
    "el-radio-group": radioGroup
  },
  data() {
    return {
      userInfo: {
        // 账户信息
        shopStauts: 1, // 商家状态
        shopSn: "商家账号", // 商家账号

        // 商户信息
        // 商家类型，写死，为普通
        shopCompany: "公司名称", // 公司名称，也为开户名
        legalPerson: "法人名称", // 法人名称
        companyAddress: "公司地址", // 公司地址
        shopAddress: "详情地址", // 详情地址
        goodsCatsInfo: "经营范围", // 经营范围
        kaihuXuke: "开户企业证件", // 开户企业证件
        yingyeZhizhao: "营业执照证件", // 营业执照证件

        // 联系人信息
        contectUserName: "联系人姓名", // 联系人姓名
        telephone: "联系电话", // 联系电话
        shopTel: "固定电话", // 固定电话
        contectEmail: "邮箱", // 邮箱
        shopQQ: "QQ", // QQ

        // 结算信息
        bankAddress: "开户地区", // 开户地区
        bankName: "开户银行", // 开户银行
        bankNo: "开户账号", // 开户账号
        bankUserName: "持卡人", // 持卡人
        countType: 1 // 结算方式
      },

      isChange: false, // 是否点击修改
      radio: 1,
      input: "",
      value: "",
      provinceList: [
        // {
        //   areaId: "对应的id"",
        //   areaName: "对应的省"
        // },
      ], // 暂存省
      cityIdList:[], // 暂存城市
      areaIdList:[], // 暂存地区
      // 公司地址ID
      companyIdList:{
        provinceId:'',
        cityId:'',
        areaId:'',
      },
      // 开户地区ID
      accountIdList:{
        provinceId:'',
        cityId:'',
      },
      checkedCities1: [],
      cities: [
        {
          name: "美食",
          label: "1"
        },
        {
          name: "滋补",
          label: "2"
        },
        {
          name: "日用",
          label: "3"
        },
        {
          name: "个护",
          label: "4"
        },
        {
          name: "家居",
          label: "5"
        },
        {
          name: "餐厨",
          label: "6"
        },
        {
          name: "美酒",
          label: "7"
        },
        {
          name: "同城",
          label: "8"
        },
        {
          name: "其他",
          label: "9"
        }
      ]
    };
  },
  methods: {
    getall(val) {
      console.log(val);
    },
    handleRemove() {},
    handlePictureCardPreview() {},
    // 父子组件传值测试
    changeShopInfo() {
      this.isChange = !this.isChange;
    },
    // 查找商户的省
    findProvinceList(){
      this.axios
      .post(api.apiUrl.findAreaList,this.qs({
        areaId:0
      }))
      .then(res=>{
        this.provinceList = res.data;
      })
      .catch(res=>{
      })
    },
    // 查找商户的市
    findCityList(){
      this.axios
      .post(api.apiUrl.findAreaList,this.qs({
        areaId:this.companyIdList.provinceId
      }))
      .then(res=>{
        this.cityIdList = res.data;
      })
      .catch(res=>{
      })
    },
    // 查找商户的区
    findAreaList(){
      this.axios
      .post(api.apiUrl.findAreaList,this.qs({
        areaId:this.companyIdList.cityId
      }))
      .then(res=>{
        this.areaIdList = res.data;
      })
      .catch(res=>{
      })
    },

    // 查找开户地区的市
    findAccountCityList(){
      this.axios
      .post(api.apiUrl.findAreaList,this.qs({
        areaId:this.accountIdList.provinceId
      }))
      .then(res=>{
        this.cityIdList = res.data;
      })
      .catch(res=>{
      })
    },
  }
};
</script>


<style lang="scss">
@import "@/assets/scss/color.scss";
#info_1 {
  padding-top: 40px;
  & > .k1,
  .k2,
  .k3,
  .k4 {
    text-align: left;
    margin-left: 72px;
    p {
      margin-bottom: 40px;
      font-size: 14px;
      & > i {
        color: $errcolor;
      }
      .el-input {
        width: 400px;
      }
    }
    &.k1 {
      .el-input__inner {
        background: #f4f4f4;
      }
      p:nth-of-type(3) i {
        margin-left: 2em;
      }
    }
  }
  h3 {
    font-weight: 500;
    text-align: left;
    line-height: 40px;
    text-indent: 30px;
    font-size: 18px;
    margin: 0 40px;
    background: $gray;
    margin-bottom: 32px;
  }
  .el-select {
    margin-right: 8px;
  }
  .el-select .el-input {
    width: 176px;
  }
  .salearea {
    display: flex;
  }
  .el-checkbox-group {
    width: 450px;
    margin-left: -20px;
    .el-checkbox {
      margin-left: 45px;
      margin-bottom: 20px;
    }
    .el-input {
      width: 156px;
      margin-left: 12px;
      .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .opd {
    margin-bottom: 40px;
    font-size: 14px;
    .namel {
      width: 146px;
      float: right;
      .el-input__inner {
        border-style: dashed;
      }
    }
    & > i {
      color: $errcolor;
    }
  }
  .k3 {
    p:nth-child(1) i {
      margin-left: 2em;
    }
    p:nth-child(3) span {
      margin-left: 6px;
    }
    p:nth-child(4) span {
      margin-left: 32px;
    }
    p:nth-child(5) span {
      margin-left: 34px;
    }
  }
  .k4 {
    padding-bottom: 40px;
    p:nth-last-of-type(3) i,
    p:first-child {
      margin-left: 1em;
    }
    p:nth-last-of-type(3) span {
      margin-left: 20px;
    }
    p:last-of-type {
      padding-left: 72px;
    }
    .el-button {
      width: 100px;
      color: #fff;
      &:nth-child(1) {
        background-color: $themeC;
      }
      &:nth-child(2) {
        background-color: $gray;
        color: $textcolor;
        border-color: $bordercolor;
        margin-left: 36px;
      }
    }
  }
}
</style>

