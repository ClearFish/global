<template>
  <view class="bg">
    <uni-nav-bar :title="$t('convert-rule.title')" fixed :leftType="2"></uni-nav-bar>

	<view class="list">
		<view class="title flex flex-item-col-center">
			<image src="/static/img/article.png" class="des-img flex-shrink"></image>
			<view class="tit-info">
				<view class="u-line-1">{{detail.title}}</view>
				<view class="time">{{detail.time}}</view>
			</view>
		</view>
		<view class="con" v-html="detail.content">
		</view>
	</view>
  </view>
</template>

<script>
	import { getConversionRule } from '@/api/index.js'
export default {
  data(){
    return{
		detail: {
			content: "Instant investment anytime, anywhere<br>Invest in the most popular and sought-after assets in the world. Everything you're looking for in the ultimate investing platform - on the device of your choice.<br><br><br>1.According to different VIP levels, the daily rate of return is 0.1%-1.5%.<br>2. Corporate finance team for your investment strategy<br>3. No fees for deposits or withdrawals<br>4. It takes 24 hours after the investment to generate income and the financial balance will be automatically credited to the account<br>5. No minimum investment amount limit, you can easily get started with a small amount of capital<br><br>Invest in the world's most popular assets with over 300 assets available<br>From established industries to thriving new-age up-and-comers - pick smart investments from more than a dozen different routes.。<br>(Crude WTI. Bugallon Crude Oil. Microsoft. S&P 500 ETF. Amazon Inc. Tesla Inc. Apple Inc.)<br>Let us help you get on the right track as you begin your investing journey.",
			status: "1",
			time: "2021-11-19 00:00:00",
			title: "Financial Investment Rules"
		}
    }
  },
  onReady(){
	// this.getConversionRule()  
  },
  methods:{
	// 详情
	getConversionRule(){
		getConversionRule().then(res=>{
			this.detail = res.result
		})
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
			font-size: 16px;
			
			color: #2c3e50;
		}
		.time{
			margin-top: 4px;
			color: #666;
			font-size: 11px;
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