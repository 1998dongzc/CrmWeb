<template>
  <div style="height: 100%">
    <el-tabs type="border-card" style="height: 45%;">
      <el-tab-pane label="增加楼栋">
        <el-form label-width="80px" style="text-align: center;margin: 0 auto;width: 25%">
          <el-form-item label="楼栋名称">
            <el-input v-model="addBuildName" placeholder="请输入要增加的教学楼名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="addBuildLoading" type="primary" @click="addBuild">立即增加</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="删除楼栋">
        <el-table
          :header-cell-style="{background:'#8cc5ff',color:'white'}"
          :data="buildings"
          border
          max-height="350"
          style="width: 100%">
          <el-table-column
            prop="buildingName"
            label="楼栋"
            :width="bigTab">
          </el-table-column>
          <el-table-column
            :width="smallTab"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click.native="delBuild(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>

    <el-divider content-position="center">这是一条分割线</el-divider>

    <el-tabs type="border-card" style="height: 45%;">
      <el-tab-pane label="增加教室">

        查看教室
        <el-select v-model="bvalue" placeholder="请选择楼栋">
          <el-option
            v-for="item in buildings"
            @click.native="getRooms(item.id)"
            :key="item.id"
            :label="item.buildingName"
            :value="item.buildingName">
          </el-option>
        </el-select>

        <el-select v-model="rvalue" placeholder="教室号">
          <el-option
            v-for="item in rooms"
            :key="item.id"
            :label="item.roomName"
            :value="item.roomName">
          </el-option>
        </el-select>

        <el-form label-width="80px" style="text-align: center;margin: 0 auto;width: 25%;margin-top: 40px">
          <el-form-item label="教室号">
            <el-input v-model="addRoomName" placeholder="请输入要增加的教室名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="addRoomLoading" @click="addRoom">立即增加</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="删除教室">

        <el-select v-model="bvalue" placeholder="请选择楼栋">
          <el-option
            v-for="item in buildings"
            @click.native="getRooms(item.id)"
            :key="item.id"
            :label="item.buildingName"
            :value="item.buildingName">
          </el-option>
        </el-select>

        <el-table
          v-loading="roomTableloading"
          :header-cell-style="{background:'#8cc5ff',color:'white'}"
          :data="rooms"
          border
          max-height="350"
          style="width: 100%">
          <el-table-column
            prop="roomName"
            label="教室"
            :width="bigTab">
          </el-table-column>
          <el-table-column
            :width="smallTab"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click.native="delRoom(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {addBuild, addRoom, delBuild, delRoom, getBuidings, getRoomByBid} from "../../api/room";
  import {Message} from 'element-ui';

  export default {
    name: "index",
    data() {
      return {
        addBuildLoading: false,
        addRoomLoading: false,
        roomTableloading: false,
        bigTab: window.innerWidth * 0.6,
        smallTab: window.innerWidth * 0.25,
        buildings: [],
        rooms: [],
        addBuildName: '',
        addRoomName: '',
        bvalue: '',
        rvalue: '',
        //用于增加教室时获取楼栋iD
        bid: ''
      }
    }, created() {
      this.fetchBuild()
    }, methods: {
      delBuild(bid) {
        delBuild(bid).then(res => {
          Message.success(res.message)
          this.fetchBuild()
        })
      },
      addBuild() {
        this.addBuildLoading = true
        if (this.addBuildName === '') {
          Message.error("楼栋名称不可以为空")
          this.addBuildLoading = false
        } else {
          addBuild(this.addBuildName).then(res => {
            this.fetchBuild()
            this.addBuildLoading = false
            this.addBuildName = ''
            Message.success(res.message)
          }).catch(e => {
            this.addBuildLoading = false
          })
        }
      },
      delRoom(rid) {
        delRoom(rid).then(res => {
          Message.success("删除成功")
          this.getRooms(this.bid)
        })
      },
      addRoom() {
        this.addRoomLoading = true
        if (this.isRoomName() || this.addRoomName === '') {
          Message.error("当前教室已存在或者教室不能为空")
          this.addRoomLoading=false
        } else {
          addRoom(this.addRoomName, this.bid).then(res => {
            this.addRoomLoading=false
            Message.success(res.message)
            getRoomByBid(this.bid).then(res => {
              this.rooms = res.data
              this.addRoomName = ''
            })
          }).catch(e => {
            this.addRoomLoading = false
          })
        }
      },
      getRooms(bid) {
        this.roomTableloading=true
        this.bid = bid
        this.rvalue = ''
        getRoomByBid(bid).then(res => {
          this.roomTableloading=false
          this.rooms = res.data
        })
      },
      isRoomName() {
        var res = false;
        this.rooms.forEach(item => {
          if (item.roomName === this.addRoomName) {
            res = true;
          }
        })
        return res;
      }, fetchBuild() {
        getBuidings().then(res => {
          this.buildings = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
