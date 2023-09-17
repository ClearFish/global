<template>
	<view class="bg">
		<uni-nav-bar :title="$t('mine.title')" fixed :leftType="2">
			<template slot="right">
				<u-icon name="kefu-ermai" color="#fff" size="25" @click="toService"></u-icon>
				
				<!-- <image src="/static/img/earth.png" class="earth" @click="langShow=true"></image> -->
				<u-icon :name="isPlay? 'volume': 'volume-off'" color="#fff" bold size="25" style="margin-left: 10px;" @click="isPlay=!isPlay"></u-icon>
			</template>
			<view class="flex-rcc" style="width:100%">
				<image src="/static/my-center/headlogo.png" class="header-logo"></image>
			</view>
		</uni-nav-bar>
		<!-- <audio id="appAudio" src="/static/music/di1.mp3" :action="audioAction"></audio> -->
		<view class="game-head">
			<view class="total-box">
				<view class="info">
					<view class="flex flex-item-col-center" style="width: 100%;">
						<image src="/static/my-center/icon_wallet.86908b64.min.png" class="qianbao"></image>
						<view class="flex-sb" style="width: 70%; position: relative;">
							<view class="flex flex-cc" v-for="(item,index) in userInfo.Balances" :key="index">
								<text class="flex-shrink">{{item.symbo}}:</text>
								<text>{{item.balance}}</text>
							</view>
							<u-icon name="reload" color="rgb(146, 146, 146)" size="25" class="a-ml-1" @click="getUserInfo"></u-icon>
						</view>
						
					</view>
					<!-- <view class="flex flex-rcc">
						<text>USDT: 0.00</text>
						<u-icon name="reload" color="rgb(146, 146, 146)" size="13" class="a-ml-1"></u-icon>
					</view> -->
				</view>
				<view class="total-btn">
					<view class="item">
						<u-button :text="$t('mine.card.btn1')" shape="circle" class="cash" @click="toPath('draw-money')"></u-button>
					</view>
					<view class="item ">
						<u-button :text="$t('mine.card.btn2')" shape="circle" class="recharge" @click="toPath('recharge')"></u-button>
					</view>
				</view>
			</view>
			<u-notice-bar :text="text1" class="tips"></u-notice-bar>
		</view>
		
		<!-- 时间 -->
		<view class="game-betting">
			<view class="tab" v-if="!isThree">
				<view class="box flex-sb">
					<view v-for="(item,key) in gameType" :key="key" class="flex-cc flex-item-1 itemInfo" :class="{'activeItem':current===key}" @click="cutTime(key)">
						<view class="icon-top">?</view>
						<image :src="`/static/game/icon_clock-${current===key? 'red': 'gerrn'}.png`" class="image-icon"></image>
						<u-icon name="arrow-down-fill" :color="current===key?'#fa4e46': '#6abe57'" size="10"></u-icon>
						<text class="text">{{item.label}}{{$t('lottery.game.unit')}}</text>
					</view>
				</view>
			</view>
			<win 
				v-if="game_type===0" 
				:noThree="noThree" 
				:game-id="params.game_id" 
				:currentTime="current" 
				@openRule="isRule=true" 
				@updata="getResultRecord" 
				@upDataLog="getBetRecord" 
				@cutAgent="cutAgent" 
				:balances="Balances" 
				@music="setMusic"></win>
			<d5 
				v-if="game_type===1" 
				:game-id="params.game_id"  
				@openRule="isRule=true" 
				@updata="getResultRecord" 
				@upDataLog="getBetRecord" 
				@cutAgent="cutAgent" 
				:balances="Balances" 
				ref="d5Ref"
				@music="setMusic"></d5>
			<k3 
				v-if="game_type===2" 
				:game-id="params.game_id" 
				@openRule="isRule=true" 
				@updata="getResultRecord" 
				@upDataLog="getBetRecord" 
				@cutAgent="cutAgent" 
				:balances="Balances"
				ref="k3Ref"
				@music="setMusic"></k3>
		</view>
		
		<view class="game-list">
			<view class="tab flex-sb">
				<view class="li" v-for="(i,index) in tab" :key="index" :class="{'action': tabAction===index}" @click="cutTab(index)">{{i}}</view>
			</view>
			
			<view class="u-table">
				<view class="tabBox flex" v-if="tabAction===1 &&game_type===1">
					<view class="tabItem" v-for="(i,index) in tabList" :key="index" :class="{'action': tabCurrent===index}" @click="changeMenu(index)">
						{{i}}
					</view>
				</view>
				<view class="t-tr flex head flex-item-col-center">
					<!-- 开奖历史 -->
					<template v-if="tabAction===0">
						<template v-if="game_type===0">
							<view class="flex-item-2 flex-rcc">{{$t('lottery.table.th1')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.th2')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.th3')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.th4')}}</view>
						</template>
						<template v-else-if="game_type===1">
							<view class="flex-item-2 flex-rcc">{{$t('lottery.table.th1')}}</view>
							<view class="flex-item-2 flex-rcc">{{$t('lottery.table.5d.th2')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.5d.th3')}}</view>
						</template>
						
						<template v-else>
							<view class="flex-item-2 flex-rcc">{{$t('lottery.table.th1')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.5d.th3')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.th3')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.k3.th4')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.k3.th5')}}</view>
						</template>
					</template>
					
					<template v-else-if="tabAction===1">
						<template v-if="[0,1].includes(game_type)">
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.th1')}}</view>
							<view class="flex-item-2 flex-rcc">{{$t('lottery.popup.cell3')}}</view>
						</template>
						<template v-else>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.th1')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.k3.th5')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.k3.th4')}}</view>
							<view class="flex-item-1 flex-rcc">{{$t('lottery.table.5d.th3')}}</view>
						</template>
					</template>
				</view>
				
				<!-- 列表 -->
				<template v-if="tabAction===0">
					<view class="t-tr tr flex flex-item-col-center" v-for="(item,key) in gameLog" :key="key">
						<template v-if="game_type===0">
							<view class="flex-item-2 flex-rcc">{{item.period}}</view>
							<view class="flex-item-1 flex-rcc" :class="{'num_gcolor': [1,3,5,7,9].includes(Number(item.result[0])),'num_rcolor':[0,2,4,6,8].includes(Number(item.result[0]))}">{{item.result[0]}}</view>
							<view class="flex-item-1 flex-rcc">{{Number(item.result[0])>4? $t('lottery.winGo.big'): $t('lottery.winGo.small')}}</view>
							<view class="flex-item-1 flex-rcc">
								<text class="redc circle" v-if="[0,2,4,6,8].includes(Number(item.result[0]))"></text>
								<text class="greenc circle" v-if="[1,3,5,7,9].includes(Number(item.result[0]))"></text>
								<text class="zi circle" v-if="[0,5].includes(Number(item.result[0]))"></text>
							</view>
						</template>
						
						<template v-else-if="game_type===1">
							<view class="flex-item-2 flex-rcc">{{item.period}}</view>
							<view class="flex-item-2 flex-rcc">
								<text class="border" v-for="(i,index) in item.result" :key="index">{{i}}</text>
							</view>
							<view class="flex-item-1 flex-rcc">
								<text class="border-r">{{sumWin(item.result)}}</text>
							</view>
						</template>
						
						<template v-else>
							<view class="flex-item-2 flex-rcc third">{{item.period}}</view>
							<view class="flex-item-1 flex-rcc third">{{sumWin(item.result)}}</view>
							<view class="flex-item-1 flex-rcc third">{{sumWin(item.result)>10? $t('lottery.winGo.big'): $t('lottery.winGo.small')}}</view>
							<view class="flex-item-1 flex-rcc third">{{(sumWin(item.result)%2)===0? $t('lottery.k3.even'): $t('lottery.k3.odd')}}</view>
							<view class="flex-item-1 flex-rcc third">
								<view v-for="(i,index) in item.result" :key="index">
									<image :src="`/static/game/dice_show${i}.min.png`" class="icon-num"></image>
								</view>
								
							</view>
						</template>
					</view>
				</template>
				<template v-else-if="tabAction===1">
					<view class="t-tr tr flex flex-item-col-center" v-for="(item,key) in gameLog" :key="key">
						<view class="flex-item-1 flex-rcc">{{item.period}}</view>
						<template v-if="game_type===0">
							<view class="flex-item-2 flex-rcc" style="position: relative;">
								<view v-for="(i,key) in 10" 
									:key="key" class="m-li" 
									:class="{
										'redc':Number(item.result[0])===key&&[2,4,6,8].includes(Number(item.result[0])),
										'greenc':Number(item.result[0])===key&&[1,3,5,7,9].includes(Number(item.result[0])),
										'color0':Number(item.result[0])===key&&Number(item.result[0])===0,
										'color5':Number(item.result[0])===key&&Number(item.result[0])===5
										}" 
									:style="{'color': Number(item.result[0])===key? '#fff': '#bbb'}"
								>{{key}}</view>
								<view class="m-li" 
									style="color: #fff;margin-left: 10px;"  
									:style="{'background':Number(item.result[0])>4? '#ffc511': '#5cba47'}"
								>{{Number(item.result[0])>4? 'B': 'S'}}</view>
								<view class="can-box" v-if="key<9">
									<canvas style="width: 100%; height: 100%;" :canvas-id="'firstCanvas'+key" :id="'firstCanvas'+key" @error="canvasIdErrorCallback"></canvas>
								</view>
							</view>
						</template>
						<template v-else-if="game_type===1">
							<view class="flex-item-2 flex-rcc" style="position: relative; font-size: 11px;">
								<view v-for="(i,key) in 10" 
									:key="key" class="m-li" 
									:class="{'redc':Number(item.result[tabCurrent])===key}" 
									:style="{'color': Number(item.result[tabCurrent])===key? '#fff': '#bbb'}"
								>{{key}}</view>
								<view class="m-li" 
									style="margin-left: 10px; border: 1px solid #5856d6;font-size: 10px;"  
									:style="{
										'background':Number(item.result[tabCurrent])>4? '#5856d6': '#fff',
										'color':Number(item.result[tabCurrent])>4? '#fff': '#5856d6'}"
									>{{Number(item.result[tabCurrent])>4? 'B': 'S'}}</view>
								<view class="m-li"
									style="margin-left: 5px; border: 1px solid #ff9500;font-size: 10px;"  
									:style="{
										'background':Number(item.result[tabCurrent])%2!==0? '#ff9500': '#fff',
										'color':Number(item.result[tabCurrent])%2!==0? '#fff': '#ff9500'}"
										>{{Number(item.result[tabCurrent])%2!==0? 'O': 'E'}}</view>
								<view class="can-box" v-if="key<9" style="left: 0px;">
									<canvas style="width: 100%; height: 100%;" :canvas-id="'firstCanvas'+key" :id="'firstCanvas'+key" @error="canvasIdErrorCallback"></canvas>
								</view>
							</view>
						</template>
						<template v-else>
							<view class="flex-item-1 flex-rcc third">
								<view v-for="(i,index) in item.result" :key="index">
									<image :src="`/static/game/dice_show${i}.min.png`" class="icon-num"></image>
								</view>
								
							</view>
							<view class="flex-item-1 flex-rcc third">{{(sumWin(item.result)%2)===0? $t('lottery.k3.even'): $t('lottery.k3.odd')}}</view>
							<view class="flex-item-1 flex-rcc third">{{sumWin(item.result)}}</view>
						</template>
					</view>
				</template>
				
				<template v-else>
					<view class="log-box" v-if="betRecordList.length>0">
						<view class="log-list flex flex-col">
							<u-collapse accordion v-for="(item,index) in betRecordList" :key="index">
								<u-collapse-item>

									<!-- 注单列表 -->
									<view class="flex flex-col" slot="title">
										<view class="period" style="padding-bottom: 10px;">{{item.period}}</view>
										<view>{{item.createtime}}</view>
									</view>
									<view class="flex flex-col" slot="value">
										<template v-if="Number(item.status)===0">
											<view class="flex-col flex-end">
											<view class="money state-r">{{ $t('game-record.status0') }}</view>
											<view>
												<text style="padding-right: 10px;">{{ item.bet_play }}</text>
												<text style="padding-right: 10px;">{{item.currency_symbol}}</text>
												<text class="money" >{{Number(item.bet_amount) + Number(item.fee_amount)}}</text>
											</view>
										</view>
										</template>
										<template v-else>
											<view class="flex-col flex-end">
												<view class="money state-r" :style="{'color': [1,3].includes(Number(item.settle)) ? 'green':'red'}">
													{{[1,3].includes(Number(item.settle))? $t('game-record.win.tit') : Number(item.settle)===5? $t('game-record.draw') :$t('game-record.fail.tit')}}
												</view>
												<view>	
													<text style="padding-right: 10px;">{{ item.bet_play }}</text>
													<text style="padding-right: 10px;" :style="{'color': [1,3].includes(Number(item.settle))? 'green':'red'}">{{item.currency_symbol}}</text>
													<text class="money" :style="{'color': [1,3].includes(Number(item.settle))? 'green':'red'}"><text v-if="Number(item.net_amount)>0 &&[1,3].includes(Number(item.settle))">+</text>{{Number(item.net_amount)>0&&[1,3].includes(Number(item.settle))?Number(item.net_amount):Number(item.bet_amount)+ Number(item.fee_amount)}}</text>
												</view>
											</view>
										</template>
									</view>

									<!-- 详情 -->
									<view class="u-collapse-content">
										<view class="d-title">{{ $t('game-record.des.tit') }}</view>
										<u-cell :title="$t('trading-record.orderNum')" :value="item.order_number"></u-cell>
										<u-cell :title="$t('game-record.num.tit')" :value="item.period"></u-cell>
										<u-cell :title="$t('game-record.give.money')">
											<view slot="value">{{item.currency_symbol}} 
												{{Number(item.bet_amount)+ Number(item.fee_amount)}}</view>
										</u-cell>
										<u-cell :title="$t('game-record.give.fee')">
											<view slot="value">{{item.currency_symbol}} 
												{{Number(item.fee_amount)}}</view>
										</u-cell>
										<u-cell :title="$t('game-record.bet.tit')" :value="item.bet_play"></u-cell>
										<u-cell :title="$t('game-record.result.tit')">
											<view slot="value" class="money" :style="{'color': [1,3].includes(Number(item.settle))? 'green':'red'}">
												<template v-if="Number(item.status)===0">
													{{ $t('game-record.status0') }}
												</template>
												<template v-else>
													{{[1,3].includes(Number(item.settle))? $t('game-record.win.tit') :Number(item.settle)===5? $t('game-record.draw') : $t('game-record.fail.tit')}}
												</template>
												
											</view>
										</u-cell>
										<u-cell :title="$t('game-record.win.money')">
											<view slot="value" :style="{'color': [1,3].includes(Number(item.settle))? 'green':'red'}">{{item.currency_symbol}} 
												<text v-if="Number(item.net_amount)>0 && [1,3].includes(Number(item.settle))" style="padding-left: 5px;">+</text>{{item.net_amount}}</view>
										</u-cell>
										<u-cell :title="$t('game-record.time.tit')" :value="item.createtime"></u-cell>
									</view>
								</u-collapse-item>
							</u-collapse>

						</view>
					</view>
					<u-empty v-else mode="data" :text="$t('nomore')" style="padding-top: 50px;" />
					
				</template>
				
				<view class="list-fooder"></view>
				<page-nav @change="changePage" :total="total"></page-nav>
			</view>
		</view>
		<rule :show="isRule" @close="isRule=false"></rule>
	</view>
