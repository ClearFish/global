<template>
	<view class="bg">
		<uni-nav-bar :title="$t('exchange.title')" fixed :leftType="2"></uni-nav-bar>
		
		<view class="list">
			<view class="con">
				<u--input
				    :placeholder="$t('exchange.input')"
				    border="surround"
				    v-model="excode"
				    class="input-box"
				  ></u--input>
				  
				  <u-button type="primary" :text="$t('exchange.btn')" color="#fa3534" class="btn" @click="doExcode"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { doExcode } from '@/api/index.js'
	export default{
		data(){
			return{
				excode:''
			}
		},
		methods:{
			doExcode(){
				if(this.excode){
					doExcode({excode: this.excode}).then(res=>{
						this.excode = ''
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
	    padding: 15px;
		.con {
		    padding: 15px;
		    font-size: 15px;
		    line-height: 20px;
		    color: #2c3e50;
			.btn{
				margin-top: 11px!important;
				font-size: 16px;
				height: 44px;
				line-height: 44px;
			}
		}
	}
	.input-box{
		border-color: rgb(242, 65, 59) !important;
		padding: 9px !important;
	}
</style>