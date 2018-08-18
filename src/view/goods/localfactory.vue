<template>
  <div id="fatory">
    <!-- 头部查询条件 -->
    <div class="head">
      <div class="head1">
        <el-input clearable v-model="paramsData.goodsName" size="mini" placeholder="商品标题"></el-input>
        <el-input clearable v-model="paramsData.goodsId" size="mini" placeholder="商品ID"></el-input>
        <el-input clearable v-model="paramsData.productNo" size="mini" placeholder="商品货号"></el-input>
        <el-select v-model="classify.catIdsFirst" size="mini" placeholder="请选择一级分类" clearable @change="changeSelect">
          <el-option v-for="(item,index) in classify.classifyFirst" :key="index" :label="item.catName" :value="item.catId">
          </el-option>
        </el-select>
        <el-select v-model="classify.catIdsSecond" size="mini" placeholder="二级分类" clearable @focus.stop="selectGoodsList(true)">
          <el-option v-for="(item,index) in classify.classifySecond" :key="index" :label="item.catName" :value="item.catId">
          </el-option>
        </el-select>
      </div>
      <el-button size="mini" @click="findLocalGoods">查询</el-button>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <!-- 表格内容 -->
    <div class="content">
      <!-- 表格头部 -->
      <div class="optbar">
        <li @click="changeStatus(1)" :class="paramsData.status==1?'selected':''">待审核({{statusCount[0]}})</li>
        <li @click="changeStatus(-1)" :class="paramsData.status==-1?'selected':''">审核驳回({{statusCount[1]}})</li>
        <li @click="changeStatus(-2)" :class="paramsData.status==-2?'selected':''">强制下架({{statusCount[2]}})</li>
        <li @click="changeStatus('isDrafts')" :class="paramsData.isDrafts==1?'selected':''">草稿箱({{statusCount[3]}})</li>
        <li @click="changeStatus('')" :class="paramsData.status==''&&paramsData.isDrafts==0?'selected':''">全部({{statusCount[4]}})</li>
        <li>
          <router-link to="/goods/add">新增</router-link>
        </li>
      </div>
      <!-- 表格数据 -->
      <el-table border :data="tableData" style="width:100%" @select="handleSelectionChange"  @select-all="handleSelectionChange" :header-cell-style="getHead" ref="table">
        <el-table-column type="selection" width="55" >

        </el-table-column>
        <el-table-column label="商品信息" width="565">
          <template slot-scope="scope">
            <div class="container">
              <div class="png">
                <img :src="imgUrl+scope.row.goodsImg" alt="" title="商品图片">
              </div>
              <div class="info">
                <p>【商品标题】{{scope.row.goodsName}}</p>
                <p>【商品ID】{{scope.row.goodsId}}</p>
                <p>【平台分类】{{scope.row.catNamePath}}</p>
                <p class="specW" @click="watchSkuList(scope.row)">查看规格</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="marketsPrice" label="供货价/元">

        </el-table-column>
        <el-table-column prop="saleValue" label="销量">

        </el-table-column>
        <el-table-column prop="sumStock" label="库存/件">

        </el-table-column>
        <el-table-column prop="alertTime" label="更新时间">

        </el-table-column>
        <el-table-column label="商品状态">
          <template slot-scope="scope">
            <p v-if="scope.row.goodsStatus==1&&scope.row.isDrafts==0">待审核</p>
            <p v-else-if="scope.row.goodsStatus==-1&&scope.row.isDrafts==0">审核驳回
              <i class="el-icon-question notice" :reason="scope.row.rejectCause" @click.stop="checkReason('rejectCause',$event)"></i>
            </p>
            <p v-else-if="scope.row.goodsStatus==-2&&scope.row.isDrafts==0">强制下架
              <i class="el-icon-question notice" @click.stop="checkReason('forciblySoldoutCause',$event)" :reason="scope.row.forciblySoldoutCause"></i>
            </p>
            <p v-else-if="scope.row.goodsStatus==0&&scope.row.isDrafts==0">/
            </p>
            <div v-else-if="scope.row.isDrafts==1">
              <p>草稿箱</p>
              <p>
                <strong class="notice" v-if="scope.row.goodsStatus==''">空</strong>
                <strong class="notice" v-else-if="scope.row.goodsStatus==0">取消申请</strong>
                <strong class="notice" v-else-if="scope.row.goodsStatus==-1">审核驳回</strong>
                <strong class="notice" v-else-if="scope.row.goodsStatus==-2">强制下架</strong>
                <strong class="notice" v-else-if="scope.row.goodsStatus==-3">售罄</strong>
                <strong class="notice" v-else-if="scope.row.goodsStatus==-4">下架</strong>
              </p>
            </div>
            <p v-else>/</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 待审核 -->
            <div v-if="scope.row.goodsStatus==1&&scope.row.isDrafts==0">
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,0)">取消申请</el-button>
              </p>
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,'delete')">删除</el-button>
              </p>
            </div>
            <!-- 审核驳回 -->
            <div v-else-if="scope.row.goodsStatus==-1&&scope.row.isDrafts==0">
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,'change')">修改</el-button>
              </p>
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,'delete')">删除</el-button>
              </p>
            </div>
            <!-- 强制下架 -->
            <div v-else-if="scope.row.goodsStatus==-2&&scope.row.isDrafts==0">
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,'change')">修改</el-button>
              </p>
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,'delete')">删除</el-button>
              </p>
            </div>
            <!-- 取消申请，无状态时 -->
            <div v-else-if="scope.row.goodsStatus==0&&scope.row.isDrafts==0">
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,1)">销售申请</el-button>
              </p>
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,'change')">修改</el-button>
              </p>
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,'delete')">删除</el-button>
              </p>
            </div>
            <!-- 草稿箱 -->
            <div v-else-if="scope.row.isDrafts==1&&scope.row.goodsStatus==''">
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,1)">销售申请</el-button>
              </p>
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,'change')">修改</el-button>
              </p>
              <p>
                <el-button type="text" size="small" @click="handleChange(scope.row,'delete')">删除</el-button>
              </p>
            </div>
            <div v-else>
              <p>空</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 左下角的按钮 -->
      <div class="bot_bar">
        <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
        <!-- 待审核 -->
        <el-button size="mini" v-if="paramsData.status==1&&paramsData.isDrafts==0" @click="handleChangeAll('cancel')">取消申请</el-button>
        <!-- 强制下架 -->
        <el-button size="mini" v-else-if="paramsData.status==-2&&paramsData.isDrafts==0" @click="handleChangeAll('apply')">销售申请</el-button>
        <!-- 草稿箱 -->
        <el-button size="mini" v-else-if="paramsData.isDrafts==1" @click="handleChangeAll('apply')">销售申请</el-button>
        <el-button size="mini" @click="handleChangeAll('delete')">删除</el-button>
        <!-- 分页 -->
        <el-pagination layout="prev, pager, next" :total="pageArgument.total" :page-count="pageArgument.totalPage" :page-size="paramsData.pagesize" :current-page.sync="currentPage" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <!-- 查看规格的内容 -->
    <el-dialog title="SKU信息" :visible.sync="dialogTableVisible">
      <el-table :data="specInfo.gridData" :header-cell-style="getHead">
        <el-table-column property="iteamName[0]" :label="specInfo.tableTitle[0]">
          <!-- <template slot-scope="scope">
            <div calss="spec-img">
              <img src="" alt="">
            </div>
          </template> -->
        </el-table-column>
        <el-table-column property="iteamName[1]" :label="specInfo.tableTitle[1]">
        </el-table-column>

        <el-table-column property="marketsPrice" label="供货价/元" width="200"></el-table-column>
        <el-table-column property="salesPrice" label="建议销售价/元" width="200"></el-table-column>
        <el-table-column property="stock" label="库存" width="150"></el-table-column>
        <el-table-column property="saleValue" label="销量" width="200"></el-table-column>
        <el-table-column property="productNum" label="商品货号"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- sku是 上架+默认 状态-->
            <div v-if="scope.row.isDown==0&&scope.row.isDefault==1">
              <el-button type="text" size="small" @click="handleStatus(scope.row,scope.row.productNum,1,scope.row.isDefault)">下架</el-button>
              <el-button type="text" size="small" disabled>已默认</el-button>
            </div>
            <!-- sku是 上架+非默认 状态-->
            <div v-if="scope.row.isDown==0&&scope.row.isDefault==0">
              <el-button type="text" size="small" @click="handleStatus(scope.row,scope.row.productNum,1,scope.row.isDefault)">下架</el-button>
              <el-button type="text" size="small" @click="handleStatus(scope.row,scope.row.productNum,scope.row.isDown,1)">默认</el-button>
            </div>
            <!--sku是 下架 状态-->
            <div v-if="scope.row.isDown==1">
              <el-button type="text" size="small" @click="handleStatus(scope.row,scope.row.productNum,0,scope.row.isDefault)">上架</el-button>
              <el-button type="text" size="small" disabled>已下架</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  Input,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Checkbox,
  Pagination,
  Dialog,
  Message,
  MessageBox
} from "element-ui";
import api from "../../api/api";
export default {
  components: {
    "el-input": Input,
    "el-select": Select,
    "el-option": Option,
    "el-button": Button,
    "el-table": Table,
    "el-checkbox": Checkbox,
    "el-pagination": Pagination,
    "el-dialog": Dialog,
    "el-table-column": TableColumn,
    "el-message": Message,
    "el-message-box": MessageBox
  },
  data() {
    return {
      imgUrl: api.baseUrl, // 图片url前缀地址
      paramsData: {
        goodsName: "", // 商品标题
        goodsId: "", // 商品ID
        productNo: "", // 商品货号
        status: "", // 商品状态,2=审核通过,1=待审核,0=无状态,-1=审核驳回,-2=强制下架
        page: 0, // 第几页，默认第0页开始，实际传送页码
        pagesize: 20, // 每页的数量，默认为10
        isDrafts: 0, // 默认为0，点到草稿箱的时候为1
        catIds: "" // 商品分类，一级分类与二级分类用“_”拼接
      }, // 发送给后台的参数
      // 存储商品分类信息
      classify: {
        catIdsFirst: "", // 分类一的ID，两个分类拼接
        catIdsSecond: "", // 分类二的ID，两个分类拼接
        classifyFirst: [
          // {
          //   catId: "370",
          //   catName: "生活用品"
          // },
        ], // 暂时存储分类一的数据
        classifySecond: [
          // {
          //   catId: "11",
          //   catName: "电风扇"
          // },
        ] // 暂时存储分类二的数据
      },
      dialogTableVisible: false, // 控制是否显示规格
      value: "",
      options: [],
      checked: false,
      // 页码参数
      pageArgument: {
        // total: 30,
        // totalPage: 2
      }, // 总页面和总数据的参数
      statusCount: [], // 分类数据数量统计
      currentPage: 1, // 当前页
      // 商品表的存储数据
      tableData: [
        // {
        //   goodsImg: "", // 图片地址，目前为空
        //   goodsName: // 商品名称
        //     "满哪儿2015秋款韩版长袖连衣裙5秋款韩版长袖连衣裙5秋款韩版长袖连衣裙5秋款韩版长袖连衣裙5秋款韩版长袖连衣裙",
        //   goodsId: "20157682", // goodsId
        //   type: "美食》》茶与咖啡",
        //   marketPrice: "100.00", // 供货价
        //   saleValue: 10, // 销量，缺少字段
        //   inventoryNum: 400, // 库存
        //   updateTime: "2018-07-18 10:12:13", // 更新时间，缺少字段
        //   goodsStatus: "待审核" // 商品状态，缺少状态判断
        // },
      ],
      specInfo: {
        tableTitle: [],
        gridData: [
          {
            id: 153, // skuId
            marketsPrice: 11, // 供货价
            salesPrice: 12311, // 建议销售价
            stock: 11, // 库存
            saleValue: 1, // 销量
            productNum: 888853, // 商品货号
            iteamName: ["红色", "S"], // 规格名称,
            isDefault: 0, // 是否默认
            isDown: 0, // 是否下架
            skuImage: "" // sku图片
          }
        ]
      }, // 规格信息
      goodsIdArry: [] // 全选暂存的数组
    };
  },
  // 创建之前
  beforeMount() {
    // 默认请求一次数据
    this.axios
      .post(api.apiUrl.goods_findAllListBySearch, this.qs(this.paramsData))
      .then(res => {
        this.tableData = res.data.rows;
        this.pageArgument.total = res.data.total;
        this.pageArgument.totalPage = res.data.totalPage;
        this.statusCount = res.data.statusCount;
      })
      .catch(res => {});
  },
  mounted() {
    // 选择分类一默认发送请求一次填充
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
          this.classify.classifyFirst.push(newCat);
        }
      })
      .catch(error => {});
  },
  methods: {
    // 表格头部样式
    getHead() {
      return {
        "text-align": "center",
        "background-color": "#f8f8f8"
      };
    },
    // 选择平台分类的二级分类
    changeSelect() {
      // 修改时，需要先把里面的值清空
      this.axios
        .post(
          api.apiUrl.goods_classifyList,
          this.qs({
            catId: this.classify.catIdsFirst
          })
        )
        .then(res => {
          this.classify.classifySecond = [];
          for (var i = 0; i < res.data.length; i++) {
            const newCat = {
              catId: res.data[i].catId,
              catName: res.data[i].catName
            };
            this.classify.classifySecond.push(newCat);
          }
        })
        .catch(error => {});
    },
    // 修改一级分类
    selectGoodsList(params) {
      if (params) {
        this.axios
          .post(
            api.apiUrl.selectGoodsList,
            this.qs({
              catId: this.paramsData.catIdsFirst
            })
          )
          .then(res => {
            for (var i = 0; i < res.data.length; i++) {
              const newCat = {
                catId: res.data[i].catId,
                catName: res.data[i].catName
              };
              this.classify.classifySecond.push(newCat);
            }
          })
          .catch(error => {});
      } else {
        this.axios
          .post(
            api.apiUrl.selectGoodsList,
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
              this.classify.classifyFirst.push(newCat);
            }
          })
          .catch(error => {});
      }
    },
    // 查询列表
    findLocalGoods() {
      // 初始化页码设置
      this.paramsData.page = 0;
      this.currentPage = 1;
      // 如果存在，则进行拼接
      this.paramsData.catIds = ""; // 先进行清空
      if (this.classify.catIdsFirst && this.classify.catIdsSecond) {
        this.paramsData.catIds =
          this.classify.catIdsFirst + "_" + this.classify.catIdsSecond; // 分类ID拼接
      } else if (this.classify.catIdsFirst && !this.classify.catIdsSecond) {
        this.paramsData.catIds = this.classify.catIdsFirst;
      }
      this.axios
        .post(api.apiUrl.goods_findAllListBySearch, this.qs(this.paramsData))
        .then(res => {
          this.tableData = res.data.rows;
          this.pageArgument.total = res.data.total;
          this.pageArgument.totalPage = res.data.totalPage;
          this.statusCount = res.data.statusCount;
        })
        .catch(res => {});
    },
    // 修改查询的状态
    changeStatus(paramsDataStatus) {
      // 初始化页码设置
      this.paramsData.page = 0;
      this.currentPage = 1;
      if (
        (paramsDataStatus == 1 || -1 || -2 || "") &&
        paramsDataStatus !== "isDrafts"
      ) {
        this.paramsData.isDrafts = 0;
        this.paramsData.status = paramsDataStatus;
        this.axios
          .post(api.apiUrl.goods_findAllListBySearch, this.qs(this.paramsData))
          .then(res => {
            this.tableData = res.data.rows;
            this.pageArgument.total = res.data.total;
            this.pageArgument.totalPage = res.data.totalPage;
          })
          .catch(res => {});
      } else if (paramsDataStatus == "isDrafts") {
        this.paramsData.status = "";
        this.paramsData.isDrafts = 1;
        this.axios
          .post(api.apiUrl.goods_findAllListBySearch, this.qs(this.paramsData))
          .then(res => {
            this.tableData = res.data.rows;
            this.pageArgument.total = res.data.total;
            this.pageArgument.totalPage = res.data.totalPage;
          })
          .catch(res => {});
      }
    },
    // 分页改变当前页
    handleCurrentChange(val) {
      this.paramsData.page = this.currentPage - 1;
      // 默认请求一次
      this.axios
        .post(api.apiUrl.goods_findAllListBySearch, this.qs(this.paramsData))
        .then(res => {
          this.tableData = res.data.rows;
          this.pageArgument.total = res.data.total;
          this.pageArgument.totalPage = res.data.totalPage;
        })
        .catch(res => {});
    },
    // 单选变化时
    handleSelectionChange(selection, row) {
      console.log(selection)
      if (selection.length == this.tableData.length && selection.length != 0) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      // 先设为空，后一个个填充
      this.goodsIdArry = [];
      // 填充
      selection.forEach((item, index) => {
        this.goodsIdArry.push(item.goodsId);
      });
    },
    // 全选
    selectAll(val) {
      // 数组先进行清空
      this.goodsIdArry = [];
      if (val) {
        this.tableData.forEach(row => {
          this.goodsIdArry.push(row.goodsId);
          this.$refs.table.toggleRowSelection(row, true);
        });
      } else {
        // 如果是反选，则清空数组
        this.goodsIdArry = [];
        this.$refs.table.clearSelection();
      }
    },
    // 操作
    handleChange(row, param) {
      if ((param == 0 || 1) & (param !== "change") && param !== "delete") {
        // 取消申请
        this.axios
          .post(
            api.apiUrl.goods_local_changeGoodsStatus,
            this.qs({
              id: row.goodsId,
              status: param
            })
          )
          .then(res => {
            Message({
              type: "success",
              message: "修改成功",
              onClose: res => {
                this.findLocalGoods();
              }
            });
          })
          .catch(res => {});
      } else if (param == "change") {
        // 修改状态
        this.$router.push({ path: "/goods/add", query: { id: row.goodsId } });
      } else if (param == "delete") {
        // 删除商品
        this.axios
          .delete(api.apiUrl.goods_delete + "/" + row.goodsId)
          .then(res => {
            Message({
              type: "success",
              message: "删除成功",
              onClose: res => {
                this.findLocalGoods();
              }
            });
          })
          .catch(res => {});
      }
    },
    // 全部操作
    handleChangeAll(type) {
      let idList = "";
      this.goodsIdArry.forEach(item => {
        idList = item + "_" + idList;
      });
      idList = idList.substr(0, idList.length - 1);
      if (type == "delete") {
        this.axios
          .delete(api.apiUrl.goods_delete_all + "/" + idList)
          .then(res => {
            Message({
              type: "success",
              message: "删除成功",
              onClose: res => {
                this.findLocalGoods();
              }
            });
          })
          .catch(res => {});
      } else if (type == "cancel") {
        this.axios
          .post(api.apiUrl.goods_local_cancleOrApply,this.qs({
            ids:idList,
            status:0
          }))
          .then(res => {
            Message({
              type: "success",
              message: "取消成功",
              onClose: res => {
                this.findLocalGoods();
              }
            });
          })
          .catch(res => {});
      } else if (type == "apply") {
        this.axios
          .delete(api.apiUrl.goods_delete_all,this.qs({
            ids:idList,
            status:1
          }))
          .then(res => {
            Message({
              type: "success",
              message: "申请成功",
              onClose: res => {
                this.findLocalGoods();
              }
            });
          })
          .catch(res => {});
      }
    },
    // 查看审核驳回原因/强制下架原因
    checkReason(type, $event) {
      if (type == "rejectCause") {
        MessageBox.alert($event.target.getAttribute("reason"), {
          title: "驳回原因",
          confirmButtonText: "确认",
          type: "warning"
        });
      } else if (type == "forciblySoldoutCause") {
        MessageBox.alert($event.target.getAttribute("reason"), {
          title: "强制下架原因",
          confirmButtonText: "确认",
          type: "warning"
        });
      }
    },
    // 查看规格信息
    watchSkuList(row) {
      this.axios
        .get(api.apiUrl.goods_findSku + "/" + row.goodsId)
        .then(res => {
          this.specInfo.tableTitle = res.data.data.title;
          this.specInfo.gridData = res.data.data.list;
          this.dialogTableVisible = true;
        })
        .catch(res => {});
    },
    // 下架/默认状态
    handleStatus(row, productNum, isDown, isDefault) {
      this.axios
        .post(
          api.apiUrl.sku_local_changeStatus,
          this.qs({
            productNum: productNum,
            isDown: isDown,
            isDefault: isDefault
          })
        )
        .then(res => {
          console.log(res);
          this.watchSkuList(row);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/scss/color.scss";
#fatory {
  .head {
    text-align: left;
    padding: 35px 0;
    padding-left: 40px;
    .el-button {
      background: $themeC;
      color: #fff;
    }
  }

  .head1 {
    box-sizing: border-box;
    margin-bottom: 16px;
    & > .el-input,
    & > .el-select {
      width: 14%;
      margin-right: 24px;
    }
  }
  .line {
    height: 16px;
    background: $gray;
  }
  .content {
    padding: 20px 40px 0;
    .optbar {
      overflow: hidden;
      li {
        cursor: pointer;
        float: left;
        width: 124px;
        line-height: 36px;
        background: $gray;
        margin-right: 16px;
        font-size: 16px;
        &:last-child {
          float: right;
          margin: 0;
          width: 80px;
          line-height: 30px;
          background: $themeC;
          color: white;
          border-radius: 6px;
        }
        &.selected {
          background-color: $themeC;
          color: white;
        }
        a {
          color: white;
          text-decoration: none;
        }
      }
    }
    .container {
      margin: 18px 42px;
      display: flex;
      .info {
        flex: 1;
        margin-left: 6px;
      }
      p {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 366px;
        &:nth-of-type(4) {
          text-indent: 6px;
        }
      }
      .specW {
        color: $themeC;
        cursor: pointer;
      }
    }
    .notice {
      color: $emphasizeColor;
    }
    .png {
      width: 88px;
      background: $gray;
      height: 88px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .bot_bar {
    padding-bottom: 40px;
    label {
      line-height: 32px;
    }
    display: flex;
    margin-top: 16px;
    text-align: left;
    padding-left: 20px;
    .el-button {
      background: $gray;
      margin-left: 30px;
    }
    .el-pagination {
      margin: 0 auto;
    }
  }
  .el-dialog {
    width: 80%;
    .tank {
      display: flex;
      line-height: 36px;
      .png {
        width: 36px;
        height: 36px;
        background: red;
        margin-right: 6px;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .el-dialog__header {
    text-align: left;
  }
}
</style>

