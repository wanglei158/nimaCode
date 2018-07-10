<template>
    <div id="info_1">
        <template v-if="false">
            <h3>账户信息</h3>
            <div class="k1">
                <p><i>*</i><span>商家状态：</span><el-radio v-model="radio" :label="1">启用</el-radio></p>
                <p><i>*</i><span>商家账号：</span><el-input v-model="input" ></el-input></p>
                <p><i>*</i><span>密码：</span><el-input v-model="input" ></el-input></p>
            </div>
            <h3>商户信息</h3>
            <div class="k2">
                <p><i>*</i><span>商家类型：</span><el-radio v-model="radio" :label="1">普通</el-radio></p>
                <p><i>*</i><span>公司名称：</span><el-input v-model="input" ></el-input></p>
                <p><i>*</i><span>法人姓名：</span><el-input v-model="input" ></el-input></p>
                <p>
                    <i>*</i><span>公司地址：</span>
                    <el-select v-model="value" placeholder="请选择" v-for="i in 3" :key="i">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <p><i>*</i><span>详细地址：</span><el-input v-model="input" ></el-input></p>
                <p class="salearea">
                    <i>*</i>
                    <span>经营范围：</span>
                    <el-checkbox-group
                        @change="getall"
                        v-model="checkedCities1">
                        <el-checkbox v-for="city in cities" :label="city.label" :key="city.label">{{city.name}}</el-checkbox>
                        <el-input v-model="input" ></el-input>
                    </el-checkbox-group>
                </p>
                <div class="salearea opd">
                    <i>*</i>
                    <span>企业证件：</span>
                    <p>
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-input class="namel" v-model="input" placeholder="请填写名称"></el-input>
                    </p>

                </div>
            </div>
            <h3>联系人信息</h3>
            <div class="k3">
                <p><i>*</i><span>姓名：</span><el-input v-model="input" ></el-input></p>
                <p><i>*</i><span>联系电话：</span><el-input v-model="input" ></el-input></p>
                <p><span>固定电话：</span><el-input v-model="input" ></el-input></p>
                <p><span>邮箱：</span><el-input v-model="input" ></el-input></p>
                <p><span>QQ：</span><el-input v-model="input" ></el-input></p>
            </div>
            <h3>结算信息</h3>
            <div class="k4">
                <p><i>*</i><span>开户名：</span><el-input v-model="input" ></el-input></p>
                <p>
                    <i>*</i><span>开户地区：</span>
                    <el-select v-model="value" placeholder="请选择" v-for="i in 2" :key="i">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <p><i>*</i><span>开户银行：</span><el-input v-model="input" ></el-input></p>
                <p><i>*</i><span>开户账号：</span><el-input v-model="input" ></el-input></p>
                <p><span>持卡人：</span><el-input v-model="input" ></el-input></p>
                <p><i>*</i><span>结算方式：</span><el-radio v-model="radio" :label="1">款到发货</el-radio></p>
                <p>
                    <el-button>保存</el-button>
                    <el-button>返回</el-button>
                </p>
            </div>
        </template>
        <template v-else>
            <info-watch />
        </template>
    </div>
</template>

<script>
    import { Button, Radio ,Input, Select,Option, Checkbox, CheckboxGroup, Upload} from 'element-ui';
    import Watch from '@/components/Info/watch.vue';
    export default {
        data(){
            return {
                radio:1,
                input:'',
                value:'',
                options:[
                    {
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    },
                ],
                checkedCities1:[],
                cities:[
                    {
                        name:'美食',
                        label:'1'
                    },
                    {
                        name:'滋补',
                        label:'2'
                    },
                    {
                        name:'日用',
                        label:'3'
                    },
                    {
                        name:'个护',
                        label:'4'
                    },
                    {
                        name:'家居',
                        label:'5'
                    },
                    {
                        name:'餐厨',
                        label:'6'
                    },
                    {
                        name:'美酒',
                        label:'7'
                    },
                    {
                        name:'同城',
                        label:'8'
                    },
                    {
                        name:'其他',
                        label:'9'
                    },
                ]
            }
        },
        components:{
            'el-radio':Radio,
            'el-input':Input,
            'el-select':Select,
            'el-option':Option,
            'el-checkbox':Checkbox,
            'el-checkbox-group':CheckboxGroup,
            'el-upload':Upload,
            'el-button':Button,
            'info-watch':Watch
        },
        methods:{
            getall(val){
                console.log(val);
            },
            handleRemove(){

            },
            handlePictureCardPreview(){

            }
        }
    }
</script>


<style lang="scss">
    @import '@/assets/scss/color.scss';
    #info_1{
        padding-top:40px;
        &>.k1,.k2,.k3,.k4{
            text-align:left;
            margin-left:72px;
            p{
                margin-bottom: 40px;
                font-size:14px;
                &>i{
                    color:$errcolor;
                }
                .el-input{
                    width:400px;
                }
            }
            &.k1{
                .el-input__inner{
                    background: #f4f4f4;
                }
                p:nth-of-type(3) i{
                    margin-left:2em;
                }
            }
        }
        h3{
            font-weight: 500;
            text-align: left;
            line-height: 40px;
            text-indent:30px;
            font-size:18px;
            margin:0 40px;
            background:$gray;
            margin-bottom: 32px;
        }
        .el-select{
            margin-right:8px;
        }
        .el-select .el-input{
            width:176px;
        }
        .salearea{
            display:flex;
        }
        .el-checkbox-group{
            width:450px;
            margin-left:-20px;
            .el-checkbox{
                margin-left: 45px;
                margin-bottom: 20px;
            }
            .el-input{
                width:156px;
                margin-left:12px;
                .el-input__inner{
                    height:30px;
                    line-height: 30px;
                }
            }
        }
        .opd{
            margin-bottom: 40px;
            font-size:14px;
            .namel{
                width:146px;
                float:right;
                .el-input__inner{
                    border-style:dashed;
                }
            }
            &>i{
                color:$errcolor;
            }
        }
        .k3{
            p:nth-child(1) i{
                margin-left:2em;
            }
            p:nth-child(3) span{
                margin-left:6px;
            }
            p:nth-child(4) span{
                margin-left:32px;
            }
            p:nth-child(5) span{
                margin-left:34px;
            }
        }
        .k4{
            padding-bottom:40px;
            p:nth-last-of-type(3) i,p:first-child{
                margin-left:1em;
            }
            p:nth-last-of-type(3) span{
                margin-left:20px;
            }
            p:last-of-type{
                padding-left:72px;
            }
            .el-button{
                width:100px;
                color:#fff;
                &:nth-child(1){
                    background-color:$themeC;
                }
                &:nth-child(2){
                    background-color:$gray;
                    color:$textcolor;
                    border-color:$bordercolor;
                    margin-left:36px;
                }
            }
        }
    }
</style>

