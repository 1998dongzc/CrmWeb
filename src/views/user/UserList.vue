<template>
  <el-table
    :header-cell-style="{background:'#909399',color:'white'}"
    :data="userlist"
    border
    :max-height="maxHeight"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      :width="bigTab">
    </el-table-column>
    <el-table-column
      prop="username"
      label="账号"
      :width="bigTab">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      :width="bigTab">
    </el-table-column>
    <el-table-column
      prop="department"
      label="院系"
      :width="bigTab">
    </el-table-column>
    <el-table-column
      prop="role"
      label="权限"
      :width="bigTab">
      <template slot-scope="scope">
        <el-button v-if="scope.row.username=='admin'" type="info" disabled>超级管理 无法修改</el-button>
        <el-radio-group v-else-if="scope.row.id!=localInfo.id" v-model="scope.row.role" @change="cahngeRole(scope.row)">
          <el-radio-button label="user"></el-radio-button>
          <el-radio-button label="admin"></el-radio-button>
        </el-radio-group>
        <el-button type="info" disabled v-else>当前帐号 无法修改</el-button>
      </template>
    </el-table-column>
    <el-table-column
      :width="bigTab"
      label="操作">
      <template slot-scope="scope">


        <el-popconfirm
          @confirm="resetUser(scope.row)"
          title="确定重置此用户的密码吗？"
        >
          <el-button slot="reference" type="warning" v-prevent-click>重置用户密码</el-button>
        </el-popconfirm>

      </template>
    </el-table-column>

    <el-table-column
      :width="bigTab"
      label="操作">
      <template slot-scope="scope">

        <el-button v-if="scope.row.username=='root'" type="info" disabled>无法删除</el-button>
        <el-button v-else-if="scope.row.id==localInfo.id" v-else type="info" disabled>无法删除</el-button>
        <el-popconfirm
          v-else
          @confirm="delUser(scope.row)"
          title="确定删除此用户吗？"
        >
          <el-button slot="reference" type="danger" v-prevent-click>删除用户</el-button>
        </el-popconfirm>

      </template>
    </el-table-column>


  </el-table>
</template>

<script>
  import {changeUserRole, delUser, getAllUser, updateUser} from "../../api/user";
  import {Message} from 'element-ui'
  import {getUserInfo} from "../../utils/localStauts";

  export default {
    name: "UserList",
    data() {
      return {
        localInfo: JSON.parse(getUserInfo()),
        bigTab: window.innerWidth * 0.15,
        maxHeight: window.innerHeight * 0.95,
        userlist: []
      }
    }, created() {
      this.fetchData()
    }, methods: {

      fetchData() {
        getAllUser().then(res => {
          this.userlist = res.data
        })
      },
      cahngeRole(row) {
        changeUserRole(row).then(res => {
          Message.success(res.message)
        })
      },
      delUser(row) {
        delUser(row.id).then(res => {
          Message.success(res.message);
          this.fetchData()
        })
      },
      resetUser(row) {
        console.log(row)
        row.password = '12345'
        updateUser(row).then(res => {
          Message.success(res.message);
        })
      }
    }
  }
</script>

<style scoped>

</style>
