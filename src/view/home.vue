<template>
    <div id="index">
        <el-container>
            <el-aside width="auto">
                <app-side />
            </el-aside>
            <el-container>
                <el-header height="auto">
                    <app-head />
                </el-header>
                <el-main>
                    <app-body></app-body>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import ASide from '@/components/aside';
    import Head from '@/components/head';
    import Body from '@/components/body';
    import { Container ,Header, Aside ,Main } from 'element-ui';
    export default {
        components:{
            'el-container':Container,
            'el-header':Header,
            'el-aside':Aside,
            'el-main':Main,
            'app-side':ASide,
            'app-head':Head,
            'app-body':Body
        }
    }
</script>


<style lang="scss">
    #index{
        height:100%;
        .el-container{
            height:100%;
        }
        .el-main{
            background:#f0f0f0;
        }
    }
</style>
