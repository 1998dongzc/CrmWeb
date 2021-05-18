<template>
  <el-table
    :header-cell-style="{background:'#909399',color:'white'}"
    :data="applys"
    style="width: 100%"
    height="100%">
    <el-table-column
      prop="id"
      label="id"
      :width="tblWitdh">
    </el-table-column>
    <el-table-column
      prop="deviceName"
      label="设备名称"
      :width="tblWitdh">
    </el-table-column>
    <el-table-column
      prop="localName"
      :width="tblWitdh"
      label="教室">
    </el-table-column>
    <el-table-column
      :width="tblWitdh"
      prop="name"
      label="用户">
    </el-table-column>
    <el-table-column
      prop="createTime"
      :width="tblWitdh"
      label="时间">
    </el-table-column>
    <el-table-column
      prop="num"
      :width="tblWitdh"
      label="数量">
    </el-table-column>
    <el-table-column
      :width="tblWitdh"
      label="操作">
      <template slot-scope="scope">
        <el-button type="success" @click.native="agree(scope.row)" v-prevent-click>同意</el-button>
        <el-button type="danger" @click.native="disagree(scope.row)" v-prevent-click>拒绝</el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
  import {getApply, agreeApply, disagreeApply} from "../../api/device";
  import {Message} from 'element-ui'
  import Vue from 'vue'

  export default {
    name: "ReplyInstrument",
    data() {
      return {
        tblWitdh: window.innerWidth * 0.135,
        applys: [],
      }
    },
    created() {
      getApply().then(res => {
        try {
          this.applys = res.data
        } finally {
          this.applys.filter(item => {
            return Vue.set(item, "loading", false)
          })
        }
      })

    },
    methods: {
      agree(data) {
        agreeApply(data).then(res => {
          Message.success(res.message)
          getApply().then(res => {
            this.applys = res.data
          })
        })
      },
      disagree(data) {
        disagreeApply(data).then(res => {
          Message.success(res.message)
          getApply().then(res => {
            this.applys = res.data
          })
        })
      },
    },


  }
</script>

<style scoped>

</style>
