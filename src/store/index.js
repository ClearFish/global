import Vue from 'vue';
import Vuex from 'vuex';
import { setToken } from '@/utils/auth.js'
import { getUserInfo, site, refresh } from '@/api/index.js'
Vue.use(Vuex);


const store = new Vuex.Store({
	state: {
		img_url: "",
		url: '',
		user: null,
		evaluate_info: {},
		userInfo: {},
		msg: {}, //消息详情
		swiperObj: {}, //轮播信息 
		siteInfo: {}, // 网站配置
		langList: [[
			{ label: '中文', value: 'zh_cn' },
			{ label: 'English', value: 'en_us' },
			{ label: 'हिन्दी', value: 'yindi' },
			{ label: 'بالعربية', value: 'ar_jo' },
			{ label: 'Español', value: 'es' },
			// {label: 'Tiếng Việt', value: 'yuenan'},
			// {label: 'Türk', value: 'deyu'},
			// {label: 'やまと', value: 'riyu'},
			// {label: 'Português', value: 'putao'}
		]],
		vipInfo: {}
	},
	mutations: {
		setMsg(state, rst) {
			state.msg = rst;
		},
		setSwiperObj(state, rst) {
			state.swiperObj = rst;
		},
		setUserInfo(state, rst) {
			uni.setStorageSync('userInfo', JSON.stringify(rst))
			state.userInfo = rst;
			setToken(rst.token)
		},
		setUser(state, rst) {
			state.user = rst;
		},
		setEvaluate_info(state, info) {
			state.evaluate_info = info
		},
		setSite(state, data) {
			uni.setStorageSync('site', JSON.stringify(data))
			state.siteInfo = data
		},
		setVipinfo(state, data) {
			state.vipInfo = data;
			console.log(state.userInfo)
		}
	},
	actions: {
		GetInfo({ commit }, data) {
			return new Promise((resolve, reject) => {
				getUserInfo()
					.then((res) => {
						commit('setUserInfo', res.data);
						resolve(res);
					})
					.catch((err) => {
						console.log(err);
					});
			})

		},
		GetSite({ commit }, data) {
			return new Promise((resolve, reject) => {
				site()
					.then((res) => {
						commit('setSite', res.data);
						resolve(res);
					})
					.catch((err) => {
						console.log(err);
					});
			})
		},
		refresh({ commit }, data) {
			return new Promise((resolve, reject) => {
				refresh()
					.then((res) => {
						setToken(res.data.token)
						resolve(res);
					})
					.catch((err) => {
						console.log('jinru ')
						removeToken()
						uni.navigateTo({
							url: '/pages/login/index'
						});
					});
			})
		},
	}
})
export default store;
