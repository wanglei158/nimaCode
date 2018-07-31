
<template>
	<div id="aside">
		<div class="logo">
			COLORFUL
		</div>
		<el-menu :unique-opened="true" active-text-color="#39b2e9" text-color="#fff" background-color="#354053">
			<el-submenu :index="(i+1).toString()" v-for="(item,i) in barList" :key="i">
				<template slot="title">
					{{item.name}}
				</template>
				<el-menu-item :index="(i+'-'+(j+1))" @click="jumpto(jtem.url)" v-for="(jtem,j) in item.children" :key="j">{{jtem.name}}</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
import { Menu, Submenu, MenuItemGroup, MenuItem,Message,MessageBox } from "element-ui";
export default {
  data() {
    return {
      barList: [
        {
          name: "订单管理",
          is_open: true,
          children: [{
            name:"暂无",
            url: ""
          },
          {
            name:"暂无",
            url: ""
          }]
        },
        {
          name: "商品管理",
          is_open: false,
          children: [
            {
              name: "新增商品",
              url: "/goods/add"
            },
            {
              name: "本地仓库商品",
              url: "/goods/factory"
            },
            {
              name: "在线销售商品",
              url: ""
            },
            {
              name: "库存维护",
              url: ""
            },
            {
              name: "供货价维护",
              url: ""
            }
          ]
        },
        {
          name: "分销管理",
          is_open: false,
          children: [{
            name:"暂无",
            url: ""
          },
          {
            name:"暂无",
            url: ""
          }]
        },
        {
          name: "结算管理",
          is_open: false,
          children: [{
            name:"暂无",
            url: ""
          },
          {
            name:"暂无",
            url: ""
          }]
        },
        {
          name: "自助服务",
          is_open: false,
          children: [{
            name:"暂无",
            url: ""
          },
          {
            name:"暂无",
            url: ""
          }]
        },
        {
          name: "基础信息",
          is_open: false,
          children: [
            {
              name: "商家信息",
              url: "/info/base"
            },
            {
              name: "修改密码",
              url: "/info/changepwd"
            },
            {
              name: "在线联系",
              url: ""
            },
            {
              name: "关于平台",
              url: ""
            }
          ]
        }
      ]
    };
  },
  components: {
    "el-menu": Menu,
    "el-submenu": Submenu,
    "el-menu-item-group": MenuItemGroup,
    "el-menu-item": MenuItem,
    "el-message-box": MessageBox,
    "el-message": Message,
  },
  methods: {
    jumpto(path) {
      console.log(path);
      if(!path){
        MessageBox({
          title:'暂无此页面',
          showClose: true,
          type:'warning',
          message:'功能还在开发中，请耐心等待一下...',
        });
        return;
      }
      this.$router.push({ path: path });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/color.scss";
#aside {
  background: $sidebg;
  height: 100%;
  width: 176px;
  .logo {
    line-height: 90px;
    color: $themeC;
    font-weight: 500;
    font-size: 24px;
  }

// 侧边栏设置
  .el-submenu {
    font-weight: 500; // 设置侧边栏自提的粗细
    margin-top: 5px;
    .el-submenu__title {
      background-color: $asideItembg !important;
      text-align: left;
      height: 40px;
      line-height: 40px;
    }
    .el-menu-item {
      text-align: left;
      height: 40px;
      line-height: 40px;
      min-width: 176px !important;
      padding: 0 0 0 20px !important;
    }
  }

  & > .el-menu {
    border: 0;
  }
}
</style>

