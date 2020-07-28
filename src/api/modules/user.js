import axios from 'axios'
//用户列表
let user = (data) => axios.get('/user/list', { params: data });
//删除用户
let remove = (id) => axios.delete(`/user/${id}`) //delete风格的传递参数要使用模板字符串`/user/${id}`

//获取用户个人资料
let info = (data) => axios.get('/user/', { params: data });
//编辑用户
let edit = (id, data) => axios.put(`/user/${id}`, data)
export default {
	user,
	remove,
	info,
	edit,
}
