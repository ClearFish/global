<template>
	<view class="bg">
		<uni-nav-bar :title="$t('bet-sum.title')" fixed :leftType="2"></uni-nav-bar>
		<view class="list flex flex-col">
			<view class="flex-sb item" v-for="(item,index) in list" :key="index">
				<view class="flex-rcc time">
					<image src="/static/img/cash2.min.png"></image>
					{{item.time}}
				</view>
				<view class="jf flex-cc">
					<text class="num">+{{item.jf}}</text>
					<text>积分</text>
				</view>
			</view>
			<u-loadmore :status="status" line />
		</view>
	</view>
</template>

<script>
	import { getBetSumRecord } from '@/api/index.js'
	export default{
		data(){
			return{
				status: 'nomore',
				list:[
					{time: '2021-10-21',jf: '500'},
					{time: '2021-10-21',jf: '500'},
					{time: '2021-10-21',jf: '500'}
				],
				params:{
					pageIndex:1,
					pageSize: 10
				}
			}
		},
		methods:{
			getBetSumRecord(){
				getBetSumRecord(this.params).then(res =>{
					this.list = res.result
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item{
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