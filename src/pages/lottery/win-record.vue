<template>
	<view class="bg">
		<uni-nav-bar :title="$t('win-record.title')" fixed :leftType="2"></uni-nav-bar>
		
		<view class="tabsBox">
			<u-tabs :list="list1" :current="game_type" lineColor="rgb(238, 10, 36)" :scrollable="false" @click="clickTab" :activeStyle="activeStyle"></u-tabs>
			<u-tabs :list="list2" :current="game_time" lineColor="rgb(238, 10, 36)" :scrollable="false" @click="clickTime"></u-tabs>
		</view>
		
		<view class="list flex flex-col" v-if="infoList.length>0">
			<view class="itemBox flex-sb" v-for="(item,index) in infoList" :key="index" >
				<view class="infoBox flex flex-col">
					<view>{{$t('game-record.num.tit')}}: {{item.period}}</view>
					<view>{{$t('game-record.time.tit')}}: {{item.createtime}}</view>
				</view>
				<view class="textBox flex-cc">
					<view>{{$t('game-record.give.money')}}</view>
					<view>{{$t('game-record.win.money')}}</view>
				</view>
				<view class="moneyBox flex-cc">
					<view class="redt">{{item.currency_symbol}}  -{{item.bet_amount}}</view>
					<view class="greent">{{item.currency_symbol}}  {{item.net_amount}}</view>
				</view>
			</view>
		</view>
		<u-empty v-else mode="list" :text="$t('nomore')" style="padding-top: 50px;"></u-empty>
		<page-nav :total="total" @change="changePage" v-if="infoList.length>0"></page-nav>
	</view>
</template>

<script>
	import { betRecord } from '@/api/index.js'
	import PageNav from '@/components/PageNav/index.vue'
	import miment from 'miment'
	export default{
		components:{
			PageNav
		},
		computed:{
			list2(){
				return [{name: `1${this.$t('lottery.game.unit')}`},{name: `3${this.$t('lottery.game.unit')}`}, {name: `5${this.$t('lottery.game.unit')}`},{name: `10${this.$t('lottery.game.unit')}`}]
			}
	},
		onReady(){
			this.loadMyBetRecord()
		},
		data(){
			return{
				list1:[{name: 'WinGo'},{name: '5D'}, {name: 'K3'}],
				activeStyle:{'font-weight': 'bold'},
				params:{
					game_id: 1,
					pageIndex:1,
					pageSize: 10
				},
				total: 0,
				game_type: 0, // 游戏类型
				game_time: 0, // 游戏时间
				infoList: []
			}
		},
		methods:{
			// 切换游戏
			clickTab(value){
				this.infoList = []
				this.params.pageIndex = 1
				this.game_type = value.index
				this.game_time = 0
				if(value.index===0){ // 第一种游戏 id===1
					this.params.game_id = 1
				}else if(value.index===1){
					this.params.game_id = 9
				}else{
					this.params.game_id = 5
				}
				this.loadMyBetRecord()
			},
			
			// 切换时间
			clickTime(value){
				this.infoList = []
				this.params.pageIndex = 1
				this.game_time = value.index
				let game_id = 0
				if(this.game_type===0){
					game_id = value.index+1
				}else if(this.game_type===1){
					game_id = 8 + value.index+1
				}else{
					game_id = 4 + value.index+1
				}
				this.params.game_id = game_id
				this.loadMyBetRecord()
			},
			loadMyBetRecord(){
				betRecord(this.params).then(res=>{
					this.infoList = res.data.rows
					this.total = res.data.total
				})
			},
			// 下一页
			changePage(index){
				this.params.pageIndex = index
				this.loadMyBetRecord()
			},
			keyTime(time){
				return miment(time*1000).format()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabsBox{
		width: 100%;
	}
	.itemBox{
		padding: 9px 20px;
		font-size: 13px;
		border-bottom: 1px solid #efeeee;
		.redt{
			color: #fb4e4e;
			font-size: 10px;
			font-weight: bold;
		}
		.greent{
			color: #5cba47;
			font-size: 10px;
			font-weight: bold;
		}
	}
</style>