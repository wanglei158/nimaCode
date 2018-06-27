
<template>
	<div id="aside">
		<div class="logo">
			COLORFUL
		</div>
		<el-menu  :unique-opened="true" @open="openR" active-text-color="#39b2e9" text-color="#fff" background-color="#4e5768">
			<el-submenu :index="(i+1).toString()" v-for="(item,i) in barList" :key="i">
				<template slot="title">
					{{item.name}}
				</template>
				<el-menu-item :index="(i+'-'+(j+1))" v-for="(jtem,j) in item.children" :key="j">{{jtem.name}}</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	import { Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui';
	export default{
		data(){
			return {
				barList:[
					{
						name:'订单管理',
						is_open:true,
						children:[
							{

							}
						]
					},
					{
						name:'商品管理',
						is_open:false,
						children:[
							{
								name:'新增商品',
								url:''	
							},
							{
								name:'本地仓库商品',
								url:''	
							},
							{
								name:'在线销售商品',
								url:''	
							},
							{
								name:'库存维护',
								url:''	
							},
							{
								name:'供货价维护',
								url:''	
							}
						]
					},
					{
						name:'分销管理',
						is_open:false,
						children:[
							{
								
							}
						]
					},
					{
						name:'结算管理',
						is_open:false,
						children:[
							{

							}
						]
					},
					{
						name:'自助服务',
						is_open:false,
						children:[
							{
								
							}
						]
					},
					{
						name:'基础信息',
						is_open:false,
						children:[
							{
								name:'商家信息',
								url:''	
							},
							{
								name:'修改密码',
								url:''	
							},
							{
								name:'在线联系',
								url:''	
							},
							{
								name:'关于平台',
								url:''	
							},
						]
					},
				]
			}
		},
		components:{
			'el-menu':Menu,
			'el-submenu':Submenu,
			'el-menu-item-group':MenuItemGroup,
			'el-menu-item':MenuItem
		},
		methods:{
			openR(index){
				// console.log(index);
			}
		}
	}
</script>

<style lang="scss">
	@import '@/assets/scss/color.scss';
	#aside{
		background:#393f47;
		height:100%;
		width:176px;
		.logo{
			line-height:90px;
			color:$themeC;
		}
		.el-menu-item, .el-submenu__title{
			height:40px;
			line-height: 40px;
		}
		&>.el-menu{
			border:0;
		}
	}
</style>

