<template>
	<div>
		<div class="page-title mb-16">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>修改密码</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-content">
			<el-card class="box-card mb-16 inp-middle" shadow="always">
				<el-form label-width="120px">
					<el-form-item label="原密码"> 
						<el-input type='password' v-model='params.originalPassword' style='width: 180px'></el-input>
					</el-form-item>
					<el-form-item label="新密码"> 
						<el-input type='password' v-model='params.newPassword' style='width: 180px'></el-input>
					</el-form-item>
					<el-form-item label="确认密码"> 
						<el-input type='password' v-model='params.repeatPassword' style='width: 180px'></el-input>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" class="el-icon-refresh" @click="handleSend">修改</el-button>
					</el-form-item>
				</el-form>	
			</el-card>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModifyPassword',
	data () {
		return {
			params:{
				originalPassword: '',
				newPassword: '',
				repeatPassword: ''
			}
		}
	},
	mounted(){
	},
	methods:{
		handleSend(){
			this.axios.post('/api/user/update/password', this.params).then((res) => {
				const data = res.data;   
				const msg = data.message;
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
