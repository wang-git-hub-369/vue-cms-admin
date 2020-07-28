<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑管理员</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="fullname">
				<el-input v-model="ruleForm.fullname"></el-input>
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
			<el-form-item label="头像">
				<Upload :url='ruleForm.avatar' @success="handleUploadSuccess($event)"  @remove="ruleForm.avatar=''"></Upload>
				<!-- data上传时携带的额外参数 -->
				<!-- <el-upload class="avatar-uploader" action="/upload/common/" :data="{type:'avatar'}" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload> -->
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>

</template>

<script>
	//引入上传组件
	import Upload from '@/components/Upload.vue';
	import { Admin } from '@/api/index'
	export default {
		props:['id'],
		//注册组件
		components: {
			Upload
		},
		data() {
			return {
				ruleForm: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					email: '',
					avatar: ''
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
				},
			};
		},
		created() {
			//调用获取管理员个人资料函数时，传参，这个参数是路由参数的id
			//this.loadInfo(this.$route.params.id)  //console.log(this.$route.params.id);
			//对上面的进行解耦，要先在路由接口，设置props=true,第二步$route.params被设置为组件属性--即48行代码，第三步再调用
			this.loadInfo(this.id)
		},
		watch:{
			//$route是路由对象，$router是路由实例
			'$route'(to,from){ //to，from两个参数，to是改变参数后的，from是之前的，就是从from-to
			//解构to里面的params属性---params: {id: "1"}--赋给id
			let {id}=to.params;
			//重新调用一下管理员个人资料，里面传递参数（id）
			this.loadInfo(id);
				//console.log(to);
				//console.log(from);
			}
		},
		methods: {
			//获取管理员的个人资料
			async loadInfo(id) {
				let { status, data } = await Admin.info({ id });
				if (status) {
					this.ruleForm = data;
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if (!valid) {
						return false;
					}
					 let{status,msg}=await Admin.edit({...this.ruleForm})
					 if(status){
						// 成功
						this.$message.success("修改成功");
						//延迟一秒后跳转回管理员列表
						setTimeout(()=>{
							this.$router.replace('/admin/list')
						},1000)
					 }else{
						 //失败
						 this.$message.error('修改失败')
					 }
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//头像上传成功 console.log(res)打印res,出来的是一个对象，对里面的属性进行解构
			handleUploadSuccess({status,msg,data}){
				this.ruleForm.avatar=data;
			},
		}
	}
</script>

<style>
</style>
