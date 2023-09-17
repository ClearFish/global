<template>
	<view class="bg">
		<uni-nav-bar :title="$t('integral-record.title')" fixed :leftType="2"></uni-nav-bar>
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
							<view class="left add_fake">
								<view class="title_top">History Withdrawal</view>
								<view class="cur_num">{{walletInfo.symbo}}{{walletInfo.total_money}}</view>
							</view>
							<view class="left">
								<view class="title_top">Today Withdrawal</view>
								<view class="cur_num">{{walletInfo.symbo}}{{walletInfo.today_money}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content_box">
			<view class="list flex flex-col" v-if="renderList.length>0">
				<view class="flex-sb item" v-for="(item,index) in renderList" :key="index">
					<view>
						<view class="flex-col add_flex">
							<view class="first_box">
								<view class="number_box order_box">
									<text>{{item.order_number}}</text>
									<image src="/static/img/copy.min.png" class="copy" @click="copyNumber(item.order_number)"></image>
								</view>
								<view class="time">{{item.created_at}}</view>
							</view>
							<view class="jf flex-cc status_btn" :class="'status'+item.status">
								{{statusList[item.status]}}
							</view>
							<view class="jf number_box">
								<text class="num red" style="margin-left:10px">-{{item.money}}</text>
								<text>{{$t('trading-record.currency')}}: {{item.currency_symbol}}</text>
							</view>
						</view>
						<!--  -->
						<view class="cancel_box" v-if="item.status == 0">
							<view class="cancel_btn" @click="cancel(item)">Cancel</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" line :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText" />
				
			</view>
			<u-empty v-else mode="data" :text="$t('nomore')" style="padding-top: 50px;" />
			<u-modal :show="show"  title="Cancel Withdraw" 
						showCancelButton 
						@confirm="sureCancel"
						confirmText="Confirm"
						cancelText='Cancel' 
						@cancel="show=false">
				<view class="slot-content">
					<p>Are you sure to cancle withdraw ?</p>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
import { epaidRecord,invite_balance,cancelWithdraw } from '@/api/index.js'
import miment from 'miment'
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
			// 状态 0:待审 1:成功 2:失败 3:等待 4:取消
			statusList:['applying','success','fail', 'pending','cancelled'],
			total: 0,
			invite_code: '',
			mList:[],
			walletInfo:{},
			renderList:[],
			show:false,
			choseItem:{}
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
		this.getFundRecord()
		this.getInviteCode()
	},
	onShow() {
		this.$store.dispatch('GetInfo').then(res => {
			this.mList = res.data.Balances
		})
	},
	methods:{
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
		},
		// 取消提现
		cancel(item) {
			this.show = true
			this.choseItem = item
		},
		// 确认取消
		sureCancel() {
			cancelWithdraw({order_number:this.choseItem.order_number}).then(res=>{
				if(res.code ==1) {
					this.list = [];
					this.renderList = [];
					this.show = false
					this.getFundRecord()
				}else {
					uni.showToast({
						icon: 'none',
						title: res.msg,
						duration: 2000
					});
					this.show = false
				}
			})
		},
		getInviteCode(){
			invite_balance().then(res=>{
				this.invite_code = res.data.invite_code
			})
		},
		refreshBalance() {
			this.$store.dispatch('GetInfo').then(res => {
				this.mList = res.data.Balances
			})
		},
		getFundRecord(){
			console.log(this.list,this.renderList,"rendd")
			epaidRecord(this.params).then(res =>{
				this.total = res.data.total;
				this.walletInfo = res.data.TotalWithdrawals.SYSTEM
				let timeGap = 259200
				this.list = this.list.concat(res.data.rows)
				this.renderList = this.list.filter(item=>{
					if(item.status == 2) {
						let distance = miment().distance(new Date(),item.created_at).stamp()/1000;
						if(distance < timeGap) {
							return item
						}
					}else {
						return item
					}
				})
				if (this.list.length===this.total) {
					this.status = 'nomore'
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.txtBox {
	 padding: 9px 18px;
	.text {
        color: #fff;
        font-weight: 600;
        font-size: 15px;
    }
}
.cancel_box {
	display: flex;
	justify-content: flex-end;
	margin-top: 8px;
	.cancel_btn {
		padding: 4px 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #cdcfd6;
		border-radius: 4px;
		color: #fff;
		font-size: 14px;
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
	height: 139px;
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
			margin-top: 12px;
			.left {
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				.cur_num {
					margin-top: 6px;
				}
				view {
					font-weight: 500;
				}
				.title_top {
					font-size: 13px;
				}
			}
			.add_fake {
				position: relative;
				&::after {
					content: "";
					position: absolute;
					right: -9px;
					top: 0;
					width: 2px;
					height: 30px;
					top: 6px;
					background: #fff;
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
.content_box {
	background: #fff;
	border-radius: 10px 10px 0 0;
	margin-top: 12px;
}
.item{
	padding: 14px 9px;
	border-bottom: 1px solid #f2f5f7;
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
	.status_btn {
		width: 64px;
		height: 28px;
		border-radius: 4px;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 6px;
		color: #fff;
	}
	.status0{
			background: rgb(240, 240, 106);
			
		}
		.status1{
			background: #6bbe58;
		}
		.status2{
			background: #f2443e;
		}
		.status3{
			background: #312f2f;
		}
		.status4{
			background: #cdcfd6;
		}
}
.add_flex {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;
	width: 100%;
	.first_box {
		width: 195px;

	}
	.number_box {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: flex-end;
	}
	.order_box {
		display: flex;
		align-items: center;
		flex-direction: row;
		.copy {
			width: 14px;
			height: 14px;
			margin-left: 6px;
		}
	}
}
</style>