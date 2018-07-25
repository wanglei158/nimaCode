<template>
  <div id="addgoods">
    <el-steps :active="1" simple finish-status="success">
      <el-step title="基础信息"></el-step>
      <el-step title="图片信息"></el-step>
      <el-step title="规格信息"></el-step>
    </el-steps>
    <div class="step-zero" v-if="true">
      <div class="lop" v-if="false">
        德国战车0：2 负韩国，回家维修
      </div>
      <p>
        <i class="required">*</i>
        <span>平台分类：</span>
        <el-select v-model="basicInfo.classifyFirstValue" placeholder="请选择" @focus.stop="selectGoodsList">
          <el-option v-for="item in basicInfoStorage.classify.classifyFirst" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="basicInfo.classifySecondValue" placeholder="请选择" @focus.stop="selectGoodsList">
          <el-option v-for="item in basicInfoStorage.classify.classifySecond" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </p>
      <p>
        <i class="required">*</i>
        <span>商品标题：</span>
        <el-input v-model="basicInfo.goodsTitle"></el-input>
      </p>
      <p>
        <i class="required">*</i>
        <span>商品&nbsp;I&nbsp;&nbsp;&nbsp;D：</span>
        <el-input v-model="basicInfo.goodsId"></el-input>
      </p>
      <p>
        <i class="required">*</i>
        <span>商品单位：</span>
        <el-select v-model="basicInfo.goodsSpec" placeholder="请选择单位" @focus.stop="selectGoodsList">
          <el-option v-for="item in basicInfoStorage.goodsSpecList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </p>
      <p>
        <i class="required">*</i>
        <span>是否包邮：</span>
        <el-radio-group v-model="basicInfo.isPinkage">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </p>
      <p class="textarea">
        <span>品牌故事：</span>
        <el-input v-model="basicInfo.brandStory" type="textarea" maxlength="200"></el-input>
        <s>{{basicInfo.brandStory.length}}/200</s>
      </p>
      <p class="textarea">
        <span>推荐理由：</span>
        <el-input v-model="basicInfo.recommendedReason" type="textarea" maxlength="200"></el-input>
        <s>{{basicInfo.brandStory.length}}/200</s>
      </p>
      <p>
        <el-button>下一步</el-button>
      </p>
    </div>
    <div class="step-one" v-if="true">
      <div class="gy7">
        <i class="required">*&nbsp;</i>
        <span>商品主图：</span>
        <div>
          <el-upload :action="imgUrl" list-type="picture-card" :headers="imgHeader">
            <i class="el-icon-plus"></i>
          </el-upload>
          <p>图片只支持
            <span>jpg、jpeg、png、gif、bmp</span>，最多支持上传6张图片;</p>
          <p>图片尺寸为
            <span>800px</span>的正方形，不得大于
            <span>500k</span>
          </p>
          <p>第一张图片默认为封面图</p>
        </div>
      </div>
      <div class="gy7">
        <i class="required">*&nbsp;</i>
        <span>主图视频：</span>
        <div>
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <p>图片只支持
            <span>mp4、avi、wmv、mpeg、rmvb、flv</span>，只能上传1个视频;</p>
          <p>视频长度
            <span>小于30秒，不得大于100M</span>
          </p>
          <p>视频上传后，默认封面图点击预览</p>
        </div>
      </div>
      <div class="gy7 editor">
        <i class="required">*&nbsp;</i>
        <span>商品描述：</span>
        <div id="container">
          <quill-editor ref="myTextEditor" v-model="imgInfo.goodsDescription" :config="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
        </div>
      </div>
      <div class="gy7">
        <el-button>下一步</el-button>
        <el-button>返回</el-button>
      </div>
    </div>
    <div class="step-two" v-if="true">
      <div class="gry8">
        <i class="required">*&nbsp;</i>
        <span>规格类型：</span>
        <el-radio-group v-model="specInfo.specType">
          <el-radio :label="0">无规格</el-radio>
          <el-radio :label="1">多规格</el-radio>
        </el-radio-group>
      </div>
      <template v-if="havSpec">
        <div class="gry8">
          <i class="required">*&nbsp;</i>
          <span>规格名称：</span>
          <div class="tank">
            <div class="single">
              <div class="head">
                <el-input clearable v-model="specInfo.haveSpecType.specList[0].specName" placeholder="填写规格名称一"></el-input>
              </div>
              <div class="content">
                <div class="spac_v" v-for="(item,i) in specInfo.haveSpecType.specList[0].specDetail" :key="i">
                  <el-input clearable v-model="item.specValue" :placeholder="'填写规格值'+(i+1)"></el-input>
                  <div class="picc" v-if="item.specImg" @click="clear(item)">
                    <img :src="item.specImg" alt="">
                    <span>
                      <i class="el-icon-delete"></i>
                    </span>
                  </div>
                  <label @click="curSpc=item" v-else>
                    规格图片
                    <el-upload v-show="false" :limit="1" :on-change="picchange" action="https://jsonplaceholder.typicode.com/posts/">
                      <el-button>
                        规格图片
                      </el-button>
                    </el-upload>
                  </label>
                  <i class="el-icon-circle-close del" @click="deletey(specInfo.haveSpecType.specList[0].specDetail,i)"></i>
                </div>
                <div class="spac_v" @click="addspecV(specInfo.haveSpecType.specList[0])">
                  <i class="el-icon-plus"></i>
                  规格值
                </div>
              </div>
            </div>
            <div class="single">
              <div class="head">
                <el-input clearable v-model="specInfo.haveSpecType.specList[1].specValue" placeholder="填写规格名称二"></el-input>
              </div>
              <div class="content">
                <div class="spac_v" v-for="(item,i) in specInfo.haveSpecType.specList[1].specDetail" :key="i">
                  <el-input clearable v-model="item.specValue" :placeholder="'填写规格值'+(i+1)"></el-input>
                  <i class="el-icon-circle-close del" @click="deletey(specInfo.haveSpecType.specList[1].specDetail,i)"></i>
                </div>
                <div class="spac_v" @click="addspecV(specInfo.haveSpecType.specList[1])">
                  <i class="el-icon-plus"></i>
                  规格值
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gry8">
          <i class="required">*&nbsp;</i>
          <span>SKU信息：</span>
          <div class="tank tankt tankt2">
            <div class="head1">
              <li>{{specInfo.haveSpecType.specList[0].specValue||'规格一'}}</li>
              <li v-if="specInfo.haveSpecType.specList[1].specValue!=''">{{specInfo.haveSpecType.specList[1].specValue}}</li>
              <li>
                <i class="required">*</i>供货价/元
                <p>
                  <el-input v-model="specInfo.haveSpecType.skuInfo.supplyPrice" size="mini"></el-input>
                </p>
              </li>
              <li>建议销售价/元
                <el-button>批量设置</el-button>
              </li>
              <li>
                <i class="required">*</i>库存/件
                <el-button>批量设置</el-button>
              </li>
              <li>
                <i class="required">*</i>商品货号
                <el-button>批量设置</el-button>
              </li>
              <li>操作</li>
            </div>
            <div class="content12">
              <dl>
                <dt v-for="(item,i) in skuList" :key="i">
                  <li class="te">
                    <img :src="item.specImg" alt="">
                    <span>{{item.spec1}}</span>
                  </li>
                  <li class="te" v-if="item.spec2">
                    <img :src="item.specImg" alt="">
                    <span>{{item.spec2}}</span>
                  </li>
                  <li>
                    <el-input size="mini" v-model="item.supplePrice"></el-input>
                  </li>
                  <li>
                    <el-input size="mini" v-model="item.advicePrice"></el-input>
                  </li>
                  <li>
                    <el-input size="mini" v-model="item.stock"></el-input>
                  </li>
                  <li>
                    <el-input size="mini" v-model="item.sdkNum"></el-input>
                  </li>
                  <li>
                    <b>下架</b>
                    <b>默认</b>
                  </li>
                </dt>
              </dl>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="gry8">
          <i class="required">*</i>
          <span>SKU信息：</span>
          <div class="tank tankt">
            <div class="head1">
              <li>默认</li>
              <li>
                <i class="required">*</i>供货价/元</li>
              <li>建议销售价/元</li>
              <li>
                <i class="required">*</i>库存/件</li>
              <li>
                <i class="required">*</i>商品货号</li>
              <li>操作</li>
            </div>
            <div class="content1">
              <li>商品信息</li>
              <li>
                <el-input size="mini" v-model="specInfo.notHaveSpecType.supplyPrice"></el-input>
              </li>
              <li>
                <el-input size="mini" v-model="specInfo.notHaveSpecType.suggestPrice"></el-input>
              </li>
              <li>
                <el-input size="mini" v-model="specInfo.notHaveSpecType.stock"></el-input>
              </li>
              <li>
                <el-input size="mini" v-model="specInfo.notHaveSpecType.goodsNum"></el-input>
              </li>
              <li>
                <el-button style="width:auto">下架</el-button>
                <el-button>默认</el-button>
              </li>
              <div class="stock">
                在线总库存：10/15件
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="gry8">
        <el-button>销售申请</el-button>
        <el-button>存入草稿箱</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Steps,
  Step,
  Select,
  Input,
  Radio,
  Button,
  Upload,
  Option,
  radioGroup
} from "element-ui";
import { quillEditor } from "vue-quill-editor";
import api from "../../api/api";
// 引入store.js 管理状态
import store from "../../store";

