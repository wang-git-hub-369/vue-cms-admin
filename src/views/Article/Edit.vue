<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑文章</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="标题">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="描述">
				<el-input v-model="form.description"></el-input>
			</el-form-item>
			<el-form-item label="分类">
				<el-col :span="6">
					<el-select v-model="form.cate_1st" @change="handleCate_1stChange" placeholder="请选择文章一级分类">
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
			<el-form-item label="主图">
				<Upload :url='form.main_photo' @success="handleUploadSuccess($event)" @remove="form.main_photo=''"></Upload>
			</el-form-item>
			<el-form-item label="内容">
				<div ref="editor"></div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" plain @click='saveArticle'>保存</el-button>
				<el-button type="primary" @click='cancel' size="mini" plain>取消</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import E from 'wangeditor';
	import { Article } from '@/api/index';
	import { Category } from '@/api/index';
	import Upload from '@/components/Upload.vue'; //引入组件
	export default {
		props: ['id'], //对应路由接口的解耦
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
			}
		},
		async mounted() {
			//获取一级分类
			this.options_1st = await this.loadSubcate(0);
			//获取文章详情
			let article = await this.loadInfo(this.id);
			this.form = article;
			//获取二级分类--传的参数是文章详情里面的一级分类id
			this.options_2nd = await this.loadSubcate(article.cate_1st);
			//富文本编辑器
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.content = html
			}
			editor.create()
			editor.txt.html(this.form.content)
		},
		methods: {
			//获取编辑指定ID文章
			async loadInfo(id) {
				let { status, data } = await Article.detail({ id });
				if (status) {
					return data
				}
			},
			//获取子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				//吧data return出去，return出去的是一个promise对象
				if (status) {
					return data
				}
			},
			//一级分类的change事件，实现二级联动
			async handleCate_1stChange(val) {
				//console.log(value)这里的value值等于父级分类的id
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				//选中子分类的第一项
				this.form.cate_2nd = options[0].id;
			},
			async saveArticle() {
				let { status, data } = await Article.edit({ ...this.form })
				if(status){
					this.$message.success('修改成功');
					setTimeout(()=>{
						this.$router.replace('/article/list')
					},1000)
				}else{
					this.$message.error('修改失败');
				}
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
</style>
