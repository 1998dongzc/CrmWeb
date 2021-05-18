<template>
  <el-table
    v-loading:loading
    :header-cell-style="{background:'#909399',color:'white'}"
    :data="logs"
    v-loading="loading"
    :max-height="maxHeight"
    border
  >
    <el-table-column
      prop="uid"
      label="用户ID"
      :width="tblWitdh">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户姓名"
      :width="tblWitdh">
    </el-table-column>
    <el-table-column
      :width="tblWitdh"
      label="结果">
      <template slot-scope="scope">
        <el-link type="success" v-if="scope.row.status==1">请求成功</el-link>
        <el-link type="danger" v-else>请求失败</el-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="method"
      label="操作"
      :width="tblWitdh">
    </el-table-column>
    <el-table-column
      prop="args"
      label="参数"
      :width="tblWitdh">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="时间"
      :width="tblWitdh">
    </el-table-column>
  </el-table>
</template>

<script>
  import {getAllOpsLogs} from "../../api/log";

  export default {
    name: "OpsLogs",
    data() {
      return{
        tblWitdh:window.innerWidth*0.15,
        loading:true,
        logs:[],
        maxHeight: window.innerHeight * 0.95,
      }
    },created() {
      this.fetchLogs()
    },
    methods:{
      fetchLogs(){
        getAllOpsLogs().then(res=>{
          this.logs=res.data
          this.loading=false
        }).catch(e=>{
          this.loading=false
        })
      }
    }
  }
</script>

<style scoped>

</style>
