//先引axios
import axios from 'axios';
//获取所有分类
let list = (data) => axios.get('/category/list', { params: data });
//获取子级分类
let subcate = (data) => axios.get('/category/sub', { params: data });
//添加分类
let addcate = (data) => axios.post('/category/add', data);
//编辑指定id分类
let edit = (data) => axios.post('/category/edit', data);
//删除分类
let remove = (data) => axios.post('/category/delete', data);
export default {
	list,
	subcate,
	addcate,
	edit,
	remove,
}
