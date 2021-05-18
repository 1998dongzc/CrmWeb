import request from '@/utils/request'


export function getAllOpsLogs() {
  return request({
    url: 'log/getOpsLog',
    method: 'get'
  })
}
