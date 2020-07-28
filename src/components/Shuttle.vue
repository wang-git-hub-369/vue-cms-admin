<template>
	<!-- <div>你好</div> -->
	<div class="Shuttle">
		<div id="box">
			<div class="header-box">
				<input type="checkbox" name="" id="" value="" v-model="checkedAll" />
				<span>列表1</span>
			</div>
			<div class="content-box" v-for="item in list">
				<span><input type="checkbox" name="" id="" value=""  v-model="item.checked" /></span>
				<span>
					{{item.name}}
				</span>
			</div>
		</div>
		<div class="box-content">
			<el-button type="primary" @click='clickLeft' icon="el-icon-caret-left"></el-button>
			<el-button type="primary" @click='clickRight' icon="el-icon-caret-right" ></el-button>
		</div>
		<div class="box-two">
			<div class="header-box">
				<input type="checkbox" name="" id="" value="" v-model="Allchecked"/>
				<span>列表2</span>
			</div>
			<div class="content-box" v-for="item in listone">
				<span><input type="checkbox" name="" id="" value="" v-model="item.checked" /></span>
				<span>
					{{item.name}}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['list','listone'],
		computed: {
			//全选功能
			checkedAll: {
				get: function() {
					var num = 0;
					this.list.forEach(function(item, index) {
						if (item.checked) {
							num++;
						}
					});
					return num == this.list.length;
				},
				set: function(newValue) {
					this.list.forEach(function(item, index) {
						item.checked = newValue;
					});
					// console.log(newValue); 返回的是true和false
				}
			},
			Allchecked: {
				get: function() {
					var num = 0;
					this.listone.forEach(function(item, index) {
						if (item.checked) {
							num++;
						}
					});
					return num == this.listone.length;
				},
				set: function(newValue) {
					this.listone.forEach(function(item, index) {
						item.checked = newValue;
					});
					// console.log(newValue); 返回的是true和false
				}
			}
		},
		methods:{
			clickRight(){
				//点击右箭头给父级传递一个指令
				this.$emit('right')
			},
			clickLeft(){
				//点击左箭头给父级传递一个指令
				this.$emit("left")
			}
		}
	}
</script>

<style>
	.Shuttle {
		width: 600px;
		display: flex;
		justify-content: space-between;
	}

	#box {
		width: 200px;
		border: 1px solid #E5E5E5;
	}

	.header-box {
		background-color: #F5F7FA;
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
	}

	.content-box {
		padding-left: 20px;
	}
	.box-two {
		width: 200px;
		border: 1px solid #E5E5E5;
	}
</style>
