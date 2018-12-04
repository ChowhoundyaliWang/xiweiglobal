<template>
  <div id="xiwei">
    <!-- 布局 头部+内容 -->
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>  <!-- 这里显示不同的内容页，拿一个 修改密码页面 举例 -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name: 'xiwei',
  components:{ 
    Header
  },
  data(){
    return{
      
    }
  },
  mounted(){
     
  }
}
</script>

<style>
#xiwei {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
.el-header { background-color: #1f7ab7; color: #333;line-height: 60px; height: 100%;}
</style>
