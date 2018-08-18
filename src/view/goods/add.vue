<template>
  <div id="addgoods">
    <!-- 步骤条 -->
    <el-steps :active="1" simple finish-status="success">
      <el-step title="基础信息"></el-step>
      <el-step title="图片信息"></el-step>
      <el-step title="规格信息"></el-step>
    </el-steps>
    <!-- 表单组件 -->
    <!-- 步骤零 -->
    <el-form class="step-zero" v-if="step.zero" label-position="right" label-width="80px" ref="ruleForm" :rules="rulesZero" :model="basicInfo">
      <div class="lop" v-if="false">
        德国战车0：2 负韩国，回家维修
      </div>
      <el-form-item label="平台分类" required>
        <el-col :span="4">
          <el-form-item prop="classifyFirstValue">
            <el-select v-model="basicInfo.classifyFirstValue" placeholder="请选择一级分类" style="width: 100%;" @change="changeSelect">
              <el-option v-for="(item,index) in basicInfoStorage.classify.classifyFirst" :key="index" :label="item.catName" :value="item.catId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="classifySecondValue">
            <el-select v-model="basicInfo.classifySecondValue" placeholder="请选择二级分类" :disabled="basicInfo.classifyFirstValue?false:true" style="width: 100%;">
              <el-option v-for="(item,index) in basicInfoStorage.classify.classifySecond" :key="index" :label="item.catName" :value="item.catId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="商品标题" required prop="goodsName">
        <el-input v-model="basicInfo.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="商品编号" required prop="productNum">
        <el-input v-model="basicInfo.productNum"></el-input>
      </el-form-item>
      <el-form-item label="商品单位" required prop="goodsUnit">
        <el-select v-model="basicInfo.goodsUnit" placeholder="请选择单位">
          <el-option v-for="(item,index) in basicInfoStorage.goodsSpecList" :key="index" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否包邮" required prop="isPinkage">
        <el-radio-group v-model="basicInfo.isPinkage">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="品牌故事">
        <el-input v-model="basicInfo.brandStory" type="textarea" maxlength="200"></el-input>
        <s>{{basicInfo.brandStory.length}}/200</s>
      </el-form-item>
      <el-form-item label="推荐理由">
        <el-input v-model="basicInfo.recomReason" type="textarea" maxlength="200"></el-input>
        <s>{{basicInfo.brandStory.length}}/200</s>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFormZero('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>

    <!-- 步骤一 -->
    <el-form class="step-one" v-if="step.one" label-position="right" label-width="80px" ref="ruleFormOne" :rules="rulesOne" :model="basicInfo">
      <el-form-item label="商品主图" required prop="goodsImg">
        <el-upload :action="imgUrl" list-type="picture-card" :headers="imgHeader" :on-success="uploadImgOnSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>图片只支持
          <span>jpg、jpeg、png、gif、bmp</span>，最多支持上传6张图片;</p>
        <p>图片尺寸为
          <span>800px</span>的正方形，不得大于
          <span>500k</span>
        </p>
        <p>第一张图片默认为封面图</p>
      </el-form-item>
      <el-form-item label="主图视频" required prop="goodsVido">
        <el-upload :action="imgUrl" list-type="picture-card" :on-remove="handleRemove" :headers="imgHeader" :on-success="uploadVideoOnSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>图片只支持
          <span>mp4、avi、wmv、mpeg、rmvb、flv</span>，只能上传1个视频;</p>
        <p>视频长度
          <span>小于30秒，不得大于100M</span>
        </p>
        <p>视频上传后，默认封面图点击预览</p>
      </el-form-item>
      <el-form-item label="商品描述" required prop="goodsDesc">
        <div id="container">
          <quill-editor ref="myTextEditor" v-model="basicInfo.goodsDesc" :config="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFormOne('ruleFormOne')">下一步</el-button>
        <el-button>返回</el-button>
      </el-form-item>

    </el-form>

    <!-- 步骤二 -->
    <el-form class="step-two" v-if="step.two" label-position="right" label-width="80px">
      <el-form-item label="规格类型" required>
        <el-radio-group v-model="specInfo.isSpec">
          <el-radio :label="0">无规格</el-radio>
          <el-radio :label="1">多规格</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 有规格渲染的页面 -->
      <template v-if="havSpec">
        <!-- 有规格渲染的填写规格名称页面 -->
        <div class="gry8">
          <el-form-item label="规格名称">
            <div class="tank">
              <el-form :model="specInfo.jsonSpec[0]" ref="specInfoOne">
                <!-- 规格一 -->
                <div class="single">
                  <div class="head">
                    <el-form-item prop="specName" :rules="{required: true, message: '规格名称不能为空', trigger: 'blur'}">
                      <el-input clearable v-model="specInfo.jsonSpec[0].specName" placeholder="填写规格名称一"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content">
                    <div class="spac_v" v-for="(item,i) in specInfo.jsonSpec[0].specDetail" :key="i">
                      <el-form-item :prop="'specDetail.'+i+'.specValue'" :rules="{required: true, message: '规格值不能为空', trigger: 'blur'}">
                        <el-input clearable v-model="item.specValue" :placeholder="'填写规格值'+(i+1)"></el-input>
                        <div class="picc" v-if="item.specImg" @click.stop="clear(item)">
                          <img :src="item.specImg" alt="">
                          <span>
                            <i class="el-icon-delete"></i>
                          </span>
                        </div>
                        <label @click.stop="curSpc=item" v-else>
                          规格图片
                          <el-upload v-show="false" :limit="1" :on-change="(file, fileList)=>{picchange(file, fileList,i)}" :action="imgUrl" :headers="imgHeader" :on-success="(response,file,fileList)=>{unitUploadImgOnSuccess(response,file,fileList,i)}">
                            <el-button>
                              规格图片
                            </el-button>
                          </el-upload>
                        </label>
                        <i class="el-icon-circle-close del" @click.stop="deletey(specInfo.jsonSpec[0].specDetail,i)"></i>
                      </el-form-item>
                    </div>
                    <div class="spac_v" @click.stop="addspecV(specInfo.jsonSpec[0])">
                      <i class="el-icon-plus"></i>
                      规格值
                    </div>
                  </div>
                </div>
              </el-form>
              <el-form :model="specInfo.jsonSpec[1]" ref="specInfoTwo">
                <!-- 规格二 -->
                <div class="single">
                  <div class="head">
                    <el-form-item prop="specName" :rules="{required: true, message: '规格名称不能为空', trigger: 'blur'}">
                      <el-input clearable v-model="specInfo.jsonSpec[1].specName" placeholder="填写规格名称二"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content">
                    <div class="spac_v" v-for="(item,i) in specInfo.jsonSpec[1].specDetail" :key="i">
                      <el-form-item :prop="'specDetail.'+i+'.specValue'" :rules="{required: true, message: '规格值不能为空', trigger: 'blur'}">
                        <el-input clearable v-model="item.specValue" :placeholder="'填写规格值'+(i+1)"></el-input>
                        <i class="el-icon-circle-close del" @click.stop="deletey(specInfo.jsonSpec[1].specDetail,i)"></i>
                      </el-form-item>
                    </div>
                    <div class="spac_v" @click.stop="addspecV(specInfo.jsonSpec[1])">
                      <i class="el-icon-plus"></i>
                      规格值
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </el-form-item>
        </div>
        <!-- 有规格渲染的填写SKU信息页面 -->
        <div class="gry8">
          <el-form-item label="SKU信息" required>
            <div class="tank tankt tankt2">
              <!-- 头部名称 -->
              <div class="head1">
                <li>{{specInfo.jsonSpec[0].specName||'规格一'}}</li>
                <li v-if="specInfo.jsonSpec[1].specName!=''">{{specInfo.jsonSpec[1].specName}}</li>
                <li>
                  <i class="required">*</i>供货价/元
                  <p>
                    <el-input v-model="skuInfo.marketsPrice" size="mini" placeholder="批量设置" @input="changeAll(0,$event)"></el-input>
                  </p>
                </li>
                <li>
                  建议销售价/元
                  <p>
                    <el-input v-model="skuInfo.salesPrice" size="mini" placeholder="批量设置" @input="changeAll(1,$event)"></el-input>
                  </p>
                </li>
                <li>
                  <i class="required">*</i>库存/件
                  <p>
                    <el-input v-model="skuInfo.stock" size="mini" placeholder="批量设置" @input="changeAll(2,$event)"></el-input>
                  </p>
                </li>
                <li>
                  <i class="required">*</i>商品货号
                  <p>
                    <el-input v-model="skuInfo.productNum" size="mini" placeholder="批量设置" @input="changeAll(3,$event)"></el-input>
                  </p>
                </li>
                <li>操作</li>
              </div>
              <!-- 规格内部 -->
              <div class="content12">
                <el-form :model="specInfo" ref="specInfo">
                  <dl>
                    <dt v-for="(item,i) in specInfo.jsonSku" :key="i">
                      <!-- 1 规格一名称 -->
                      <li class="te">
                        <img :src="item.spec1img" alt="">
                        <span>{{item.spec1title}}</span>
                      </li>
                      <!-- 2 规格二名称-->
                      <li class="te" v-if="item.spec2title">
                        <img :src="item.spec2img" alt="">
                        <span>{{item.spec2title}}</span>
                      </li>
                      <!-- 3 供货价-->
                      <el-form-item :prop="'jsonSku.'+i+'.marketsPrice'" :rules="{required: true, message: '供货价不能为空', trigger: 'blur'}">
                        <el-input size="mini" v-model="item.marketsPrice"></el-input>
                      </el-form-item>
                      <!-- 4 建议销售价-->
                      <el-form-item :prop="'jsonSku.'+i+'.salesPrice'" :rules="{required: true, message: '建议销售价不能为空', trigger: 'blur'}">
                        <el-input size="mini" v-model="item.salesPrice"></el-input>
                      </el-form-item>
                      <!-- 5 库存-->
                      <el-form-item :prop="'jsonSku.'+i+'.stock'" :rules="{required: true, message: '库存不能为空', trigger: 'blur'}">
                        <el-input size="mini" v-model="item.stock"></el-input>
                      </el-form-item>
                      <!-- 6 商品货号-->
                      <el-form-item :prop="'jsonSku.'+i+'.productNum'" :rules="{required: true, message: '商品货号不能为空', trigger: 'blur'}">
                        <el-input size="mini" v-model="item.productNum"></el-input>
                      </el-form-item>
                      <li>
                        <b>下架</b>
                        <b>默认</b>
                      </li>
                    </dt>
                    <div class="stock">
                      上架库存/总库存：10/15
                    </div>
                  </dl>
                </el-form>
              </div>
            </div>
          </el-form-item>
        </div>
      </template>

      <!-- 没有规格渲染的SKU信息页面 -->
      <template v-else>
        <div class="gry8">
          <el-form-item label="SKU信息" required>
            <div class="tank tankt">
              <div class="head1">
                <li>默认</li>
                <li>
                  <i class="required">*</i>供货价/元
                </li>
                <li>建议销售价/元</li>
                <li>
                  <i class="required">*</i>库存/件
                </li>
                <li>
                  <i class="required">*</i>商品货号
                </li>
                <li>操作</li>
              </div>
              <div class="content1">
                <el-form :model="specInfo.jsonSku[0]">
                  <li>商品信息</li>
                  <el-form-item prop="marketsPrice" :rules="{required: true, message: '供货价不能为空', trigger: 'blur'}">
                    <el-input size="mini" v-model="specInfo.jsonSku[0].marketsPrice"></el-input>
                  </el-form-item>
                  <el-form-item prop=".salesPrice" :rules="{required: true, message: '建议销售价不能为空', trigger: 'blur'}">
                    <el-input size="mini" v-model="specInfo.jsonSku[0].salesPrice"></el-input>
                  </el-form-item>
                  <el-form-item prop="stock" :rules="{required: true, message: '库存不能为空', trigger: 'blur'}">
                    <el-input size="mini" v-model="specInfo.jsonSku[0].stock"></el-input>
                  </el-form-item>
                  <el-form-item prop="productNum" :rules="{required: true, message: '商品货号不能为空', trigger: 'blur'}">
                    <el-input size="mini" v-model="specInfo.jsonSku[0].productNum"></el-input>
                  </el-form-item>
                  <li>
                    <el-button style="width:auto">下架</el-button>
                    <el-button>默认</el-button>
                  </li>
                  <div class="stock">
                    在售/总库存：10/15件
                  </div>
                </el-form>
              </div>
            </div>
          </el-form-item>
        </div>
      </template>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitSku">销售申请</el-button>
        <el-button @click="submitSku">存入草稿箱</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
// 引入element组件
import {
  Col,
  Steps,
  Step,
  Select,
  Input,
  Radio,
  Button,
  Upload,
  Option,
  radioGroup,
  Form,
  FormItem
} from "element-ui";
// 引入富文本编辑器组件
import { quillEditor } from "vue-quill-editor";
// 引入api接口
import api from "../../api/api";
// 引入store.js 管理状态
import store from "../../store";

export default {
  components: {
    "el-col": Col,
    "el-steps": Steps,
    "el-step": Step,
    "el-select": Select,
    "el-option": Option,
    "el-input": Input,
    "el-radio": Radio,
    "el-button": Button,
    "el-upload": Upload,
    quillEditor,
    "el-radio-group": radioGroup,
    "el-form": Form,
    "el-form-item": FormItem
  },
  data() {
    return {
      // 上传图片的接口地址，主要为上传商品图片使用
      imgUrl: api.baseUrl + api.apiUrl.imgUrl,
      // 步骤条，判断到达第几步
      step: {
        zero: true,
        one: true,
        two: true
      },
      // 步骤零，基础信息表单验证
      rulesZero: {
        classifyFirstValue: [
          { required: true, message: "请选择平台一级分类", trigger: "blur" }
        ],
        classifySecondValue: [
          { required: true, message: "请选择平台二级分类", trigger: "blur" }
        ],
        goodsName: [
          { required: true, message: "请输入商品标题", trigger: "blur" }
        ],
        productNum: [
          {
            required: true,
            message: "请输入商品编号",
            trigger: "blur"
          }
        ],
        goodsUnit: [
          {
            required: true,
            message: "请选择商品单位",
            trigger: "change"
          }
        ],
        isPinkage: [
          { required: true, message: "请选择是否包邮", trigger: "change" }
        ]
      },
      // 步骤一，表单验证
      rulesOne: {
        goodsImg: [
          { required: true, message: "请上传商品主图", trigger: "blur" }
        ], // 商品主图
        goodsVido: [
          { required: true, message: "请上传主图视频", trigger: "blur" }
        ], // 商品视频
        goodsDesc: [
          { required: true, message: "请输入商品描述", trigger: "blur" }
        ] // 商品描述
      },
      // 步骤二，表单验证
      rulesTwo: {},

      // 步骤零，和步骤一，存储的信息
      basicInfo: {
        classifyFirstValue: "",
        classifySecondValue: "", // 分类,在发送的时候进行拼接
        goodsName: "", // 商品标题
        productNum: "", // 商品ID
        goodsUnit: "", // 商品单位
        isPinkage: 1, // 是否包邮
        brandStory: "", // 品牌故事
        recomReason: "", // 推荐理由

        // 第二步的图片信息
        goodsImgArray: [], // 商品主图
        goodsVido: "", // 商品视频
        goodsDesc: "", // 商品描述

        isSubmit: 1 // 是否存入草稿箱,0是存入草稿箱，1是销售申请
      },

      // 步骤零，基础信息内的平台分类暂时存储
      basicInfoStorage: {
        // 存储商品分类信息
        classify: {
          classifyFirst: [
            // {
            //   catId: "370",
            //   catName: "生活用品"
            // }
          ],
          classifySecond: [
            // {
            //   catId: "选项一",
            //   catName: "电风扇"
            // }
          ]
        },
        // 商品单位，目前是写死的
        goodsSpecList: [
          { label: "件" },
          { label: "个" },
          { label: "台" },
          { label: "袋" },
          { label: "包" },
          { abel: "箱" },
          { label: "桶" },
          { label: "克" },
          { label: "千克" },
          { label: "米" },
          { label: "升" },
          { label: "其他" }
        ]
      },

      // 步骤二，规格信息
      specInfo: {
        isSubmit: 1, // 是否存入草稿箱,0是存入草稿箱，1是销售申请
        id: 2, // 上传的goodsId,为后端返回的id，等返回id后填充进去
        isSpec: 0, // 规格类型
        // 有商品规格时，传具体数据，长度为0，若无商品规格，则传具体的对象数组
        jsonSpec: [
          {
            specName: "规格1名称", // 规格名称
            specDetail: [
              {
                specValue: "规格1值1", // 规格值
                specImg: "" // 规格图片
              },
              {
                specValue: "规格1值2", // 规格值
                specImg: "" // 规格图片
              }
            ]
          },
          {
            specName: "规格2名称", // 规格名称
            specDetail: [
              {
                specValue: "规格2值1", // 规格值
                specImg: "" // 规格图片
              },
              {
                specValue: "规格2值2", // 规格值
                specImg: "" // 规格图片
              }
            ]
          }
        ],
        // 没有商品规格
        jsonSku: [
          {
            marketsPrice: "", // 供货价，
            salesPrice: "", // 建议销售价，
            stock: "", // 库存
            productNum: "", // 货号
            isDowm: 0, // 是否下架,0为默认，1是下架，0是不下架
            isDefault: 0 // 是否为默认,默认值为0，选中为1
          }
        ]
      },

      // 步骤二，设置全部供货价等sku价格
      skuInfo: {
        marketsPrice: "", // 供货价marketsPrice
        salesPrice: "", // 建议销售价
        stock: "", // 供货价
        productNum: "" // 供货价
      },
      curSpc: {}, // 暂时存储规格图片对象
      editorOption: {}, // 富文本编辑器的对象
      hasChangeId: false // 判断是否为修改ID，默认为false
    };
  },

  computed: {
    // 是否有规格时的显示
    havSpec() {
      let boo = this.specInfo.isSpec == 0 ? false : true;
      return boo;
    },
    // sku的列表，根据规格名称内的规格值来进行计算有多少sku，返回需要为一个对象，才可实现表单的验证
    jsonSkuInfo() {
      let arr1 = this.specInfo.jsonSpec[0].specDetail; // 获取规格一的规格值
      let arr2 = this.specInfo.jsonSpec[1].specDetail; // 获取规格二的规格值

      // 只有一个规格的时候
      if (arr2.length == 0 || this.specInfo.jsonSpec[1].specValue == "") {
        arr1.map(item => {
          this.jsonSkuInfo.push({
            spec1title: item.specValue,
            spec1img: item.specImg,
            marketsPrice: "", // 供货价
            salesPrice: "", // 建议销售价，salesPrice
            stock: "", // 库存
            productNum: "", // 货号
            isDowm: "1", // 是否下架
            isDefault: "1" // 默认
          });
        });
      } else {
        // 有2个规格的时候，则进行sku计算
        // 没有id传入时
        arr1.map(item => {
          arr2.map(jtem => {
            this.jsonSkuInfo.push({
              // skuImg:'',
              spec1title: item.specValue,
              spec2title: jtem.specValue,
              spec1img: item.specImg,
              marketsPrice: "",
              salesPrice: "",
              stock: "",
              productNum: "",
              isDowm: "", // 是否下架
              isDefault: "" // 默认
            });
          });
        });
      }
      console.log(jsonSkuInfo);
      this.specInfo.jsonSku = jsonSkuInfo;
      return jsonSkuInfo;
    },

    // 图片上传的请求头
    imgHeader() {
      return {
        authorization: store.state.token
      };
    }
  },
  // 创建时即拿到请求头的id，然后赋值给页面的数据
  mounted() {
    console.log(this.$route.query);
    if (this.$route.query.id) {
      this.axios
        .get(api.apiUrl.goods_locals + "/" + this.$route.query.id)
        .then(res => {
          console.log(res);
          this.basicInfo = res.data.data.goodsInfo;
          // const aaa = this.basicInfo.goodsCatIdPath.split("_");
          // console.log(aaa);
          // this.basicInfo.classifyFirstValue = 370;
          // // this.basicInfo.classifySecondValue = '';
          this.specInfo.jsonSpec = res.data.data.specInfo;
          this.specInfo.jsonSku = res.data.data.skuInfo;
          this.specInfo.isSpec = res.data.data.isSpec;
          // this.hasChangeId = true;
          // 请求成功之后继续请求
        })
        .catch(res => {});
    }

    // 选择分类默认发送请求填充
    this.axios
      .post(
        api.apiUrl.goods_classifyList,
        this.qs({
          catId: 0
        })
      )
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          const newCat = {
            catId: res.data[i].catId,
            catName: res.data[i].catName
          };
          this.basicInfoStorage.classify.classifyFirst.push(newCat);
        }
      })
      .catch(error => {});
  },
  methods: {
    // 步骤零
    // 步骤零，选择平台分类的二级分类
    changeSelect() {
      // 修改时，需要先把里面的值清空
      this.axios
        .post(
          api.apiUrl.goods_classifyList,
          this.qs({
            catId: this.basicInfo.classifyFirstValue
          })
        )
        .then(res => {
          this.basicInfoStorage.classify.classifySecond = [];
          for (var i = 0; i < res.data.length; i++) {
            const newCat = {
              catId: res.data[i].catId,
              catName: res.data[i].catName
            };
            this.basicInfoStorage.classify.classifySecond.push(newCat);
          }
        })
        .catch(error => {});
    },
    // 步骤零，上传基本信息
    submitFormZero(formName) {
      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 分类的第一类和第二类做拼接，传给后台
          this.basicInfo.goodsCatIdPath =
            this.basicInfo.classifyFirstValue +
            "_" +
            this.basicInfo.classifySecondValue;
          this.step.zero = false;
          this.step.one = true;
        } else {
          return false;
        }
      });
    },

    // 步骤一
    // 步骤一，上传图片信息
    submitFormOne(formName) {
      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.step.one = false;
          this.step.two = true;
        } else {
          return false;
        }
      });
    },
    // 步骤一，上传图片成功处理函数
    uploadImgOnSuccess(response, file, fileList) {
      this.basicInfo.goodsImgArray.push(response.path);
    },
    // 步骤一，上传视频成功处理函数
    uploadVideoOnSuccess(response, file, fileList) {
      this.basicInfo.goodsVido = response.path;
    },
    // 步骤一，视频列表移除
    handleRemove() {},
    // 步骤一，商品描述函数
    onEditorReady() {},

    // 步骤二
    // 步骤二，上传规格图片
    unitUploadImgOnSuccess(response, file, fileList, i) {},
    // 步骤二，多规格时，修改全部的价格信息
    changeAll(num, e) {
      if (num == 0) {
        for (let i = 0; i < this.specInfo.jsonSku.length; i++) {
          this.specInfo.jsonSku[i].marketsPrice = e;
        }
      } else if (num == 1) {
        for (let i = 0; i < this.specInfo.jsonSku.length; i++) {
          this.specInfo.jsonSku[i].salesPrice = e;
        }
      } else if (num == 2) {
        for (let i = 0; i < this.specInfo.jsonSku.length; i++) {
          this.specInfo.jsonSku[i].stock = e;
        }
      } else if (num == 3) {
        for (let i = 0; i < this.specInfo.jsonSku.length; i++) {
          this.specInfo.jsonSku[i].productNum = e;
        }
      }
    },
    // 步骤二，提交全部信息至销售申请/存入草稿箱
    submitSku() {
      this.axios
        .post(api.apiUrl.goods_locals, this.basicInfo)
        .then(res => {
          // 返回成功后，把id传入后面需要发的参数
          this.specInfo.id = res.data.data.id;
          if (this.specInfo.isSpec == 0) {
          } else if (this.specInfo.isSpec == 1) {
            this.specInfo.jsonSku = this.specInfo.jsonSku;
          }
          this.axios
            .post(api.apiUrl.goods_spec_cats_create, this.specInfo)
            .then(res => {})
            .catch(res => {});
        })
        .catch(res => {});
    },
    // 步骤二，删除规格值
    deletey(arr, i) {
      // 需要使用倒叙的形式，因为使用splice会修改原数组，造成误删或者少删
      for (let j = this.specInfo.jsonSku.length - 1; j >= 0; j--) {
        if (
          arr[i].specValue == this.specInfo.jsonSku[j].spec2title ||
          arr[i].specValue == this.specInfo.jsonSku[j].spec1title
        ) {
          this.specInfo.jsonSku.splice(j, 1);
        }
      }
      arr.splice(i, 1);
    },
    // 步骤二，添加规格值
    addspecV(obj) {
      obj.specDetail.push({ specValue: "", specImg: "" });
    },
    // 步骤二，清除规格图片
    clear(it) {
      it.specImg = "";
    },
    // 步骤二，修改图片
    picchange(file, fileList, i) {
      this.curSpc.specImg = file.url;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/color.scss";
@import "quill/dist/quill.core.css";
@import "quill/dist/quill.snow.css";
@import "quill/dist/quill.bubble.css";
#addgoods {
  padding-top: 35px;
  padding-left: 35px;
  padding-bottom: 35px;
  text-align: left;
  font-size: 12px;
  .required {
    color: $errcolor; // 设置必须填写的项目颜色
  }
  .el-steps {
    width: 708px;
    margin: 0 35px 35px 0;
  }
  .el-step__title.is-success,
  .el-step__head.is-success {
    color: $themeC;
    border-color: $themeC;
  }
  .lop {
    width: 1300px;
    height: 80px;
    line-height: 80px;
    background: $reminderbg;
    color: $emphasizeColor;
    text-indent: 36px;
    margin-bottom: 40px;
  }
  .el-textarea {
    width: 622px;
    textarea {
      height: 160px;
    }
  }
  .step-zero {
    p {
      margin-bottom: 40px;
    }
    .el-select .el-input {
      width: 180px;
    }
    .textarea {
      display: flex;
      padding-left: 6px;
      position: relative;
      s {
        text-decoration: none;
        position: absolute;
        bottom: 12px;
        left: 622px;
        color: #a7a7a7;
      }
    }
    p:last-child {
      padding-bottom: 40px;
    }
    .el-button {
      width: 100px;
      background: $themeC;
      color: #fff;
    }
  }
  .el-select:nth-of-type(2) {
    margin-left: 40px;
  }
  .el-input {
    width: 400px;
  }
  .step-one {
    p {
      color: $txtgray;
      font-size: 12px;
      line-height: 18px;
      span {
        color: $textcolor;
      }
    }
    .el-upload {
      margin-bottom: 10px;
    }
    .gy7:nth-child(1),
    .gy7:nth-child(2) {
      display: flex;
      margin-bottom: 40px;
      p {
        color: $txtgray;
        line-height: 18px;
        span {
          color: $textcolor;
        }
      }
      .el-upload {
        margin-bottom: 10px;
      }
    }
    .editor {
      display: flex;
    }
    .gy7:last-child {
      padding: 40px 72px;
    }
    .el-button {
      width: 100px;
      &:nth-child(1) {
        background: $themeC;
        color: #fff;
      }
      &:nth-child(2) {
        background: $gray;
      }
    }
  }
  #container {
    width: 1000px;
    .ql-container {
      height: 500px;
    }
  }
  .step-two {
    .gry8 {
      margin-bottom: 40px;
      display: flex;
      &:last-child {
        margin-left: 72px;
        padding-bottom: 40px;
      }
    }
    .tank {
      width: 1000px;
      border: 1px solid $bordercolor;
      border-radius: 3px;
      padding-top: 16px;
      .head {
        background: $gray;
        line-height: 60px;
        width: 96%;
        border-radius: 6px;
        margin: 0 auto;
      }
      .head .el-input {
        width: 267px;
        height: 40px;
        margin-left: 16px;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        margin: 16px 32px 32px 0;
        label {
          font-size: 12px;
          color: $themeC;
          background: $gray;
          border: 0;
          width: 28px;
          padding: 2px 6px;
          white-space: normal;
          cursor: pointer;
          margin-left: 8px;
          position: relative;
        }
      }
      .content .el-input {
        width: 221px;
      }
      .spac_v {
        margin-left: 32px;
        display: flex;
        position: relative;
        margin-bottom: 16px;
        .picc {
          width: 40px;
          height: 40px;
          overflow: hidden;
          margin-left: 8px;
          position: relative;
          cursor: pointer;
        }
        .del {
          position: absolute;
          top: -8px;
          left: -8px;
          font-size: 16px;
          color: #999;
        }
        .picc span {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          text-align: center;
          line-height: 40px;
          i {
            color: #fff;
            font-size: 16px;
          }
          display: none;
        }
        .picc:hover {
          span {
            display: block;
          }
        }
        img {
          width: 100%;
        }
      }
      .spac_v:last-child {
        font-size: 14px;
        color: $themeC;
        line-height: 40px;
        margin-left: 12px;

        .el-icon-plus {
          line-height: 38px;
        }
      }
    }
    @extend .step-one;
    .el-button:nth-child(2) {
      width: auto;
      margin-left: 36px;
    }
    .tankt {
      padding: 0;
      .head1 {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        background: $gray;
        i {
          color: $errcolor;
        }
      }
      .content1 {
        .el-form {
          display: flex;
          justify-content: space-between;
          padding: 32px 0 80px 0;
          position: relative;
          .el-input {
            width: 160px;
          }
          .el-button {
            padding: 6px 20px;
          }
          .stock {
            position: absolute;
            left: 12px;
            bottom: 12px;
          }
          .el-button:nth-child(2) {
            margin-left: 6px;
          }
          li {
            line-height: 28px;
            display: inline;
          }
        }
      }
      li {
        list-style: none;
        text-align: center;
        width: 15%;
      }
    }
    .tankt2 {
      .head1 {
        box-sizing: border-box;
        padding-top: 17px;
        height: 78px;
        line-height: 1;
        .el-input {
          width: 80%;
          margin-top: 4px;
        }
        .el-button {
          width: 80%;
          margin-top: 4px;
          height: 28px;
          line-height: 28px;
          padding: 0;
          font-size: 12px;
          background: $gray;
          color: $qian;
        }
        .el-button:nth-child(2) {
          margin-left: 0;
        }
      }
      dl {
        li {
          box-sizing: border-box;
        }
        .el-input {
          width: 80%;
        }
        dt {
          display: flex;
          justify-content: space-between;
          height: 54px;
          line-height: 54px;
        }
        img {
          margin-top: 7px;
          width: 40px;
          height: 40px;
        }
        .te {
          display: flex;
          justify-content: start;
          padding-left: 24px;
          span {
            margin-left: 2px;
            width: 70%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: left;
          }
          overflow: hidden;
        }
        li:last-child {
          display: flex;
          box-sizing: border-box;
          justify-content: center;
          b {
            font-weight: 500;
            color: $themeC;
            cursor: pointer;
            &:nth-child(2) {
              margin-left: 24px;
            }
          }
        }
      }
    }
  }
}
</style>

