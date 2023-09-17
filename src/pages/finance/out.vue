<template>
  <view class="bg">
    <uni-nav-bar :title="$t('out.title')" fixed :leftType="2"></uni-nav-bar>
	
	<view class="top-con">
		<view class="top-con-box border-left">
			<view class="info-box flex-cc">
				<view class="title">{{$t('out.left.label')}}</view>
				<view class="flex priceBox" v-for="(item,index) in info" :key="index">
					<image v-if="item.icon" :src="imgUrl+item.icon" class="usdt-img"></image>{{item.symbo}}: {{item.balance}}
				</view>
			</view>
		</view>
		<view class="top-con-box">
			<view class="info-box flex-cc">
				<view class="title">{{$t('out.right.label')}}</view>
				<view class="flex priceBox" v-for="(item,index) in info" :key="index">
					<image v-if="item.icon" :src="item.icon" class="usdt-img"></image>{{item.symbo}}: {{item.balance}}
				</view>
			</view>
		</view>
	</view>
	<view class="con-con">
		<view class="input-title">{{$t('out.label')}}</view>
		
		<view class="input-box">
			<u--input
			    :placeholder="$t('out.label')"
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
			      v-for="(item, index) in info"
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
import {transfer, balance} from '@/api/index.js'
export default {
	onLoad(){
		this.getBalance() 
	},
	computed:{
		imgUrl(){
			return this.$store.state.img_url
		}  
	},
  data(){
    return{
		radiovalue1: 1,
		value: 0,
		info: [],
		form:{
			actions: 'OUT',
			amount: '',
			currency:'SYSTEM',
			password: ''
		}
    }
  },
  methods:{
	// 获取金融日利率
	getBalance(){
			balance().then(res=>{
				this.info = res.data.row
			})  
	},
	save(){
		transfer(this.form).then(res=>{
			uni.showToast({
				icon: 'none',
				title: res.msg,
				duration: 2000
			});
			this.getBalance()
		})
		// uni.$u.debounce(this.toNext(), 5000)
	},
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
	.usdt-img{
		width: 16px;
		height: 16px;
		margin-right: 3px;
	}
	.priceBox{
		padding-top: 5px;
	}
}
.top-con-box{
    width: 50%;
}
.border-left {
    border-right: solid #a7a7a7 2px;
}
.info-box{
	padding: 7px 0 7px 5px;
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