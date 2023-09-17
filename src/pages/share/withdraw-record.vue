<template>
	<view class="bg">
		<uni-nav-bar :title="$t('share.card.left.btn')" fixed :leftType="2"></uni-nav-bar>
		<view class="list flex flex-col" v-if="list.length>0">
			<view class="flex-sb item" v-for="(item,index) in list" :key="index">
				<view class="flex-cc time">
					<view class="flex flex-rcc">
						<image src="/static/img/cash2.min.png"></image>{{item.created_at}}
					</view>
					<view class="order">{{item.order_number}}</view>
					
				</view>
				<view class="jf flex-cc">
					<text class="num">{{item.amount}}</text>
					<text>{{item.action}}</text>
				</view>
			</view>
			<u-loadmore :status="status" line />
		</view>
		<u-empty v-else mode="data" :text="$t('nomore')" style="padding-top: 50px;" />
	</view>
</template>

<script>
	import { invite_balance_record } from '@/api/index.js'
	export default{
		data(){
			return{
				status: 'nomore',
				list:[
				],
				params:{
					actions: 'OUT',
					pageIndex:1,
					pageSize: 1000
				},
				total: 0
			}
		},
		onLoad(){
			this.getFundRecord()
		},
		methods:{
			getFundRecord(){
				invite_balance_record(this.params).then(res =>{
					this.list = res.data.rows
					this.total = res.data.total
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
			.order{
				margin-left: 30px;
				font-size: 13px;
				font-weight: 500;
				color: #889198;
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