import request from '@/utils/request'
import {setMd5} from '../utils/encrypt'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data: {
      username: data.username,
      password: setMd5(data.password)
    }
  })
}

export function getUser(uid) {
  return request({
    url: 'user/get',
    method: 'post',
    data: {
      id: uid
    }
  })
}

export function getInfo() {
  return request({
    url: 'user/info',
    method: 'get'
  })
}

export function getInfoById(id) {
  return request({
    url: 'user/getInfo/' + id,
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: 'user/updateUser',
    method: 'post',
    data: {
      id: data.id,
      username: data.username,
      password: setMd5(data.password)
    }
  })
}

export function updateInfo(data) {
  return request({
    url: 'user/updateInfo',
    method: 'post',
    data: {
      id: data.id,
      name: data.name,
      introduction: data.introduction,
      department: data.department
    }
  })
}

export function getAllUser() {
  return request({
    url: 'user/getAllUser',
    method: 'get'
  })
}

export function changeUserRole(data) {
  return request({
    url: 'user/changeRole',
    method: 'post',
    data: {
      id: data.id,
      role: data.role
    }
  })
}

export function delUser(uid) {
  return request({
    url: 'user/delUser',
    method: 'post',
    data: {
      id: uid
    }
  })
}

export function signUp(data) {
  return request({
    url: 'user/signUp',
    method: 'post',
    data: {
      username: data.username,
      password: setMd5(data.password),
      name: data.name,
    }
  })
}
