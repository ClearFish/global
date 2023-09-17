import request from '@/utils/request'
// import store from '@/store/index.js'

// 网站配置
export function site(params) {
	return request({
		url: '/api/site',
		method: 'get',
		params
	})
}

// 注册
export function register(data) {
	return request({
		url: '/api/user/register',
		method: 'post',
		data
	})
}

//登录
export function login(data) {
	return request({
		url: '/api/user/login',
		method: 'post',
		data
	})
}
// 重置密码
export function resetpwd(data) {
	return request({
		url: '/api/user/resetpwd',
		method: 'post',
		data
	})
}

// 刷新token
export function refresh(params) {
	return request({
		url: '/api/token/refresh',
		method: 'get',
		params
	})
}

// 退出登录
export function logout(params) {
	return request({
		url: '/api/user/logout',
		method: 'get',
		params
	})
}

//用户信息
export function getUserInfo(params) {
	return request({
		url: '/api/user/getUserInfo',
		method: 'get',
		params
	})
}

// 幻灯广告-成功
export function advertise(params) {
	return request({
		url: '/addons/slide/api/advertise',
		method: 'get',
		params
	})
}

// 公告列表
export function notice(params) {
	return request({
		url: '/addons/notice/api/notice',
		method: 'get',
		params
	})
}

// 公告详情
export function getNotice(params) {
	return request({
		url: '/addons/notice/api/getNotice',
		method: 'get',
		params
	})
}

// 优惠活动
export function activity(params) {
	return request({
		url: '/addons/activity/api/activity',
		method: 'get',
		params
	})
}

// 优惠活动详情
export function getActivity(params) {
	return request({
		url: '/addons/activity/api/getActivity',
		method: 'get',
		params
	})
}

// 提现排行版
export function getWithdrawData(data) {
	return request({
		url: '/addons/epaid/api/getWithdrawData',
		method: 'post',
		data
	})
}
// 取消提现
export function cancelWithdraw(data) {
	return request({
		url: '/addons/epaid/api/cancel',
		method: 'post',
		data
	})
}

// 游戏支持列表
export function gameList(params) {
	return request({
		url: '/addons/game/api/game',
		method: 'get',
		params
	})
}

// 更多代理游戏-全部游戏代理别名
export function getGameAgentAlias(params) {
	return request({
		url: '/addons/game/api/getGameAgentAlias',
		method: 'get',
		params
	})
}

// 按游戏标识查询游戏
export function getGame(params) {
	return request({
		url: '/addons/game/api/getGame',
		method: 'get',
		params
	})
}

// 游戏开奖时间
export function getTimes(params) {
	return request({
		url: '/addons/game/api/getTimes',
		method: 'get',
		params
	})
}

// 游戏开奖记录
export function resultRecord(data) {
	return request({
		url: '/addons/game/api/resultRecord',
		method: 'post',
		data
	})
}

// 用户游戏记录
export function betRecord(data) {
	return request({
		url: '/addons/game/api/betRecord',
		method: 'post',
		data
	})
}

// 根据期号查结果
export function getResult(params) {
	return request({
		url: '/addons/game/api/getResult',
		method: 'get',
		params
	})
}

// 用户游戏下注
export function bet(data) {
	return request({
		url: '/addons/game/api/bet',
		method: 'post',
		data
	})
}

// 金融余额列表
export function balance(params) {
	return request({
		url: '/addons/finance/api/balance',
		method: 'get',
		params
	})
}

// 金融转账
export function transfer(data) {
	return request({
		url: '/addons/finance/api/transfer',
		method: 'post',
		data
	})
}

// 金融资金明细
export function balance_record(params) {
	return request({
		url: '/addons/finance/api/balance_record',
		method: 'get',
		params
	})
}

// 收益列表
export function income_record(params) {
	return request({
		url: '/addons/finance/api/income_record',
		method: 'get',
		params
	})
}

// 邀请余额钱包
export function invite_balance(params) {
	return request({
		url: '/addons/invite/api/balance',
		method: 'get',
		params
	})
}

// 邀请钱包余额资金明细
export function invite_balance_record(params) {
	return request({
		url: '/addons/invite/api/balance_record',
		method: 'get',
		params
	})
}

// 邀请转账接口
export function invite_transfer(data) {
	return request({
		url: '/addons/invite/api/transfer',
		method: 'post',
		data
	})
}

// 邀请收益列表
export function invite_income_record(params) {
	return request({
		url: '/addons/invite/api/income_record',
		method: 'get',
		params
	})
}

// 银行卡列表数据
export function bankInfo(params) {
	return request({
		url: '/addons/epaid/api/format',
		method: 'get',
		params
	})
}

// 提款会员银行绑定接口
export function bindbank(data) {
	return request({
		url: '/addons/epaid/api/bindbank',
		method: 'post',
		data
	})
}

// 提款提交
export function cashSubmit(data) {
	return request({
		url: '/addons/epaid/api/submit',
		method: 'post',
		data
	})
}

// 会员消息-历史记录
export function historyMsg(params) {
	return request({
		url: '/addons/usermsg/api/history',
		method: 'get',
		params
	})
}

// 会员消息-未读总数
export function unreadMsg(params) {
	return request({
		url: '/addons/usermsg/api/unread',
		method: 'get',
		params
	})
}

