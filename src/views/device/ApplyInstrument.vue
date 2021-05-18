<template>
  <el-form class="form-box" ref="form" :model="form" label-width="80px">
    <el-form-item label="设备名称">
      <el-input v-model="form.deviceName" maxlength="10" show-word-limit placeholder="请输入设备名称"></el-input>
    </el-form-item>
    <el-form-item label="教学楼">
      <el-select v-model="buidling" placeholder="请选择输入教室号">
        <el-option :label="item.buildingName" :value="item.id"
                   @click.native="getRooms(item.id),changeBName(item.buildingName)" v-for="(item,index) in buildings"
                   :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="教室号">
      <el-select v-model="room" placeholder="请选择输入教室号">
        <el-option :label="item.roomName" :value="item.id" @click.native="formId(item.id),changeRName(item.roomName)"
                   v-for="(item,index) in rooms" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-radio v-model="form.status" label="0">计算机设备</el-radio>
      <el-radio v-model="form.status" label="-1">普通设备</el-radio>
    </el-form-item>
    <el-form-item label="设备数量">
      <el-input-number v-model="form.num" :min="1" :max="100" label="增加数量"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="applyLoading" @click="commit" v-prevent-click>申请</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
  import {getBuidings, getRoomByBid} from "../../api/room";
  import {apply} from "../../api/device";
  import {getUserInfo} from "../../utils/localStauts";

  export default {
    name: "addDevice",
    data() {
      return {
        applyLoading:false,
        buildings: [],
        rooms: [],
        room: '',
        buidling: '',
        build: {
          roomname: '',
          buildingname: ''
        },
        form: {
          deviceName: '',
          deviceRoomId: '',
          localName: '',
          status: '',
          uid: 0,
          code: '',
          num: 1,
        },

      }
    },
    created() {
      let info = JSON.parse(getUserInfo())
      this.form.uid = info.id
      getBuidings().then(res => {
        this.buildings = res.data
      })
    },
    methods: {
      getRooms(bid) {
        this.rooms = []
        this.room = ""
        getRoomByBid(bid).then(res => {
          this.rooms = res.data
        })
      },
      formId(id) {
        this.form.deviceRoomId = id
      },
      changeBName(bname) {
        this.build.buildingname = bname
      },
      changeRName(rname) {
        this.build.roomname = rname
      },
      commit() {
        this.applyLoading=true
        this.form.localName = this.build.buildingname + ' ' + this.build.roomname
        this.form.code = this.form.status >= 0 ? 1 : -1;
        if(this.form.name!==''&&this.build.buildingname!==''&&this.build.roomname!==''&&this.form.status!==''){
          apply(this.form).then(res=>{
            this.applyLoading=false
            this.$message({
              type:"success",
              message:res.message,
              duration: 3*1000
            })
          }).catch(e=>{
            this.applyLoading=false
          })
        }else{
          this.applyLoading=false
          this.$message({
            type: "error",
            message: '数据不可以为空'
          })
        }
      }
    }
  }
</script>

<style scoped>
  .form-box {
    border-radius: 50px;
    margin: 150px auto;
    width: 400px;
    text-align: left;
  }
</style>
