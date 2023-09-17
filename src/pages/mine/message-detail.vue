<template>
  <view class="bg">
    <uni-nav-bar :title="$t('message-detail.title')" fixed :leftType="2"></uni-nav-bar>

	<view class="list">
		<view class="title flex flex-item-col-center flex-sb">
			<image src="/static/my-center/message.png" class="des-img flex-shrink"></image>
			<view class="tit-info">
				<view class="u-line-1">{{detail.title}}</view>
				<view class="time">{{detail.created_at}}</view>
			</view>
			<view class="delete">{{$t('message-detail.btn-del')}}</view>
		</view>
		<view class="con" v-html="detail.msg">
		</view>
	</view>
  </view>
</template>

<script>
import { getUserMsg } from '@/api/index.js'
import miment from 'miment'
export default {
	onLoad(option){
		this.messageDetail(option.id)  
	},
  data(){
    return{
		detail: {
			content: "随时随地即时投资<br>投资于世界上最受欢迎和最受欢迎的资产。您在终极投资平台中寻找的一切——在您选择的设备上。<br><br><strong>存入平台的资产可转入金融投资，每天可获得<span style=\"color: rgb(255, 0, 0); font-size: 16px;\">0.2%红利</span></strong><br>1.公司金融团队为您的投资策略<br>2.投资起24小时内无法转出<br>3.存款或取款时不收取任何费用<br>4.收益红利需要达到投资量才能成功提取资产<br>5.最低投资 10 TRX/USDT 只需少量资金即可轻松上手<br><br>300 多种可用资产,投资全球最受欢迎的资产<br>从成熟的行业到蓬勃发展的新时代后起之秀——从十多种不同的路线中挑选出明智的投资。<br>（原油WTI.布加仑原油.微软.标准普尔500 ETF.亚马逊公司.特斯拉公司.苹果公司.）<br>在您开始投资之旅时，让我们帮助您走上正轨。",
			status: "1",
			time: "2021-11-19 00:00:00",
			title: "金融交易所"
		}
    }
  },
  methods:{
	// 详情
	messageDetail(id){
		getUserMsg({id:id}).then(res=>{
			this.detail = res.data
		})
	},
	keyTime(time){
		return miment(time*1000).format()
	}
  }

}
</script>

<style lang="scss" scoped>
.list{
	padding: 14px;
	.title{
		padding: 14px 9px;
		border-bottom: 1px solid #f2f5f7;
		.des-img{
			width: 37px;
			height: 37px;
			margin-right: 10px;
		}
		.tit-info{
			width: 65%;
			font-size: 16px;
			
			color: #2c3e50;
		}
		.time{
			margin-top: 4px;
			color: #666;
			font-size: 11px;
		}
		.delete{
			height: 24px;
			line-height: 24px;
			font-size: 11px;
			background-color: #f2413b;
			padding: 0 14px;
			border-radius: 14px;
			color: #fff;
		}
	}
	.con {
	    padding: 14px;
	    font-size: 14px;
	    line-height: 18px;
	    color: #2c3e50;
	}
}
</style>