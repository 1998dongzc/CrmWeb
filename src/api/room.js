import request from '@/utils/request'

export function getBuidings() {
  return request({
    url: 'build/getBuilding',
    method: 'get',
  })
}

export function getRooms() {
  return request({
    url: 'build/getRooms',
    method: 'get'
  })
}

export function getRoomByBid(bid) {
  return request({
    url: 'build/getRoomByBid/' + bid,
    method: 'get'
  })
}

export function addBuild(buildName) {
  return request({
    url: 'build/addBuild',
    method: 'post',
    data: {
      buildingName: buildName
    }
  })
}

export function delBuild(bid) {
  return request({
    url: 'build/delBuild',
    method: 'post',
    data: {
      id: bid
    }
  })
}

export function addRoom(roomName, bid) {
  return request({
    url: 'build/addRoom',
    method: 'post',
    data: {
      roomName: roomName,
      buidlingId: bid
    }
  })
}

export function delRoom(rid) {
  return request({
    url: 'build/delRoom',
    method: 'post',
    data: {
      id : rid
    }
  })
}
