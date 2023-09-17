<template>
  <view class="bg">
    <uni-nav-bar :title="$t('sign.title')" fixed :leftType="2">
    </uni-nav-bar>

    <view class="sign-in-content wrap">
		<view class="sign-box">
			<image src="/static/sign-in/reetb.min.png"></image>
			{{$t('sign.tip')}}
		</view>
		
		<view class="sign-box flex flex-warp">
			<view class="flex flex-col flex-item-col-center item" v-for="(i,index) in signList" :key="index" :class="{'action': i.isSign}">
				<view class="jf">{{i.jf}}</view>
				<view class="text">{{i.text}}</view>
			</view>
		</view>
		<view class="sign-box">
			<u-button class="sign-btn" :text="$t('sign.btn')" color="rgb(242, 65, 59)" shape="circle"></u-button>
		</view>
		<view class="sign-box">
			<view class="tit">{{$t('sign.rule.title')}}</view>
			<view class="des" v-html="signInfo.content"></view>
		</view>
    </view>
  </view>
</template>

<script>
import { getSignDayList, getSignRule } from '@/api/index.js'
export default {
  data(){
    return{
		signList:[
			{jf: 97, text: '第一天', isSign: true},
			{jf: 97, text: '第一天', isSign: true},
			{jf: 97, text: '第一天', isSign: false},
			{jf: 97, text: '第一天', isSign: false},
			{jf: 97, text: '第一天', isSign: false},
			{jf: 97, text: '第一天', isSign: false},
			{jf: 97, text: '第一天', isSign: false}
		],
		signInfo:{
			content: "1.您可以每天免费签到获得积分<br>2. 平台保留對本次活動的最終解釋權。 如有疑問請聯繫客服<br>注：签到积分可以到积分商场兑换金币并提款",
			title: "签到规则"
		}
    }
  },
  methods:{
	// 签到列表
	getSignDayList(){
		getSignDayList().then(res=>{
			this.signList = res.result
		})
	},
	// 签到规则
	getSignRule(){
		getSignRule().then(res=>{
			this.signList = res.result
		})
	}
  }

}
</script>

<style lang="scss" scoped>
.sign-in-content {
    padding: 14px 14px 14px;
    background: #fff;
    color: #2c3e50;
    font-size: 13px;
	.sign-box {
	    padding-bottom: 14px;
		font-size: 14px;
		image{
			width: 13px;
			height: 13px;
			padding: 0;
			margin-right: 5px!important;
			margin-right: 6px;
		}
		.item{
			width: 32%;
			margin: 5px 2px;
			padding: 9px 14px;
			background-image: linear-gradient(40deg,#e5e7f6 35%,#f5f3fb);
			border-radius: 9px;
			overflow: hidden;
			height: 56px;
			.jf{
				font-size: 16px;
				font-weight: 600;
				margin-bottom: 5px;
				color: #575965;
			}
			.text{
				font-size: 13px;
				color: #9a9dae;
				border-top: 1px solid #575965;
			}
		}
		.action{
			background: #f2413b;
			.jf{
				color: #fff;
			}
			.text{
				color: #fff;
				border-top: 1px solid #fff;
			}
		}
		.tit{
			width: 100%;
			text-align: center;
			font-size: 15px;
			font-weight: 600;
			height: 28px;
			line-height: 28px;
		}
		.des{
			color: #2c3e50;
			font-size: 13px;
		}
	}
	.sign-btn{
	    width: 65%;
	    margin: auto;
	    box-shadow: 0 0 7px 1px #b5b5b5;
	}
}
</style>