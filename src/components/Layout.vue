<template>
	<el-container>
		<!-- 头部 -->
		<el-header>
			<NavBar></NavBar>
		</el-header>
		<el-container>
			<!--菜单 -->
			<el-aside width="200px">
				<LeftMenu></LeftMenu>
			</el-aside>
			<!-- 内容 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	//注册局部组件
	import NavBar from '@/components/NavBar.vue';
	import LeftMenu from '@/components/LeftMenu.vue';
	export default {
		components: {
			NavBar,
			LeftMenu
		}
	}
</script>

<style>
	
</style>
