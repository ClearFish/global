<template>
  <view class="bg">
    <uni-nav-bar :title="$t('share.title')" fixed  :rightType="2">
    </uni-nav-bar>
	<view class="wallet-user a-text-center"></view>
	
	<view class="advertising-content-box">
		<view class="flex-sb">
			<view class="cardBox">
				<view class="tit">{{$t('share.card.left.txt')}}</view>
				<view class="trx" v-for="(item,index) in shareInfo" :key="index">{{item.symbo}}: <text class="mon">{{item.balance}}</text></view>
				<view class="topIcon"><u-icon name="integral-fill" size="18" color="#f20012"></u-icon></view>
			</view>
			<view class="cardBox m1">
				<view class="tit">{{$t('share.card.right.txt')}}</view>
				<view class="trx" v-for="(item,key,index) in total_invite" :key="index">{{item.symbo}}: <text class="mon">{{item.balance}}</text></view>
				<view class="topIcon"><u-icon name="integral-fill" size="18" color="#249975"></u-icon></view>
			</view>
		</view>
		<view class="flex-sb">
			<view class="btn" @click="toPath">{{$t('share.card.left.btn')}}</view>
			<view class="btn btn1" @click="toLog">{{$t('share.card.right.btn')}}</view>
		</view>
	</view>
	
	<view class="advertising-content-list">
		<view class="advertising-content-list-lab">{{$t('share.link.txt')}}</view>
		<view class="infoBox flex flex-item-col-center">
			<view class="qrBox flex-item-1">
				<vue-qr :text="shareLink.url" :size="300" width="165px" :correctLevel="2"></vue-qr>
			</view>
			
			<view class="flex-cc flex-item-1">
				<view class="li red-btn flex-rcc" @click="saveLink">{{$t('share.link.top.btn')}}</view>
				<view class="li white-btn flex-rcc"><u-icon name="play-left-fill" color="#f2413b" size="15"></u-icon>{{$t('share.link.bottom.btn')}}</view>
			</view>
		</view>
	</view>
	
	<view class="tableBox">
		<view class="table-border">
			<view v-for="(i,index) in table" :key="index" class="table">
				<view v-for="(item,index1) in table[index]" :key="index1" class="tb flex-rcc" :class="{'th':item.type==='th'}">{{item.name}}</view>
			</view>
		</view>
		
		<view class="table-border" style="margin-top: 20px;">
			<view v-for="(i,index) in table1" :key="index" class="table tableM">
				<view v-for="(item,index1) in table1[index]" :key="index1" class="tb flex-rcc" :class="{'th':item.type==='th'}">{{item.name}}</view>
			</view>
		</view>
	</view>

    <Tabbar :current="3"></Tabbar>
  </view>
</template>

<script>
import Tabbar from '@/components/tabber/index'
import vueQr from 'vue-qr'
import { invite_balance } from '@/api/index.js'

