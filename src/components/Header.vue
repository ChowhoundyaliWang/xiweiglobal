<template>
  <div class="header">
    <div class="mx-log">
      <img src="../assets/logoMx.png" alt="Image Error!">
      <span class="mx-title">{{title}}</span>
    </div>
    <div class="userInfo">
      <el-dropdown trigger="click" @command='handleCommand'>
        <span class="el-dropdown-link name-span">
          {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- command 指令事件 -->
          <el-dropdown-item command='viewMessage'>我的消息</el-dropdown-item>
          <el-dropdown-item command='modifyPsw'>修改密码</el-dropdown-item>
          <el-dropdown-item command='logOut'>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

  <!-- 退出登录对话框 -->
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      title: '赵创的web项目',
      userInfo:{}
    }
  },
  mounted(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userInfo = userInfo;
  },
  methods:{
    handleCommand(command){
      if (command == 'viewMessage') {
        this.$router.push({
          name: 'ViewMessage'
        })
      };
      if(command == 'modifyPsw'){
        this.$router.push({
          name: 'ModifyPassword'
        })
      };
      if(command == 'logOut'){
        this.logOut();
      };
    },
    handleViewMsg(){

    },
    logOut(){
      // 退出登录前，关闭右下角通知
      let token = localStorage.getItem('token');
      let params = {};
      params.token = token;
      this.axios.post("/api/logout",params,{ headers:{'Content-Type':'application/json'} }).then((res)=>{
        let data = res.data;
        if(data.code == 200){
          localStorage.removeItem('token');
                    this.$router.push({path: '/Login'});
                }else{
                    //请求失败
                    console.log("请求失败");
                    this.$
                }
            }).catch((res)=>{
                //请求异常处理
            })
        }
  }
}
</script>

<style scoped>
.header{color: #ffffff; }
.header>div{display: inline-block;}
.mx-log img{height: 50px;padding: 5px 0;display: inline-block;margin-left: 14px;}
span.mx-title{ padding:0 32px;font-weight: 500;font-size: 23px;height: 60px;line-height: 60px;text-shadow: 1px 1px 2px #b1b5bb;display: inline-block;vertical-align: top;}
.userInfo{float: right;}
.userInfo .name-span{color: #ffffff;font-size: 18px;}
</style>
