<template>
  <div style="height: 100%">
    <div style="height: 5%">
      <el-select v-model="bname" placeholder="请选择教学楼">
        <el-option
          @click.native="filterBuildings(item.id)"
          v-for="item in selBuildings"
          :key="item.id"
          :label="item.buildingName"
          :value="item.buildingName">
        </el-option>
      </el-select>

      <el-select v-model="rname" placeholder="请选择教室号">
        <el-option
          @click.native="filterRooms()"
          v-for="item in selRooms"
          :key="item.id"
          :label="item.roomName"
          :value="item.roomName">
        </el-option>
      </el-select>

      <el-select v-model="isLock" @change="filterLock">
        <el-option
          label="上锁"
          value="1">
        </el-option>
        <el-option
          label="解锁"
          value="0">
        </el-option>
      </el-select>
      <el-link @click="reset" type="primary">重置</el-link>
    </div>
    <div>
      <el-table
        :header-cell-style="{background:'black',color:'white'}"
        v-loading="loading"
        :max-height="winHeight"
        :width="winWidth"
        border
        :data="devices"
        style="width: 100%">
        <el-table-column
          type="index"
          prop="id"
          label="id"
          :width="idWidth">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称"
          :width="width">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          :width="width"
          label="楼栋">
        </el-table-column>
        <el-table-column
          prop="roomName"
          :width="width"
          label="教室">
        </el-table-column>
        <el-table-column
          prop="ip"
          :width="width"
          label="IP地址">
        </el-table-column>
        <el-table-column
          :width="width"
          label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.ip==''">
              <el-button v-if="scope.row.status<0" type="text">普通设备</el-button>
              <el-button v-else type="info" disabled>无IP</el-button>
            </div>
            <div v-else>
              <el-button v-if="scope.row.status==0" type="success" @click="UnLock(scope.row)">解锁
              </el-button>
              <el-button v-if="scope.row.status==1" type="danger" @click="Lock(scope.row)">上锁
              </el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>

</template>

<script>
  import {allDevices, delDevice, deviceLock, deviceUnlock} from "../../api/device";
  import {getBuidings} from "@/api/room"
  import {getRoomByBid, getRooms} from "../../api/room";
  import {Message} from 'element-ui'

  export default {
    name: "DelInstrument",
    data() {
      return {
        idWidth:window.innerWidth*0.1,
        width: window.innerWidth * 0.17,
        winHeight: window.innerHeight * 0.94,
        winWidth: window.innerWidth,
        loading: true,
        selBuildings: [],
        selRooms: [],
        rooms: [],
        devices: [],
        alldevice: [],
        tdevice: [],
        rname: '',
        bname: '',
        isLock: ''
      }
    },
    created() {
      this.getBuilding()
      this.fetchDevices();
    },
    methods: {
      getBuilding() {
        getBuidings().then(res => {
          this.selBuildings = res.data
        })
      },
      fetchDevices() {
        allDevices().then(res => {
          this.devices = res.data
          this.alldevice = res.data
          this.loading = false
        }).catch(e => {
          this.loading = false
        })
      },
      Lock(row) {
        deviceLock(row).then(res => {
          Message.success(res.message);
          row.status = 0;
          this.alldevice=this.devices
        })
      },
      UnLock(row) {
        deviceUnlock(row).then(res => {
          Message.success(res.message);
          row.status = 1;
          this.alldevice=this.devices
        })
      },
      filterBuildings(bid) {
        this.isLock=''
        this.devices = this.alldevice
        this.devices = this.devices.filter(item => {
          if (item.buildingName == this.bname)
            return item
        })
        getRoomByBid(bid).then(res => {
          this.selRooms = res.data
        })
      },
      filterRooms() {
        this.isLock=''
        this.devices = this.alldevice
        this.devices = this.devices.filter(item => {
          if (item.roomName == this.rname && item.buildingName == this.bname)
            return item
        })
      },
      filterLock() {
        this.devices = this.alldevice
        if (this.bname !== '') {
          this.devices = this.devices.filter(item => {
            if (item.buildingName == this.bname)
              return item
          })
        }

        if (this.rname !== '') {
          this.devices = this.devices.filter(item => {
            if (item.roomName == this.rname && item.buildingName == this.bname)
              return item
          })
        }

        this.devices = this.devices.filter(item => {
          if (item.status != this.isLock&& item.ip!=='')
            return item
        })
      },
      reset() {
        this.rooms = ''
        this.bname = ''
        this.rname = ''
        this.devices = this.alldevice
      }
    }
  }
</script>

<style scoped>

</style>
