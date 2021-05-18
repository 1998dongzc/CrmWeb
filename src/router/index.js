import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/user/login'
import Index from '@/views/index/index'
import AddInstrument from "@/views/device/AddInstrument";
import DelInstrument from "../views/device/DelInstrument";
import LockInstrument from "../views/device/LockInstrument";
import ApplyInstrument from "../views/device/ApplyInstrument";
import ReplyInstrument from "../views/device/ReplyInstrument";
import ApplyLog from "../views/device/ApplyLog";
import UserInfo from "../views/user/UserInfo";
import BuildCurd from "../views/build/index"
import UserList from "../views/user/UserList";
import SignUp from "../views/user/SignUp"
import OpsLogs from "../views/log/OpsLogs";

Vue.use(Router)


export default new Router({

  routes: [
    {
      path: '/' || '/login',
      component: Login
    },
    {
      path: '/signUp',
      component: SignUp
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: 'addDevice',
          component: AddInstrument,
          meta: {
            icon: 'el-icon-circle-plus',
            title: '增加设备',
            role: ['admin','root']
          }
        },
        {
          path: 'delDevice',
          component: DelInstrument,
          meta: {
            icon: 'el-icon-s-operation',
            title: '管理设备',
            role: ['admin','root']
          }
        },
        {
          path: 'lockDevice',
          component: LockInstrument,
          meta: {
            icon: 'el-icon-unlock',
            title: '设备解锁',
            role: ['admin', 'user','root']
          }
        }, {
          path: 'applyDevice',
          component: ApplyInstrument,
          meta: {
            icon: 'el-icon-notebook-2',
            title: '设备申请',
            role: ['user']
          }
        }, {
          path: 'replyDevice',
          component: ReplyInstrument,
          meta: {
            icon: 'el-icon-coordinate',
            title: '设备申请应答',
            role: ['admin','root']
          }
        }, {
          path: 'applyLog',
          component: ApplyLog,
          meta: {
            icon: 'el-icon-notebook-1',
            title: '申请结果',
            role: ['user']
          }
        }, {
          path: 'buildCurd',
          component: BuildCurd,
          meta: {
            icon: 'el-icon-office-building',
            title: '教室管理',
            role: ['admin','root']
          }
        }, {
          path: 'userList',
          component: UserList,
          meta: {
            icon: 'el-icon-coin',
            title: '用户管理',
            role: ['root']
          }
        }, {
          path: 'opsLogs',
          component: OpsLogs,
          meta: {
            icon: 'el-icon-time',
            title: '查看操作记录',
            role: ['root']
          }
        },{
          path: 'userInfo',
          component: UserInfo,
          meta: {
            icon: 'el-icon-user',
            title: '个人信息',
            role: ['user', 'admin','root']
          }
        }
      ]
    }
  ]
})

//解决重复点击路由跳转本身 报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
