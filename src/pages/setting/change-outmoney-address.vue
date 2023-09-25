<template>
	<view class="bg">
		<uni-nav-bar :title="'Add Bank Account'" fixed :leftType="2">
		</uni-nav-bar>
		
		<!-- <view class="wallet-user a-text-center">
		</view> -->

		<view class="add-box">
			<view class="add-box-bg">
				<view class="title-box flex flex-item-col-center">
					<image src="/static/img/cash1.min.png" class="title-icon"></image>
					<text> Add Bank Account </text>
				</view>

				<view class="payMentBox flex flex-warp">
					<view class="payMentItem flex-cc" v-for="(item,key,index) in newMlist" :key="index" :class="{'activePayMent': currentIndex===item.symbo}" @click="selectType(item,index, key)">
						<image src="/static/img/withdrawal1.png" class="image-icon"></image>
						<text>{{ item.symbo }}</text>
						<u-icon name="checkbox-mark" class="selecticon" size="18" color="#fff" v-if="currentIndex === item.symbo"></u-icon>
					</view>
				</view>
				<u--form labelPosition="top" :model="form" ref="form1" style="position: relative;" :labelWidth="150">
					<view style="width: 100%;
							height: 38px;
							position: absolute;
							top: 36px;
							z-index: 99;" @click="showSex = true"></view>
					<u-form-item :label="'* '+$t('change-outmoney-address.cell1')" @click="showSex = true"  v-if="actions.length>0 &&actions[0].length>0">
						<u--input v-model="bank_name" disabled :placeholder="$t('change-outmoney-address.label1')"></u--input>
					</u-form-item>
					<u-form-item v-for="(item,key) in formItem" :key="key" :label="item.required ? '* '+item.label:item.label">
						<u--input v-model="form.form[key]" :placeholder="item.placeholder">
							<template slot="suffix" v-if="item.label == 'OTP'">
								<u-button
									@tap="getCode('bankbind')"
									type="text"
									:disabled="isSend"
									size="mini"
								>{{isSend? `${time}s again` : $t('login.code')}}</u-button>
							</template>
						</u--input>
					</u-form-item>
					<!-- <u-form-item label='* Captcha' v-if="showOPTvertify">
						<u--input :placeholder="$t('login.label3')" clearable v-model="form.form.opt_code">
							<template slot="suffix">
								<u-button
									@tap="getCode('bankbind')"
									type="text"
									:disabled="isSend"
									size="mini"
								>{{isSend? `${time}s again` : $t('login.code')}}</u-button>
							</template>
                		</u--input>
					</u-form-item> -->
				</u--form>
			</view>
			<u-button type="primary" :text="$t('my-profile.btn')" color="#fa3534" class="btn" @click="setOutMoneyAddress"></u-button>
		</view>
		<!-- <u-picker :show="showSex1" 
				  :columns="actions" 
				  keyName="bank_name" 
				  @confirm="confirm" 
				  :cancelText="$t('btn.cancel')" 
				  :confirmText="$t('btn.confirm')" 
				  @cancel="showSex=false">
		</u-picker> -->
		<u-popup :show="showSex" mode="bottom" :round="15" class="popupStyle" closeOnClickOverlay>
            <view class="container_box">
				<view class="top_action">
					<view @click="showSex=false" class="cancle">{{$t('btn.cancel')}}</view>
					<view class="sure" @click="confirm">{{$t('btn.confirm')}}</view>
				</view>
				<u-input v-model="searchVal" @change="inputChange"/>
				<view class="search_box">
					<view :class="itemChosedIndex == index ? 'search_item chosedItem':'search_item'" v-for="(item,index) in scrollList" :key="index" @click="choseItem(item,index)">{{item.bank_name}}</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { bankInfo, bindbank,smsSend } from '@/api/index.js'
