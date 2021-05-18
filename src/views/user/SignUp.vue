<template>
  <div>
    <el-form class="form" ref="form" :model="form" :rules="rules">
      <h1 class="title">注册界面</h1>

      <el-form-item label="用户账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入你的姓名"></el-input>
      </el-form-item>
      <el-form-item label="输入密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpassword">
        <el-input type="password" v-model="form.checkpassword" placeholder="请再次确认密码" show-password></el-input>
      </el-form-item>

      <el-form-item></el-form-item>

      <el-form-item>
        <el-button style="width: 100%" type="success" :loading="loading" @click.native="signup">注册</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/">
          <el-link type="success" style="width: 48%;text-align: left">返回登录</el-link>
        </router-link>
        <el-link type="danger" @click.native="exit" style="width: 48%;text-align: right">退出系统</el-link>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {setToken, setUserInfo} from "../../utils/localStauts";
  import {signUp} from "../../api/user";
  import {Message} from "element-ui"

  export default {
    name: "SignUp",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length<5) {
          callback(new Error('密码不得少于5位'))
        } else {
          if (this.form.checkpassword !== '') {
            this.$refs.form.validateField('checkpassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        loading:false,
        form: {
          username: '',
          password: '',
          checkpassword: '',
          name: ''
        },
        rules: {
          username: [
            {max: 12, min: 5, message: '账号长度为 5 到 12 位', trigger: 'blur'},
            {required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            {validator: validatePass, trigger: 'blur'},
          ],
          name: [
            {min: 2, message: '姓名不得少于 2 位', trigger: 'blur'},
            {required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          checkpassword: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    }, methods: {
      signup() {
        this.loading=true
        //表单验证
        this.$refs.form.validate((valid) => {
          if (valid) {
            signUp(this.form).then(res => {
              Message.success("注册成功")
              this.loading=false
              this.$router.push("/")
            }).catch(e=>{
              this.loading=false
            })
          } else {
            this.loading=false
            return false;
          }
        });
      },
      exit() {
        window.location.href = "http://www.baidu.com";
      }
    }
  }
</script>

<style scoped>
  .form {
    margin: 0 auto;
    text-align: center;
    height: 400px;
    width: 580px;
  }

</style>
