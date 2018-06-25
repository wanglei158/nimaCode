<template>
    <div id="head">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    import { Breadcrumb, BreadcrumbItem } from 'element-ui';

    export default {
        components:{
            'el-breadcrumb':Breadcrumb,
            'el-breadcrumb-item':BreadcrumbItem
        }
    }
</script>

<style lang="scss">
    #head{
        height:60px;
        position: relative;
        .el-breadcrumb{
            position: absolute;
            bottom: 0;
            left:0;
            line-height: 24px;
            font-size:14px;
        }
    }
</style>

