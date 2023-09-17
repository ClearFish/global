<template>
	<view>
		<uni-nav-bar title="Gift record" fixed :leftType="2"></uni-nav-bar>
		<view class="list flex-cc">
			<template v-if="list.length>0">
				<view class="flex-sb item" v-for="(item,index) in list" :key="index">
					<view class="flex flex-col">
						<view class="time">
							{{item.order_number}}
							<image src="/static/img/copy.min.png" class="copy" @click="copyNumber(item.order_number)"></image>
						</view>
						<!-- <image src="/static/img/cash2.min.png"></image> -->
						<text style="font-size: 13px">{{item.created_at}}</text>
					</view>
					<view class="jf flex-cc">
						<text class="num" >{{item.receive_amount}}</text>
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
import {redenvelopeRecord} from "@/api/index.js"
export default {
    data() {
        return {
			total: 0,
			list:[],
			form:{
				pageIndex: 1,
				pageSize: 10
			},
        }
    },
    onLoad() {
        this.getData()
    },
    methods:{
        getData() {
            redenvelopeRecord().then(res=>{
				 if (res.code === 1) {
					this.list = res.data.rows
					this.total = res.data.total
				}
            })
        },
		changePage(index){
			this.form.pageIndex = index
			this.getData()	
		},
		copyNumber(number) {
			uni.setClipboardData({
				data: number,
				success: ()=> {
					uni.showToast({
						icon: 'none',
						title: 'Replicating Success',
						duration: 2000
					});
				}
      		});
		}
    }
}
</script>
<style lang="scss" scoped>
.list {
	margin-top: 50px;

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
				width: 14px;
				height: 14px;
				margin-left: 5px;
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