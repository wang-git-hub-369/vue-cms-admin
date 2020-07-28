<template>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column label="用户列表">
			<el-table-column prop="id" label="#" width="70">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="180">
			</el-table-column>
			<el-table-column prop="nickname" label="昵称">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机">
			</el-table-column>
			<el-table-column prop="address" label="操作">
				<template slot-scope='scope'>
					<el-link :href="`#/user/edit/${scope.row.id}`">
						<el-button type="primary" size="mini" plain class="editBtn"><i class="el-icon-edit"></i>编辑</el-button>
					</el-link>
					<el-button type="danger" size="mini" plain @click="romoveModal(scope.row.id,scope.$index)"><i class="el-icon-delete"></i>删除</el-button>
				</template>
			</el-table-column>
		</el-table-column>
	</el-table>
</template>

<script>
	import { User } from '@/api/index'
	export default {
		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex === 3) {
					return 'success-row';
				}
				return '';
			}
		},
		data() {
			return {
				tableData: []
			}
		},
		created() {
			//获取列表数据,调用加载数据方法
			this.loadList();
		},
		methods: {
			async loadList() {
				//解构我们需要的数据
				let { status, data } = await User.user({}); //根据api文档，管理员列表不需要传值
				//获取成功
				if (status) {
					//把data赋值
					this.tableData = data;
				} else {

				}
			},
			//删除用户
			romoveModal(id, i) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						//发送后台进行删除
						let { status } = await User.remove(id);
						if(status){
							this.tableData.splice(i,1);
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
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
	.editBtn {
		margin-right: 10px;
	}
</style>
