import Vue from 'vue'
import Router from 'vue-router'

// 登录页面
import Login from '@/pages/Login'

// 内容页
import xiwei from '@/pages/xiwei' 

//修改密码
import Main from '@/pages/Main'
import ModifyPassword from '@/pages/ModifyPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/xiwei'
    },
    {
    	path: '/Login',
    	name: 'Login',
    	component: Login
    },
    {
    	path: '/xiwei',
    	component: xiwei,
    	children: [
    	 // 这里可以放置不同的内容页,这里写了两个例子
    	 {path:'/', component: Main, meta:{ reqiuresAuth: true }},  //这个表示默认的主体内容页
    	 { path: '/ModifyPassword', name: 'ModifyPassword', component: ModifyPassword, meta:{ reqiuresAuth: true} },
    	]
    }
  ]
})
