import request from '@/utils/request'

export function addDevice(data, num) {
  return request({
    url: 'device/add/' + num,
    method: 'post',
    data: {
      deviceName: data.deviceName,
      deviceRoomId: data.deviceRoomId,
      status: data.status
    }
  })
}

export function allDevices() {
  return request({
    url: 'device/get',
    method: 'get'
  })
}

export function delDevice(id) {
  return request({
    url: 'device/del/' + id,
    method: 'post'
  })
}

export function apply(data) {
  return request({
    url: 'apply/add',
    method: 'post',
    data: {
      roomId: data.deviceRoomId,
      deviceName: data.deviceName,
      num: data.num,
      uId: data.uid,
      code: data.code,
      localName: data.localName
    }
  })
}

export function getApply() {
  return request({
    url: 'apply/get',
    method: 'get'
  })
}

export function agreeApply(data) {
  return request({
    url: 'apply/agree/' + data.num + '/' + data.uid + '/' + data.id,
    method: 'post',
    data: {
      deviceName: data.deviceName,
      deviceRoomId: data.roomId,
      status: data.code == 1 ? 0 : -1
    }
  })
}

export function disagreeApply(data) {
  return request({
    url: 'apply/disagree/' + data.num + '/' + data.uid + '/' + data.id,
    method: 'post',
    data: {
      deviceName: data.deviceName,
      deviceRoomId: data.roomId,
      status: data.code == 1 ? 0 : -1
    }
  })
}

export function applyLog(uid) {
  return request({
    url: 'apply/log/' + uid,
    method: 'get'
  })
}

export function delLogs(uid) {
  return request({
    url: 'apply/delLogs',
    method: 'post',
    data: {
      id: uid
    }
  })
}

export function setDeviceIp(id, ip) {
  return request({
    url: 'device/setDeviceIp',
    method: 'post',
    data: {
      id: id,
      ip: ip
    }
  })
}

export function deviceLock(data) {
  return request({
    url: 'ops/lock',
    method: 'post',
    data: {
      id: data.id,
      ip: data.ip
    }
  })
}

export function deviceUnlock(data) {
  return request({
    url: 'ops/unlock',
    method: 'post',
    data: {
      id: data.id,
      ip: data.ip
    }
  })
}