// 会员消息-按ID查询一条消息
export function getUserMsg(params) {
	return request({
		url: '/addons/usermsg/api/getUserMsg',
		method: 'get',
		params
	})
}

// 获取客服链接
export function getCustomerService(data) {
	return request({
		url: '/addons/customer/api/service',
		method: 'post',
		data
	})
}

// 支付可选通道列表
export function epayList(data) {
	return request({
		url: '/addons/epay/api/list',
		method: 'post',
		data
	})
}

// 充值提交 
export function epaySubmit(data) {
	return request({
		url: '/addons/epay/api/submit',
		method: 'post',
		data
	})
}

// 提款记录
export function epaidRecord(data) {
	return request({
		url: '/addons/epaid/api/record',
		method: 'post',
		data
	})
}

// 充值记录
export function epayRecord(data) {
	return request({
		url: '/addons/epay/api/record',
		method: 'post',
		data
	})
}
// 团队金额
export function getMyTeam(data) {
	return request({
		url: '/addons/game/api/getMyTeam',
		method: 'post',
		data
	})
}

// 团队人数
export function getMyMember(data) {
	return request({
		url: '/api/user/getMyMember',
		method: 'post',
		data
	})
}

// 团队下级人数
export function Subordinate(params) {
	return request({
		url: '/addons/game/api/myTeamSubordinate',
		method: 'get',
		params
	})
}

// 修改提款密码 
export function reWithdrawalPassword(data) {
	return request({
		url: '/api/user/reWithdrawalPassword',
		method: 'post',
		data
	})
}

// 设置取款密码
export function setWithdrawalPassword(data) {
	return request({
		url: '/api/user/setWithdrawalPassword',
		method: 'post',
		data
	})
}

// 修改密码
export function changePassword(data) {
	return request({
		url: '/api/user/changepwd',
		method: 'post',
		data
	})
}

// 发送验证码
export function smsSend(data) {
	return request({
		url: '/api/sms/send',
		method: 'post',
		data
	})
}

// 验证验证码
export function smsCheck(data) {
	return request({
		url: '/api/sms/check',
		method: 'post',
		data
	})
}

// 转账参数配置
export function usertransferConfig(data) {
	return request({
		url: '/addons/usertransfer/api/config',
		method: 'post',
		data
	})
}
// 转账
export function usertransferSubmit(data) {
	return request({
		url: '/addons/usertransfer/api/submit',
		method: 'post',
		data
	})
}
// 转账记录

export function usertransferRecord(data) {
	return request({
		url: '/addons/usertransfer/api/record',
		method: 'post',
		data
	})
}
// 取消转账
export function usertransferCancel(data) {
	return request({
		url: '/addons/usertransfer/api/cancel',
		method: 'post',
		data
	})
}
// 确认转账
export function usertransferReceive(data) {
	return request({
		url: '/addons/usertransfer/api/receive',
		method: 'post',
		data
	})
}

// 活动列表数据

export function promotionsList(params) {
	return request({
		url: '/addons/promotions/api/list',
		method: 'get',
		params
	})
}
// 领取活动奖金
export function promotionsReceive(data) {
	return request({
		url: '/addons/promotions/api/receive',
		method: 'post',
		data
	})
}

// 活动分组

export function promotionsGroup(params) {
	return request({
		url: '/addons/promotions/api/group',
		method: 'get',
		params
	})
}

// 币种选择 
export function currencyChose(params) {
	return request({
		url: '/addons/currency/api/choose',
		method: 'get',
		params
	})
}
// 兑换币种选择接口，反回可选币列表 
export function currencyCurrency(params) {
	return request({
		url: '/addons/currency/api/currency',
		method: 'get',
		params
	})
}
// 兑换提交接口
export function currencySubmit(data) {
	return request({
		url: '/addons/currency/api/submit',
		method: 'post',
		data
	})
}
// 兑换记录
export function currencyRecord(params) {
	return request({
		url: '/addons/currency/api/exchange_record',
		method: 'get',
		params
	})
}
// 游戏总佣金，已经领取佣金，未领取佣金
export function getBonus(params) {
	return request({
		url: '/addons/game/api/getBonus',
		method: 'get',
		params
	})
}
// 领取佣金
export function receiveBonus(data) {
	return request({
		url: '/addons/game/api/receiveBonus',
		method: 'post',
		data
	})
}
// 领取记录
export function getBonusRecord(params) {
	return request({
		url: '/addons/game/api/getBonusRecord',
		method: 'get',
		params
	})
}
// 团队统计
export function getTotalReport(params) {
	return request({
		url: '/addons/game/api/getTotalReport',
		method: 'get',
		params
	})
}
// vip页面接口
export function userlevelList(params) {
	return request({
		url: '/addons/userlevel/api/list',
		method: 'get',
		params
	})
}
//  红包插件接口
export function redenvelope(data) {
	return request({
		url: '/addons/redenvelope/api/receive',
		method: 'post',
		data
	})
}
// 红包记录
export function redenvelopeRecord(params) {
	return request({
		url: '/addons/redenvelope/api/record',
		method: 'get',
		params
	})
}

// // 首页游戏数据
// export function getBetData(data) {
// 	return request({
// 		url: '/common/getBetData',
// 		method: 'post',
// 		data
// 	})
// }




