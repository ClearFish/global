<template>
	<view class="bg">
		<uni-nav-bar :title="$t('change-pay-password.title')" fixed :leftType="2"></uni-nav-bar>
		
		<view class="wallet-user a-text-center">
		</view>
		<view class="wallet-box">
			<view class="list">
				<u--input :placeholder="$t('change-password.input1')" v-model="form.old_password" type="password" border="bottom" clearable>
					<u-icon slot="prefix" name="lock" color="rgb(242, 65, 59)" size="18" class="left-icon"></u-icon>
				</u--input>
				<u--input :placeholder="$t('change-pay-password.input2')" v-model="form.password" type="password" border="bottom" clearable>
					<u-icon slot="prefix" name="lock" color="rgb(242, 65, 59)" size="18" class="left-icon"></u-icon>
				</u--input>
				<u--input :placeholder="$t('change-pay-password.input3')" v-model="value" type="password" border="bottom" clearable>
					<u-icon slot="prefix" name="lock" color="rgb(242, 65, 59)" size="18" class="left-icon"></u-icon>
				</u--input>
				
				<u-button type="primary" :text="$t('change-password.btn')" color="#fa3534" class="btn" @click="updatePayPassword"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { reWithdrawalPassword } from '@/api/index.js'
	export default{
		data(){
			return{
				form: {
					old_password:'',
					password:''
				},
				value: ''
			}
		},
		methods:{
			updatePayPassword(){
				if(this.verification()){
					reWithdrawalPassword(this.form).then(res=>{
						uni.showToast({
						icon: 'none',
						title: "success",
						duration: 2000
					});
					setTimeout(()=>{
						uni.navigateBack()
					},1000)
					})
				}
			},
			verification(){
				let isOk = false
				if(this.form.old_password && this.form.password && this.value){
					if(this.form.password === this.value){
						isOk = true
					}else{
						uni.showToast({
							icon: 'none',
							title: this.$t('login.toast3'),//'两次新密码不一致!', //this.$t('share.link.top.btn.tip'),
							duration: 2000
						});
					}
				}else{
					uni.showToast({
						icon: 'none',
						title: this.$t('login.toast2'), //'密码不能为空!', //this.$t('share.link.top.btn.tip'),
						duration: 2000
					});
				}
				return isOk
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
	    padding: 0 20px;
	    margin-top: -71px;
		.list{
		    background: #fff;
		    box-shadow: 0 0 .8rem 0 rgba(58,58,58,.07);
		    margin-top: 15px;
			border-radius: 10px;
			padding: 11px!important;
			.left-icon{
				margin-right: 11px;
			}
			::v-deep .u-input{
				padding: 12px !important;
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
</style>