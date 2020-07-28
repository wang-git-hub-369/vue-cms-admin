<template>
	<div class="header">
		<div class="navbar"><img src="../assets/img/logo.png" alt=""></div>
		<div class="header-icon">
			<i class="el-icon-s-fold"></i>
		</div>
		<div class="header-title">
			<el-dropdown>
			  <span class="el-dropdown-link">
				  <el-avatar size='small' src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
				  <span>赵薇</span>
			    <i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>黄金糕</el-dropdown-item>
			    <el-dropdown-item>狮子头</el-dropdown-item>
			    <el-dropdown-item>螺蛳粉</el-dropdown-item>
			    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
			    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>

</template>

<script>
	
</script>

<style>
	.header {
		background-color: black;
		color: white;
		height: 100%;
		line-height: 55px;
		display: flex;
	}
	.header {
		margin-left: -20px;
		margin-right: -20px;
	}

	.navbar img {
		height: 55px;
	}

	.header-title {
		position: absolute;
		right: 0;
		width: 110px;
		margin-right: 50px;
	}
	.el-dropdown-link span{
		color: white;
	}
	.el-avatar{
		position: absolute;
		top: 13px;
		right: 60px;
	}
</style>
