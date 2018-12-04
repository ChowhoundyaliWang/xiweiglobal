<template>
	<div>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<el-form label-width="120px">
				    <!-- 写一些注册的表单，看需要什么数据显示什么数据了 -->
					<el-form-item label="用户名"> 
						<el-input type='password' v-model='params.username' style='width: 180px'></el-input>
					</el-form-item>
					<el-form-item label="手机号"> 
						<el-input type='password' v-model='params.phone' style='width: 180px'></el-input>
					</el-form-item>
					<el-form-item label="密码"> 
						<el-input type='password' v-model='params.password' style='width: 180px'></el-input>
					</el-form-item>
					<el-form-item label="确认密码"> 
						<el-input type='password' v-model='params.repeatPassword' style='width: 180px'></el-input>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" class="el-icon-refresh" @click="handleRegister">注册</el-button>
					</el-form-item>
				</el-form>	
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Register',
	data () {
		return {
			params:{
				username: '',
				phone: '',
				password: '',
				repeatPassword: ''
			}
		}
	},
	mounted(){
	},
	methods:{
		handleRegister(){
			// 提交注册表单
			this.axios.post('这里是你的注册用户接口地址', this.params).then((res) => {
				const data = res.data;   
				const msg = data.message;
				// 注册信息返回处理
				if(data.code == 200){
					this.$alert("修改成功！",'提示',{
						confirmButtonText:'确定',
						callback: action => {
							this.$router.push({
								path:'/cmp'
							});
						}
					}).catch(()=>{

					})
				}else{
					this.$alert(msg,'错误提示');
				}
			})
		}
	}
}
</script>

<style scoped>
/* .page-content .box-card{ width: 440px;color:#48576a;} */
</style>
