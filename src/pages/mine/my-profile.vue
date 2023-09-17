<template>
	<view class="bg">
		<uni-nav-bar :title="$t('my-profile.title')" fixed :leftType="2"></uni-nav-bar>
		
		<view class="cell-bg">
			<u-cell-group class="groupBox">
				<u-cell :title="$t('my-profile.avatar')">
					<image slot="right-icon" :src="userInfo.avatar" class="avatar"></image>
				</u-cell>
				<u-cell :title="$t('my-profile.account')">
					<text slot="right-icon" class="phone">{{userInfo.username}}</text>
				</u-cell>
				<u-cell :title="$t('my-profile.password')" isLink url="/pages/mine/change-password"></u-cell>
				<u-cell :title="$t('my-profile.payPassword')" isLink url="/pages/mine/change-pay-password"></u-cell>
				<u-cell :title="$t('my-profile.cashAddress')" isLink url="/pages/mine/change-outmoney-address"></u-cell>
				<u-cell title="Email" class="input-box">
					<u--input
						slot="right-icon"
					    :placeholder="$t('my-profile.email.label')"
					    border="surround"
					    v-model="form.email"
					  ></u--input>
				</u-cell>
				<u-cell :title="$t('my-profile.nickName')" class="input-box">
					<u--input
						slot="right-icon"
					    :placeholder="$t('my-profile.nickName.label')"
					    border="surround"
					    v-model="form.nickname"
					  ></u--input>
				</u-cell>
			</u-cell-group>
		</view>
		<view>
			<u-button type="primary" :text="$t('my-profile.btn')" shape="circle" color="#fa3534" class="btn" @click="updateUserDetails"></u-button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { updateUserDetails } from '@/api/index.js'
	export default{
		onLoad() {
			this.getUserInfo()
		},
		computed:{
			...mapState({
				userInfo: state=>state.userInfo
			}),
		},
		data(){
			return{
				form:{
					email: '',
					nickname: ''
				}
				
			}
		},
		methods:{
			getUserInfo(){
				this.$store.dispatch('GetInfo').then(res=>{
					this.form =res.data
				})
			},
			updateUserDetails(){
				updateUserDetails(this.form).then(res=>{
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cell-bg{
		background-color: #fff;
	}
	.groupBox{
		::v-deep .u-cell__body{
			padding: 15px;
		}
		
	}
	.input-box{
		::v-deep .u-cell__right-icon-wrap{
			width: 65% !important;
		}
	}
	.avatar{
		width: 44px;
		height: 44px;
		border-radius: 50%;
	}
	.phone{
		color: #909399;
		font-size: 14px;
	}
	.btn{
		width: 65%;
		margin: 19px auto;
		box-shadow: 0 0 8px 1px rgb(242 65 59 / 27%);
		border-radius: 41px;
		height: 41px;
	}
</style>