</template>

<script>
	import Rule from "@/components/Dialog/rule.vue"
	import Win from "@/components/game/win"
	import d5 from "@/components/game/5d"
	import k3 from "@/components/game/k3"
	import { resultRecord, betRecord, getUserInfo } from '@/api/index.js'
	import PageNav from '@/components/PageNav/index.vue'
	import miment from 'miment'
	import { mapState } from "vuex"
	export default{
		components:{
			Win, d5, k3, Rule, PageNav
		},
		onLoad(option){
			this.$store.dispatch('GetSite').then(res=>{
				this.text1 = res.data.notice 
			})
			this.game_type = Number(option.game_type)//Number(option.type)
			this.game_id = option.game_id
			this.params.game_id = this.game_id 
			this.betParams.game_id = this.game_id
			this.getResultRecord(1)
			// this.getBetRecord()
			this.createMusic()
			if(option.min){
				this.current = Number(option.min)
				this.isThree = true
			}
			if(option.noThree){
				this.noThree = true
				this.gameType.splice(1,1)
			}
		},
		onShow(){
			// this.getUserInfo()
		},
		onUnload(){
			this.resetMusic()
			console.log('页面卸载')
		},
		computed:{
			tab(){
				let arr = [this.$t('lottery.tab1'),this.$t('lottery.tab2'),this.$t('lottery.tab3')]
				return arr
			},
			time(){
				let num = 60000
				num = this.gameType[this.current].value * 60000
				return num
			},
			...mapState({
				userInfo: state=> state.userInfo
			})
		},
		data(){
			return{
				noThree: false, // 是否不展示三分彩
				isThree: false, // 是否只展示三分彩
				isPlay: true, // 是否播放音乐
				game_id: '', // 路由初始游戏id
				game_type: 0, // 游戏类型
				isRule: false,
				timeData: {},
				tabCurrent: 0, // 5d列表
				current: 0,
				rate: 1,
				tabList: ['A','B','C','D','E'],
				text1: '',
				gameType: [{value: 1,label: '1'},{value: 3,label: '3'},{value: 5,label: '5'},{value: 10,label: '10'}],
				tabAction: 0,
				gameLog:[], // 游戏历史
				betRecordList: [], // 下注记录
				params:{ // 开奖历史
					game_id: 0,
					pageIndex: 1,
					pageSize: 10
				},
				betParams:{
					game_id: 0,
					pageIndex: 1,
					pageSize: 10,
					// status: 0
				},
				audioAction: {
					method: 'pause'
				},
				Balances: [], // 余额
				total: 0,
				timmer: null,
				timmerOut: null,
				music1: null,
				music2: null,
				playing: false
			}
		},
		watch:{
			gameLog:{
				immediate: true,
				deep: true,
				handler(newV){
					if(newV){
						if(this.game_type===1&&this.tabAction===1){
							this.draw(newV,this.tabCurrent)
						}else{
							this.draw(newV,0)
						}
					}
				}
			},
			isPlay(newV){
				if(!newV){
					this.music1.volume = 0
					this.music2.volume = 0
				}else{
					this.music1.volume = 1
					this.music2.volume = 1
				}
			}
		},
		methods:{
			// 切换代理
			cutAgent(item){
				this.params.game_id = item.game_id
				this.betParams.game_id = item.game_id
				this.getBetRecord()
				this.getResultRecord()
			},
			createMusic(){
				this.music1 = uni.createInnerAudioContext();
				this.music1.src = require('@/static/music/di1.mp3')
				this.music2 = uni.createInnerAudioContext();
				this.music2.src = require('@/static/music/di2.mp3')
			},
			setMusic(time){
				this.playing = true
				if(this.isPlay){
					this.music1.play()
					this.timmer = setInterval(()=>{
						this.music1.play()
					},1000)
					this.timmerOut = setTimeout(()=>{
						clearInterval(this.timmer)
						this.music2.play()
						this.playing = false
						this.resetMusic()
					},time)
				}
				if(time===11){
					this.playing = true
					if(this.isPlay){
						this.music1.play()
						this.timmer = setInterval(()=>{
							this.music1.play()
						},1000)
						this.timmerOut = setTimeout(()=>{
							clearInterval(this.timmer)
							this.music2.play()
							this.playing = false
							this.resetMusic()
						},11000)
					}
				}else{
					// console.log('111')
					// console.log('this.playing', this.playing)
					// 	if(this.isPlay && !this.playing){
					// 		this.playing = true
					// 		this.music1.play()
					// 		this.timmer = setInterval(()=>{
					// 			this.music1.play()
					// 		},1000)
					// 		this.timmerOut = setTimeout(()=>{
					// 			clearInterval(this.timmer)
					// 			this.music2.play()
					// 			this.playing = false
					// 			const newClear = setInterval(()=>{
					// 				this.resetMusic()
					// 			},10)
					// 			setTimeout(()=>{
					// 				clearInterval(newClear)
					// 			},11000)
					// 		},(time-1)*1000)	
					// 	}
					
				}
			},
			// 重置音乐
			resetMusic(){
				if(this.timmer){
					clearInterval(this.timmer)
					this.timmer = null
				}
				if(this.timmerOut){
					clearInterval(this.timmerOut)
					this.timmerOut = null
				}
				this.playing = false
			},
			// 获取余额
			getUserInfo(){
				this.$store.dispatch('GetInfo').then(res=>{
					this.Balances = res.data.Balances
				})
			},
			draw(arr,key){
				setTimeout(()=>{
					arr.map((v,index)=>{
						let mn = 10 + Number(v.result[key])*20
						if(index<9){
							let ln = 10 + Number(arr[index+1].result[key])*20
							const ctx = uni.createCanvasContext(`firstCanvas${index}`)
							ctx.setStrokeStyle('red')
							ctx.setLineWidth(2)
							ctx.moveTo(mn, 0)
							ctx.lineTo(ln, 28)
							ctx.stroke()
							ctx.draw()
						}
						
					})
				},100)
			},
			// 5d号码切换
			changeMenu(index){
				this.tabCurrent=index
				this.draw(this.gameLog,index)
			},
			cutTab(index){
				this.betParams.pageIndex = 1
				this.params.pageIndex = 1
				this.tabAction=index
				this.tabCurrent = 0
				if(index===1){
					this.draw(this.gameLog,0)
				}else if(index===2){
					this.getBetRecord()
				}			
			},
			canvasIdErrorCallback(err){
				console.log('err',err)
			},
			// 时间切换游戏类型
			cutTime(key){
				this.betParams.pageIndex = 1
				this.params.pageIndex = 1
				this.current = key
				let game_id = 0
				if(this.game_type===0){
					if(this.noThree){ // 不展示三分彩
						if(key===0){
							game_id = 1
						}else{
							game_id = key + 2
						}
					}else{
						game_id = key+1
					}
				}else if(this.game_type===1){
					game_id = 8 + key+1
				}else{
					game_id = 4 + key+1
				}
				this.params.game_id = game_id
				this.betParams.game_id = game_id
				if(this.tabAction!==2){
					this.getResultRecord(1)
				}else{
					this.getBetRecord()
				}
				this.getBetRecord()
			},
			// 游戏开奖记录
			getResultRecord(type){
			  resultRecord(this.params).then(res=>{
				  this.gameLog = res.data.rows
				  this.total = res.data.total
				  this.getUserInfo();
				  // 页面加在初始化中将结果数字  
				  if(type == 1) {
					if(this.$refs.k3Ref) {
						this.$refs.k3Ref.setAnimation()
						this.$refs.k3Ref.getCurrentIssueWinNumber(res.data.rows[0].result)
					}
					if(this.$refs.d5Ref) {
						this.$refs.d5Ref.start(res.data.rows[0].result)
					}
				  }
			  })
			},
			//用户下注数据
			getBetRecord(){
				betRecord(this.betParams).then(res =>{
					this.betRecordList = res.data.rows
					this.total = res.data.total
					this.getUserInfo()
				})
			},
			// 下一页
			changePage(index){
				console.log('index', index)
				if(this.tabAction!==2){
					this.params.pageIndex = index
					this.getResultRecord()
				}else{
					this.betParams.pageIndex = index
					this.getBetRecord()
				}
				
			},
			keyWinNumber(value){
				return value.split(',')
			},
			// 求和
			sumWin(value){
				let arr =  []
				let sum = 0
				if(Array.isArray(value)){
					arr = value
				}else{
					arr = value.split(',')
				}
				arr.map(v=>{
					sum = sum + Number(v)
				})
				return sum
			},
			toService(){
				uni.navigateTo({
					url: '/pages/mine/customer-service'
				})
			},
			keyTime(time){
				return miment(time*1000).format()
			},
			toPath(path){
				uni.navigateTo({
					url: `/pages/finance/${path}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.can-box{
		position: absolute;
		width: 200px;
		height: 30px;
		top: 18px;
		left: 10px;
		z-index: 999;
	}
	.header-logo{
		width: 150px;
		height: 35px;
	}
	.earth{
		width: 25px;
		height: 25px;
		margin-left: 10px;
	}
	
	.game-head{
	    padding: 20px 15px 72px 15px;
	    background: url('/static/game/bg_top_red.73b020f3.min.png') no-repeat 0 0;
	    background-size: 100% 100%;
		.total-box {
		    background-color: #fff;
		    border-radius: 20px;
		    padding: 15px;
			.info{
				display: flex;
				flex-direction: row;
				align-items: center;
				// justify-content: space-between;
				font-size: 15px;
				color: #303133;
				font-weight: 600;
				.qianbao{
					width: 43px;
					height: 43px;
					margin-left: 10px;
				}
				.a-ml-1{
					position: absolute;
					right:-40px;
					// margin-left: 4px;
				}
			}
			.total-btn{
				padding: 10px 15px 0 15px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.item{
					width: 45%;
					height: 36px;
				}
				.cash{
					background: rgb(255, 206, 31);
					color: #fff;
					height: 36px;
					font-size: 15px;
				}
				.recharge{
					background: rgb(242, 65, 59);
					color: #fff;
					height: 36px;
					font-size: 15px;
				}
			}
		}
		.tips{
			margin-top: 20px;
			border-radius: 8px;
			background: rgb(255, 251, 232);
			padding: 9px 13px;
		}
	}
	.game-betting{
		margin-top: -56px;
		.tab{
			margin: 0 15px;
			background-color: #fff;
			border-radius: 15px;
			box-shadow: 0 0 8px 1px rgba(187,191,205,.3);
			.box{
				position: relative;
				display: flex;
				flex-direction: row;
				.itemInfo{
					width: 25%;
					padding: 11px 0;
				}
				.icon-top{
					width: 12px;
					height: 12px;
					border-radius: 10px;
					background: #6abe57;
					color: #fff;
					font-size: 12px;
					line-height: 12px;
					text-align: center;
					margin-bottom: 8px;
				}
				.image-icon{
					width: 21px;
					height: 21px;
				}
				.text{
					color: #6abe57;
					font-size: 14px;
				}
				.activeItem{
					border-radius: 15px;
					box-shadow: 0 0 8px 1px rgb(187 191 205 / 30%);
					.text{
						color: #fa4e46!important;
					}
					.icon-top{
						background: #fa4e46!important;
					}
				}
			}
		
		}
		
	}
	.game-list {
	    margin-top: 14px;
	    width: 100%;
	    padding-bottom: 19px;
		.tab{
			padding: 0 9px;
			height: 46px;
			line-height: 46px;
			.li{
				width: 32%;
				height: 37px;
				line-height: 37px;
				background-color: #eaeefc;
				border: 0.5px solid #3c5ef6;
				box-shadow: 0.5px 0.5px 4px 4px #eaeefc;
				border-radius: 9px;
				color: #050505;
				line-height: 37px;
				text-align: center;
				font-size: 14px;
			}
			.action{
				background-color: #fbedf3;
				border: 0.5px solid #fb4e4e;
				box-shadow: 0.5px 0.5px 4px 4px #fbedf3;
			}
		}
	}
	
	.head{
		background-color: #fbedf3;
	}
	.t-tr{
		padding: 15px;
		font-weight: 600;
		color: #000;
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
		.m-li{
			width: 16px;
			height: 16px;
			line-height: 16px;
			border: 0.5px solid #bbb;
			border-radius: 16px;
			margin-right: 4px;
			color: #bbb;
			font-size: 16px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.tr{
		font-weight: 400;
		font-size: 15px;
		color: rgb(96, 98, 102);
		border-bottom: 1px solid #e2e2e2;
	}
	.num_gcolor{
		color:#5cba47!important;
	}
	.num_rcolor{
		color: #d0322d!important;
	}
	.circle{
		height: 10px;
		width: 10px;
		border-radius: 50%;
	}
	.redc{
		background-color: #fb4e4e;
	}
	.greenc{
		background-color: #5cba47;
	}
	.color0{
		background-image: linear-gradient(to bottom right,#fb4e4e 50%,#eb43dd 0)!important
	}
	.color5{
		background-image: linear-gradient(to bottom right,#5cba47 50%,#eb43dd 0)!important;
	}
	.zi{
		margin-left: 5px;
		background-color: #eb43dd;
	}
	.list-fooder{
	    height: 20px;
	    background-color: #fbedf3;
	    border-bottom-right-radius: 20px;
	    border-bottom-left-radius: 20px;
	}
	.border{
		width: 16px!important;
		height: 16px;
		border-radius: 16px;
		margin-right: 4px;
		border: 1px solid #000;
		color: #000;
		background: #f4f4f4;
		text-align: center;
		line-height: 16px;
		font-size: 12px;
	}
	.border-r{
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		border: none;
		color: #fff;
		background-color: #fb4e4e;
		border-radius: 50%;
	}
	.third{
		font-size: 11px;
	}
	.icon-num{
		width: 20px;
		height: 20px;
		margin-right: 4px;
	}
	.tabBox{
		width: 100%;
		margin-top: 18px;
		margin-bottom: 9px;
		border-bottom: 1px solid #c7c7cc;
		.tabItem{
			width: 37px;
			height: 37px;
			line-height: 37px;
			background: #ceced8;
			font-size: 15px;
			font-weight: 700;
			color: #fff;
			border-radius: 17px 17px 0 0;
			position: relative;
			margin-right: 7px;
			text-align: center;
		}
		.action{
			background-color: #fa574a;
		}
		.action::after{
			background: radial-gradient(circle at 100% 0,rgba(204,0,0,0) 9px,#fa574a 10px);
			right: -9px;
			z-index: 9;
		}
	}
	.log-li{
		padding: 12px;
		font-size: 13px;
		color: rgb(96, 98, 102);
		border-bottom: 1px solid #e2e2e2;
		.period{
			font-size: 15px;
			padding-bottom: 5px;
		}
		.money{
			font-size: 15px;
		}
	}
	.state-r{
		background-color: #f3f1f1;
    padding: 3px 9px;
    // margin-left: 44px;
    border-radius: 18px;
    font-size: 11px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.flex-end{
		display: flex;
		align-items: flex-end;
	}
</style>