export default {
  components:{Tabbar, vueQr},
  data(){
    return{
		link: '',
		table:[
			[{type:'th',name: 'Agent level'},{type:'th',name: '“1”level numbers'},{type:'th',name: ' “1-3”level numbers'},{type:'th',name: 'Team recharge（RS）'},{type:'th',name: 'Weekly active people'}],
			[{type:'tb',name: 'VIP0'},{type:'tb',name: '0'},{type:'tb',name: '0'},{type:'tb',name: '0'}, {type:'tb',name: '0'}],
			[{type:'tb',name: 'VIP1'},{type:'tb',name: '1'},{type:'tb',name: '1'},{type:'tb',name: '500'}, {type:'tb',name: '1'}],
			[{type:'tb',name: 'VIP2'},{type:'tb',name: '5'},{type:'tb',name: '20'},{type:'tb',name: '10000'}, {type:'tb',name: '10'}],
			[{type:'tb',name: 'VIP3'},{type:'tb',name: '10'},{type:'tb',name: '50'},{type:'tb',name: '30000'}, {type:'tb',name: '25'}],
			[{type:'tb',name: 'VIP4'},{type:'tb',name: '30'},{type:'tb',name: '200'},{type:'tb',name: '100000'}, {type:'tb',name: '100'}],
			[{type:'tb',name: 'VIP5'},{type:'tb',name: '50'},{type:'tb',name: '400'},{type:'tb',name: '200000'}, {type:'tb',name: '200'}],
			[{type:'tb',name: 'VIP6'},{type:'tb',name: '800'},{type:'tb',name: '600'},{type:'tb',name: '300000'}, {type:'tb',name: '300'}],
			[{type:'tb',name: 'VIP7'},{type:'tb',name: '200'},{type:'tb',name: '1000'},{type:'tb',name: '500000'}, {type:'tb',name: '500'}]
			// [{type:'tb',name: 'VIP8'},{type:'tb',name: '0.88%'},{type:'tb',name: '0.39%'},{type:'tb',name: '0.17%'}],
			// [{type:'tb',name: 'VIP9'},{type:'tb',name: '0.92%'},{type:'tb',name: '0.43%'},{type:'tb',name: '0.20%'}],
			// [{type:'tb',name: 'VIP10'},{type:'tb',name: '0.96%'},{type:'tb',name: '0.47%'},{type:'tb',name: '0.23%'}],
			// [{type:'tb',name: 'VIP11'},{type:'tb',name: '1.00%'},{type:'tb',name: '0.50%'},{type:'tb',name: '0.27%'}]
		],
		table1:[
			[{type:'th',name: 'Agent level'},{type:'th',name: 'Recharge Bonus'},{type:'th',name: 'Finance Daily interest rate'},{type:'th',name: 'Withdrawal arrival time'}],
			[{type:'tb',name: 'VIP0'},{type:'tb',name: '0.1%'},{type:'tb',name: '0.1%'},{type:'tb',name: 'within"10days"'}],
			[{type:'tb',name: 'VIP1'},{type:'tb',name: '0.3%'},{type:'tb',name: '0.3%'},{type:'tb',name: 'within"7days"'}],
			[{type:'tb',name: 'VIP2'},{type:'tb',name: '0.5%'},{type:'tb',name: '0.5%'},{type:'tb',name: 'within"6days"'}],
			[{type:'tb',name: 'VIP3'},{type:'tb',name: '0.7%'},{type:'tb',name: '0.7%'},{type:'tb',name: 'within"5days"'}],
			[{type:'tb',name: 'VIP4'},{type:'tb',name: '1.0%'},{type:'tb',name: '0.8%'},{type:'tb',name: 'within"4days"'}],
			[{type:'tb',name: 'VIP5'},{type:'tb',name: '1.1%'},{type:'tb',name: '0.9%'},{type:'tb',name: 'within"3days"'}],
			[{type:'tb',name: 'VIP6'},{type:'tb',name: '1.2%'},{type:'tb',name: '1.0%'},{type:'tb',name: 'within"2days"'}],
			[{type:'tb',name: 'VIP7'},{type:'tb',name: '1.5%'},{type:'tb',name: '1.5%'},{type:'tb',name: 'within"24hour"'}],
		],
		shareInfo:[],
		total_invite: {},
		shareLink:{
			url: ""
		}
    }
  },
  onShow(){
	 this.getShareMoney() 
  },
  methods:{
	saveLink(){
		uni.setClipboardData({
			data: this.shareLink.url,
			success: ()=> {
				uni.showToast({
					icon: 'none',
					title: this.$t('share.link.top.btn.tip'),
					duration: 2000
				});
			}
		});
	},
	// 获取分享佣金
	getShareMoney(){
		invite_balance().then(res=>{
			this.shareLink.url = res.data.link
			this.shareInfo = res.data.row
			this.total_invite = res.data.total_invite
		})
	},
	toPath(){
		uni.navigateTo({
			url:'/pages/share/draw-money'
		})
	},
	toLog(){
		uni.navigateTo({
			url:'/pages/share/share-list'
		})
	}
  }

}
</script>

