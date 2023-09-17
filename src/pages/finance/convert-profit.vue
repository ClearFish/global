<template>
	<view class="bg">
		<uni-nav-bar :title="$t('convert-profit.title')" fixed :leftType="2"></uni-nav-bar>
		
		<view class="list flex-cc">
			<template v-if="list.length>0">
				<view class="flex-sb item" v-for="(item,index) in list" :key="index">
					<view class="flex-rcc time">
						<image v-if="Number(item.amount)>0" src="/static/img/cash1.min.png"></image>
            <image v-else src="/static/img/cash2.min.png"></image>
            <text class="time">{{item.created_at}}</text>
					</view>
					<view class="jf flex-cc">
						  <text class="num" :class="{'red':Number(item.amount)>0}"><template v-if="Number(item.amount)>0">+</template>
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
	import { income_record } from '@/api/index.js'
	import PageNav from '@/components/PageNav/index.vue'
	export default{
		components:{
			PageNav
		},
		data(){
			return{
				params:{
					pageIndex: 1,
					pageSize: 10
				},
				total:0,
				list: [
					// {
					//                 // 币种
					//                 "currency": "SYSTEM",
					//                 // 会员ID
					//                 "user_id": 1,
					//                 // 关联用户
					//                 "username": "admin",
					//                 // 关联单号
					//                 "order_number": "462332777061157775",
					//                 // 日利率 百分比
					//                 "rate": "0.20",
					//                 // 返利有效金额，按此金额计算反利
					//                 "valid_amount": "100.00",
					//                 // 授利前余额
					//                 "before_balance": "100.00",
					//                 // 受益金额
					//                 "amount": "0.20",
					//                 // 添加时间
					//                 "created_at": "2023-02-04 03:13:31"
					//             }
				]
			}
		},
		onShow(){
			this.getConversionProfit()
		},
		methods:{
			// 收益列表
			getConversionProfit(){
				income_record(this.params).then(res=>{
					this.list = res.data.rows
					this.total = res.data.total
				})
			},
			changePage(index){
				this.params.pageIndex = index
				this.getConversionProfit()	
			}
		}
	}
</script>

<style lang="scss" scoped>
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