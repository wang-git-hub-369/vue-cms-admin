import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
Vue.use(VueRouter)
//页面级组件
import Layout from '@/components/Layout.vue'
const routes = [
	//配置路由
	{
		path: '/login',
		alias: '/', //别名,是为了在主页上显示 
		name: 'Login',
		component: () => import( /* webpackChunkName: "about" */ '@/views/Login.vue'),
		meta: { requiresAuth: false }// 路由元信息,判断是否登录授权

		// route level code-splitting ---路由层级的代码拆分
		// this generates a separate chunk (about.[hash].js) for this route ---生成一个单独的代码块
		// which is lazy-loaded when the route is visited. ---/当路由被访问时延迟加载。
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import( /* webpackChunkName: "about" */ '@/views/Register.vue'),
		meta: { requiresAuth: false }// 路由元信息,判断是否登录授权
	},
	{
		path: '/article/',
		name: 'Article',
		component: Layout,
		meta: { requiresAuth: true },// 路由元信息,判断是否登录授权
		//代表他的下一级路由
		children: [{
				path: 'list',
				name: 'ArticleList',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Article/List.vue'),
			},
			{
				path: 'release',
				name: 'ArticleRelease',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Article/Release.vue'),
			},
			{
				path: 'edit/:id',
				name: 'ArticleEdit',
				props:true,//解耦
				component: () => import( /* webpackChunkName: "about" */ '@/views/Article/Edit.vue'),
			}
		]
	},
	{
		path: '/admin/',
		name: 'Admin',
		component: Layout,
		meta: { requiresAuth: true },// 路由元信息,判断是否登录授权
		//代表他的下一级路由
		children: [{
				path: 'list',
				name: 'AdminList',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Admin/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'AdminEdit',
				component: () => import( /* webpackChunkName: "about" */ '@/views/Admin/Edit.vue'),
				props: true, //对应管理员修改页面的解耦
			},
		]
	},
	{
		path: '/user/',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },// 路由元信息,判断是否登录授权
		//代表他的下一级路由
		children: [{
				path: 'list',
				name: 'UserList',
				component: () => import( /* webpackChunkName: "about" */ '@/views/User/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'UserEdit',
				component: () => import( /* webpackChunkName: "about" */ '@/views/User/Edit.vue')
			},
			{
				path: 'shuttle',
				name: 'Shuttle',
				component: () => import( /* webpackChunkName: "about" */ '@/views/User/Shuttle.vue')
			},
		]
	},
	{
		path: '/jurisdiction/',
		name: 'Jurisdiction',
		component: Layout,
		meta: { requiresAuth: true },// 路由元信息,判断是否登录授权
		//代表他的下一级路由
		children: [{
			path: 'list',
			name: 'JurisdictionList',
			component: () => import( /* webpackChunkName: "about" */ '@/views/Jurisdiction/List.vue')
		}]
	},
	{
		path: '/account/',
		name: 'Account',
		component: Layout,
		meta: { requiresAuth: true },// 路由元信息,判断是否登录授权
		//代表他的下一级路由
		children: [{
			path: 'edit',
			name: 'AccountEdit',
			component: () => import( /* webpackChunkName: "about" */ '@/views/Account/Edit.vue')
		}]
	},
	{
		path: '/classify/',
		name: 'Classify',
		component: Layout,
		//代表他的下一级路由
		children: [{
			path: 'list',
			name: 'ClassifyList',
			component: () => import( /* webpackChunkName: "about" */ '@/views/Classify/List.vue')
		}]
	},
]
//生成一个实例
const router = new VueRouter({
	routes
})

//配置全局守卫
router.beforeEach((to, from, next) => { //三个参数to: Route: 即将要进入的目标路由对象 from: 
//Route: 当前导航正要离开的路由 next: Function: 一定要调用该方法来 resolve 这个钩子。
	//console.log(to.matched)  打印to.matched,本质是一个数组
	//校验该地址,根据meta元信息,校验路由是否需要授权
	//console.log(to)
	let isRequiresAuth = to.matched.some((path) => path.meta.requiresAuth);
	//如果不需要登录授权,直接放行即可
	if(!isRequiresAuth){
		next();
		return;
	}
	//校验token
	//提取token
	let token = sessionStorage.token;
	//有token,立即放行
	if (token) {
		next(); //放行
		return;
	}
	//没有token,强制跳转登录页面
	Message.error('无效的token,请重新登录');
	setTimeout(() => {
		next(`/login?redirect=${to.path}`);//to.path ==登录页面
	}, 2000)

})
export default router
