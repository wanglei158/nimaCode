<template>
    <div id="info_1">
        <h3>账户信息</h3>
        <div class="k1">
            <p><i>*</i><span>商家状态：</span><el-radio v-model="radio" :label="1">启用</el-radio></p>
            <p><i>*</i><span>商家账号：</span><el-input v-model="input" ></el-input></p>
            <p><i>*</i><span>密码：</span></span><el-input v-model="input" ></el-input></p>
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
    </div>
</template>

<script>
    import { Radio ,Input, Select,Option, Checkbox, CheckboxGroup, Upload} from 'element-ui';
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
            'el-upload':Upload
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
        &>div{
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
    }
</style>

