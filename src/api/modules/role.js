import axios from 'axios'

// 角色列表
let list = (data) => axios.get('/role/list', { params: data });
//添加角色
let insert = (data) => axios.post('/role',data);
// /role/:id,
//删除角色 
let remove = (id) => axios.delete(`/role/${id}`);//delete风格的传递参数要使用模板字符串`/role/${id}`
//编辑角色
let edit = (id,data) => axios.put(`/role/${id}`,data);
export default{
	list,
	insert,
	remove,
	edit,
}