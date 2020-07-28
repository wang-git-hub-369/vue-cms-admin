<template>
	<el-table :data="tableData" border style="width: 100%">
		<el-table-column label="文章列表">
			<el-table-column prop="id" label="#" width="50">
			</el-table-column>
			<el-table-column prop="cate_1st_name" label="一级分类" width="120">
			</el-table-column>
			<el-table-column prop="cate_2nd_name" label="二级分类" width="120">
			</el-table-column>
			<el-table-column label="主图" width="160">
				<template scope='scope'>
					<!-- 如果在表格里面绑点事件，要借用scope.row后面跟着内容 -->
					<img width="100" height="80" :src="scope.row.main_photo" alt="">
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="240">
			</el-table-column>
			<el-table-column prop="create_time" label="发布日期">
			</el-table-column>
			<el-table-column prop="update_time" label="更新日期">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope='scope'>
				<el-link :href="`#/article/edit/${scope.row.id}`">
					<el-button type="primary" class="editButton" size="mini" plain><i class="el-icon-edit"></i>编辑</el-button>
				</el-link>
				<el-button type="danger" size="mini" plain @click='remove(scope.row.id,scope.$index)'><i class="el-icon-delete"></i>删除</el-button>	
				</template>
			</el-table-column>
		</el-table-column>
	</el-table>
</template>
<script>
	import { Article } from '@/api/index'
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			//获取列表数据,调用加载数据方法
			this.loadList();
		},
		methods: {
			//加载数据
			async loadList() {
				//解构我们需要的数据
				let { status,total,data} = await Article.list({ pagesize: 100, pageindex: 1 });
				//获取成功
				if(status){
					//把data赋值
					this.tableData=data;
				}else{
					
				}
			},
			 remove(id,i){
				this.$confirm('此操作将永久删除该文章, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						//删除文章
						let {status,data}=await Article.remove({id:id})
						if (status) {
							//更新Dom，更新页面
							this.tableData.splice(i, 1) //...data使用扩展运算符把data展开，push进去
							this.$message.success('删除成功');
						}
					})
					.catch(() => {
						this.$message.info('删除失败');
					})
			}
		}
	}
</script>

<style>
	.editButton{
		margin-right: 10px;
	}
</style>
