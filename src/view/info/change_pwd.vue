<template>
    <div id="info_2">
        <p>
            <i>*</i>
            <span>原密码：</span>
            <el-input clearable v-model="currentPassword" placeholder="请输入内容"></el-input>
            <b>原密码输入错误</b>
        </p>
        <p>
            <i>*</i>
            <span>新密码：</span>
            <el-input clearable v-model="newPassword" placeholder="请输入内容"></el-input>
            <b>原密码输入错误</b>
        </p>
        <p>
            <i>*</i>
            <span>确认密码：</span>
            <el-input clearable v-model="newPassword" placeholder="请输入内容"></el-input>
            <b>原密码输入错误</b>
        </p>
        <div class="such">
            <p>密码示例：ADMINabc123</p>
            <p>1、密码长度为6~20个字符；</p>
            <p>2、密码只允许设置大小写字母、数字。</p>
        </div>
        <div class="opt">
            <el-button @click="changePassword">修改</el-button>
            <el-button @click="goBack">返回</el-button>
        </div>
    </div>
</template>


<script>
    import { Input, Button } from 'element-ui';
    export default {
        data(){
            return {
                currentPassword:'',
                newPassword:'',
            }
        },
        components:{
            'el-input':Input,
            'el-button':Button
        },
        methods:{
          // 返回上一级
          goBack(){
            this.$router.go(-1);
          },
          changePassword(){
            this.axios
            .post("/api/account/change-password",{
              currentPassword:this.currentPassword,
              newPassword:this.newPassword,
            })
            .then(res=>{
              console.log(res);
            })
          }
        }
    }
</script>

<style lang="scss">
    @import '@/assets/scss/color.scss';
    #info_2{
        padding-top:40px;
        text-align: left;
        padding-bottom: 40px;
        &>p{
            margin-bottom:16px;
            i{
                display: inline-block;
                line-height: 26px;
                color:$errcolor;
                margin-left:52px;
            }
            b{
                font-weight: 500;
                display: block;
                font-size:12px;
                color:$errcolor;
                margin-left:126px;
                line-height: 24px;
                opacity: 0;
            }
            &.err b{
                opacity: 1;
            }
            span{
                font-size:14px;
                color:$textcolor;
            }
            &:nth-of-type(3) i{
                margin-left:38px;
            }
            .el-input{
                height:40px;
                width:254px;
            }
            &.err .el-input__inner{
                border-color:$errcolor;
            }
        }

        .such{
            color:$themeC;
            font-size:12px;
            line-height: 24px;
            margin-left:126px;
            margin-bottom: 40px;
        }
        .opt{
            margin-left:100px;
            .el-button{
                width:100px;
                background: #37aee4;
                color:#fff;
                &:nth-child(2){
                    margin-left:36px;
                    background: #f7f8f9;
                    color:$textcolor;
                }
            }
        }
    }
</style>
