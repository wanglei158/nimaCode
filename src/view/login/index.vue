<template>
  <div id="login">
    <el-row type="flex" justify="space-between">
      <el-col :span="10" class="l_left">
        <p class="info">
          <span class="logo">COLORFUL</span><br/>
          <span class="tips">可乐否商家后台</span>
        </p>
        <img src="/static/img/icon_chahua.png" alt="">
      </el-col>
      <el-col :span="12" class="r_left">
        <div class="login_k">
          <div class="vtr">
            <p>欢迎登陆</p>
            <el-input v-model="userName" placeholder="邮箱/用户名/手机号"></el-input>
            <el-input v-model="password" placeholder="密码" type="password"></el-input>
            <el-input v-model="verifyCode" placeholder="验证码">
              <i slot="suffix"><img :src="imgSrc" @click="changeImg"></i>
            </el-input>
            <el-row class="p5" type="flex" justify="space-between">
              <el-col @click.native="changeRememberMe" v-bind:class="{'active':rememberMe}">记住密码</el-col>
              <el-col>忘记密码</el-col>
            </el-row>
            <el-button size="large" @click="login">登录</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="footer">
      <p>Copyright &copy; 2017 - 2019，Zhejiang Colorful E-commerce Co.,Ltd</p>
      <p>浙ICP备17020059号，客服电话：400-100-2287</p>
    </div>
  </div>
</template>


<script>
// 引入element-ui组件
import { Row, Col, Input, Button, Notification } from "element-ui";
// 引入api接口全部文档
import api from "@/api/api";
import store from '../../store'

export default {
  data() {
    return {
      rememberMe: false, // 是否记住我
      userName: "", // 用户名
      password: "", // 密码
      verifyCode: "", // 验证码
      imgSrc: ""
    };
  },
  components: {
    "el-row": Row,
    "el-col": Col,
    "el-input": Input,
    "el-button": Button,
    "el-notification": Notification
  },
  mounted() {
    this.changeImg();
  },

  methods: {
    // 更换验证码 或 第一次进入页面时默认请求一次
    changeImg() {
      this.axios
      .get(api.apiUrl.verificationCode, {
        responseType: "arraybuffer"
      })
      .then(function(response) {
        return (
          "data:image/png;base64," +
          btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          )
        );
      })
      .then(data => {
        this.imgSrc = data;
      });
    },

    // 登录方法
    login() {
      this.axios
        .post(api.apiUrl.login, {
          username: this.userName,
          password: this.password,
          rememberMe: this.rememberMe,
          verifyCode: this.verifyCode
        })
        .then(res => {
          if (res.status == 200) {
            console.log(this)
          // 登陆成功，保存token数据
            this.$store.commit("set_token", res.data["id_token"]);
            // 如果store的token存在，则跳转至首页，否则，则跳转至登录页
            if (store.state.token) {
              this.$router.push("/");
            } else {
              this.$router.replace("/login");
            }
          }
        })
        .catch(error => {
          // 状态码
          Notification({
            title: "登录失败",
            message: error.msg,
            type: "error",
            duration: 1500
          });
          // 如果验证码错误，则重新发送请求
          if (error.stauts == -1) {
            console.log(-1);
            this.axios.get(api.apiUrl.verificationCode).then(
              this.changeImg()
            );
          }
        });
    },
    changeRememberMe() {
      this.rememberMe = !this.rememberMe;
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/scss/color.scss";
#login {
  width: 100rem;
  height: 56.25rem;
  background: url("/static/img/loginbg.png") no-repeat;
  background-size: cover;
  position: relative;
  .info {
    padding-top: 72px;
    text-align: left;
    margin-left: 116px;
  }
  .logo {
    font-size: 41px;
    color: $themeC;
    font-family: "NewyorkertypeBold", MicrosoftYaHei;
    font-weight: 600;
  }
  .l_left {
    position: relative;
    img {
      position: absolute;
      top: 4.75rem;
      left: 6.042rem;
      width: 91.979rem;
      z-index: 1;
    }
  }
  .tips {
    color: $themeC;
    font-size: 28px;
  }
  .r_left {
    padding-top: 10rem;
    padding-right: 10rem;
  }
  .login_k {
    text-align: center;
    position: relative;
    z-index: 2;
    float: right;
    width: 32.5rem;
    height: 30.052rem;
    background: url(/static/img/icon_biankuang.png) no-repeat;
    background-size: cover;
    box-sizing: border-box;
    padding-top: 7.708rem;
  }
  .vtr {
    width: 28.125rem;
  }
  .login_k {
    p:nth-child(1) {
      color: #72a4ad;
    }
    p,
    .el-input,
    .p5,
    .el-button {
      width: 19.531rem;
      margin: 0 auto;
      margin-bottom: 1.25rem;
    }
    .p5 {
      font-size: 14px;
      color: #333;
      .el-col:nth-child(1) {
        text-align: left;
        text-indent: 24px;
        background: url(/static/img/icon_zheng.png) no-repeat;
        background-size: 20px;
      }
      .el-col:nth-child(1).active {
        background: url(/static/img/icon_xuanzhong.png) no-repeat;
        background-size: 20px;
      }
      .el-col:nth-child(2) {
        text-align: right;
      }
    }
    .el-input__suffix {
      width: 124px;
      height: 32px;
      line-height: 32px;
      margin-top: 4px;
    }
    .el-button {
      background: $themeC;
      color: #fff;
      font-size: 22px;
    }
  }
  .footer {
    font-size: 14px;
    color: $textcolor;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 60px;
  }
}
</style>


