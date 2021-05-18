import crypto from 'crypto'

//对密码进行加密
export function setMd5(str) {
  var md5 = crypto.createHash("md5")
  md5.update(str)
  return md5.digest('hex')
}