import { mapState } from 'vuex'
export default{
	data(){
		return{
			showSex: false,
			bank_name: null,
			showSelect: false,
			newMlist:[],
			form:{
				bank_id:'',
				form:{}
			},
			currency: '',
			fileList1: [],
			actions: [],
			formItem:{},
			bankInfo:{},
			currentIndex: null,
			searchVal:'',
			scrollList:[],
			itemChosedIndex:null,
			choseitem:{},
			time: 60,
            timmer: null,
            isSend: false, // 是否发送验证码
			showOPTvertify:false
		}
	},
	onLoad(){
		this.getUserInfo()
		this.getBankList()
	},
	onUnload(){
        clearInterval(this.timmer)
    },
	computed:{
		...mapState({
			userInfo: state => state.userInfo
		})
	},
	methods:{
		selectType(item){
			console.log(item,"item")
			this.form={
				bank_id:'',
				form:{}
			}
			this.currentIndex = item.symbo;
			// this.showOPTvertify = item.user_bind_bank.length > 0
			this.showOPTvertify = this.bankInfo[item.currency].user_bind_bank.length > 0
			const data = this.bankInfo[item.currency]
			this.formItem = data.form
			this.actions = []
			this.actions.push(data.banks)
			this.scrollList = this.actions[0]
			this.searchVal = ''
			this.itemChosedIndex = null
			this.choseitem = {}
			this.bank_name = ''
		},
		// 发送已验证码
        getCode(type){
			const params = {
				mobile: this.userInfo.mobile,
				event: type,
				area_code: '91'
			}
			smsSend(params).then(res =>{
			if(res.code===1){
				uni.showToast({
					icon:'success',
					title: res.msg,
					duration: 2000,
				});
				this.isSend = true
				this.timmer = setInterval(()=>{
					if(this.time===1){
						clearInterval(this.timmer)
						this.isSend = false
						this.time=60    
					}
					this.time--
				},1000)
			}
			}) 
        },
		// 获取银行列表
		getBankList(){
			bankInfo().then(res=>{
				let type = this.$route.query.type;
				this.bankInfo = res.data.currency;
				let data;
				if(type == 'USDT') {
					data = res.data.currency.USDT;
					this.showOPTvertify = res.data.currency.USDT.user_bind_bank.length > 0
				}else {
					data = res.data.currency.SYSTEM
					this.showOPTvertify = res.data.currency.SYSTEM.user_bind_bank.length > 0
				}
				
				this.actions.push(data.banks)
				this.formItem = data.form
				this.currentIndex = data.symbo
				// this.actions.push(res.data.banks);
				this.scrollList = this.actions[0]
			})
		},
		getUserInfo() {
			this.$store.dispatch('GetInfo').then(res=>{
				this.newMlist=res.data.Balances
			})
		},
		inputChange(e) {
			console.log(e);
			if(!e) {
				this.scrollList = this.actions[0]
			}else {
				this.scrollList = this.scrollList.filter(item=>item.bank_name.toUpperCase().indexOf(e.toUpperCase()) != -1)
			}
		},
		choseItem(item,index) {
			this.itemChosedIndex = index;
			this.choseitem = item
		},
		selectCurrency(item){
			this.actions = []
			this.form.bank_id = null
			this.bank_name = ''
			this.currency = item.value[0].symbo
			let banks = this.bankInfo[item.value[0].currency].banks
			this.actions.push(banks)
			this.showSelect = false
		},
		confirm(){
			if(!this.choseitem.bank_id) {
				uni.showToast({
					icon:'error',
					title: 'place select bank',
					duration: 2000,
				});
			}else {
				this.form.bank_id = this.choseitem.bank_id
				this.bank_name = this.choseitem.bank_name
				this.showSex = false
			}
		},
		afterRead(){
			
		},
		deletePic(){
			
		},
		// 绑定地址
		setOutMoneyAddress(){
			bindbank(this.form).then(res=>{
				uni.showToast({
					title: 'success!',
					icon: 'none'
				})
				setTimeout(()=>{
					uni.navigateBack()
				},1000)
				
			})
		}
		
	}
}
</script>

<style lang="scss" scoped>
	.wallet-user {
	    padding: 20px 31px 99px;
	    background: url('/static/img/banlance_bg.dddd9837.min.png') no-repeat 50%;
	    background-size: 100% 100%;
	    width: 100%;
	}
	.wallet-box {
	    padding: 0 5px;
	    // margin-top: -71px;
		.list{
		    background: #fff;
		    box-shadow: 0 0 .8rem 0 rgba(58,58,58,.07);
		    margin-top: 15px;
			border-radius: 10px;
			padding: 11px!important;
			.left-icon{
				width: 18px;
				height: 18px;
				margin-right: 11px;
			}
			::v-deep .u-input{
				background-color: #fff !important;
			}
			::v-deep .u-border-bottom{
				border-color: 1px solid #f4f6f8 !important;
			}
		}
	}
	.btn{
		font-size: 16px;
		height: 44px;
		line-height: 44px;
		margin: 14px 0 11px 0;
	}
	.content-show-box{
			margin-top: 10px;
			height: 42px;
			display: flex;
			line-height: 42px;
			padding: 0 9px;
			background: #fff;
			border: 0.5px solid rgba(0,0,0,.06);
			box-shadow: 0 3px 10px 0 rgb(0 0 0 / 10%);
			border-radius: 9px;
			justify-content: space-between;
			align-items: center;
			}
			.add-box{
				width: 100%;
				min-height: 150px;
				padding: 10px;
				.add-box-bg{
					width: 100%;
					display: flex;
					flex-direction: column;
					background-color: #fff;
					border-radius: 10px;
					min-height: 150px;
					box-shadow: 0 0 0.8rem 0 rgba(58, 58, 58, 0.07);
					padding: 10px;
					font-size: 12px;
					.title-icon{
						width: 40px;
    				height: 40px;
						border-radius: 50%;
						margin-right: 10px;
					}
					::v-deep .u-border{
						border-color: rgba(242,65,59,.27) !important;
					}
				}
			}
			.payMentBox {
    width: 100%;
    min-height: 100px;
    padding: 20px 0;

    .payMentItem {
        width: 30%;
        height: 100px;
        border-radius: 20px;
        margin-right: 10px;
        background-color: #EEEEFA;
        text-align: center;
        position: relative;

        .image-icon {
            width: 18px;
            height: 18px;
            margin-bottom: 10px;
        }

        .selecticon {
            position: absolute;
            bottom: 6px;
            right: 6px;
        }
    }

    .payTdItem {
        width: 40%;
        border-radius: 0;
        height: 80px;

        .selecticon {
            bottom: 2px;
            right: 3px;
        }

        .verity {
            font-size: 13px;
        }
    }

    .activePayMent {
        background: linear-gradient(135deg, #CE0608, #F3453E);
        color: #fff;
    }
}
.popupStyle {
	.container_box {
		padding: 10px;
		.top_action {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 0;
			.cancle {
				color: rgb(144, 145, 147);;
			}
			.sure {
				color:rgb(60, 156, 255);
			}
		}
		.search_box {
			height: 320px;
			overflow-y: scroll;
			margin-top: 10px;
			.search_item {
				height: 44px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 16px;
				color: rgb(144, 145, 147);
			}
			.chosedItem {
				color: #000;
				font-weight: bold;
			}
		}
	}
}
</style>