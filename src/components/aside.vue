
<template>
	<div id="aside">
		<div class="logo">
			logo
		</div>
		<el-menu  :unique-opened="true" @open="openR" text-color="#fff">
			<el-submenu index="1">
				<template slot="title">
					订单管理
				</template>
				<el-menu-item index="1-1">商家姓名</el-menu-item>
				<el-menu-item index="1-2">商家姓名1</el-menu-item>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					订单管理
				</template>
				<el-menu-item index="2-1">商家姓名</el-menu-item>
				<el-menu-item index="2-2">商家姓名1</el-menu-item>
			</el-submenu>
			<el-menu-item index="3" >
				<span slot="title">导航三</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	import { Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui';
	export default{
		components:{
			'el-menu':Menu,
			'el-submenu':Submenu,
			'el-menu-item-group':MenuItemGroup,
			'el-menu-item':MenuItem
		},
		methods:{
			openR(index){
				console.log(index);
			}
		}
	}
</script>

<style lang="scss">
	#aside{
		background:#393f47;
		height:100%;
		width:176px;
		.logo{
			height:90px;
			color:#409eff;
		}
		.el-menu-item, .el-submenu__title{
			height:40px;
			line-height: 40px;
		}
		.is-opened .el-submenu__title{
			background: #409eff;
			color:#fff;
		}
		&>ul>li.el-menu-item,.el-submenu__title{
			background:#92a0ad80;
		}
		&>ul.el-menu{
			background: inherit;
			border:0;
		}
		&>ul>li{
			margin-bottom: 4px;
		}
		.el-menu{
			background: #393f47;
		}
		.el-submenu__title i{
			color:#fff;
		}
	}
</style>

