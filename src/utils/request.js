import axios from 'axios'
import Message from "element-ui/packages/message/src/main";
import MessageBox from "element-ui/packages/message-box/src/main";
import {getToken, logout} from "./localStauts";
import router from '../router'


// 创建一个axios实例
const service = axios.create({
    baseURL: '/admin',
    withCredentials: true,
    timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(config => {

    config.headers['user-token'] = getToken();
    // config.headers['user-token'] = 'token';
    return config;
}, error => {
    // 请求错误时做些事
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
        const res = response.data
        // 如果返回的状态不是200 就主动报错
        if (res.status !== 200) {
            Message({
                message: res.message || '请求失败',
                type: 'error',
                duration: 5 * 1000
            })
            if (res.status == 401) {
                // 重新登录
                MessageBox.confirm('登录已经失效,请选择操作', '登陆过期', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '停留此页',
                    type: 'warning'
                }).then(() => {
                    logout()
                    router.replace("/")
                })
            }

            return Promise.reject(new Error(res.message || '登录过期'))
        } else
            return res;
    }
    ,
    error => {
        Message({
            message: "出现了未知错误！",
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
