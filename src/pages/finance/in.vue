<template>
  <view class="bg">
    <uni-nav-bar :title="$t('in.title')" fixed :leftType="2"></uni-nav-bar>
	
	<view class="top-con flex-cc">
		<view class="title">{{$t('finance.account.txt')}}</view>
		<view class="flex priceBox" v-for="(item,index) in userBalance" :key="index">
			<image v-if="item.icon" :src="imgUrl+item.icon" class="usdt-img"></image>{{item.symbo}}: {{item.balance}}
		</view>
	</view>
	<view class="con-con">
		<view class="input-title">{{$t('in.label')}}：</view>
		
		<view class="input-box">
			<u--input
			    :placeholder="$t('in.label')"
			    border="none"
				type="number"
			    v-model="form.amount"
			  >
			  <template slot="suffix">
				<u-icon name="edit-pen" size="30"></u-icon>
			</template>
			  </u--input>
		</view>
		<view>
			<u-radio-group
				class="radioGroup"
			    v-model="form.currency"
			    placement="row"
			  >
			    <u-radio
			      :customStyle="{marginBottom: '8px'}"
			      v-for="(item, index) in userBalance"
			      :key="index"
			      :label="item.symbo"
			      :name="item.currency"
			    >
			    </u-radio>
			</u-radio-group>
		</view>
		<view class="requiredBox">
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
		<u-button :text="$t('in.btn')" shape="circle" color="#fa3534" class="btn" @click="save"></u-button>
	</view>
  </view>
</template>

<script>
import {transfer} from '@/api/index.js'
export default {
	onLoad(){
		this.$store.dispatch('GetInfo').then(res=>{
			this.userBalance = res.data.Balances
		})
	},
	computed:{
		imgUrl(){
			return this.$store.state.img_url
		}  
	},
  data(){
    return{
		userBalance: [],
		form:{
			actions: 'IN',
			amount: 0,
			currency:'SYSTEM',
			password: ''
		}
    }
  },
  methods:{
	save(){
		transfer(this.form).then(res=>{
			uni.showToast({
				icon: 'none',
				title: res.msg,
				duration: 2000
			});
			this.$store.dispatch('GetInfo').then(res=>{
				this.userBalance = res.data.Balances
			})
		})
		// uni.$u.debounce(this.toNext(), 5000)
	},
	toNext(){
		transfer(this.form).then(res=>{
			
		})
	}
  }

}
</script>

<style lang="scss" scoped>
.top-con {
    padding: 14px;
    background-color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid #a7a7a7 5px;
	color: #303133;
	font-size: 14px;
	.title{
		margin-top: 10px;
		font-size: 16px;
	}
	.usdt-img{
		width: 16px;
		height: 16px;
		margin-right: 3px;
	}
	.priceBox{
		padding-top: 5px;
	}
}
.con-con{
    padding: 14px;
    background-color: #fff;
    width: 100%;
	color: #303133;
	font-size: 14px;
	.input-box {
	    padding: 14px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    font-weight: 900;
	}
}
.radioGroup{
	::v-deep.u-radio{
		margin-right: 20px;
	}
}
.btn{
	height: 37px;
	width: 60%;
	box-shadow: 0 0 9px 1px rgb(242 65 59 / 27%);
	margin: 20px auto;
}
.requiredBox{
		// padding: 0 18px;
		margin-top: 18px;
		position: relative;
		.u-input1{
			display: flex;
			border: 1px solid rgb(242, 65, 59);
			border-radius: 4px;
			align-items: center;
			justify-content: center;
			padding: 6px 20px!important;
		}
		.icon-pass{
			width: 16px;
			height: 10px;
			position: absolute;
			left: 5px;
			top: 14px;
		}
	}
</style>