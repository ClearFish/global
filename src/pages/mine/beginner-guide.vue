<template>
	<view class="bg">
		<uni-nav-bar :title="$t('beginner-guide.title')" fixed :leftType="2"></uni-nav-bar>
		
		<view class="list flex-cc">
			<view v-html="info.content"></view>
			<!-- <u-empty mode="list" v-else></u-empty> -->
		</view>
	</view>
</template>

<script>
	import { hdggDetail } from '@/api/index.js'
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
				info:{
					content: '<strong style="&quot;&quot;&quot;&quot;font-family:&quot;&quot;&quot;" georgia,="&quot;&quot;&quot;&quot;&quot;&quot;" serif;&quot;="&quot;&quot;&quot;&quot;&quot;&quot;">Contents of the beginner&#39;s guide<br></strong><br>97 Lottery Entertainment&#39;s simple navigation allows you to quickly and easily bet entertainment on your mobile phone.<br>To use mobile betting, you must have an entertainment account. If not, you can open an account now.<br>In just a few minutes, you can open an account for free and then bet on a wide range of products and events that 97 Lottery Entertainment has to offer.<br><br>To create an account, follow these steps:<br><br>1. Visit https://97lottery.com/, it only takes 1 minute to register<br>2. Follow the prompts on the page to enter<br>phone number<br>login password<br>Security Code<br>3. Click the &#39;Register&#39; button to finish<br><br><br>To place a bet from your mobile phone, please follow the steps below:<br>1. Open the mobile browser<br>(It is recommended to download the official APP, which is convenient and fast)<br>2. Enter https://97lottery.com/ on your phone to visit<br>3. Enter your login name and password, and select a language.<br>4. You can choose to play 1 minute, 3 minutes, 5 minutes and 10 minutes of blockchain games such as: WIN GO<br>5. Such as choosing a bet: big or small<br>6. Enter your bet amount and click the "Total" Bet History Full Version button to place your bet.<br>To view your bet, click on "Stake".<br>7. For details, please enter the game to view the detailed rules of the game<br><br>Supported languages: The mobile APP currently supports English, Indonesian, Vietnamese, Japanese, Chinese, Arabic, Portuguese,<br><br>Live Chat: Click the Live Chat icon in the upper right corner of the page, and our friendly customer service department will help you in the first time.<br>'
				}
			}
		},
		onShow(){
			// this.hdggDetail()
		},
		methods:{
			// 积分商品
			hdggDetail(){
				hdggDetail(this.params).then(res=>{
					this.info = res.result
				})
			},
			changePage(index){
				this.params.pageIndex = index
				this.getShopProductList()	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		    padding: 14px;
	}
</style>