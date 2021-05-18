<template>
  <el-container>

    <el-container>
      <el-aside width="200px" style="background-color: #545c64">
        <el-col style="text-align: left;font-size: 40px">
          <el-menu
            default-active="-2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item class="item" :index="item.index"  v-for="(item,index) in navTo" :key="item.index" @click="pageto(index)">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
            <el-menu-item class="item" @click="userout">
              <i class="el-icon-close"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>

  </el-container>
</template>

<style>
  html, body, #app, .el-container {
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 100%;
    padding: 0px;
    margin: 0px;
    height: 100%;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    padding: 0px;
    margin: 0px;
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0px;
    margin: 0px;
    height: 100%;
  }

  .item {
    width: 100%;
    height: 20%;
  }
</style>

<script>
  import router from '../../router'
  import {getUserInfo, isLogin, logout} from "../../utils/localStauts";

  let role = ''
  export default {
    data() {
      return {
        index:-2,
        navTo: {},
        info: {}
      }
    },
    created() {
      // 判断是否登录 未登录跳回首页
      if (!isLogin())
        this.$router.replace("/")

      let info = JSON.parse(getUserInfo())
      this.$message({
        message: '欢迎登录---' + info.name,
        type: 'success',
        duration: 2*1000
      });
      this.info = info
      role = info.role
      this.fetchRouter()
    },
    methods: {
      fetchRouter() {
        // 动态获取路由列表 根据权限动态展示 页面
        this.navTo = router.options.routes[2].children.filter(item => item.meta.role.includes(role))
      },
      pageto(index) {
        let rootPath = '/index/'
        this.$router.replace({path: rootPath + this.navTo[index].path})
      },
      userout() {
        logout()
        this.$router.replace("/")
      }
    }
  };
</script>
<style scoped>
</style>
