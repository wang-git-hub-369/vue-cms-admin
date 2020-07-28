<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑用户</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="ruleForm.nickname"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="ruleForm.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机号" prop="tel">
				<el-input v-model="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { User } from '@/api/index'
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					nickname: '',
					sex: '',
					tel: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					fullname: [{
							required: true,
							message: '请输入昵称',
							trigger: 'change'
						},
						{
							min: 3,
							max: 8,
							message: '长度在 3 到 8 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
							required: true,
							message: '请填写手机号',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 11,
							message: '输入正确的手机号',
							trigger: 'blur'
						},
					]
				}
			};
		},
		created() {
			//调用获取用户个人资料函数时，传参，这个参数是路由参数的id
			this.loadInfo(this.$route.params.id);
			//console.log(this.$route.params.id);
		},
		methods: {
			async loadInfo(id) {
				let { status, data } = await User.info({ id })
				if (status) {
					this.ruleForm = data;
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {

					if (!valid) {
						return false;
					}                        
					let { status, data } = await User.edit(this.$route.params.id,{...this.ruleForm})//这里传递的id要是生命周期里面的id值
					if (status) {
						// 成功
						this.$message.success("修改成功")
						
					} else {
						// 成功
						this.$message.error("修改失败")
					}

				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>
