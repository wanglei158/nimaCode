<template>
    <div id="head">
        <el-row type="flex" justify="space-between">
            <el-col class="l_head">
                <span>当前位置：</span>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <template v-for="(item,i) in urlList" >
                        <el-breadcrumb-item v-if="i==0"  :to="{ path: '/' }" :key="i">{{item.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item v-else  :key="i">{{item.name}}</el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
            </el-col>
            <el-col class="r_head">
                <div class="tur"></div>
                <div class="user">lufeihua@qq.com</div>
                <div class="logout">退出登录</div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { Breadcrumb, BreadcrumbItem ,Row, Col} from 'element-ui';

    export default {
        data(){
            return {
                urlList:[]
            }
        },
        watch:{
            $route(to,from){
                this.urlList = to.matched;
            }
        },
        components:{
            'el-row':Row,
            'el-col':Col,
            'el-breadcrumb':Breadcrumb,
            'el-breadcrumb-item':BreadcrumbItem
        },
        mounted(){
            this.urlList = this.$route.matched;
        }
    }
</script>

<style lang="scss">
    @import '@/assets/scss/color.scss';
    .el-header {
      padding: 10px 20px;
    }
    #head{
        .el-row{
            height:40px;
        }
        .el-col{
            position: relative;
        }
        .el-breadcrumb{
            position: absolute;
            bottom: 0;
            left:5em;
            line-height: 24px;
            font-size:14px;
        }
        .r_head{
            display: flex;
            justify-content: flex-end;
            line-height: 40px;
            color:$themeC;
            font-size:14px;
            &>div{
                margin-right:12px;
            }
        }
        .tur{
            width:30px;
            height:30px;
            margin-top:5px;
            border-radius:50%;
            background: #e8e8e8;
        }
        .l_head>span{
            font-size:14px;
            position: absolute;
            bottom:0;
            left:0;
            line-height: 24px;
        }
    }
</style>

