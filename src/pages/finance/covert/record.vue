<template>
  <view class="bg">
    <uni-nav-bar title="transfer record" fixed :leftType="2"></uni-nav-bar>
	<view class="list flex-cc">
		<template v-if="list.length>0">
			<view class="flex-sb item" v-for="(item,index) in list" :key="index" @click="showDeatils(item)">
				<view class="flex flex-col">
					<view class="order_box">
						<text class="time">{{item.order_number}}</text>
						<image src="/static/img/copy.min.png" class="copy" @click="copyNumber(item.order_number)"></image>
					</view>
					<text style="font-size: 13px">{{item.created_at}}</text>
				</view>
				<view class="jf flex-cc">
					<text class="num">{{item.sender_money}}</text>
					<text>{{item.sender_currency_symbol}}</text>
				</view>
			</view>
			<page-nav :total="total" @change="changePage"></page-nav>
		</template>
		<u-empty mode="list" v-else></u-empty>
	</view>
	<u-popup :show="detailsPopup" class="rulePopup" mode="center" width="90%" :round="15" closeable @close="detailsPopup = false">
		<view class="details_content">
			<view class="title">Covert Details</view>
			<view class="container">
				<view class="content">
					<view class="content_title">Covert Order:</view>
					<view class="content_con">
						<text>{{details.order_number}}</text>
						<image src="/static/img/copy.min.png" class="copy" @click="copyNumber(details.order_number)"></image>
					</view>
				</view>
				<view class="content">
					<view class="content_title">Covert Time:</view>
					<view class="content_con">{{details.created_at}}</view>
				</view>
				<view class="covert_title">Covert Amount:</view>
				<view class="cover_content">
					<view class="left">
						<view class="top">{{details.sender_money}}</view>
						<view class="top">{{details.sender_currency_symbol}}</view>
					</view>
					<view class="cover_icon"></view>
					<view class="left">
						<view class="top">{{details.receiver_money}}</view>
						<view class="top">{{details.receiver_currency_symbol}}</view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
  </view>
</template>

<script>
import {currencyRecord } from '@/api/index.js'
import PageNav from '@/components/PageNav/index.vue'
export default {
	components:{
		PageNav
	},
  data(){
    return{
		list1: [{name: 'TRX'},{name:'USDT' }],
		form:{
			pageIndex: 1,
			pageSize: 10
		},
		activeStyle:{color: 'rgb(242, 65, 59)',fontWeight: 'bold'},
		inactiveStyle:{fontSize: '15px',color: 'rgb(48, 49, 51)'},
		total: 0,
		list:[],
		detailsPopup:false,
		details:{}
    }
  },
  onShow(){
	 this.getConversionMx() 
  },
  methods:{
	showDeatils(item) {
		this.details = item;
		this.detailsPopup = true
	},
	copyNumber(code) {
		uni.setClipboardData({
			data: code,
			success: ()=> {
				uni.showToast({
					icon: 'none',
					title: 'Replicating Success',
					duration: 2000
				});
			}
		});
	},
	changePage(index){
		this.form.pageIndex = index
		this.getConversionMx()	
	},
	// 查询资金明细
	getConversionMx(){
		currencyRecord(this.form).then(res=>{
			if (res.code === 1) {
				this.list = res.data.rows
				this.total = res.data.total
			}
		})
	}
  }

}
</script>

<style lang="scss" scoped>

.item{
	width: 100%;
	padding: 14px 9px;
	border-bottom: 1px solid #f2f5f7;
	.time{
		font-size: 15px;
		font-weight: 600;
		color: #303133;
		image{
			width: 26px;
			height: 26px;
			margin-right: 5px;
		}
	}
	.order_box {
		display: flex;
		align-items: center;
		gap:6px;
	}
	.copy {
		width:14px;
		height: 14px;
	}
	.jf{
		font-size: 14px;
			font-weight: 500;
			color: #cdcfd6;
		.num{
			font-weight: 600;
			font-size: 18px;
			color: #6bbe58;
		}
		.red{
			color: #f2443e;
		}
	}
}
.rulePopup {
	::v-deep {
        .u-popup__content {
            width: 90%;
        }
    }
    width: 90%;
    box-sizing: border-box;
	.details_content {
		width: 100%;
		height: 320px;
		padding: 20px 10px;
		display: flex;
		flex-direction: column;
		.title {
			width: 100%;
			text-align: center;
			margin-bottom: 20px;
		}
		.container {
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.content {
				margin-top: 8px;
				display: flex;
				.content_title {
					width: 100px;
				}
		}
		.copy {
			width: 14px;
			height: 14px;
			margin-left: 10px;
		}
		.cover_icon {
			width: 20px;
			height: 17px;
			background: url("/static/img/arrow.svg") no-repeat center;
			background-size: cover;
			margin: 0 10px;
		}
		.covert_title {
			margin-top: 8px;
		}
		.cover_content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 10px;
			margin-top: 10px;
			.left {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				border-radius: 4px;
				border: 1px solid #cdcdcd;
				background: aliceblue;
				padding: 12px 0 ;
			}	
		}
	}
}
</style>