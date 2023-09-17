<template>
	<view class="bg">
		<uni-nav-bar :title="$t('draw-money.title')" fixed :leftType="2">
			<template slot="right">
				<u-icon name="order" color="#fff" bold size="30" @click="toRecord"></u-icon>
			</template>
		</uni-nav-bar>
		
		<view class="colorBox"></view>
		<view class="txtBox">
			<u-tabs :list="shareInfo" :current="current" @click="tabClick" keyName="symbo" :scrollable="false" lineColor="rgb(242, 65, 59)"  :activeStyle="activeStyle"></u-tabs>
			<!-- <view class="icon"></view> -->
		</view>
		
		<view class="number-box">
			<view class="u-input1">
				<u--input
				    :placeholder="$t('draw-money.input.label')"
				    border="none"
					type="number"
				    v-model="form.amount"
					clearable
				  ></u--input>
			</view>	
		</view>
		
		<view class="bankBox">
			<view class="box">
				<view class="item flex flex-item-col-center" v-if="shareInfo.length>0">
					<image src="/static/img/withdrawal1.png"></image>
					<text>1. {{$t('draw-money.cell1')}} {{shareInfo[current].balance}}</text>
				</view>
				<view class="item flex flex-item-col-center">
					<image src="/static/img/withdrawal4.png"></image>
					<text>2. {{$t('draw-money.cell2')}} {{minTransfer}}</text>
				</view>
			</view>
		</view>
		
		<!-- <view class="conBox">
			<view class="des">{{$t('draw-money.input1.txt')}}</view>
			<view class="box">
				<view class="tipBox flex-rcc">
					<view class="tipDes flex-rcc" @click="toAddress">
						<u-icon name="plus-circle-fill" color="rgba(245,98,93,.2)" size="23" class="add"></u-icon>
						{{$t('draw-money.input1.btn')}}
					</view>
				</view>
			</view>
		</view> -->
		
		<view class="requiredBox" v-if="invite_security_pwd">
			<view class="u-input1">
				<image src="/static/img/withdrawal6.png" class="icon-pass"></image>
				<u--input
				    :placeholder="$t('draw-money.input2.label')"
				    border="none"
					type="password"
				    v-model="form.password"
					clearable
				  ></u--input>
			</view>	
		</view>
		
		<view class="withdrawal-btn">
			<u-button type="primary" :text="$t('draw-money.btn')" shape="circle" color="#fa3534" style="width: 60%;" @click="save"></u-button>
		</view>
	</view>
</template>

<script>
	import { invite_balance, invite_transfer } from '@/api/index.js'
	export default{
		onShow(){
			this.getShareMoney()
			// 当未配置交易密码时转到 设置交易密码
			var u = JSON.parse(uni.getStorageSync('userInfo'))
			if (typeof u.isWithdrawPwd !== 'undefined' && !u.isWithdrawPwd && !uni.getStorageSync('isWithdrawPwd')) {
					uni.navigateTo({
							url: '/pages/mine/change-setpay-password'
					})
			}
			this.invite_security_pwd = Number(JSON.parse(uni.getStorageSync('site')).invite_security_pwd)
		},
		data(){
			return{
				invite_security_pwd: null, // 交易密码是否开启
				list1:[{name: 'TRX'}, {name: 'USDT'}],
				activeStyle:{color:'rgb(242, 65, 59)',fontWeight: 'bold'},
				form:{
					actions:'OUT',
					amount: null,
					currency: 'SYSTEM',
					password: ''
				},
				current: 0,
				shareInfo:[],
				minTransfer: '',
			}
		},
		methods:{
			// 获取分享佣金
			getShareMoney(){
				invite_balance().then(res=>{
					this.minTransfer = res.data.minTransfer
					this.shareInfo = res.data.row
				})
			},
			tabClick(e){
				this.current = e.index
				this.form.currency = this.shareInfo[this.current].currency
			},
			save(){
				if(this.invite_security_pwd){
					if(!this.form.password){
						uni.showToast({
								title: this.$t('change-pay-password.input3'),
								icon: 'none'
						})
					}else{
						invite_transfer(this.form).then(res=>{
							uni.showToast({
								title: 'success',
								icon: 'none'
							})
						})
					}
				}else{
					invite_transfer(this.form).then(res=>{
							uni.showToast({
								title: 'success',
								icon: 'none'
							})
						})
				}
				
			},
			toRecord(){
				uni.navigateTo({
					url: '/pages/share/withdraw-record'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.colorBox {
	    height: 37px;
	    width: 100%;
	    background-image: linear-gradient(90deg,#cd0103,#f64841);
	}
	.txtBox {
	    background-color: #fff;
	    z-index: 99;
	    margin-top: -28px;
	    border-radius: 9px 9px 0 0;
	    padding: 9px 18px;
	    position: relative;
		.text{
			color: #090909;
			font-weight: 600;
			font-size: 15px;
		}
		.icon {
		    position: absolute;
		    right: 18px;
		    top: 0;
		    height: 51px;
		    width: 30px;
		    background: url('/static/img/ghy11.min.png') no-repeat 50%;
		    background-size: 100% 100%;
		}
	}
	.number-box{
		margin-top: 10px!important;
		padding: 0 18px;
		height: 46px;
		line-height: 46px;
		border-bottom: 1px solid #f6f6f6;
		font-size: 23px;
		font-weight: 600;
		.u-input1{
			display: flex;
			border: 1px solid rgb(242, 65, 59);
			border-radius: 4px;
			align-items: center;
			justify-content: center;
			padding: 9px 15px!important;
			
		}
	}
	.bankBox{
	    padding: 0 18px;
	    margin-bottom: 14px;
	    margin-top: 4px;
		.box{
		    background: #fff;
		    border: 1px solid #de0700;
		    box-shadow: 0 7px 13px 0 rgba(242,65,59,.1411764705882353);
		    border-radius: 4px;
			.item {
			    padding: 9px;
			    border-bottom: 1px solid #d8d8d8;
			    font-size: 13px;
			    color: #414141;
				image{
					width: 19px;
					height: 19px;
					margin-right: 9px;
				}
			}
		}
	}
	.conBox {
	    padding: 0 18px;
		.des{
			color: #b3b2c8;
			font-size: 15px;
			margin-bottom: 14px;
		}
		.box {
		    background: #fff;
		    border: 1px solid #de0700;
		    box-shadow: 0 7px 13px 0 rgba(238,124,120,.3607843137254902);
		    border-radius: 4px;
		    margin-bottom: 9px;
			.tipDes{
				height: 32px;
				padding: 0 9px;
				background: #fdf0ef;
				border-radius: 9px;
				color: #f5625d;
				font-weight: 600;
				margin: 14px 0;
				font-size: 14px;
				color: #f5625d;
				.add{
					margin-right: 9px;
				}
			}
		}
	}
	.requiredBox{
		padding: 0 18px;
		margin-top: 18px;
		position: relative;
		.u-input1{
			display: flex;
			border: 1px solid rgb(242, 65, 59);
			border-radius: 4px;
			align-items: center;
			justify-content: center;
			padding: 6px 30px!important;
		}
		.icon-pass{
			width: 16px;
			height: 10px;
			position: absolute;
			left: 30px;
			top: 14px;
		}
	}
	.withdrawal-btn {
	    padding-bottom: 28px;
	    margin-top: 28px;
	}
</style>