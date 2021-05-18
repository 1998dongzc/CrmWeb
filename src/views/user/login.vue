<template>
  <div>
    <h1 class="headTitle">机房管理系统</h1>
    <el-form class="form" ref="form" :model="form" :rules="rules">
      <h1 class="title">登录界面</h1>

      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号" @keyup.enter="login"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"
                  @keyup.enter="login"></el-input>
      </el-form-item>

      <el-form-item></el-form-item>

      <el-form-item>
        <el-button style="width: 100%" type="success" :loading="loading" @click="login">登录</el-button>

        <div style="text-align: right;font-size: 40px">
          <router-link to="/signUp" style="font-size: 20px">
            注册账号
          </router-link>
        </div>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {login, getInfo} from "@/api/user";
  import {isLogin, setToken, setUserInfo} from "../../utils/localStauts";


  export default {
    name: "index",
    data() {
      return {
        loading: false,
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {min: 5, max: 12, message: '账号长度为 5 到 12 位', trigger: 'blur'},
            {required: true,message: '账号不能为空', trigger: 'blur'},
          ],
          password: [
            {min: 5, message: '密码长度不少于5位', trigger: 'blur'},
            {required: true, message: '密码不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    created() {
      if (isLogin()) {
        this.$router.replace("/index/userInfo")
      }
    },
    methods: {
      login() {
        this.loading = true
        //表单验证
        this.$refs.form.validate((valid) => {
          if (valid) {
            login(this.form).then(res => {
              setToken(res.data.token);
              getInfo().then(res => {
                setUserInfo(JSON.stringify(res.data))
                this.$router.push("/index/userInfo")
              })
            }).catch(e => {
              this.loading = false
            })
          } else {
            this.loading = false
            return false;
          }
        });

      },
    }
  }
</script>

<style scoped>
  .form {
    margin: 0 auto;
    text-align: center;
    border: 2px solid #EBEEF5;
    padding: 50px;
    height: 30%;
    width: 40%;
    border-radius: 20px;
    box-shadow: 0px 0px 20px #EBEEF5;
  }

  .title {
    text-align: center;
  }

  .headTitle {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    text-align: center;
  }


</style>
