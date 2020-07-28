<template>
	<div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column label="管理员列表">
				<el-table-column prop="id" label="#" width="50">
				</el-table-column>
				<el-table-column prop="username" label="用户名">
				</el-table-column>
				<el-table-column prop="fullname" label="姓名">
				</el-table-column>
				<el-table-column prop="sex" label="性别">
				</el-table-column>
				<el-table-column prop="tel" label="手机">
				</el-table-column>
				<el-table-column prop="email" label="邮箱">
				</el-table-column>
				<el-table-column label="头像" width="150">
					<template scope='scope'>
						<img :src="scope.row.avatar" width="80" height="80" alt="">
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope='scope'>
						<!-- 使用模板字符串拼接,scope.row.id是传递的ID -->
						<el-link :href="`#/admin/edit/${scope.row.id}`">
							<el-button type="primary" size="mini" plain class="editBtn"><i class="el-icon-edit"></i>编辑</el-button>
						</el-link>
						<el-button type="danger" size="mini" plain @click='removeModal(scope.row.id,scope.$index)'><i class="el-icon-delete"></i>删除</el-button>
					</template>
				</el-table-column>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { Admin } from "@/api/index"
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
			async loadList() {
				//解构我们需要的数据
				let { status, data } = await Admin.list({});
				//获取成功
				if (status) {
					//把data赋值
					this.tableData = data;
				} else {

				}
			},
			removeModal(id, i) {
				this.$confirm('此操作将永久删除该管理员, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						//删除管理员
						let { status, data } = await Admin.remove({id:id});
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
	.editBtn {
		margin-right: 10px;
	}
</style>
