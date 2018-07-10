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
                        <el-input v-model="input" placeholder="邮箱/用户名/手机号"></el-input>
                        <el-input v-model="input" placeholder="密码"></el-input>
                        <el-input v-model="input" placeholder="验证码">
                            <i slot="suffix"></i>
                        </el-input>
                        <el-row class="p5" type="flex" justify="space-between">
                            <el-col>记住密码</el-col>
                            <el-col>忘记密码</el-col>
                        </el-row>
                        <el-button size="large">登录</el-button>
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
    import { Row, Col, Input, Button } from 'element-ui';
    export default {
        data(){
            return {
                input:''
            }
        },
        components:{
            'el-row':Row,
            'el-col':Col,
            'el-input':Input,
            'el-button':Button
        },
        mounted(){

        }
    }
</script>


<style lang="scss">
    @import '@/assets/scss/color.scss';
    #login{
        width:100rem;
        height:56.25rem;
        background: url('/static/img/loginbg.png') no-repeat;
        background-size:cover;
        position: relative;
        .info{
            padding-top:72px;
            text-align: left;
            margin-left:116px;
        }
        .logo{
            font-size:41px;
            color:$themeC;
            font-family: 'NewyorkertypeBold',MicrosoftYaHei;
            font-weight: 600;
        }
        .l_left{
            position: relative;
            img{
                position: absolute;
                top:4.75rem;
                left:6.042rem;
                width:91.979rem;
                z-index: 1;
            }
        }
        .tips{
            color:$themeC;
            font-size: 28px;
        }
        .r_left{
            padding-top:10rem;
            padding-right:10rem;
        }
        .login_k{
            text-align: center;
            position: relative;
            z-index:2;
            float:right;
            width:32.5rem;
            height: 30.052rem;
            background:url(/static/img/icon_biankuang.png) no-repeat;
            background-size:cover;
            box-sizing: border-box;
            padding-top:7.708rem;
        }
        .vtr{
            width:28.125rem;
        }
        .login_k{
            p:nth-child(1){
                color:#72a4ad;
            }
            p,.el-input,.p5,.el-button{
                width:19.531rem;
                margin:0 auto;
                margin-bottom: 1.25rem;
            }
            .p5{
                font-size:14px;
                color:#333;
                .el-col:nth-child(1){
                    text-align: left;
                    text-indent:24px;
                    background:url(/static/img/icon_zheng.png) no-repeat;
                    background-size:20px;
                }
                .el-col:nth-child(1).active{
                    background:url(/static/img/icon_xuanzhong.png) no-repeat;
                    background-size:20px;
                }
                .el-col:nth-child(2){
                    text-align: right;
                }
            }
            .el-input__suffix{
                width:124px;
                height:32px;
                line-height:32px;
                margin-top:4px;
            }
            .el-button{
                background: $themeC;
                color:#fff;
                font-size:22px;
            }
        }
        .footer{
            font-size:14px;
            color:$textcolor;
            position: absolute;
            left:50%;
            transform: translate(-50%);
            bottom:60px;
        }
    }
</style>


