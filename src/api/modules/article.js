import axios from 'axios'
//获取文章列表   return出去的是promise
let list = (data) => axios.get('/article/list', { params: data });
//获取指定文章
let detail = (data) => axios.get('/article/detail', { params: data });
//发布文章
let add = (data) => axios.post('/article/add', data);
//删除文章
let remove = (data) => axios.post('/article/delete', data);
//编辑文章
let edit = (data) => axios.post('/article/edit', data);
export default {
	list,
	detail,
	add,
	remove,
	edit
}
