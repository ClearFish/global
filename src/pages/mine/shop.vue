<template>
	<view class="bg">
		<uni-nav-bar :title="$t('shop.title')" fixed :leftType="2"></uni-nav-bar>
		
		<view class="list flex-cc">
			<template v-if="list.length>0">
				<page-nav :total="total" @change="changePage"></page-nav>
			</template>
			<u-empty mode="list" v-else></u-empty>
		</view>
	</view>
</template>

<script>
	import { getShopProductList } from '@/api/index.js'
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
				list: []
			}
		},
		onShow(){
			// this.getShopProductList()
		},
		methods:{
			// 积分商品
			getShopProductList(){
				getShopProductList(this.params).then(res=>{
					this.list = res.result
				})
			},
			changePage(index){
				this.params.pageIndex = index
				this.getShopProductList()	
			}
		}
	}
</script>

<style>
</style>