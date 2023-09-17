<template>
  <view class="bg">
    <uni-nav-bar title="transfer record" fixed :leftType="2"></uni-nav-bar>
	<view class="info">
		<view class="top_img">
			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmMAAAA1CAYAAAANgOy+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA0LTE0VDE2OjE0OjA5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNC0xNFQyMToyMjowMSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNC0xNFQyMToyMjowMSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzU1NDU4YzMtMmE4MS01MTQxLWJlZWMtZWU1NmMzN2I2NDM2IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MjEyOGY0M2ItY2I0MC1jNDRiLWFhOTYtYmNhNmExOWUyYTg0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTZiODg4NTItMDMwMy05ZDQ4LWJmYjUtYzY4YzY4OGY5NzBiIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NmI4ODg1Mi0wMzAzLTlkNDgtYmZiNS1jNjhjNjg4Zjk3MGIiIHN0RXZ0OndoZW49IjIwMjEtMDQtMTRUMTY6MTQ6MDkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzU1NDU4YzMtMmE4MS01MTQxLWJlZWMtZWU1NmMzN2I2NDM2IiBzdEV2dDp3aGVuPSIyMDIxLTA0LTE0VDIxOjIyOjAxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GCBggwAAAilJREFUeJzt3C1uVFEcxuH3DJch6Ucq2uJIUaQCwgYIAUWCISwAWELTdAPdBYtAITAIqCDBgEdjiqWGMB3uQTUh9fAfZp5HXXde+cu5ubdlAb1/kGH8kPttzH6S7eo9AMD/rSWz3nI6nebk3o98rd7zp1Y94LLe094NedF6blRvAQCWTxvy6uEsX6p3XJhUD7jsZJq7QgwA+Fv6PI97X5wLqYWLsT5mr3oDALDU1t9uZrd6xIWFi7GWbFZvAACW25V5Nqo3XFi4GAMAWCViDACgkBgDACgkxgAACokxAIBCYgwAoJAYAwAoJMYAAAqJMQCAQmIMAKCQGAMAKCTGAAAKiTEAgEJiDACgkBgDACgkxgAACokxAIBCYgwAoJAYAwAoJMYAAAqJMQCAQsPFQz862st4/ihjv5W0skg7+3a6P/8526o6HwBYfhu7Ozf72vr3ksNbztL652xtv2nHx2NLkn5w8DwZXyZZKxkFALBqWj5mbfK09cPDO+m/PqX3afUmAICV0trrIZk/S48QAwD413p/MknP7eodAACrapLkavUIAIBV5dcWAACFxBgAQCExBgBQSIwBABQSYwAAhcQYAEAhMQYAUEiMAQAUEmMAAIXEGABAITEGAFBo6GOv3gAAsLLcjAEAFBJjAACFxBgAQKFhTNKqVwAArCg3YwAAhYaeJN0XlQAAFYbex+ZFJQBAjWFMMnEzBgBQYsjO9Wv9fFa9AwBgJf0GkpRSqsPGTDEAAAAASUVORK5CYII=" alt="">
		</view>
		<view class="userinfoBox_container">
			<view class="userinfoBox">
				<view class="top_con">
					<view class="wallet_bg">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAfCAYAAAH8T49dAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJqADAAQAAAABAAAAHwAAAAAow/qsAAADL0lEQVRYCc1XT0gUURj/3rQKgpFIUZhpEFl4qlMSFB0qqEuXQKqDHrqIdKkuHaNLYd2iQ/dgoyJio7pIQZCCFUtRhKWFUkHluv0BXZyd1+8b941vZt7uzqyz5Qcf7/v7e9/7PyMIJKUc55ZJCNElWIBRcqsopQRu7duHXNUYyakXGJNZZQkoPjx2WMqrWsY1RqqONqnIQDsFvQO1T6vAUF/F4VMkZz94eWUDOcIZuxwt0IsiuqsQvTFrzmHUNsC6Gl2H5vSJ7iBMk+WLguJbEN2pFodtoRlmo/wySqmjD1l0SdWkdK+V43dI/vxYOciLhsDdDeoGk6zmaRLOjeAhcGi5DIn9sLVhelbpPgUWBUDPM8npJMHKr4+pa/rzmexHJ0vLInHADvvCYlfmnqTG1djKCyTt+eWB+bIDinGHBWIiq+4wVTQOwVYlx2mxRd5zvJqzVsg3wZ1srEJ5+AcA8CIYl0I1zTDOgG+AR4MBBn0NbM+RtxeAT3U/H92L4Lfgc7qjimzDnwZgD9o8QH9zPIOtBXeD+RqMS24OQPnqF4mtJgAziYFhSLvLXnfG8RbyZGeOGV2iobklVmUMZHWfcM+m1b4nBBoLjLOtzQddENG5PwQWa5jW9l6yH/SRaO0imQu/O3yxp9FFb6ibcob8BDkTGdwavNU0shrn+VnnzZcEzcSeM62WkMhgIyFrbYYRdWss+0Hh4+TdZ5i0JhTUXkNROcDwrbNEANsF/prESlTAWIDvzFKvVSQE95fAimj3VQmvyQ3cFvBEqZ97kUAQnNS2LfUbu3GQ8Q48CHa3RKLbP9IsmIO4mG3gq2Au8vhKKSxY7qVY92IwO5IuHZK4+uS3LMlfU/gkLVZPSzVtqGthzrPz5OBrnclav5NEWw/J7698PzKmKvHGWXUrTE4/9opKHblF1MAfRiX68YbsJ2eVZmzrtsfEuh34iFn8PXDGrhAVC4sFFGapmL1mLEY3qqs/3pOpI1SSpU1O9jrJyfv8klaK9PmwlE59C/N1F0vJ1W0pY5VhCFaFzRl8/9M0p5ZyC6p4DeavgpVAfb4isEEPgF+CbfC/pk/o8DTYXcW/a6P8fWg/ndcAAAAASUVORK5CYII=" alt="">
						<view class="title">Balance：</view>
					</view>
					<view class="balance_box">
						<view class="number">
							<view v-for="(item,index) in mList.filter(item=>item.currency == 'SYSTEM')" :key="index">
								{{ item.symbo }}: {{ item.balance }}
							</view>
						</view>
						<view class="icon" @click="refreshBalance">
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAFNQDtUAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIqADAAQAAAABAAAAIgAAAAACeqFUAAADrElEQVRYCbWX3YtNURjGZ1waZXyOCxJ3mnwrMcOdC0XEXPjM9SCUOxf+BlwQpURECYUZH3El0iiUKyUpJR8XaswQM7bfs85aq7X3WXvZ55zmreesdz3v877vPmuvvc86bW3Wsiz74fy6kWBWRxqiGGG+yCsVxJaGxHaIc3WpkIe8yjuwg37iHEhjbm5GMSHBdBAcccFNYbDom2TzUYwEc8XbwUy4DaCzvb39TBBvMwLIkBP5FHwC04oBJSwOSRFmzng9DIS+EXllGLE+sT0RukCh+lug/JRYl/k6nik4pj0fHcapD47mKEQ3JLQ2lguGEwS3nIrxJTgP7oBx4GxqmON9Gx32RMJBu97q12g0UkssT+RFQzYv04pdAM+iqgqkCqlIN5hfQR+VkLvT3Duc3BMRVUdI0u6DX67INxXC1ka0UQrtL/C5LgjpVv0vfl8oYD4N3AWyL2Es6iPqBGfBO/ATDIF9UXGRRDgHOBvD0SbTZnvlSMYrxTw/J3jYCgc8WXCIL7Ga+i1PYJMN9hbyolO0w0Bf8zIYMiIc2YFoRglZS6l96hZfkluiLaVJWak8mdsnu0rViUCtRO3FmvHuzL88E4lhiCLPmeffr6GgIZ9qxxpKCMTkdoEOtyazglhllwJ6PE64IqUbLFWRArLJrkgzt/gBBcZNE1Mry74y/kx1DWNoe23ebFdkuxxIfb+RUBzz0ey3BQ7H4ir0wQr09ObuP/M+G9OwJVrAkQj0M/BHyoiVvwZcgbKRYsvAVaB3TFX7jVC/mKvL6lbiKbAV6KY507rfBlqa3HKFBRWzGvc6ZmrsPZ89oTbpIz5i0mofIwz9yYQKQWpoU4zWSpqNtENpzDvANjDDl2Gix/ELkCmp+tX7KmmHmuuAXswy9fIrbjIhuoGWXnYvXa61KPV1RNWDmzMtzxSgjSWrP1S31rc0m146THjThZyyM61IUy/I0m6JAL20FdxdML9aIo6ChYm8CQnRcwE4DronpEFTRbmat0D2uKkCLSTR84npnGUntUdC291C3YZSabo3aLyxeCGKrWioYhNieqwKLuKiKREQodvQwa+Ra6HJoaDRNZ8L+cIGdAztATrry3Q8rXSU9cUSDrXWgx/A2caEvBZCqcd53GUwDoDcX+z/FkFAjg7u90BoB2O5yQMr2fqvehoUT8c6V70BH8FnoDo6Js0FuuBJILSbTPo5H0sbteSFFDO4sOlwm4Fu2TIwD3SCMaAm+gf2GjwEj2j8nbGS/QNGLMJl6LkecQAAAABJRU5ErkJggg==" alt="">
						</view>
					</view>
					<view class="bottom_box">
						<view :class="chosedIndex == '1'?'left add_fake chosed':'left add_fake'">
							<view class="title_top" @click="choseType('1')">Transfer Out</view>
							<view class="cur_num">{{transoutTotal}}</view>
						</view>
						<view :class="chosedIndex == '2'?'left chosed':'left'">
							<view class="title_top" @click="choseType('2')">Transfer In</view>
							<view class="cur_num">{{transinTotal}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="content_box">
		<view class="list flex flex-col" v-if="list.length>0">
			<view class="item" v-for="(item,index) in list" :key="index" @click="showDetails(item)">
				<view class="item_top">
					<view class="flex-col add_width">
						<view class="order_box">
							<view class="number_box">
								<text> {{item.order_number}}</text>
								<image src="/static/img/copy.min.png" class="copy" @click="copyNumber(item.order_number)"></image>
							</view>
							
						</view>
						<view class="time">{{item.created_at}}</view>
					</view>
					<!-- status 0 发起转账 1 接收转账 2 转账成功 3 取消转账 -->
					<view :class="'status status_'+item.status" >{{getStatus(item.status)}}</view>
					<view class="jf flex-cc number_width">
						<text class="num" style="color:red" v-if="form.tranType == '1'">-{{item.amount}}</text>
						<text class="num" v-if="form.tranType == '2'">+{{item.amount}}</text>
						<text>{{$t('trading-record.currency')}}: {{item.currency_symbol}}</text>
					</view>
				</view>
				<view class="item_bottom">
					<view class="btn_box btn_box1" 
						v-if="item.status == 0" 
						@click.stop="cancelTransfer(item)">Transfer Cancel</view>
					<view class="btn_box btn_box2" 
						v-if="form.tranType == '2' && item.status == 0" 
						@click.stop="confirmTransfer(item)">Transfer Confirm</view>
				</view>
			</view>
			<u-loadmore :status="status" line :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText" />
		</view>
		<u-empty v-else mode="data" :text="$t('nomore')" style="padding-top: 50px;" />
	</view>
	<u-popup :show="detailsPopup" class="rulePopup" mode="center" width="90%" :round="15" closeable @close="detailsPopup = false">
		<view class="details_content">
			<view class="title">Transfer Details</view>
			<view class="container">
				<view class="content" v-for="(item,index) in detailsList" :key="index">
					<view class="content_title">{{item.name}}:</view>
					<view class="content_con">{{details[item.nameVal]}}</view>
				</view>
				<view v-if="chosedIndex == 1">
					<view class="content" v-for="(item,index) in receiveList" :key="index">
						<view class="content_title">{{item.name}}:</view>
						<view class="content_con">
							<text>{{details[item.nameVal]}}</text>
							<image v-if="item.nameVal == 'receive_code'" src="/static/img/copy.min.png" class="copy" @click="copyNumber(details[item.nameVal])"></image>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="content" v-for="(item,index) in senderList" :key="index">
						<view class="content_title">{{item.name}}:</view>
						<view class="content_con">{{details[item.nameVal]}}</view>
					</view>
				</view>
				<view class="content">
					<view class="content_title">Transfer Status:</view>
					<view class="content_con">{{getStatus(details.status)}}</view>
				</view>
			</view>
		</view>
	</u-popup>
	<u-modal :show="showCancel"  title="Cancel Transfer" 
				showCancelButton 
				@confirm="sureCancel"
				confirmText="Confirm"
				cancelText='Cancel' 
				@cancel="showCancel=false">
		<view class="slot-content">
			<p>Are you sure to cancle transfer ?</p>
		</view>
	</u-modal>
	<u-modal :show="showConfirm"  title="Confirm Transfer" 
				showCancelButton 
				@confirm="sureTransfer"
				confirmText="Confirm"
				cancelText='Cancel' 
				@cancel="showConfirm=false">
		<view class="slot-content receive_content">
			<view>Receive Code:</view>
			<u--input
                    placeholder="Please enter the receive code"
                    border="none"
                    type="number"
                    v-model="receiveCode"
                    clearable
                ></u--input>
		</view>
	</u-modal>
  </view>
</template>

<script>
import {usertransferRecord,invite_balance,usertransferCancel,usertransferReceive } from '@/api/index.js'
import {mapState} from 'vuex'
export default {
  data(){
    return{
		form:{
			pageIndex: 1,
			pageSize: 10,
			tranType: '1'
		},
		total: 0,
		list:[],
		mList:[],
		typeList:[{name:'TranseferOut',type:'1'},{name:'TranseferIn',type:'2'}],
		chosedIndex:'1',
		status:'loadmore',
		transoutTotal:0,
		transinTotal:0,
		detailsPopup:false,
		details:{},
		cancelItem:{},
		showCancel:false,
		confirmItem:{},
		showConfirm:false,
		receiveCode:null,
		detailsList:[
			{name:'Transfer Amount',nameVal:'amount'},
			{name:'Transfer Currency',nameVal:'currency_symbol'},
			{name:'Transfer Time',nameVal:'created_at'},
			{name:'Transfer Order',nameVal:'order_number'},
		],
		receiveList:[
			{name:'Receive Code',nameVal:'receive_code'},
			{name:'Receive Name',nameVal:'receiver_username'},
			{name:'Receive Mobile',nameVal:'receiver_mobile'},
		],
		senderList:[
			{name:'Sender Name',nameVal:'sender_username'},
			{name:'Sender Mobile',nameVal:'sender_mobile'},
		]
    }
  },
  	onReachBottom(){
		if(this.list.length<this.total){
			this.status = 'loading'
			this.form.pageIndex++
			this.getTransferRecord()
		}else{
			this.status = 'nomore'
		}
	},
  onShow(){
	this.$store.dispatch('GetInfo').then(res => {
		this.mList = res.data.Balances
	})
	this.getTransferRecord() 
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
		userInfo: state => state.userInfo
	}),
  },
  methods:{
	refreshBalance() {
		this.$store.dispatch('GetInfo').then(res => {
			this.mList = res.data.Balances
		})
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
	showDetails(item) {
		this.detailsPopup = true;
		this.details = item;
	},
	getStatus(status) {
		// 0 发起转账 1 接收转账 2 转账成功 3 取消转账
		/**
		 * 转出 0->waiting
		 * 转入 0->pending
		 */
		switch(status){
			case 0:
				if(this.form.tranType == '1') {
					return 'waiting'
				}else {
					return 'pending'
				}
			case 2:
				return 'success';
			case 3:
				return 'cancle';
			default:break
		}
	},
	choseType(type) {
		this.chosedIndex = type;
		this.form.tranType = type;
		this.reset()
		this.getTransferRecord()
	},
	reset() {
		this.form.pageIndex = 1
		this.list = []
	},
	getTransferRecord(){
		usertransferRecord(this.form).then(res=>{
			if (res.code === 1) {
				this.list = this.list.concat(res.data.rows);
				this.total = res.data.total;
				this.transoutTotal = res.data.total_out;
				this.transinTotal = res.data.total_in;
				if (this.list.length===this.total) {
					this.status = 'nomore'
				}
			}
		})
	},
	cancelTransfer(item) {
		this.cancelItem = item;
		this.showCancel = true;
	},
	sureCancel() {
		usertransferCancel({id:this.cancelItem.id}).then(res=>{
			if(res.code == 1) {
				this.reset()
				this.getTransferRecord()
				this.showCancel = false
			}
			this.showToast(res.msg);
		})
	},
	showToast(text) {
		uni.showToast({
			icon: 'none',
			title: text,
			duration: 2000
		});
	},
	confirmTransfer(item) {
		this.showConfirm = true;
		this.confirmItem = item;
	},
	sureTransfer() {
		usertransferReceive({id:this.confirmItem.id,receive_code:this.receiveCode}).then(res=>{
			if(res.code == 1) {
				this.reset()
				this.getTransferRecord();
				this.showConfirm = false
			}
			this.showToast(res.msg);
		})
	}
  }

}
</script>

