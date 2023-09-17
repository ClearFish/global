import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import store from '../store';
const baseUrl = store.state.url
// http响应状态码
const resposeCode = {
	'301': '请求需要重定向',
	'400': '请求错误',
	'401': '重新登录',
	'403': '资源不可用',
	'404': '无法找到指定资源',
	'405': '请求方法错误',
	'406': '页面请求头不兼容',
	'407': '服务器授权后方可使用',
	'408': '请求超时，请重试',
	'409': '当前资源被占用',
	'410': '请求资源已过期',
	'413': '请求文件过大',
	'423': '当前资源被锁定',
	'424': '请求关联错误',
	'500': '服务器错误',
	'501': '服务器不支持您的请求',
	'502': '上游服务器无法响应',
	'503': '服务器维护中，请稍后再试',
	'504': '上游服务器未及时应答',
	'510': '策略未满足',
	'600': '响应头未返回'
}

// const sky_key = '4c8d1bb70b2d41859584e0c4a7ad8adb'
// 设置全局请求次数,请求间隔时间
axios.defaults.retry = 2
axios.defaults.retryDelay = 50000

const notAuthUrls = ['/login']

// 创建axios实例
const service = axios.create({
	// baseURL: 'https://devapi.qweather.com/v7', // api的请求地址
	baseURL: baseUrl,
	timeout: 10000, // 请求超时时间
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
})

// request拦截器
service.interceptors.request.use(
	config => {
		if (getToken()) {
		  // console.log('getToken()', getToken())
		  config.headers['token'] =  getToken()
		  //config.headers['X-Access-Token'] =  getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
		}
		let lang = uni.getStorageSync('lang')
		let arr = lang.split('_')
		if(lang){
			if(config.method === "post" ){
				config.url = config.url + '?lang='+arr[0]+ '-'+ arr[1]
			}else{
				if(config.params){
					config.params.lang = arr[0]+ '-'+ arr[1]
				}else{
					config.params = {
						lang: arr[0]+ '-'+ arr[1]
					}
				}
			}
		}
		
		return config
	},
	error => {
		// Do something with request error
		Promise.reject(error)
	}
)

axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	// console.log(config.url)
	if (config.method.toUpperCase() === 'GET' && config.params) {
		// console.log(config.params)
		config.params['t'] = Date.parse(new Date()) / 1000
	}
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

// response 拦截器
service.interceptors.response.use(
	response => {
		const res = response.data
		if (res) {
			if (res.code === 200 || res.code === 1 || res.status === 200) {
				return res
			} else if (res.code === 401) {
				store.dispatch('refresh').then(res=>{
					if(res.data===null){
						removeToken()
						uni.navigateTo({
							url: '/pages/login/index'
						});
					}
				})
			} else {
				if(res.msg){
					uni.showToast({
						icon: 'none',
						title: res.msg,
						duration: 2000
					});
				}
				return Promise.reject(res.msg)
			}
		}
	},
	error => {
		console.log('error',error)
		const status = error.response.status
		if(status === 401){
			// store.dispatch('refresh').then(res=>{
			// 	if(res.data===null){
					removeToken()
					uni.navigateTo({
						url: '/pages/login/index'
					});
				// }
			// })
		}else if (status !== 200 && status !== 401) {
			uni.showToast({
				title: 'error!',
				icon: 'none',
				duration: 2000
			});
		}
		return Promise.reject(error)
	}
)

export default service
