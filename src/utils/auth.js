// import Cookies from 'js-cookie'

const TokenKey = 'token'
const QiniuToken = 'qntoken'

// token
export function getToken() {
  return uni.getStorageSync(TokenKey)
}
export function setToken(token) {
	uni.setStorageSync(TokenKey, token);
}
export function removeToken() {
	uni.removeStorageSync(TokenKey);
}

// 七牛token
export function getQiniuToken() {
	return uni.getStorageSync(QiniuToken)
}
export function setQiniuToken(token) {
	uni.setStorageSync(QiniuToken, token);
}
export function removeQiniuToken() {
	uni.removeStorageSync(QiniuToken);
}
