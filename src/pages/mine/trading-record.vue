<template>
	<view class="bg">
		<uni-nav-bar :title="$t('trading-record.title')" fixed :leftType="2"></uni-nav-bar>
		<view class="info">
			<view class="userinfoBox flex-sb">
				<view class="userInfo flex flex-item-col-center">
					<view class="user-des flex flex-col">
						<view class="nickname" style="display:flex;align-item:center">
							<text v-if="hidePhone">{{ $t('mine.user.txt') }} {{ addHide(userInfo.mobile) }}</text>
							<text v-else>{{ $t('mine.user.txt') }} {{ userInfo.mobile }}</text>
							<u-icon name="eye-off" color="#fff" size="18" style="margin-left:10px" v-if="hidePhone"  @click="clickEye(false)"></u-icon>
							<u-icon name="eye" color="#fff" size="18" style="margin-left:10px" v-else @click="clickEye(true)"></u-icon>
						</view>
						<view class="usercode">{{ $t('mine.nickname') }} {{ invite_code }}</view>
					</view>
				</view>
				<view class="txtBox">
					<view class="text" v-for="(item,index) in mList" :key="index">{{ item.symbo }}: {{ item.balance }}</view>
					<view class="icon"></view>
				</view>
			</view>
		</view>
		<view class="content_box">
			<view class="list flex flex-col" v-if="list.length>0">
				<view class="flex-sb item" v-for="(item,index) in list" :key="index">
					<view class="flex-col add_width">
						<view class="order_box">
							<view class="number_box">
								<text> {{item.order_number}}</text>
								<image src="/static/img/copy.min.png" class="copy" @click="copyNumber(item.order_number)"></image>
							</view>
							
						</view>
						<view class="time">{{item.created_at}}</view>
					</view>
					<view :class="'status status_'+item.status">{{getStatus(item.status)}}</view>
					<view class="jf flex-cc number_width">
						<text class="num">+{{item.money}}</text>
						<text>{{$t('trading-record.currency')}}: {{item.currency_symbol}}</text>
					</view>
				</view>
				<u-loadmore :status="status" line :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText" />
			</view>
			<u-empty v-else mode="data" :text="$t('nomore')" style="padding-top: 50px;" />
		</view>
	</view>
</template>

<script>
import { epayRecord,invite_balance } from '@/api/index.js'
import {mapState} from 'vuex'
export default{
	data(){
		return{
			status: 'loadmore',
			list:[],
			params:{
				pageIndex:1,
				pageSize: 20
			},
			total: 0,
			invite_code: '',
			mList:[],
			hidePhone:true
		}
	},
	onReachBottom(){
		if(this.list.length<this.total){
			this.status = 'loading'
			this.params.pageIndex++
			this.getFundRecord()
		}else{
			this.status = 'nomore'
		}
	},
	computed:{
		loadingText(){
			return this.$t('loading')
		},
		loadmoreText(){
			return this.$t('more')
		},
		nomoreText(){
			return this.$t('nomore')
		},
		...mapState({
			columns: state => state.langList,
			userInfo: state => state.userInfo
		}),
	},
	onReady(){
		this.getFundRecord();
		this.getInviteCode()
	},
	onShow() {
		this.$store.dispatch('GetInfo').then(res => {
            this.mList = res.data.Balances
        })
	},
	methods:{
		clickEye(type) {
			this.hidePhone = type;
		},
		addHide(mobile) {
			return mobile.substr(0,3)+'****'+mobile.substr(mobile.length-3,3)
		},
		getInviteCode(){
			invite_balance().then(res=>{
				this.invite_code = res.data.invite_code
			})
		},
		getFundRecord(){
			epayRecord(this.params).then(res =>{
				this.total = res.data.total
				this.list = this.list.concat(res.data.rows)
				if (this.list.length===this.total) {
					this.status = 'nomore'
				}
			})
		},
		getStatus(status) {
			switch(status){
				case 0:
					return 'pending';
				case 1:
					return 'success';
				default:break
			}
		},
		copyNumber(number) {
			uni.setClipboardData({
				data: number,
				success: ()=> {
					uni.showToast({
						icon: 'none',
						title: 'Replicating Success',
						duration: 2000
					});
				}
      		});
		}
	}
}
</script>

<style lang="scss" scoped>
.bg {
	height: 100%;
}
.txtBox {
	.text {
        color: #fff;
        font-weight: 600;
        font-size: 15px;
    }
}
.info {
  background: url('/static/my-center/bg_top.37d4f848.min.png') no-repeat 50%;
  background-size: 100% 100%;
  height: 158px;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  .userinfoBox {
    padding: 10px;
  }

  .user-des {
    padding-left: 5px;
  }

  .avatar {
    border-radius: 50%;
    width: 56px;
    height: 56px;
  }

  .level {
    padding-right: 10px;
  }

  .nickname {
    font-size: 15px;
  }

  .usercode {
    font-size: 13px;
  }
}
.order_box {
	display: flex;
	justify-content: space-between;
	align-items: center;

	.number_box {
		display: flex;
		align-items: center;
		gap: 10px;
		.copy {
			width: 14px;
			height: 14px;
		}
	}
}
.content_box {
	margin-top: -80px;
	background: #fff;
	border-radius: 10px 10px 0 0 ;
}
.status {
	width: 64px;
	height: 28px;
	border-radius: 4px;
	font-size: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 6px;
}
.status_0 {
	background: #cdcdcd;
	color: #fff;
}
.status_1 {
	background: #6bbe58;
	color: #fff;
}
.item{
	padding: 14px 9px;
	border-bottom: 1px solid #f2f5f7;
	.add_width {
		width: 196px;
	}
	.number_width {
		flex: 1;
	}
	.time{
		font-size: 15px;
		font-weight: 600;
		color: #999;
		image{
			width: 26px;
			height: 26px;
			margin-right: 5px;
		}
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
</style>