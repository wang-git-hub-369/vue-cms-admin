<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="管理员角色">
				<el-table-column prop="id" label="#">
				</el-table-column>
				<el-table-column label="分类">
					<template slot-scope='scope'>
						<el-tag>{{scope.row.name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="操作">
					<template slot-scope='scope'>
						<el-button type="primary" size="mini" plain @click="editModal(scope.row,scope.$index)"><i class="el-icon-edit"></i>编辑</el-button>
						<!-- @click='removeModal(scope.row.id,scope.$index)' 绑定删除弹出框，传递参数，第一个是ID,第二个scope.$index是索引 -->
						<el-button type="danger" size="mini" plain @click='removeModal(scope.row.id,scope.$index)'><i class="el-icon-delete"></i>删除</el-button>
					</template>
				</el-table-column>
			</el-table-column>
		</el-table>
		<el-button type="primary" @click='openInsertModal' class="jurisdiction-icon" size="mini" plain><i class="el-icon-circle-plus-outline"></i>添加角色</el-button>
	</div>
</template>

<script>
	import { Role } from '@/api/index'
	export default {
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
			},
			async loadList() {
				//解构我们需要的数据
				let { status, data } = await Role.list({});
				//获取成功
				if (status) {
					//把data赋值
					this.tableData = data;
				} else {

				}
			},
			//添加角色
			openInsertModal() {
				//弹出框
				this.$prompt('请输入添加的角色名称', '添加角色', {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白字符'
					})
					.then(async ({ value }) => {
						let { status, data } = await Role.insert({ name: value });
						if (status) {
							//更新Dom，更新页面
							this.tableData.push({ name: value, ...data }) //...data使用扩展运算符把data展开，push进去
							this.$message.success('添加成功');
						}
					})
					.catch(() => {
						this.$message.info('取消添加');
					})
			},
			//删除角色,获取ID与索引
			removeModal(id, i) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						// //删除角色
						let { status } = await Role.remove(id)
						if (status) {
							//更新Dom，更新页面
							this.tableData.splice(i, 1) //...data使用扩展运算符把data展开，push进去
							this.$message.success('删除成功');
						}
					})
					.catch(() => {
						this.$message.info('删除失败');
					})
			},
			//修改的角色
			editModal(row, i) {
				this.$prompt('请输入要修改的角色名称', {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白字符',
						inputValue: row.name,
					})
					.then(async ({ value }) => {
						// //修改角色
						var name = row.name
						let { status, data } = await Role.edit(row.id, { name: value })
						if (status) {
							//更新Dom，更新页面
							row.name=value;
							this.$message.success('修改成功');
						}
					})
					.catch(() => {
						this.$message.info('修改失败');
					})
			}

		},
	}
</script>

<style>
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

	.jurisdiction-icon {
		position: absolute;
		right: 70px;
		top: 90px;
	}
</style>
