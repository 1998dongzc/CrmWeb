<template>

  <el-tabs v-model="activeName" style="height: 100%" type="border-card">
    <el-tab-pane label="个人信息" name="first">
      <el-form ref="form" class="box" :model="userInfo" label-width="80px">
        <el-form-item>
          <el-avatar :size="200" :src="userInfo.avatar"></el-avatar>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="自我描述">
          <el-input v-model="userInfo.introduction" placeholder="请用一段话描述自己吧" type="textarea" maxlength="30"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="所属院系">
          <el-input v-model="userInfo.department" placeholder="请输入所属院系" type="text"></el-input>
        </el-form-item>
        <el-form-item label="用户身份">
          <el-input disabled v-if="userInfo.role == 'user'" placeholder="普通用户"></el-input>
          <el-input disabled v-else-if="userInfo.role == 'admin'" placeholder="管理员"></el-input>
          <el-input disabled v-else placeholder="未设置角色 待管理员设置"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" :loading="infoLoading" @click.native="submitInfo">修改信息</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="账号密码" name="second">

      <el-form class="box" :rules="rules" ref="user" :model="user" label-width="80px">
        <el-form-item label="用户账号">
          <el-input v-model="user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改密码" prop="password">
          <el-input v-model="user.password" type="password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="secondpswd">
          <el-input v-model="user.secondpswd" type="password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" :loading="pswdLoading" @click.native="submitUser('user')">修改密码</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>


</template>

<script>
  import {getUserInfo, logout, setUserInfo} from "../../utils/localStauts";
  import {getUser, updateInfo, updateUser} from "../../api/user";

  export default {
    name: "UserInfo",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length<5) {
          callback(new Error('密码不得少于5位'))
        } else {
          if (this.user.secondpswd !== '') {
            this.$refs.user.validateField('secondpswd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        infoLoading:false,
        pswdLoading:false,
        activeName: 'first',
        userInfo: [],
        user: {
          id:'',
          username: '',
          password: '',
          secondpswd: ''
        },
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          secondpswd: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    }, created() {
      var info = JSON.parse(getUserInfo())
      this.userInfo = info
      getUser(info.id).then(res => {
        this.user.username = res.data.username
        this.user.id = res.data.id
      });
    }
    ,
    methods: {
      submitUser(formName) {
        this.pswdLoading=true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateUser(this.user).then(res=>{
              this.$message({
                type: 'success',
                message: res.message+" "+'请重新登录',
                duration: 5*1000
              })
              logout();
              this.$router.replace("/")
            }).catch(e=>{
              this.pswdLoading=false
            })
          } else {
            return false;
          }
        });
        this.pswdLoading=false
      },
      submitInfo(){
        this.infoLoading=true
        updateInfo(this.userInfo).then(res=>{
          this.infoLoading=false
          setUserInfo(JSON.stringify(this.userInfo))
          this.$message({
            type: 'success',
            message: res.message,
            duration: 5*1000
          })
        }).catch(e=>{
          this.infoLoading=false
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 30%;
    margin: 150px auto;
  }
</style>
