<template>
  <el-form class="form-box" ref="form" :model="form" label-width="80px">
    <el-form-item label="设备名称">
      <el-input v-model="form.deviceName" maxlength="10" show-word-limit placeholder="请输入设备名称"></el-input>
    </el-form-item>
    <el-form-item label="教学楼">
      <el-select v-model="buidling" placeholder="请选择输入教室号">
        <el-option :label="item.buildingName" :value="item.id" @click.native="getRooms(item.id)" v-for="(item,index) in buildings" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="教室号">
      <el-select v-model="room" placeholder="请选择输入教室号">
        <el-option :label="item.roomName" :value="item.id" @click.native="formId(item.id)" v-for="(item,index) in rooms" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-radio v-model="form.status" label="0">计算机设备</el-radio>
      <el-radio v-model="form.status" label="-1">普通设备</el-radio>
    </el-form-item>
    <el-form-item label="设备数量">
      <el-input-number v-model="num" :min="1" :max="100" label="增加数量"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="commit">增加</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
  import {getBuidings,getRoomByBid} from "../../api/room";
  import {addDevice, apply} from "../../api/device";

  export default {
    name: "addDevice",
    data() {
      return {
        loading:false,
        buildings: [],
        rooms:[],
        room:'',
        buidling:'',
        form:{
          deviceName:'',
          deviceRoomId:'',
          status:''
        },
        num:1,
      }
    },
    created() {
      getBuidings().then(res => {
        console.log(res.data)
        this.buildings=res.data
      })
    },
    methods:{
      getRooms(bid){
        this.rooms=[]
        this.room=""
        getRoomByBid(bid).then(res=>{
          this.rooms=res.data
        })
      },
      formId(id){
        this.form.deviceRoomId=id
      },
      commit(){
        this.loading=true
        if(this.form.deviceName!==''&&this.room!==''&&this.form.status!==''){
          addDevice(this.form,this.num).then(res=>{
            this.loading=false
            this.$message({
              message: res.message,
              type: 'success'
            });
          }).catch(e=>{
            this.loading=false
          })
        }else{
          this.loading=false
          this.$message({
            type: "error",
            message: '数据不可以为空'
          })
        }

      },
    }
  }
</script>

<style scoped>
.form-box{
  border-radius: 50px;
  margin: 150px auto;
  width: 400px;
  text-align: left;
}
</style>