<style lang="scss" scoped>
.wallet-user {
    padding: 18px 28px 90px;
    background: url('/static/img/banlance_bg.dddd9837.min.png') no-repeat 50%;
    background-size: 100% 100%;
    width: 100%;
}
.advertising-content-box {
    position: relative;
    z-index: 99;
    background: #fff;
    box-shadow: 0 1px 1px 1px rgba(0,0,0,.2);
    border-radius: 0 0 9px 9px;
    padding: 14px 12px;
    margin: -93px 14px 0;
	.cardBox{
		position: relative;
		text-align: center;
		width: 46%;
		padding: 9px 14px 7px;
		border-radius: 9px;
		background: #f20012;
		font-size: 15px;
		color: #f2f2f2;
		.trx{
			padding-top: 8px;
      text-align: left;
      font-size: xx-small;
		}
		.mon{
			display: inline-block;
			border-radius: 4px;
			padding: 0 4px;
			background: #f2f2f2;
			color: #000;
			text-align: center;
			margin-left: 5px;
		}
		.topIcon{
			width: 18px;
			height: 18px;
			background-color: rgb(242, 242, 242);
			border-radius: 3px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 5px;
			left: 5px;
		}
	}
	.m1{
		background: #249975 !important;
	}
}
.btn{
	margin-top: 10px;
	color: #fff;
	font-size: 13px;
	border-radius: 8px;
	text-align: center;
	width: 46%;
	background-color: #ffce1f;
	height: 28px;
	line-height: 28px;
	box-shadow: 0 0 9px 1px rgb(255 206 31 / 40%);
}
.btn1{
	background-color:#f2413b;
}

.advertising-content-list{
	padding: 14px;
	.advertising-content-list-lab {
	    font-size: 14px;
	    color: #959595;
	    margin-bottom: 9px;
	}
	.infoBox{
		padding: 5px;
		width: 100%;
		background: #fff;
		border: 1px solid rgba(0,0,0,.06);
		box-shadow: 0 3px 10px 0 rgb(0 0 0 / 10%);
		border-radius: 9px;
		.qrBox{
			// margin-right: 80px;
			// margin-left: 10px;
		}
		.li{
			color: #fff;
			font-size: 13px;
			border-radius: 8px;
			text-align: center;
			width: 80%;
			background-color: #ffce1f;
			height: 28px;
			box-shadow: 0 0 9px 1px rgb(255 206 31 / 40%);
			padding: 0 4px;
		}
		.red-btn{
			background-color: #f2413b;
			box-shadow: 0 0 9px 1px rgb(242 65 59 / 27%);
		}
		.white-btn{
			color: #f2413b;
			background-color: #fff;
			border: 1px solid #f2413b;
			box-shadow: 0 0 9px 1px rgb(242 65 59 / 27%);
			margin-top: 10px;
		}
	}
}
.tableBox{
	padding: 5px!important;
	.table-border{
		border-top: 1px solid rgb(228, 231, 237);
	}
	.table{
		display: flex;
		// border-top: 1px solid rgb(228, 231, 237);
		border-left: 1px solid rgb(228, 231, 237);
		// border-bottom: 1px solid rgb(228, 231, 237);
	}
	.tb{
		flex: 1;
		font-size: 14px;
		padding: 5px 3px;
		border-bottom: 1px solid rgb(228, 231, 237);
		border-right: 1px solid rgb(228, 231, 237);
		color: rgb(96, 98, 102);
		background-color: #fff;
	}
	.th{
		font-size: 14px;
		color: #303133;
		font-weight: 700;
		background-color: #f5f6f8;
	}
}
.tableM :nth-last-child(1){
	font-size: 10px !important;
	padding: 5px 1px;
}

</style>