<template>
  <div id="log">
    <div class="log-content">
      <h3>{{title}}</h3>
      <el-form :model="user" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" auto-complete="off" @keyup.enter.native='login()'></el-input>
        </el-form-item>
        <el-form-item label="" prop="password" class='remCheck'>
          <el-checkbox v-model='remFlag'>记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="primary" @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  //Login界面
  data(){
    return{
     title: '赵创的web项目',
      user:{
        userName:'',
        password:''
      },
      remFlag: false
    }
  },
  mounted(){
    this.getCookie();
  },
  methods:{
    login(){
      // 登录之前勾选记住密码，则执行记住密码操作
      if(this.remFlag){
        this.setCookie(this.user.userName, this.user.password, 7);
      }else{
        this.clearCookie();
      }

      let params = {};
      params = this.user;
      // 这里是发送登录请求，后台写好登录接口，把地址更换下
      this.axios.post("/api/login", params, { headers:{'Content-Type':'application/json;charset=UTF-8'} }).then((res)=>{
        let data = res.data;
        let msg = data.message;
        if(data.code == 200){
           let model = data.model;
           // 本地存储一些信息，不需要用就不必写
           localStorage.removeItem('token');
           localStorage.removeItem('userInfo');
           localStorage.setItem('token', model.token);
           localStorage.setItem('userInfo', JSON.stringify(model));
           let redirect = decodeURIComponent(this.$route.query.redirect||'');
           if (redirect) { 
             this.$router.push({path: redirect});  // 跳转到指定链接
           } else {
             this.$router.push({path: '/'});  //登录成功就跳转到主页
           }
        }else{
          //请求失败
          this.$alert(msg, '错误提示')
        }
      }).catch((res)=>{
        //请求异常处理
      })
    },
    register(){
      // 直接进入到注册页面
    },
    //设置cookie
    setCookie(username, pwd, exdays){
      let exdate = new Date();
      exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);
      window.document.cookie = 'username=' + username +';path=/;expires=' + exdate.toGMTString();
      window.document.cookie = 'password=' + pwd + ';path=/;expires=' + exdate.toGMTString();
    },
    //读取cookie
    getCookie(){
      if(document.cookie.length > 0){
        let arr = document.cookie.split(';');
        for(let i = 0, len = arr.length; i<len; i++){
          let arr2 = arr[i].split('=');
          if(arr2[0].trim() == 'username'){
            this.user.userName = arr2[1];
          }else if(arr2[0].trim() == 'password'){
            this.user.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie(){
      this.setCookie('', '', -1);
    }
  }
}
</script>

<style>
/* login 登录界面 */
#log{width: 100%; height: 100vh;background:url("../assets/login-bg.png") no-repeat;background-size: cover;padding-top:12%;box-sizing: border-box;}
.log-content{ width: 400px;height: 320px;border: 1px solid #f5f7f9;border-radius: 5px;background: transparent;color: #ffffff;margin-left: 50%; }
.log-content h3{text-align: center;margin:35px 0;font-size: 18px;}
.remCheck .el-form-item__content{ line-height: 14px; }
.remCheck .el-checkbox{ color:#fff;}
</style>