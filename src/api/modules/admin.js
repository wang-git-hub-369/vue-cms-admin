//先引axios
import axios from 'axios';
//封装函数接口,需要哪个调用哪个
//登录,传递data参数
let login = (data) => axios.post('/admin/login', data);
//注册
let register = (data) => axios.post('/admin/register', data);
//获取管理员的个人资料,   get传递参数与post不同,需用params来包裹
let info = (data) => axios.get('/admin/info', { params: data });
//管理员列表
let list = (data) => axios.get('/admin/list', { params: data });
//删除管理员
let remove = (data) => axios.post('/admin/delete', data);
//编辑管理员
let edit = (data) => axios.post('/admin/info', data)
//传递出去,让别人可以使用
export default {
	login,
	register,
	info,
	list,
	remove,
	edit
}
