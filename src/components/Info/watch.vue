<template>
    <div class="info_1_1">
        <h3>账户信息</h3>
        <div class="k5">
            <p><i>*</i><span>商家状态：启用</span></p>
            <p><i>*</i><span>商家账号：1231@qq.com</span></p>
            <p>
                <i>*</i><span>密码：******</span>
                <span class="qian">重置密码</span>
            </p>
        </div>
        <h3>商户信息</h3>
        <div class="k6">
            <p>
                <i>*</i><span>商家类型：普通</span>
            </p>
            <p><i>*</i><span>公司名称：普通ad萨达所大所多</span></p>
            <p><i>*</i><span>法人名称：普通</span></p>
            <p><i>*</i><span>公司地址：普通</span></p>
            <p><i>*</i><span>详情地址：普通</span></p>
            <p><i>*</i><span>经营范围：普通</span></p>
            <p>
                <span>企业证件：</span>
                <img src="" alt="">
            </p>
        </div>
        <h3>联系人信息</h3>
        <div class="k7">
            <p>
                <i>*</i><span>姓名：普通</span>
            </p>
            <p>
                <i>*</i><span>联系电话：12345678901</span>
            </p>
            <p>
                <span>固定电话：1234-5678901</span>
            </p>
            <p><span>邮箱：12345678@qq.com</span></p>
            <p><span>QQ：12345678</span></p>
        </div>
        <h3>结算信息</h3>
        <div class="k8">
            <p><i>*</i><span>开户名：12345678901</span></p>
            <p><i>*</i><span>开户地区：adsa</span></p>
            <p><i>*</i><span>开户银行：12345678901</span></p>
            <p><i>*</i><span>开户账号：12345678901</span></p>
            <p><span>持卡人：12345678901</span></p>
            <p><i>*</i><span>结算方式：12345678901</span></p>
            <p>
                <el-button >修改</el-button>
            </p>
        </div>
    </div>
</template>

<script>
    import { Button } from 'element-ui';
    export default {
        components:{
            'el-button':Button
        }
    }
</script>

<style lang="scss">
    @import '@/assets/scss/color.scss';
    .info_1_1{
        text-align: left;
        font-size:14px;
        color: $textcolor;
        padding-bottom:40px;
        &>div{
            margin-left:72px;
        }
        p{
            i{
                color:$errcolor;
            }
            margin-bottom:32px;
        }
        .el-button{
            margin-left:72px;
            background: $themeC;
            color:#fff;
        }
        .k5{
            p:nth-of-type(3) i{
                margin-left:2em; 
            }
            .qian{
                color:$qian;
                margin-left:12px;
            }
        }
        .k6{
            p:last-of-type span{
                margin-left:6px;
            }
        }
        .k7{
            p:nth-child(1) i{
                margin-left:2em;
            }
            p:nth-child(3){
                margin-left:6px;
            }
            p:nth-child(4),p:nth-child(5){
               margin-left:34px; 
            }
        }
        .k8{
            p:nth-child(1) i{
                margin-left:14px;
            }
            p:nth-last-child(3){
                margin-left:20px;
            }
        }
    }
</style>

