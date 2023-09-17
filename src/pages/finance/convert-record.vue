<template>
  <view class="bg">
    <uni-nav-bar :title="$t('convert-record.title')" fixed :leftType="2"></uni-nav-bar>
	
	<!-- <view class="wallet-user a-text-center"></view>
	<view class="wallet-box">
		<view class="box">
			<u-tabs :list="list1" @change="changeTab" :current="form.currency" lineColor="rgb(242, 65, 59)" :inactiveStyle="inactiveStyle" :activeStyle="activeStyle"></u-tabs>
		</view>
		<view class="list flex-cc">
			<template v-if="financList.length>0"></template>
			<u-empty mode="list" v-else></u-empty>
		</view>
	</view> -->
	<view class="list flex-cc">
		<template v-if="list.length>0">
			<view class="flex-sb item" v-for="(item,index) in list" :key="index">
				<view class="flex flex-col">
					<text class="time">{{item.action}}</text>
					<!-- <image src="/static/img/cash2.min.png"></image> -->
					<text style="font-size: 13px">{{item.created_at}}</text>
				</view>
				<view class="jf flex-cc">
					<text class="num" :class="{'red':Number(item.amount)>0}">
					<template v-if="Number(item.amount)>0">+</template>
					{{item.amount}}</text>
					<text>{{item.currency_symbol}}</text>
				</view>
			</view>
			<page-nav :total="total" @change="changePage"></page-nav>
		</template>
		<u-empty mode="list" v-else></u-empty>
	</view>
  </view>
</template>

<script>
import {balance_record } from '@/api/index.js'
import PageNav from '@/components/PageNav/index.vue'
export default {
	components:{
		PageNav
	},
  data(){
    return{
		list1: [{name: 'TRX'},{name:'USDT' }],
		form:{
			pageIndex: 1,
			pageSize: 10
		},
		activeStyle:{color: 'rgb(242, 65, 59)',fontWeight: 'bold'},
		inactiveStyle:{fontSize: '15px',color: 'rgb(48, 49, 51)'},
		total: 0,
		list:[]
    }
  },
  onShow(){
	 this.getConversionMx() 
  },
  methods:{
	changeTab(index){
		this.form.currency = index.index
		// this.getConversionMx()
	},
	changePage(index){
		this.form.pageIndex = index
		this.getConversionMx()	
	},
	// 查询资金明细
	getConversionMx(){
		balance_record(this.form).then(res=>{
      if (res.code === 1) {
        this.list = res.data.rows
        this.total = res.data.total
      }
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
.wallet-box {
    padding: 0 18px;
    margin-top: -65px;
	.box{
	    position: relative;
	    padding: 14px;
	    border-radius: 4px;
	    background: #fff;
		::v-deep.u-tabs__wrapper__nav__item{
			flex: 1;
		}
	}
}

.item{
		width: 100%;
		padding: 14px 9px;
		border-bottom: 1px solid #f2f5f7;
		.time{
			font-size: 15px;
			font-weight: 600;
			color: #303133;
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