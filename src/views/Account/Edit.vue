<template>
	<div class="accountedit">
		<div class="header-edit">账户资料</div>
		<div class="titles">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="ruleForm.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="ruleForm.fullname"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="role">
					<el-select v-model="ruleForm.role">
						<el-option label="超级管理员" el-select value="shanghai"></el-option>
						<el-option label="普通管理员" value="beijing"></el-option>
					</el-select>
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
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="ruleForm.email"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop="main_pic">
					<!-- <div class="icon">
						<template scope='scope'>
							<img :src="scope.row.main_pic" width="80" height="80" alt="">
						</template>
					</div> -->
					<Upload :url='resetForm.avatar'></Upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	//引入外部封装上传图片组件
	import Upload from '@/components/Upload.vue';
	export default {
		//注册局部组件
		components: {
			Upload
		},
		data() {
			return {
				ruleForm: {
					username: 'admin',
					fullname: '赵薇',
					role: '',
					sex: '女',
					tel: '15863469872',
					email: 'nn880328@123.com',
					avatar: require('@/assets/img/11.jpg'),
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
					role: [{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}],
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
					],
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: ['blur', 'change']
						}
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
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
	.accountedit {
		background-color: white;
		border: 1px solid #999999;
		border-radius: 5px;
		margin-top: 5px;
	}

	.header-edit {
		background-color: white;
		color: #000000;
		border-bottom: 1px solid #999999;
		height: 30px;
		padding-left: 20px;
		line-height: 30px;
	}

	.titles {
		width: 1000px;
		padding-top: 20px;
		margin: 0 auto;
	}

	.icon {
		width: 150px;
		height: 150px;
		border: 1px solid #999999;
		position: relative;
	}

	.icon>span {
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 1;
		transform: translate(-50%, -50%);
		font-style: normal;
		font-size: 50px;
	}
</style>
