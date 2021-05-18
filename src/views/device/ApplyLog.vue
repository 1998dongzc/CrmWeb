<template>
  <div>
    <el-table
      v-loading:loading
      :header-cell-style="{background:'#909399',color:'white'}"
      :data="applyLog"
      v-loading="loading"
      border
      >
      <el-table-column
        prop="mess"
        label="内容"
        :width="bigWidth">
      </el-table-column>
      <el-table-column
        :width="smallWidth"
        label="结果">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status==1">同意</el-button>
          <el-button type="danger" v-else>拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  <footer>
    <el-button type="danger" @click="delLogs" :loading="delLoading">删除所有记录</el-button>
  </footer>
  </div>
</template>

<script>
  import {applyLog, delLogs} from "../../api/device";
  import {getUserInfo} from "../../utils/localStauts";

  export default {
    name: "ApplyLog",
    data() {
      return {
        bigWidth:window.innerWidth*0.8,
        smallWidth:window.innerWidth*0.1,
        delLoading:false,
        loading: true,
        applyLog: [],
        uid:JSON.parse(getUserInfo()).id
      }
    }, created() {
      applyLog(this.uid).then(res => {
        console.log(res)
        this.loading=false
        this.applyLog=res.data
      }).catch(e=>{
        this.loading=false
      })
    },
    methods: {
      delLogs(){
        this.delLoading=true
        delLogs(this.uid).then(res=>{
          applyLog(this.uid).then(res => {
            this.delLoading=false
            this.applyLog=res.data
          }).catch(e=>{
            this.delLoading=false
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
