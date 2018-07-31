<template>
  <div id="head">
    <el-row type="flex" justify="space-between">
      <el-col class="l_head">
        <span>当前位置：</span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <template v-for="(item,i) in urlList">
            <el-breadcrumb-item v-if="i==0" :to="{ path: '/' }" :key="i">{{item.name}}</el-breadcrumb-item>
            <el-breadcrumb-item v-else :key="i">{{item.name}}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </el-col>
      <el-col class="r_head">
        <div class="tur">
          <img :src="userInfo.imgUrl">
        </div>
        <div class="user">{{userInfo.userName}}</div>
        <div class="logout" @click="loginOut">退出登录</div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  MessageBox,
  Message
} from "element-ui";

import api from "../api/api";

export default {
  data() {
    return {
      urlList: [],
      // 用户数据
      userInfo:{
        imgUrl:'', // 用户头像
        userName:'' // 用户名字
      },
    };
  },
  watch: {
    $route(to, from) {
      this.urlList = to.matched;
    }
  },
  components: {
    "el-row": Row,
    "el-col": Col,
    "el-breadcrumb": Breadcrumb,
    "el-breadcrumb-item": BreadcrumbItem,
    "el-message-box": MessageBox,
    "el-message": Message
  },
  mounted() {
    this.urlList = this.$route.matched;
    this.axios.get(api.apiUrl.getUserInfo)
    .then(res=>{
      if(res.status==200){
        this.userInfo.imgUrl = api.baseUrl+res.data.imgUrl;
        this.userInfo.userName = res.data.userName;
      }
    })
  },
  methods: {
    loginOut() {
      MessageBox.confirm("确认退出登录?", {
        confirmButtonText: "确定",
        type: "warning"
      }).then(() => {
        this.axios
          .post(api.apiUrl.loginOut)
          .then(res => {
            Message({
              type: "success",
              message: "退出成功",
              onClose: res => {
                console.log(res);
                // 退出登录成功后，跑到登录页面
                this.$router.replace("/login");
              }
            });
          })
          .catch(res => {
            console.log(res)
            Message({
              type: "error",
              message: "退出失败!",
            });
          });
      })
      .catch(res=>{
        Message({
              type: "info",
              message: "取消退出",
            });
      })
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/color.scss";
.el-header {
  padding: 10px 20px;
}
#head {
  .el-row {
    height: 40px;
  }
  .el-col {
    position: relative;
  }
  .el-breadcrumb {
    position: absolute;
    bottom: 0;
    left: 5em;
    line-height: 24px;
    font-size: 14px;
  }
  .r_head {
    display: flex;
    justify-content: flex-end;
    line-height: 40px;
    color: $themeC;
    font-size: 14px;
    & > div {
      margin-right: 12px;
    }
  }
  .tur {
    width: 30px;
    height: 30px;
    margin-top: 5px;
    border-radius: 50%;
    background: #e8e8e8;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .l_head > span {
    font-size: 14px;
    position: absolute;
    bottom: 0;
    left: 0;
    line-height: 24px;
  }
}
</style>

