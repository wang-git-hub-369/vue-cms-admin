<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>发布文章</span>
		</div>
		<el-form ref="form" :rules="rules" :model="form" label-width="80px">
			<el-form-item label="标题" prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop='description'>
				<el-input v-model="form.description"></el-input>
			</el-form-item>
			<el-form-item label="分类">
				<el-col :span="6">
					<el-select v-model="form.cate_1st" placeholder="请选择文章一级分类">
						<el-option v-for="option in options_1st" :key='option.id' :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select v-model="form.cate_2nd" placeholder='请选择文章二级分类'>
						<el-option v-for="option in options_2nd " :key='option.id' :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
				</el-select>
			</el-form-item>
			<el-form-item label="主图" prop="main_photo">
				<Upload :url='form.main_photo' @success="handleUploadSuccess($event)" @remove="form.main_photo=''"></Upload>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<div ref="editor"></div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click='addHandle("form")' size="mini" plain>保存</el-button>
				<el-button type="primary" @click='cancel' size="mini" plain>取消</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import E from 'wangeditor';
	import { Category } from '@/api/index';
	import { Article } from '@/api/index';
	import Upload from '@/components/Upload.vue'; //引入组件
	export default {
		components: {
			Upload
		},
		data() {
			return {
				form: {
					title: '',
					description: '',
					cate_1st: '',
					cate_2nd: '',
					content: '',
					main_photo: ''
				},
				imageUrl: '',
				options_1st: [],
				options_2nd: [],
				rules: {
					title: [{
							required: true,
							type: 'string',
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 100,
							message: '长度在 1 到 100 个字符',
							trigger: 'blur'
						}
					],
					description: [{
							required: true,
							type: 'string',
							message: '请输入描述',
							trigger: 'blur'
						},
						// {
						// 	Pattern: /\S/,
						// 	message: '不能输入非空字符',
						// 	trigger: 'blur'
						// }
					],
					region: [
						{ required: true, message: '请选择分类', trigger: 'change' }
					],
					content: [
						{ required: true, message: '请填写内容', trigger: 'blur' }
					],
					main_photo: [
						{ required: true, message: '请上传图片', trigger: 'blur' }
					]
				}
			}
		},
		async created() {
			//页面开始加载，就获取一级分类的数据
			let options = await this.loadSubcate(0);
			//赋给一级分类的数组
			this.options_1st = options;
		},
		watch: {
			'form.cate_1st': async function(val) {
				//获取二级分类
				let options = await this.loadSubcate(val);
				//给二级分类数组赋值
				this.options_2nd = options;
				//根据一级分类的id自动选中二级分类的第一个值,默认选择第一项
				this.form.cate_2nd = options[0].id;
			}
		},
		mounted() {
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.content = html
			}
			//配置图片上传--对应api文档的接口
			editor.customConfig.uploadImgServer = '/upload/editor/';
			//配置上传的自定义 fileName
			editor.customConfig.uploadFileName = 'file';
			//配置自定义header头部信息，是为了添加一个token值
			editor.customConfig.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}`
			}
			//editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片

			editor.create()
		},
		methods: {
			//获取子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				//吧data return出去，在created生命周期调用，return出去的是一个promise对象
				return data
			},
			addHandle(form) {
				this.$refs[form].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false
					}
					let { status, data } = await Article.add({ ...this.form });
					if (status) {
						this.$message.success("发布成功");
						//跳转到文章列表
						this.$router.replace('/article/list')
					} else {
						this.$message.error('发布失败')
					}
				})
			},
			cancel(){
				this.$router.replace('/article/list')
			},
			//头像上传成功 console.log(res)打印res,出来的是一个对象，对里面的属性进行解构
			handleUploadSuccess({ status, msg, data }) {
				this.form.main_photo = data;
			},
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

	/* 上传图片 */
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	.right-classify{
		position: absolute;
		left: 530px;
		top: 261px;
	}
</style>
