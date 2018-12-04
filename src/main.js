// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(ElementUI)
Vue.prototype.axios=axios

Vue.config.productionTip = false

/*登录路由验证*/
/*当要跳转页面，没有获取到有效的token--用户登录的标识 时，会跳转到登录页面*/
/*所以 当你点击修改密码页面，跳到了登录页面是因为这个原因*/
router.beforeEach((to, from, next) =>{
	let token = localStorage.getItem('token');
	if(to.path === '/Login'){
		next();
	}else{
		//需要登录权限且token等于空
		if(to.meta.reqiuresAuth && (token === null)){
			next({
				path:'/Login',
				query:{ redirect:to.fullPath }
			});
		}else{
			next();
		}
	}
})

/* axios请求头带token  拦截 */
axios.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	if(token){
		config.headers.Authorization = token;
	}
	return config
},error => {
	return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