export default {
  components: {
    "el-steps": Steps,
    "el-step": Step,
    "el-select": Select,
    "el-option": Option,
    "el-input": Input,
    "el-radio": Radio,
    "el-button": Button,
    "el-upload": Upload,
    quillEditor,
    "el-radio-group": radioGroup
  },
  data() {
    return {
      imgUrl: api.baseUrl + api.apiUrl.imgUrl, // 上传图片的接口地址，主要为上传商品图片使用
      basicInfo: {
        classifyFirstValue: "", // 第一级分类值
        classifySecondValue: "", // 第二级分类值
        goodsTitle: "", // 商品标题
        goodsId: "", // 商品ID
        goodsSpec: "", // 商品单位
        isPinkage: 1, // 是否包邮
        brandStory: "", // 品牌故事
        recommendedReason: "" // 推荐理由
      },
      // 基础信息暂时存储
      basicInfoStorage: {
        // 存储商品分类信息
        classify: {
          classifyFirst: [
            {
              value: "选项一",
              label: "生活用品"
            },
            {
              value: "选项二",
              label: "厨房用品"
            },
            {
              value: "选项三",
              label: "电器"
            }
          ],

          classifySecond: [
            {
              value: "选项一",
              label: "电风扇"
            },
            {
              value: "选项二",
              label: "微波炉"
            },
            {
              value: "选项三",
              label: "席梦思"
            }
          ]
        },
        goodsSpecList: [
          {
            value: "选项一",
            label: "斤"
          },
          {
            value: "选项二",
            label: "箱"
          },
          {
            value: "选项三",
            label: "米"
          }
        ]
      },
      // 图片信息
      imgInfo: {
        goodsMainImg: "", // 商品主图
        goodsMainVideo: "", // 商品视频
        goodsDescription: "" // 商品描述
      },
      // 规格信息
      specInfo: {
        specType: 0, // 规格类型
        haveSpecType: {
          specList: [
            {
              specName: "填充字段", // 规格名称
              specDetail: [{
                specValue: "11", // 规格值
                specImg: "" // 规格图片
              },
              {
                specValue: "11", // 规格值
                specImg: "" // 规格图片
              }]
            },
            {
              specName: "", // 规格名称
              specDetail: [{
                specValue: "", // 规格值
                specImg: "" // 规格图片
              },
              {
                specValue: "", // 规格值
                specImg: "" // 规格图片
              }]
            }
          ], // 规格名称表格
          skuInfo: {
            supplyPrice: "1", // 供货价
            skuList:[{
            },
            {

            }],
          }// Sku信息
        }, // 有商品规格
        notHaveSpecType: {
          supplyPrice: "1", // 供货价
          suggestPrice: "1", // 建议销售价
          stock: "1", // 库存
          goodsNum: "1" // 货号
        } // 没有商品规格
      },

      // content: "",

      curSpc: {}, // 暂时存储规格图片对象
      editorOption: {}, // 富文本编辑器的对象
    };
  },
  computed: {
    havSpec() {
      let boo = this.specInfo.specType == 0 ? false : true;
      return boo;
    },
    skuList() {
      let arr1 = this.specInfo.haveSpecType.specList[0].specDetail;
      let arr2 = this.specInfo.haveSpecType.specList[1].specDetail;
      let temp = [];
      if (arr2.length == 0 || this.specInfo.haveSpecType.specList[1].specValue == "") {
        arr1.map(item => {
          temp.push({
            spec1: item.specValue,
            spec2: "",
            img: item.specImg,
            supplePrice: "",
            advicePrice: "",
            stock: "",
            sdkNum: "",
            saling: false
          });
        });
      } else {
        arr1.map(item => {
          arr2.map(jtem => {
            temp.push({
              spec1: item.specValue,
              spec2: jtem.specValue,
              img: item.specImg,
              supplePrice: "",
              advicePrice: "",
              stock: "",
              sdkNum: "",
              saling: false
            });
          });
        });
      }
      return temp;
    },
    imgHeader() {
      return {
        authorization: store.state.token
      };
    }
  },
  methods: {
    deletey(arr, i) {
      arr.splice(i, 1);
    },
    addspecV(obj) {
      obj.specDetail.push({ specValue: "", specImg: "" });
    },
    clear(it) {
      it.specImg = "";
    },
    picchange(it, file) {
      this.curSpc.specImg = it.url;
    },
    handleRemove() {},
    onEditorReady() {},
    // 选择平台分类
    selectGoodsList() {
      console.log(1);
      this.axios.get(api.apiUrl.selectGoodsList).then(res => {});
    }
  },
  mounted() {}
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
      margin-left: 72px;
    }
  }
  .el-select:nth-of-type(2) {
    margin-left: 40px;
  }
  .el-input {
    width: 400px;
  }
  .step-one {
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

