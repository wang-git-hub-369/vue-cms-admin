<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件   -->
			<el-tree ref="tree" node-key="id" :load="loadNode" lazy :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" icon="el-icon-edit" @click.stop='openEditModal(node,data)' :disabled="node.level==1" size="mini">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-plus" @click.stop='openInserModal(node,data)' size="mini">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" @click.stop='openRemoveModal(node,data)' size="mini">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleInsertNode">添 加</el-button>
				<!--handleInsertNode添加节点  -->
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleUpdateNode">保 存</el-button>
			</div>
		</el-dialog>
		<!-- 删除弹框 -->
	</div>
</template>

<script>
	import { Category } from '@/api/index'
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					parent_id: '',
				},
				editForm: {
					id: '',
					name: '',
					parent_id: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点 是为了转存数据
				insertModalShow: false,
				editModalShow: false,
			};
		},
		methods: {
			//加载子树数据的方法，仅当 lazy 属性为true 时生效
			async loadNode(node, resolve) { //node代表节点对象，resolve用来返回下一级子节点数据的方法
				console.log(resolve);
				if (node.level == 0) {
					return resolve([{ id: 0, name: '全部分类' }])
				}
				//console.log(node);
				//父级节点Id
				let { id } = node.data;
				//获取子节点数据
				let { status, data } = await Category.subcate({ id });
				if (status) {
					//生成子节点
					return resolve(data);
				}
			},
			//打开修改弹框
			openEditModal(node, data) {
				//...data生成一个新的值，赋给editFrom
				this.editForm = { ...data };
				this.node = node; //转存一下父节点的node,是为了在下面可以使用父节点的node数据
				console.log(node.id)
				//打开修改弹框
				this.editModalShow = true;
			},
			//打开添加弹框
			openInserModal(node, data) {
				//node--代表节点对象，data---代表节点数据
				console.log(node, data)
				this.node = node; //转存一下父节点的node,是为了在下面可以使用父节点的node
				//this.nodeData=data;
				this.insertForm.parent_id = data.id;
				this.insertModalShow = true;
			},
			//插入节点
			async handleInsertNode() {
				//1.表单验证
				//2.发送ajax
				let { status, msg, data } = await Category.addcate({ ...this.insertForm });
				if (status) {
					//提醒添加成功
					this.$message.success(msg);
					//更新tree节点---插入新的节点
					//this.$refs.tree调用tree方法 this.node是调用上面转存的父节点的node属性
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node)
					//清空模态框
					this.insertForm = {
						name: '',
						parent_id: '',
					};
					//关闭模态框
					this.insertModalShow = false;
				}
			},
			//编辑节点
			async handleUpdateNode() {
				let { status, msg, data } = await Category.edit({ ...this.editForm });
				if (status) {
					//提醒修改成功
					this.$message.success(msg);
					//更新节点
					this.node.data = this.editForm; //这里的this.nodeData是上面转存起来的数据
					//清空模态框
					this.editForm = {
						id: '',
						name: '',
						parent_id: '',
					};
					//关闭模态框
					this.editModalShow = false;
				}
			},
			//打开删除弹框
			openRemoveModal(node,data) {
				this.$confirm('此操作将永久删除该分类, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						var id = this.node.id
						//发送给后台进行删除
						let { status,msg} = await Category.remove({ ...data});
						if (status) {
							this.$message.success(msg);
							//更新页面
							this.$refs.tree.remove({...data})
						}

					})
					.catch(() => {
						this.$message.info(msg);
					});
			}
		}
	};
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
