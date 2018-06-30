<template>
    <div id="fatory">
        <div class="head">
            <div class="head1">
                <el-input clearable v-model="value" size="mini" placeholder="商品标题"></el-input>
                <el-input clearable v-model="value" size="mini" placeholder="商品ID"></el-input>
                <el-input clearable v-model="value" size="mini" placeholder="商品货号"></el-input>
                <el-select v-model="value" size="mini" placeholder="一级分类" clearable>
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    >

                    </el-option>
                </el-select>
                <el-select v-model="value" size="mini" placeholder="二级分类" clearable>
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    >

                    </el-option>
                </el-select>
            </div>
            <el-button size="mini">查询</el-button>
        </div>
        <div class="line"></div>
        <div class="content">
            <div class="optbar">
                <li>待审核(2)</li>
                <li>审核驳回(2)</li>
                <li>强制下架(2)</li>
                <li>草稿箱(2)</li>
                <li>全部</li>
                <li>新增</li>
            </div>
            <el-table
                border
                :data="tableData"
                style="width:100%"
                @selection-change="handleSelectionChange"
                :header-cell-style="getHead"
            >
                <el-table-column 
                    type="selection" 
                    width="55"
                >
                    
                </el-table-column>
                <el-table-column 
                    label="商品信息"
                    width="565"
                >
                    <template slot-scope="scope">
                        <div class="container">
                            <div class="png"></div>
                            <div class="info">
                                <p>【商品标题】</p>
                                <p>【商品ID】</p>
                                <p>【平台分类】</p>
                                <p>查看规格</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column 
                    prop="supplyPrice"
                    label="供货价/元"
                >
                    
                </el-table-column>
                <el-table-column 
                    prop="saleNum"
                    label="销量"
                >
                    
                </el-table-column>
                <el-table-column 
                    prop="stock"
                    label="库存/件"
                >
                    
                </el-table-column>
                <el-table-column 
                    prop="updateTime"
                    label="更新时间"
                >
                    
                </el-table-column>
                <el-table-column 
                    prop="status"
                    label="商品状态"
                >
                    
                </el-table-column>
                <el-table-column 
                    label="操作"
                >
                    
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import { Input, Select, Option, Button, Table,TableColumn } from 'element-ui';
    export default {
        data(){
            return{
                value:'',
                options:[],
                tableData:[
                    {
                        img:'',
                        title:'满哪儿2015秋款韩版长袖连衣裙',
                        id:'20157682',
                        type:'美食》》茶与咖啡',
                        supplyPrice:'100.00',
                        saleNum:10,
                        stock:400,
                        updateTime:'2018-07-18 10:12:13',
                        status:'待审核'
                    },
                    {
                        img:'',
                        title:'满哪儿2015秋款韩版长袖连衣裙',
                        id:'20157682',
                        type:'美食》》茶与咖啡',
                        supplyPrice:'1020.00',
                        saleNum:10,
                        stock:400,
                        updateTime:'2018-07-18 10:12:13',
                        status:'待审核'
                    }
                ]
            }
        },
        components:{
            'el-input':Input,
            'el-select':Select,
            'el-option':Option,
            'el-button':Button,
            'el-table':Table,
            'el-table-column':TableColumn
        },
        methods:{
            getHead(){
                return {
                    'text-align':'center',
                    'background-color':'#f8f8f8'
                }
            },
            handleSelectionChange(val){
                // console.log(val)
            }
        }
    }
</script>


<style lang="scss">
    @import '@/assets/scss/color.scss';
    #fatory{
        .head{
            text-align: left;
            padding:35px 0;
            padding-left:40px;
            .el-button{
                background: $themeC;
                color:#fff;
            }
        }
        
        .head1{
            box-sizing: border-box;
            margin-bottom: 16px;
            &>.el-input,&>.el-select{
                width:14%;
                margin-right:24px;
            }
        }
        .line{
            height:16px;
            background: $gray;
        }
        .content{
            padding:20px 40px 0;
            .optbar{
                overflow: hidden;
                li{
                    cursor: pointer;
                    float:left;
                    width:124px;
                    line-height:36px;
                    background:$gray;
                    margin-right: 16px;
                    &:last-child{
                        float:right;
                        margin:0;
                        width:80px;
                        line-height: 30px;
                        background: $themeC;
                        color:white;
                        border-radius: 6px;
                    }
                }
            }
            .container{
                margin:18px 42px;
                display: flex;
            }
            .png{
                width:88px;
                background: $gray;
                height:88px;
            }
        }
    }
</style>

