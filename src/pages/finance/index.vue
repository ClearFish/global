<template>
	<view class="bg">
    <uni-nav-bar :title="$t('finance.title')" fixed :leftType="2" ></uni-nav-bar>
	
	<view class="top-con">
		<view class="top-con-box border-left">
			<view class="info-box flex-cc">
				<view class="title">{{$t('finance.account.txt')}}</view>
				<view class="flex priceBox" v-for="(item,index) in userBalance" :key="index">
					<image v-if="item.icon" :src="imgUrl+item.icon" class="usdt-img"></image>{{item.symbo}}: {{item.balance}}
				</view>
				<view class="btns flex-rcc" @click="toPath(1)">{{$t('finance.account.btn')}}</view>
			</view>
		</view>
		<view class="top-con-box">
			<view class="info-box flex-cc">
				<view class="title">{{$t('finance.balance.txt')}}</view>
				<view class="flex priceBox" v-for="(item,index) in info" :key="index">
					<image v-if="item.icon" :src="imgUrl+item.icon" class="usdt-img"></image>{{item.symbo}}: {{item.balance}}
				</view>
				<view class="btns btns1 flex-rcc" @click="toPath(2)">{{$t('finance.balance.btn')}}</view>
			</view>
		</view>
	</view>
	
	<view>
		<u-cell-group class="groupBox">
			<u-cell icon="integral-fill" size="17" :iconStyle="iconStyle" :titleStyle="titleStyle" :title="$t('finance.menu.txt1')" :value="rate+'%'"></u-cell>
			<u-cell icon="coupon-fill" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle" :title="$t('finance.menu.txt2')" @click="toPath(3)"></u-cell>
			<u-cell icon="gift-fill" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle" :title="$t('finance.menu.txt3')" @click="toPath(4)"></u-cell>
			<u-cell icon="file-text-fill" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle" :title="$t('finance.menu.txt4')" @click="toPath(5)"></u-cell>
		</u-cell-group>
	</view>
  </view>
</template>

<script>
import { balance } from '@/api/index.js'
export default {
  data(){
    return{
		iconStyle:'color:rgb(242, 65, 59)',
		titleStyle: 'font-size: 14px',
		rate:'',
		info: [],
		userBalance:[]
    }
  },
  onShow(){
	  this.$store.dispatch('GetInfo').then(res=>{
		  this.userBalance = res.data.Balances
	  })
	this.getBalance()  
  },
  computed:{
	imgUrl(){
		return this.$store.state.img_url
	}  
  },
  methods:{
	  // 获取金融日利率
	  getBalance(){
		balance().then(res=>{
			this.rate = res.data.DailyInterestRate
			this.info = res.data.row
		})  
	  },
	toPath(type){
		let path = ""
		switch(type){
			case 1:
				path='/pages/finance/in'
				break;
			case 2:
				path='/pages/finance/out'
				break;
			case 3:
				path='/pages/finance/convert-record'
				break;
			case 4:
				path='/pages/finance/convert-profit'
				break;
			case 5:
				path='/pages/finance/convert-rule'
				break;
			
		}
		uni.navigateTo({
			url:path
		})
	}
  }

}
</script>

<style lang="scss" scoped>
.top-con {
    padding: 14px;
    background-color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid #a7a7a7 5px;
	color: #303133;
	font-size: 14px;
	.usdt-img{
		width: 16px;
		height: 16px;
		margin-right: 3px;
	}
	.priceBox{
		padding-top: 5px;
	}
}
.top-con-box{
    width: 50%;
}
.border-left {
    border-right: solid #a7a7a7 2px;
}
.info-box{
	padding: 7px 0 7px 5px;
}
.btns{
	margin-top: 16px;
	max-width: 150px;
	height: 41px;
	color: #fff;
	border-color: #fa3534;
	background-color: #fa3534;
	padding: 0 11px;
	box-shadow: 0 0 10px 1px rgb(242 65 59 / 27%);
	border-radius: 6px;
	}
	.btns1{
		color: #fa3534!important;
		border: 1px solid #fa3534;
		background-color: #fef0f0!important;
}
.groupBox{
	::v-deep.u-cell__body{
		padding: 15px;
	}
	::v-deep.u-cell__value{
		color: rgb(242, 65, 59);
		font-size: 13px;
	}
}
</style>                                                                                                                           