<style lang="scss" scoped>
.bg {
	height: 100%;
}
.top_types {
	width: 96%;
	margin: 0 auto;
	// border: 1px solid #f2443e;
	border-radius: 4px;
	height: 42px;
	display: flex;
	.item {
		display: flex;
		width: 50%;
		height: 100%;
		align-items: center;
		justify-content: center;
		border: 1px solid #f2443e;
		&:first-child {
			border-radius: 4px 0 0 4px;
		}
		&:last-child {
			border-left: none;
			border-radius: 0 4px 4px 0;
		}
	}
	.chosed_item {
		background: #f2443e;
		color: #fff;
	}
}
.txtBox {
	.text {
        color: #fff;
        font-weight: 600;
        font-size: 15px;
    }
}
.info {
  background: url('/static/img/banlance_bg.png') no-repeat center;
  background-size: 100% 100%;
  height: 217px;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 25px;
  .user-des {
	margin-bottom: 12px;
	.nickname {
		text-align: center;
		font-size: 18px;
	}
  }
  .top_img {
	width: 80%;
	img {
		height: auto;
		width: 100%;
	}
  }
  .userinfoBox_container {
	width: 90%;
	border-radius: 10px;
	padding: 14px;
	margin-top: -4px;
	background: #fff;
	box-shadow: 0 0.02667rem 0.48rem 0 rgba(203,202,220,.56);
  }
  .userinfoBox {
    padding: 8px;
	width: 100%;
	height: 149px;
	background: linear-gradient(135deg,#fe9b0c,#ffcc51);
	box-shadow: 0 0.05333rem 0.42667rem 0 rgba(253,188,51,.55);
	border-radius: 10px;
	.top_con {
		.wallet_bg {
			display: flex;
			align-items: center;
			img {
				width: 23px;
				height: 19px;
			}
			.title {
				color: #fff;
				font-size: 16px;
				margin-left: 10px;
			}
		}
		.balance_box {
			display: flex;
			justify-content: center;
			margin-top: 10px;
			align-items: center;
			.number {
				margin-right: 10px;
				font-size: 24px;
				color: #fff;
				font-weight: 800;
			}
			img {
				width: 18px;
				height: 18px;
			}
		}
		.bottom_box {
			display: flex;
			gap: 18px;
			justify-content: center;
			margin-top: 10px;
			.left {
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #fff;
				font-size: 16px;
				.cur_num {
					margin-top: 6px;
				}
				view {
					font-weight: 500;
				}
				.title_top {
					font-size: 16px;
				}
			}
			.add_fake {
				position: relative;
				&::after {
					// content: "";
					position: absolute;
					right: -9px;
					top: 0;
					width: 2px;
					height: 30px;
					top: 6px;
					background: #fff;
				}
			}
			.chosed {
				color: #2c2c2c;
				font-weight: 800;
				background: #fff;
				border-radius: 10px;
				padding: 5px 0;
				.title_top {
					position: relative;
					// &::after {
					// 	content: "";
					// 	width: 48px;
					// 	height: 4px;
					// 	border-radius: 2px;
					// 	background: #f2443e;
					// 	position: absolute;
					// 	bottom: -5px;
					// 	left: 50%;
					// 	transform: translateX(-50%);
					// }
				}
			}
		}
	}
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
	// margin-top: -80px;
	background: #fff;
	border-radius: 10px 10px 0 0 ;
	padding-top: 20px;
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
// 0 发起转账 1 接收转账 2 转账成功 3 取消转账
.status_0 {
	background: rgb(240, 240, 106);
	color: #fff;
}

.status_1 {
	background: #f2443e;
	color: #fff;
}
.status_2 {
	background: #6bbe58;
	color: #fff;
}
.status_3 {
	background: #cdcdcd;
	color: #fff;
}

.item{
	padding: 14px 9px;
	border-bottom: 1px solid #f2f5f7;
	.item_top {
		display: flex;
		width: 100%;
	}
	.item_bottom {
		width: 100%;
		margin-top: 10px;
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		.btn_box {
			padding: 8px 12px;
			font-size: 14px;
			border-radius: 4px;
		}
		.btn_box2 {
			background: #6bbe58;
			color: #fff;
		}
		.btn_box1 {
			background: #f2443e;
			color: #fff;
		}
	}
	.add_width {
		width: 196px;
	}
	.number_width {
		flex: 1;
		align-items: flex-end;
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
					width: 140px;
				}
		}
		.copy {
			width: 14px;
			height: 14px;
			margin-left: 10px;
		}
	}
}
.receive_content {
	width: 100%;
	        ::v-deep {
            .u-input {
                width: 100%;
                border: 1px solid #cdcdcd;
                 padding: 9px 15px !important;
				 margin-top: 10px;
            }
        }
}

</style>