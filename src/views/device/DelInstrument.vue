<template>
  <div style="height: 100%">
    <div style="height: 4%">
      <el-button type="danger" @click="deleteEvent()" :loading="delLoading">批量删除</el-button>
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

      <el-link @click="reset" type="primary">重置</el-link>
    </div>
    <div>
      <el-table
        v-loading="loading"
        :header-cell-style="{background:'black',color:'white'}"
        border
        :data="devices"
        style="width: 100%"
        :height="winHeight"
        :width="winWidth"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          :width="idWitdh">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称"
          :width="tblWitdh">
        </el-table-column>
        <el-table-column
          prop="roomName"
          :width="tblWitdh"
          label="楼栋">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          :width="tblWitdh"
          label="教室">
        </el-table-column>
        <el-table-column
          :width="tblWitdh"
          prop="ip"
          label="IP地址">
        </el-table-column>
        <el-table-column
          :width="tblWitdh"
          label="修改IP">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status>=0" @click="setIp(scope.row)">修改IP</el-button>
            <el-button v-else type="text">普通设备</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
  import {allDevices, delDevice, setDeviceIp} from "../../api/device";
  import {getBuidings} from "@/api/room"
  import {Message} from 'element-ui'
  import {getRoomByBid} from "../../api/room";

  export default {
    name: "DelInstrument",
    data() {
      return {
        idWidth: window.innerWidth * 0.1,
        tblWitdh: window.innerWidth * 0.17,
        loading: true,
        devices: [],
        formLabelWidth: '120px',
        multipleSelection: [],
        winHeight: window.innerHeight * 0.95,
        winWidth: window.innerWidth,
        alldevice: [],
        devices: [],
        rname: '',
        bname: '',
        isLock: '',
        selBuildings: [],
        selRooms: [],
        delLoading: false,
      }
    },
    created() {
      this.fetchDevices();
      this.getBuilding()
    },
    methods: {
      fetchDevices() {
        allDevices().then(res => {
          this.devices = res.data
          this.alldevice = res.data
          this.loading = false
        })
      },
      getBuilding() {
        getBuidings().then(res => {
          this.selBuildings = res.data
        })
      },
      deleteEvent() {
        if (this.multipleSelection.length == 0) {
          Message.info("未选择设备")
          return
        }
        this.delLoading = true
        delDevice(this.multipleSelection).then(res => {
          this.delLoading = false
          Message.success(res.message)
          this.devices = this.devices.filter(item => {
            if (this.multipleSelection.indexOf(item.id) == -1)
              return item
          })
          this.alldevice = this.alldevice.filter(item => {
            if (this.multipleSelection.indexOf(item.id) == -1)
              return item
          })
        }).catch(e => {
          this.delLoading = false
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = []
        val.forEach(item => {
          var index = this.multipleSelection.indexOf(item.id)
          if (index === -1)
            this.multipleSelection.push(item.id)
          else
            this.multipleSelection.splice(index, 1);
        })
        //数组去重
        this.multipleSelection = [...new Set(this.multipleSelection)]
      },

      setIp(row) {
        this.$prompt('请输入IP地址', 'Id:' + row.id + ' 设备:' + row.deviceName, {
          inputValue: row.ip,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([1-9]))\.(((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([0-9]))\.){2}((2[0-4][0-9])|(25[0-5])|(1[0-9]{0,2})|([1-9][0-9])|([1-9]))$/,
          inputErrorMessage: 'IP格式不正确'
        }).then(({value}) => {
          if (value != row.ip) {
            setDeviceIp(row.id, value).then(res => {
              row.ip = value
              Message.success(res.message)
              this.updatePage()
            })
          }
        })
      },
      filterBuildings(bid) {
        this.isLock = ''
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
        this.isLock = ''
        this.devices = this.alldevice
        this.devices = this.devices.filter(item => {
          if (item.roomName == this.rname && item.buildingName == this.bname)
            return item
        })
      },

      reset() {
        this.rooms = ''
        this.bname = ''
        this.rname = ''
        this.devices = this.alldevice
      },
      updatePage() {
        this.alldevice = this.devices
      }

    }
  }
</script>

<style scoped>
</style>
