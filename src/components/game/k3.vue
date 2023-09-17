<template>
	<view class="content">
		<view class="page-box">
			<view class="period-title">
				<text>{{$t('lottery.timeText3')}}</text>
				<text>{{
					showMask ? 
					$t('lottery.timeText2'): $t('lottery.timeText1')
					}}
				</text>
			</view>
			
			<view class="period-span">
				<text class="txt">{{gameTime.period}}</text>
				<view>
					<!-- 开奖倒计时 -->
					<u-count-down 
						:time="timeGap" 
						ref="countDown" 
						format="mm:ss" 
						v-if="showMask" 
						@change="onChangeCountdown" 
						@finish="finishCountdown">
						<view class="time flex flex-item-col-center">
								<text class="time__custom__item time__custom__item1">0</text>
								<text class="time__custom__item">{{ countdownTime.minutes }}</text>
								<text class="time__custom__item">:</text>
								<text class="time__custom__item">{{ countdownTime.seconds1 }}</text>
								<text class="time__custom__item time__custom__item2">{{ countdownTime.seconds2 }}</text>
						</view>
					</u-count-down>
					<u-count-down 
							  :time="time" 
							  ref="countDownBet" 
							  format="mm:ss" 
							  v-else 
							  @change="onChange"
							  @finish="finish">
						<view class="time flex flex-item-col-center">
								<text class="time__custom__item time__custom__item1">0</text>
								<text class="time__custom__item">{{ timeData.minutes }}</text>
								<text class="time__custom__item">:</text>
								<text class="time__custom__item">{{ timeData.seconds1 }}</text>
								<text class="time__custom__item time__custom__item2">{{ timeData.seconds2 }}</text>
						</view>
					</u-count-down>
					<!-- <u-count-down :time="time" ref="countDown" format="mm:ss" @change="onChange" @finish="finish">
						<view class="time flex flex-item-col-center">
								<text class="time__custom__item">0</text>
								<text class="time__custom__item">{{ timeData.minutes }}</text>
								<text>:</text>
								<text class="time__custom__item">{{ timeData.seconds1 }}</text>
								<text class="time__custom__item">{{ timeData.seconds2 }}</text>
						</view>
					</u-count-down> -->
				</view>
			</view>
		</view>
		
		<!-- 游戏 -->
		<view class="gameBox flex-rcc">
			<view class="slot-inner">
				<view class="d5-slot-box">
					<view class="slot-column">
						<image :src="`/static/game/dice${firstNum}.png`" :class="animation1 ? 'dice addanimation':'dice'"></image>
					</view>
					<view class="slot-column">
						<image :src="`/static/game/dice${secondNum}.png`" :class="animation2 ? 'dice addanimation':'dice'"></image>
					</view>
					<view class="slot-column">
						<image :src="`/static/game/dice${thirdNum}.png`" :class="animation3 ? 'dice addanimation':'dice'"></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 菜单 -->
		<view class="bet-box flex flex-col">
			<view class="k3-bet-content-sum" v-if="tabAction===0&&gameInfo.odds && Object.keys(gameInfo.odds.TotalDicePlay).length>0">
				<view class="item flex-cc" v-for="(value,key,index) in gameInfo.odds.TotalDicePlay" :key="index" :class="{'action': selectList.includes(keyText(key))}" @click="select('TotalDicePlay',key)">
					<view class="itembox flex-cc">
						<text>{{keyText(key)}}</text>
						<text class="des">{{$t('lottery.k3.odds')}} {{value}}</text>
						<view class="select-icon flex-cc">
							<u-icon name="checkmark" size="9" color="red" bold></u-icon>
						</view>
					</view>
					
				</view>
			</view>
			
			<view v-else-if="tabAction===1" class="k3-bet-content-two">
				<view class="title">{{$t('lottery.k3.type2.text1')}}：{{$t('lottery.k3.odds')}} {{gameInfo.odds.DoubleDicePlay[11]}}</view>
				<view class="num-box flex flex-sb">
					<view class="num-box-item flex-rcc" v-for="i in numListTwo" :key="i" :class="{'action': selectList.includes(keyText(i))}" @click="select('DoubleDicePlay',i)">
					{{i}}
					<view class="select-icon flex-cc">
						<u-icon name="checkmark" size="9" color="#eb43dd" bold></u-icon>
					</view>
					</view>
				</view>
				<view class="des">*{{$t('lottery.k3.type2.text1.rule')}}</view>
				<view class="title">{{$t('lottery.k3.type2.text2')}}：{{$t('lottery.k3.odds')}} {{gameInfo.odds.DoubleDicePlay[112]}}</view>
				<view class="num-box flex flex-sb">
					<view class="num-box-item flex-rcc colorRed" v-for="i in numListTwo" :key="i" :class="{'actionRed': bothNum.includes(i)}" @click="selectboth('DoubleDicePlay',i)">
					{{i}}
					<view class="select-icon flex-cc">
						<u-icon name="checkmark" size="9" color="#fb4e4e" bold></u-icon>
					</view>
					</view>
				</view>
				<view class="num-box flex flex-sb">
					<view class="num-box-item flex-rcc colorGreen" v-for="i in 6" :key="i" :class="{'actionGreen': oddNum.includes(i)}" @click="selectodd('DoubleDicePlay',i)">
					{{i}}
					<view class="select-icon flex-cc">
						<u-icon name="checkmark" size="9" color="#5cba47" bold></u-icon>
					</view>
					</view>
				</view>
				<view class="des">*{{$t('lottery.k3.type2.text2.rule')}}</view>
			</view>
			
			<view v-else-if="tabAction===2" class="k3-bet-content-two">
				<view class="title">{{$t('lottery.k3.type3.text1')}}：{{$t('lottery.k3.odds')}}  {{gameInfo.odds.IdenticalDicePlay[111]}}</view>
				<view class="num-box flex flex-sb">
					<view class="num-box-item flex-rcc" v-for="i in numListThree" :key="i" :class="{'action': threeNum.includes(i)}" @click="selectThreeNum('IdenticalDicePlay',i)">
					{{i}}
					<view class="select-icon flex-cc">
						<u-icon name="checkmark" size="9" color="#eb43dd" bold></u-icon>
					</view>
					</view>
				</view>
				<view class="des">*{{$t('lottery.k3.type3.text1.rule')}}</view>
				<view class="title">{{$t('lottery.k3.type3.text2')}}：{{$t('lottery.k3.odds')}} {{gameInfo.odds.IdenticalDicePlay.AAA}}</view>
				<view class="num-box flex flex-sb">
					<view class="num-box-item flex-rcc num-box-item3 colorRed" :class="{'actionRed': isThree}" @click="selectThree('IdenticalDicePlay')">
					{{$t('lottery.k3.type3.text2')}}
					<view class="select-icon flex-cc">
						<u-icon name="checkmark" size="9" color="#fb4e4e" bold></u-icon>
					</view>
					</view>
				</view>
				<view class="des">*{{$t('lottery.k3.type3.text2.rule')}}</view>
			</view>
			
			<view v-else class="k3-bet-content-two">
				<view class="title" v-if="gameInfo.odds!==null && Object.keys(gameInfo.odds.DifferentDicePlay).length>0">{{$t('lottery.k3.type4.text1')}}：{{$t('lottery.k3.odds')}} {{gameInfo.odds.DifferentDicePlay.Three}}</view>
				<view class="num-box flex flex-sb">
					<view class="num-box-item flex-rcc" v-for="i in 6" :key="i" :class="{'action': threeDiffNum.includes(i)}" @click="selectThreeDiffNum('DifferentDicePlay',i)">
					{{i}}
					<view class="select-icon flex-cc">
						<u-icon name="checkmark" size="9" color="#eb43dd" bold></u-icon>
					</view>
					</view>
				</view>
				<view class="des">*{{$t('lottery.k3.type4.text1.rule')}}</view>
				<view class="title" v-if="Object.keys(gameInfo.odds).length>0&& Object.keys(gameInfo.odds.DifferentDicePlay).length>0">{{$t('lottery.k3.type4.text2')}}：{{$t('lottery.k3.odds')}} {{gameInfo.odds.DifferentDicePlay.Straight}}</view>
				<view class="num-box flex flex-sb">
					<view class="num-box-item flex-rcc num-box-item3 colorRed" :class="{'actionRed': isThreeConNum}" @click="selectThreeConNum">
					{{$t('lottery.k3.type4.text2')}}
					<view class="select-icon flex-cc">
						<u-icon name="checkmark" size="9" color="#fb4e4e" bold></u-icon>
					</view>
					</view>
				</view>
				<view class="des">*{{$t('lottery.k3.type4.text2.rule')}}</view>
				<view class="title" v-if="Object.keys(gameInfo.odds).length>0 && Object.keys(gameInfo.odds.DifferentDicePlay).length>0">{{$t('lottery.k3.type4.text3')}}：{{$t('lottery.k3.odds')}} {{gameInfo.odds.DifferentDicePlay.Two}}</view>
				<view class="num-box flex flex-sb">
					<view class="num-box-item flex-rcc" v-for="i in 6" :key="i" :class="{'action': twoDiffNum.includes(i)}" @click="selectTwoDiffNum('DifferentDicePlay',i)">
					{{i}}
					<view class="select-icon flex-cc">
						<u-icon name="checkmark" size="9" color="#eb43dd" bold></u-icon>
					</view>
					</view>
				</view>
				<view class="des">*{{$t('lottery.k3.type4.text3.rule')}}</view>
			</view>
			
			<view class="flex">
				<view class="flex-rcc tabItem" v-for="item in tabList" :key="item.value" :class="{'tabAction':tabAction===item.value}" @click="tabChange(item)">
					{{item.label}}
				</view>
			</view>
			<!-- 代理游戏 -->
			<view class="flex" style="margin-top: 10px;" v-if="agentGameList.length>1">
				<view class="agent-item" :class="{'red-agent-item': Number(gameId)===item.game_id}" v-for="(item,index) in agentGameList" :key="index">{{item.agent_alias}}</view>
			</view>
			<!-- 倒计时遮罩 -->
			<!-- <view class="mask-box flex-rcc" v-if="timeData.minutes=== 0 && timeData.seconds<11 &&timeData.seconds>0">
				<view class="countTimeBox rihht-1">{{timeData.seconds1}}</view>
				<view class="countTimeBox">{{timeData.seconds2}}</view>
			</view>	 -->
			<view class="mask-box flex-rcc" v-if="showMask">
				<view class="countTimeBox rihht-1">{{countdownTime.seconds1}}</view>
				<view class="countTimeBox">{{countdownTime.seconds2}}</view>
			</view>	
		</view>
		
		<!-- 底部弹窗 -->
		<u-popup :show="show" :round="15" mode="bottom" class="popupStyle" :overlay="false" safeAreaInsetBottom>
			<view class="popupBox">
				<view class="popup-bet-box">
					<view class="flex flex-col">
						<template v-if="tabAction===0">
							<view class="flex flex-warp flex-item-col-center">
								<text class="name">{{$t('lottery.popup.cell0')}}：</text>
								<view v-for="(i,index) in selectList" :key="index" class="select-num">{{i}}</view>
							</view>
						</template>
						
						<template v-if="tabAction===1">
							<template v-if="selectList.length>0">
								<view class="flex flex-warp flex-item-col-center">
									<text class="name">{{$t('lottery.k3.type2.text1')}}：</text>
									<view v-for="(i,index) in selectList" :key="index" class="select-num actionViolet">{{i}}</view>
								</view>
							</template>
							
							<template v-if="bothNum.length>0 && oddNum.length>0">
								<view class="flex flex-warp flex-item-col-center">
									<text class="name">{{$t('lottery.k3.type2.text2')}}：</text>
									<view v-for="(i,index) in bothNum" :key="index" class="flex flex-warp flex-item-col-center">
										<text class="li actionRedGreen" v-for="(j,index1) in oddNum" :key="index1">{{i}}  {{j}}</text>
									</view>
								</view>
							</template>
						</template>
						<!-- 模式三 -->
						<template v-if="tabAction===2">
							<view class="flex-col">
								<template v-if="threeNum.length>0">
								<view class="flex flex-warp flex-item-col-center">
									<text class="name">{{$t('lottery.k3.type3.text1')}}：</text>
									<view v-for="(i,index) in threeNum" :key="index" class="select-num actionViolet">{{i}}</view>
								</view>
								</template>
								<template v-if="isThree">
									<view class="actionRed">{{$t('lottery.k3.type3.text2')}}</view>
								</template>
							</view>
						</template>
						
						<!-- 模式四 -->
						<template v-if="tabAction===3">
							<view class="flex-col">
								<template v-if="threeDiffNum.length>=3">
								<view class="flex flex-warp flex-item-col-center">
									<text class="name">{{$t('lottery.k3.type4.text1')}}：</text>
									<view v-for="(i,index) in groupThree" :key="index" class="select-num actionViolet">
										{{i}}
										<!-- <text v-for="(j,index1) in threeDiffNum" :key="index1">
											<template v-if="index1+1<threeDiffNum.length && i<threeDiffNum[index1+1]">
													<text v-for="(k,index2) in threeDiffNum" :key="index2">
														<template v-if="index2+2<threeDiffNum.length && threeDiffNum[index1+1]< threeDiffNum[index2+2]">
														<text class="select-num actionViolet" style="display: inline-block;box-sizing: border-box;">
														{{i}}{{threeDiffNum[index1+1]}}{{threeDiffNum[index2+2]}}
														</text>
														</template>
													</text>
											</template>
										</text> -->
									</view>
								</view>
								</template>
								<template v-if="isThreeConNum">
									<view class="actionRed">{{$t('lottery.k3.type4.text2')}}</view>
								</template>
								<template v-if="twoDiffNum.length>=2">
								<view class="flex flex-warp flex-item-col-center">
									<text class="name">{{$t('lottery.k3.type4.text3')}}：</text>
									<view v-for="(i,index) in groupTwo" :key="index" class="select-num actionViolet"> 
									{{i}}
										<!-- <text v-for="(j,index1) in twoDiffNum" :key="index1">
											<template v-if="index1+1<twoDiffNum.length && i<twoDiffNum[index1+1]">
												<text class="select-num actionViolet" style="display: inline-block;box-sizing: border-box;">{{i}}{{twoDiffNum[index1+1]}}</text>
											</template>
										</text> -->
									</view>
								</view>
								</template>
							</view>
						</template>
						
					</view>
				</view>
				<view class="info">
					<view class="item flex-sb">
						<text class="name">{{$t('lottery.popup.cell1')}}</text>
						<view>
							<u-radio-group 
							    v-model="form.currency"
								@change="currencyChange"
							    placement="row">
								<u-radio :label="item.symbo" :name="item.currency" style="margin-right: 10px;" v-for="(item,index) in balances" :key="index"></u-radio>
							</u-radio-group>
						</view>
					</view>
					<view class="item flex-sb">
						<text class="name">{{$t('lottery.popup.cell2')}}</text>
						<view class="flex flex-item-col-center">
							<view v-for="i in moneyList" :key="i" class="monItem" :class="{'action':form.money === i }" @click="cutMon(i)">{{i}}</view>
							<!-- <view class="monItem" :class="{'action':isAllin}" @click="allIn">all in</view> -->
						</view>
					</view>
					<view class="item flex-sb">
						<text class="name">{{$t('lottery.popup.cell3')}}</text>
						<view class="number_box">
							<u-number-box 
								v-model="form.size" 
								bgColor="#f4453e" 
								color="#fff"
								integer
								iconStyle="color: #fff" 
								@change="valChange">
								
							</u-number-box>
						</view>
					</view>
					<view class="item liBox">
						<view class="li" v-for="i in liList" :key="i" :class="{'action': form.size === i}" @click="rateChange(i)">X{{i}}</view>
					</view>
					
					<view class="item">
						<view class="flex flex-item-col-center">
							<u-checkbox-group v-model="agree">
								<u-checkbox activeColor="red" :label="$t('lottery.popup.agree')" labelSize="10px" labelColor="#000" :name="1"></u-checkbox>
							</u-checkbox-group>
							<text class="rule" @click="$emit('openRule')">{{$t('lottery.popup.rule')}}</text>
						</view>
					</view>
				</view>
				
				<view class="foot">
					<view class="left flex-rcc" @click="cancel">{{$t('lottery.popup.btn1')}}</view>
					<view class="right flex-rcc" @click="postBet">{{$t('lottery.popup.btn2')}}  {{sum}}</view>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import miment from 'miment'
	import { getTimes, getGame, bet, getResult, getGameAgentAlias } from '@/api/index.js'
	export default{
		props:{
			gameId:{
				type: [String,Number],
				default: ''
			},
			balances:{
				type: [Array],
				default: []
			},
		},
		data(){
			return{
				timmer: null,
				timer: null,
				timer1: null,
				timer2: null,
				random_num: 1,
				time: 600000,
				timeData: {},
				countdownTime:{},
				firstNum: 1,
				secondNum: 1,
				thirdNum: 1,
				currentArr : [2,1,6],
				tabAction:0, // 当前所选菜单
				win_number: '4,2,1',
				numListTwo: [11,22,33,44,55,66],
				numListThree: [111,222,333,444,555,666],
				selectList: [], // 模式一 总数 文字
				selectArrList: [], // 玩法一 key
				bothNum: [], // 模式二 双数
				oddNum: [], // 模式二 双数
				threeNum: [], // 模式三 双数
				isThree: false, //模式三 选择三个相同的数
				threeDiffNum: [], // 模式四 三个不同数
				twoDiffNum: [], // 模式四 两个不同数
				isThreeConNum: false, // 模式四 连续三个数
				groupTwo: [], // 模式四 两个不同数循环组合
				groupThree: [], // 模式四 三个不同数循环组合
				params:{
					currentIssue: '20221223120130',
					game_id: '12',
					sign: 'e06cbd9252e5c50fc88fccae98134594',
					unixtime: 1671802799750,
				},
				show: false, // 弹窗
				moneyList: [1,10,100,1000,10000],
				liList: [1,3,9,27,81,243,729],
				rate:1, // 倍率
				form:{
					game_id: null, // 游戏id
					currency: 'SYSTEM', // 币种
					period: null, // 期号
					play_group: null, // 玩法组名
					bet_play: null, // 玩法
					bet_amount: 0, // 下注金额
					money: 1,
					size: 1
				},
				agree: [1],
				gameInfo: {}, // 游戏数据
				gameTime: {}, // 开奖时间
				winInfo:{}, // 开奖号码
				sum: null,
				agentGameList: [], // 代理游戏列表
				timeGap:10000,
				showMask:false,
				isAllin:false,
				animation1:true,
				animation2:true,
				animation3:true
			}
		},
		computed:{
			tabList(){
				let arr =[{value: 0, label: this.$t('lottery.k3.menu1')},{value: 1, label: this.$t('lottery.k3.menu2')},{value: 2, label: this.$t('lottery.k3.menu3')},{value: 3, label: this.$t('lottery.k3.menu4')}]
				return arr
			}
		},
		watch:{
			'gameId':{
				immediate: true,
				handler(newV){
					if(newV){
						this.form.game_id = newV
						this.getGameData()
						this.getTime()
					}
				}
			},
			// 第一项
			selectList:{
				 handler(nV,oV){
					const length = this.selectList.length
					if(this.tabAction === 0){ // 第一种总数
						if(length>0){
							this.sum = length * this.form.size * this.form.money
						}
					}else if(this.tabAction === 1){ // 第二种 2数相同或2+1
						if(length>0){
							if(this.bothNum.length>0 && this.oddNum.length>0){
								let newNum = this.bothNum.length * this.oddNum.length +length
								this.sum = newNum * this.form.size * this.form.money
							}else{
								this.sum = length * this.form.size * this.form.money
							}	
						}
					}
					 
				 },
				 deep: true,
				 immediate:true
			},
			
			// 第二种 双数
			bothNum:{
				handler(nV,oV){
					const bothlength = this.bothNum.length
					const oddlength = this.oddNum.length
					const selectlength = this.selectList.length
					let newNum = bothlength * oddlength + selectlength
					this.sum = newNum * this.form.size * this.form.money
				},
				deep: true,
				immediate:true
			},
			
			// 第二种 单数
			oddNum:{
				handler(nV,oV){
					const bothlength = this.bothNum.length
					const oddlength = this.oddNum.length
					const selectlength = this.selectList.length
					let newNum = bothlength * oddlength + selectlength
					this.sum = newNum * this.form.size * this.form.money
				},
				deep: true,
				immediate:true
			},
			// timeData:{
			// 	handler(nV,oV){
			// 		if(nV.minutes=== 0 && nV.seconds<11 &&nV.seconds>0){
			// 		 if(this.show){
			// 			 this.cancel()
			// 		 }
			// 		}
			// 		if(nV.minutes=== 0 && nV.seconds===11){
			// 			this.$emit('music')
			// 		}
			// 	},
			// 	deep: true,
			// 	immediate:true
			// }
		},
		methods:{
			currencyChange() {
				let findObj = this.balances.find(item=>item.currency == this.form.currency);
				// this.sum = findObj.balance
			},
			// 切换代理
			cutAgent(item){
				this.$emit('cutAgent', item)
				console.log('item', item)
			},
			// 获取游戏信息
			getGameData(){
				getGame({game_id: this.gameId}).then(res =>{
					this.gameInfo = res.data
					this.getGameAgentList()
				})
			},
			// 获取代理游戏列表
			getGameAgentList(){
				getGameAgentAlias({game_name: this.gameInfo.game_name}).then(res=>{
					this.agentGameList = res.data
				})
			},
			
			// 游戏开奖时间
			getTime(isEnd){
				getTimes({game_id: this.gameId}).then(res=>{
					this.gameTime = res.data
					// this.form.period = res.data.period // 期号
					// this.comOpenTime(this.gameTime.current_time, this.gameTime.end_time)

					// 判断当前时间是否在封盘时间段内
					let onDraw = miment(this.gameTime.current_time).isBetween(this.gameTime.open_time,this.gameTime.closing_time);
					console.log(onDraw,"ondraw")
					if(onDraw) {
						// 封盘时间 展示倒计时的弹窗 并且倒计时的时间段为 current_time ---- closing_time
						this.showMask = true
						// 倒计时显示多少秒数
						this.timeGap = miment(miment().distance(res.data.closing_time, res.data.current_time)).stamp() + 1000;
						// 设置倒计时的时间段
						this.comCountTime(this.gameTime.current_time, this.gameTime.closing_time)

					}else {
						// 倒计时显示多少秒数
						this.timeGap = miment(miment().distance(res.data.closing_time, res.data.open_time)).stamp() + 1000 ;
						this.comOpenTime(this.gameTime.current_time, this.gameTime.end_time)
						this.form.period = res.data.period // 期号
					}
					if(isEnd){ // 倒计时结束查结果更新记录
						this.getResultData(this.gameTime.previous_period,isEnd)
					}
				})
			},
			
			// 下注
			postBet(){
				let arr = []
				console.log('arr', arr)
				if(this.tabAction===0){ // 选项一总数 
					arr = [...this.selectArrList]
				}else if(this.tabAction===1){
					arr = this.sumSelect2()
				}else if(this.tabAction===2){
					arr = [...this.threeNum]
					console.log('this.isThree', typeof this.isThree)
					if(this.isThree){
						arr.push('AAA')
					}
				}else{ // 模式四
					if(this.threeDiffNum.length>=3){
						arr.push('Three')
					} 
					if(this.isThreeConNum){
						arr.push('Straight')
					}
					if(this.twoDiffNum.length>=2){
						arr.push('Two')
					}
				}
				this.form.bet_amount = this.sum/arr.length
				// if(this.tabAction!==3){
					arr.map((v,index)=>{
						this.form.bet_play = v
						if(this.tabAction===3){
							if(v==='Three' || v==='Two'){
								this.form.bet_info = []
								if(v==='Three'){
									this.form.bet_info = this.threeDiffNum
								}else{
									this.form.bet_info = this.twoDiffNum
								}
							}else{
								if(this.form.bet_info || this.form.bet_info>=0){
									delete this.form.bet_info
								}
							}
						}
						bet(this.form).then(res=>{
							if(index === arr.length-1){
								this.cancel()
								uni.showToast({
									title: this.$t('game.toast'),
									duration: 2000
								});
								this.$emit('upDataLog')
							}
						})
					})
				// }else{
				// 	arr.map((v,index)=>{
				// 		this.form.bet_play = v
				// 		if(v==='Three' || v==='Two'){
				// 			this.form.bet_info = []
				// 			if(v==='Three'){
				// 				this.form.bet_info = this.threeDiffNum
				// 			}else{
				// 				this.form.bet_info = this.twoDiffNum
				// 			}
				// 		}else{
				// 			if(this.form.bet_info || this.form.bet_info>=0){
				// 				delete this.form.bet_info
				// 			}
				// 		} 
				// 		bet(this.form).then(res=>{
				// 			if(index === arr.length-1){
				// 				this.cancel()
				// 				uni.showToast({
				// 					title: this.$t('game.toast'),
				// 					duration: 2000
				// 				});
				// 				this.$emit('upDataLog')
				// 			}
				// 		})
				// 	})
				// }
				
			},
			
			// 计算选项二 投注数量
			sumSelect2(){
				let arr = [...this.selectArrList]
				this.bothNum.map(i=>{
					this.oddNum.map(v=>{
						let newNum = String(i)+String(v)
						arr.push(newNum)
					})
				})
				return arr
			},
			
			// tab切换
			tabChange(item){
				this.tabAction = item.value
				this.cancel()
			},
			
			keyText(num){
				let str = ''
				switch (num){
					case 'Big':
						str = this.$t('lottery.winGo.big')
						break;
					case 'Small':
						str = this.$t('lottery.winGo.small')
						break;
					case 'Odd':
						str = this.$t('lottery.k3.odd')
						break;
					case 'Even':
						str = this.$t('lottery.k3.even')
						break;
					default:
						str = num
						break;
				}
				return str
			},
			randomNum(){
				this.timer = setInterval(()=>{
					this.firstNum= Math.ceil(Math.random()*6)
				},60)
				this.timer1 = setInterval(()=>{
					this.secondNum = Math.ceil(Math.random()*6)
				},60)
				this.timer2 = setInterval(()=>{
					this.thirdNum = Math.ceil(Math.random()*6)
				},60)
			},
			
			// 获取本期开奖
			getResultData(previous_period,isEnd){
				let params = {
					game_id: this.gameId,
					period: previous_period
				}
				// this.timmer = setInterval(()=>{
				// 	getResult(params).then(res=>{
				// 		// this.winInfo = res.data
				// 		clearInterval(this.timmer)
				// 		if(res.data!==null){
				// 			this.getCurrentIssueWinNumber(res.data.result,isEnd)
				// 		}
				// 		this.$emit('updata')
				// 	})
				// },1000)
				getResult(params).then(res=>{
						// this.winInfo = res.data
						// clearInterval(this.timmer)
						if(res.data!==null){
							this.getCurrentIssueWinNumber(res.data.result,isEnd)
						}
						this.$emit('updata')
					})
			},
			setAnimation() {
				this.animation1 = true;
				this.animation2 = true;
				this.animation3 = true;
			},
			// 获取本局结果
			getCurrentIssueWinNumber(arr,isEnd){
				let timerArr;
				if(isEnd) {
					timerArr = [0,300,600];
				}else {
					timerArr = [800,1500,2000];
				}
				setTimeout(()=>{
					clearInterval(this.timer)
					this.firstNum= arr[0]
					this.animation1 = false;
				},timerArr[0])
				setTimeout(()=>{
					clearInterval(this.timer1)
					this.secondNum = arr[1]
					this.animation2 = false
				},timerArr[1])
				setTimeout(()=>{
					clearInterval(this.timer2)
					this.thirdNum = arr[2]
					this.animation3 = false
				},timerArr[2])
			},
			
			
			// 选择总和
			select(group,key){
				this.form.play_group = group
				const key1 = this.keyText(key)
				if(!this.show) this.show=true
				if(this.selectList.length===0){
					this.selectList.push(key1)
					this.selectArrList.push(key)
				}else{
					const index = this.selectList.findIndex(v=>v===key1)
					if(index<0){
						this.selectList.push(key1)
						this.selectArrList.push(key)
					}else{
						this.selectList.splice(index,1)
						this.selectArrList.splice(index,1)
					}
				}
				if(this.tabAction===0){
					if(this.selectList.length ===0) this.show=false
				}else if(this.tabAction===1){
					if(this.selectList.length ===0 &&(this.bothNum.length ===0 || this.oddNum.length ===0)) this.show=false
				}
				console.log('this.selectArrList', this.selectArrList)
			},
			
			// 双数选择
			selectboth(name,i){
				this.form.play_group = name
				if(this.oddNum.length>0){
					const yu = i%10
					let index = this.oddNum.findIndex(v=> v===yu)
					if(index>-1) this.oddNum.splice(index,1)
				}
				if(this.bothNum.length===0){
					this.bothNum.push(i)
				}else{
					const index = this.bothNum.findIndex(v=>v===i)
					if(index<0){
						this.bothNum.push(i)
					}else{
						this.bothNum.splice(index,1)
					}
				}
				if(this.bothNum.length>0 && this.oddNum.length>0 && !this.show) this.show=true
				if((this.bothNum.length ===0 || this.oddNum.length ===0) && this.selectList.length===0) this.show=false
			},
			
			// 单数选择
			selectodd(name,i){
				this.form.play_group = name
				if(this.bothNum.length>0){
					const sum = i*11
					let index = this.bothNum.findIndex(v=> v===sum)
					if(index>-1) this.bothNum.splice(index,1)
				}
				if(this.oddNum.length===0){
					this.oddNum.push(i)
				}else{
					const index = this.oddNum.findIndex(v=>v===i)
					if(index<0){
						this.oddNum.push(i)
					}else{
						this.oddNum.splice(index,1)
					}
				}
				if(this.bothNum.length>0 && this.oddNum.length>0 && !this.show) this.show=true
				if((this.bothNum.length ===0 || this.oddNum.length ===0) && this.selectList.length===0) this.show=false
			},
			
			// 模式三 三数选择相同
			selectThreeNum(name,i){
				this.form.play_group = name
				if(!this.show) this.show=true
				if(this.threeNum.length===0){
					this.threeNum.push(i)
				}else{
					const index = this.threeNum.findIndex(v=>v===i)
					if(index<0){
						this.threeNum.push(i)
					}else{
						this.threeNum.splice(index,1)
					}
				}
				if(this.show){
					let num = this.isThree? 1 : 0
					let newnum = this.threeNum.length + num
					this.sum = newnum * this.form.size * this.form.money
				}
				if(this.threeNum.length ===0) this.show=false
			},
			
			// 模式三  三个相同数按钮
			selectThree(name){
				this.form.play_group = name
				this.isThree = !this.isThree
				if(this.isThree){
					this.show = true
				}else{
					if(this.threeNum.length===0){
						this.show = false
					}
				}
				if(this.show){
					let num = this.isThree? 1 : 0
					let newnum = this.threeNum.length + num
					this.sum = newnum * this.form.size * this.form.money
				}
			},
			
			// 模式四 三个不同数字
			selectThreeDiffNum(name,i){
				this.form.play_group = name
				if(this.threeDiffNum.length===0){
					this.threeDiffNum.push(i)
				}else{
					const index = this.threeDiffNum.findIndex(v=>v===i)
					if(index<0){
						this.threeDiffNum.push(i)
					}else{
						this.threeDiffNum.splice(index,1)
					}
				}
				if(this.threeDiffNum.length>=3){
					this.groupThree = []
					for(let i=0;i<=this.threeDiffNum.length;i++){
						for(let j=0;j<=this.threeDiffNum.length;j++){
							if(this.threeDiffNum[i]<this.threeDiffNum[j] && this.threeDiffNum[j]){
								for(let h=0;h<=this.threeDiffNum.length;h++){
									if(this.threeDiffNum[j]<this.threeDiffNum[h]&& this.threeDiffNum[h]){
										let str = `${this.threeDiffNum[i]}${this.threeDiffNum[j]}${this.threeDiffNum[h]}`
										this.groupThree.push(str)
									}
									
								}
								
							}
						}
					}
					
				}
				if(this.show){
					if(this.twoDiffNum.length<2 && !this.isThreeConNum && this.threeDiffNum.length<3){
						this.show = false
					}
					let num = this.isThreeConNum? 1 : 0
					let newnum = this.groupThree.length + num + this.groupTwo.length
					this.sum = newnum * this.form.size * this.form.money
				}
				if(this.threeDiffNum.length >=3) this.show=true
			},
			
			// 模式四 两个不同数字
			selectTwoDiffNum(name,i){
				this.form.play_group = name
				if(this.twoDiffNum.length===0){
					this.twoDiffNum.push(i)
				}else{
					const index = this.twoDiffNum.findIndex(v=>v===i)
					if(index<0){
						this.twoDiffNum.push(i)
					}else{
						this.twoDiffNum.splice(index,1)
					}
				}
				if(this.twoDiffNum.length>=2){
					this.groupTwo = []
					for(let i=0;i<=this.twoDiffNum.length;i++){
						for(let j=0;j<=this.twoDiffNum.length;j++){
							if(this.twoDiffNum[i]<this.twoDiffNum[j] && this.twoDiffNum[j]){
								let str = `${this.twoDiffNum[i]}${this.twoDiffNum[j]}`
								this.groupTwo.push(str)
							}
						}
					}
				}
				if(this.show){
					if(this.twoDiffNum.length<2 && !this.isThreeConNum && this.threeDiffNum.length<3){
						this.show = false
					}
					let num = this.isThree? 1 : 0
					let newnum = this.threeNum.length + num
					this.sum = newnum * this.form.size * this.form.money
				}
				if(this.twoDiffNum.length >=2) this.show=true
			},
			
			// 模式四 连续三个数字
			selectThreeConNum(){
				this.isThreeConNum = !this.isThreeConNum
				if(this.isThreeConNum){
					this.show = true
				}else{
					if(this.threeDiffNum.length<3 && this.twoDiffNum.length<2){
						this.show = false
					}
				}
				if(this.show){
					let num = this.isThreeConNum? 1 : 0
					let newnum = this.groupThree.length + num + this.groupTwo.length
					this.sum = newnum * this.form.size * this.form.money
				}
			},
						// all in 
			allIn() {
				this.isAllin = true;
				let findObj = this.balances.find(item=>item.currency == this.form.currency);
				this.form.money = 1;
				this.rateChange(Math.trunc(findObj.balance))
				this.sum = Math.trunc(findObj.balance)
			},
			// 切换金额
			cutMon(i){
				if(this.isAllin) {
					this.isAllin = false
					this.form.size = 1
				}
				this.form.money = i
				let newNum = 0
				if(this.tabAction===0){ // 第一种
					newNum = this.selectList.length
				}else if(this.tabAction===1){
					const bothlength = this.bothNum.length
					const oddlength = this.oddNum.length
					const selectlength = this.selectList.length
					newNum = bothlength * oddlength + selectlength	
				}else if(this.tabAction===2){
					let num = this.isThree? 1 : 0
					newNum = this.threeNum.length + num
				}else{
					let num = this.isThreeConNum? 1 : 0
					newNum = this.groupThree.length + num + this.groupTwo.length
				}
				this.sum = newNum * this.form.size * this.form.money
			},
			// 数量change
			valChange(e){
				let newNum = 0
				if(this.tabAction===0){ // 第一种
					newNum = this.selectList.length
				}else if(this.tabAction===1){
					const bothlength = this.bothNum.length
					const oddlength = this.oddNum.length
					const selectlength = this.selectList.length
					newNum = bothlength * oddlength + selectlength
				}else if(this.tabAction===2){
					let num = this.isThree? 1 : 0
					newNum = this.threeNum.length + num
				}else{
					let num = this.isThreeConNum? 1 : 0
					let newNum = this.groupThree.length + num + this.groupTwo.length
				}
				this.sum = newNum * e.value * this.form.money
			},
			// 倍率
			rateChange(i){
				this.form.size = i
				let newNum = 0
				if(this.tabAction===0){// 第一种
					newNum = this.selectList.length
				}else if(this.tabAction===1){	
					const bothlength = this.bothNum.length
					const oddlength = this.oddNum.length
					const selectlength = this.selectList.length
					newNum = bothlength * oddlength + selectlength
				}else if(this.tabAction===2){
					let num = this.isThree? 1 : 0
					newNum = this.threeNum.length + num
				}else{
					let num = this.isThreeConNum? 1 : 0
					newNum = this.groupThree.length + num + this.groupTwo.length
				}
				this.sum = newNum * this.form.size  * this.form.money
				
			},
			closePopup(){
				this.init()
			},
			// 取消按钮
			cancel(){
				this.selectArrList = []
				this.selectList = []
				this.bothNum = []
				this.oddNum = []
				this.threeNum = []
				this.threeDiffNum = []
				this.twoDiffNum = []
				this.groupThree = []
				this.groupTwo = []
				this.isThree = false
				this.isThreeConNum = false
				this.show = false
				this.init()
			},
			//初始化
			init(){
				this.sum = 0
				this.form.play_group = null
				this.form.bet_play = null
				this.form.bet_amount = 0
				this.form.money = 5
				this.form.size = 1
				this.showMask = false
			},
			
			onChange(e) {
				let str = (e.seconds/10).toFixed(1)
				let arr = str.split('.')
				this.timeData = e
				this.timeData.seconds1 = Number(arr[0])
				this.timeData.seconds2 = Number(arr[1])
			},
			onChangeCountdown(e) {
				let str = (e.seconds/10).toFixed(1)
				let arr = str.split('.')
				this.countdownTime = e
				this.countdownTime.seconds1 = arr[0]
				this.countdownTime.seconds2 = arr[1]
			},
			finish(){
				// this.getTime(true)
				// this.randomNum()
				// this.$refs.countDown.reset();
				this.$refs.countDownBet.reset();
				this.$emit('music',this.timeGap)
				if(this.show) {
					this.show = false
				}
				this.comCountTime(this.gameTime.open_time, this.gameTime.closing_time)
			},
			// 开奖倒计时
			finishCountdown() {
				this.$refs.countDown.reset()
				this.init()
				this.getTime(true)
			},
			// 计算距开奖时间剩余秒数
			comOpenTime(star,end){
				console.time()
				let arr = (miment().distance(star, end).format('mm,ss',true)).split(',')
				this.time = (Number(arr[0])*60 +Number(arr[1])) *1000
				console.timeEnd()
			},
			comCountTime(start,end) {
				console.log(start,end,"comCountTime")
				console.time()
				let arr = (miment().distance(start, end).format('mm,ss',true)).split(',')
				this.countTime = (Number(arr[0])*60 +Number(arr[1])) *1000
				this.showMask = true;
				this.setAnimation()
				console.log(this.countTime)
				console.timeEnd()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mask-box{
		width: 100%;
		height: 100%;
		border-radius: 15px;
		background-color: rgba(0, 0, 0, .6);
		position: absolute;
		top: 0;
		left: 0;
		.countTimeBox{
			display: inline-block;
			border-radius: 14px;
			padding: 0 14px;
			background-color: #fb4e4e;
			font-size: 150px;
			color: #fff;
			font-weight: bold;
			margin-right: 18px;
		}
		.rihht-1{
			// margin-right: 13px;
		}
	}
	.number_box {
		::v-deep {
			.u-number-box__input {
				background-color: #fff !important;
				color: #303133 !important;
				border:1px solid #cdcdcd;
				width: 80px !important;
			}
		}
	}
	.content {
	    margin-top: 14px;
	    padding: 0 9px;
		.page-box{
		    width: 100%;
		    background: #fff;
		    border-radius: 37px 37px 0 0;
		    position: relative;
			.period-title {
			    display: flex;
			    justify-content: space-between;
			    align-items: center;
			    font-size: 13px;
			    font-weight: 400;
			    color: #8e8e93;
			    margin-bottom: 4px;
			}
			.period-span{
			    display: flex;
			    justify-content: space-between;
			    align-items: center;
			    font-size: 20px;
			    font-weight: 700;
				.txt{
					font-size: 20px;
					font-weight: 700;
				}
				.time__custom__item{
					font-size: 20px;
					width: 18px;
					height: 28px;
					line-height: 28px;
					background: #efeff4;
					border-radius: 2px;
					margin-left: 14px;
					color: #00b977;
					text-align: center;
				}
			}
		}
		.dice{
			width: 82px;
			height: 80px;
		}
		.addanimation {
			animation: rotate .8s infinite ease-in;
		}
		@keyframes rotate {
            0% {
                transform: rotateZ(180deg);
            }

            20% {
                transform: rotateZ(360deg);
            }

            40% {
                transform: rotateZ(180deg);
            }

            60% {
                transform: rotateZ(360deg);
            }

            80% {
                transform: rotateZ(180deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }
}
	
	.gameBox{
		.slot-inner{
		    padding: 9px;
		    background: #00b977;
		    display: inline-block;
		    border-radius: 6px;
		    position: relative;
		    margin-top: 18px;
			.d5-slot-box{
			    padding: 5px 0;
			    background: linear-gradient(180deg,#003b26,#005226);
			    border-radius: 2px;
			    display: inline-block;
			    position: relative;
			}
			.d5-slot-box::before {
			    position: absolute;
			    top: 38px;
			    width: 0;
			    height: 0;
			    border-top: 6px solid transparent;
			    border-bottom: 6px solid transparent;
			    content: "";
			    z-index: 3;
			    left: -1px;
			    border-right: 18px solid transparent;
			    border-left: 18px solid #00b977;
			}
			.d5-slot-box::after {
			    position: absolute;
			    top: 38px;
			    width: 0;
			    height: 0;
			    border-top: 6px solid transparent;
			    border-bottom: 6px solid transparent;
			    content: "";
			    z-index: 3;
			    right: -1px;
			    border-left: 18px solid transparent;
			    border-right: 18px solid #00b977;
			}
			.slot-column{
			    display: inline-block;
			    width: 82px;
			    height: 80px;
			    border-radius: 3px;
			    overflow: hidden;
			    background: #333;
			    margin-right: 3px;
			    vertical-align: bottom;
			    text-align: center;
				.dice{
					width: 72px;;
					height: 78px;
					line-height: 78px;
					margin: 0 auto 7px;
				}
			}
			.slot-column::before {
			    box-shadow: inset 0 -6px 3px 0 rgba(0,0,0,.3),inset 0 6px 3px 0 rgba(0,0,0,.3);
			    position: absolute;
			    top: 0;
			    bottom: 0;
			    left: 0;
			    width: 101%;
			    height: 101%;
			    content: "";
			    z-index: 2;
			}
		}
	}

	.bet-box{
		margin-top: 9px;
		position: relative;
		.k3-bet-content-sum{
			margin-left: -2px;
			margin-right: -2px;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.item{
				color: #303133;
				font-size: 14px;
				flex: 0 0 25%;
				padding: 0 2px;
				margin-bottom: 5px;
				.itembox{
					width: 100%;
					height: 46px;
					padding: 9px 1px;
					border-radius: 4px;
					background-color: #eee;
					position: relative;
					.select-icon{
						width: 12px;
						height: 12px;
						border-radius: 50%;
						background-color: #fff;
						position: absolute;
						top: 5px;
						right: 5px;
						display: none;
					}
				}
				.des{
					font-size: 7px;
				}
			}
			
			
			
			.action{
				
				.itembox{
					color: #fff !important;
					background-color: #ccc !important;
				}
				.select-icon{
					padding-top: 2px;
					display: block !important;
				}
			}
		}
		.k3-bet-content-two{
			.title{
				font-size: 13px;
				color: #5c616d;
			}
			.num-box{
				margin-top: 7px;
				.num-box-item{
					flex: 0 0 15%;
					height: 37px;
					line-height: 37px;
					text-align: center;
					color: #fff;
					font-size: 12px;
					border-radius: 4px;
					background-color: rgba(235,67,221,.6);
					position: relative;
					.select-icon{
						width: 12px;
						height: 12px;
						border-radius: 50%;
						background-color: #fff;
						position: absolute;
						bottom: 5px;
						right: 5px;
						display: none;
					}
				}
				.num-box-item3{
					flex: 1;
					width: 100% !important;
				}
				.action{
					background-color: #eb43dd;
					.select-icon{
						display: block;
						padding-top: 2px;
					}
				}
				.colorRed{
					background-color: rgba(251,78,78,.6);
				}
				.actionRed{
					background-color: #fb4e4e;
					.select-icon{
						display: block;
						padding-top: 2px;
					}
				}
				.colorGreen{
					background-color: rgba(92,186,71,.6);
				}
				.actionGreen{
					background-color: #5cba47;
					.select-icon{
						display: block;
						padding-top: 2px;
					}
				}
			}
			.des{
				margin: 7px 0;
				font-size: 11px;
				color: #f03737;
			}
			
		}
		.tabItem{
			width: 25%;
			height: 37px;
			font-size: 11px;
			background-color: #eee;
			color: #303133;
		}
		.tabAction{
			color: #fff;
			background-color: #3c5ef6;
		}
	}

.popupBox{
	color: #303133;
	font-size: 14px;
	.info{
		padding: 0 14px 14px;
		.item{
		    height: 28px;
		    line-height: 28px;
		    margin-top: 14px;
			.monItem{
				text-align: center;
				font-size: 11px;
				padding: 0 9px;
				margin-left: 4px;
				background-color: rgba(0,0,0,.4);
				border-radius: 18px;
				color: #000;
			}
			.action{
				background-color: #f4453e!important;
				color: #fff!important;
			}
			.rule{
				color: #f4453e;
				font-size: 14px;
				margin-left: 20px;
			}
		}
		.liBox{
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			height: auto;
			.li{
				height: 28px;
				line-height: 28px;
				text-align: center;
				font-size: 11px;
				padding: 0 9px;
				margin-left: 4px;
				background-color: #f0f0f0;
				color: #333;
			}
			.action {
			    color: #fff!important;
			    background-color: #f4453e!important;
			}
		}
	}
	.foot{
	    width: 100%;
	    height: 37px;
		display: flex;
	    line-height: 37px;
	    text-align: center;
	    font-size: 13px;
		.left{
		    line-height: 37px;
		    width: 35%;
		    background: #25253c;
		    color: hsla(0,0%,100%,.4);
		}
		.right{
		    line-height: 37px;
		    width: 65%;
		    background: #fa574a;
		    color: #fff;
		}
	}
}
.popup-bet-box{
	padding: 14px 14px 0 14px;
	.select-num{
		height: 18px;
		line-height: 13px;
		border-radius: 2px;
		padding: 2px 9px;
		font-size: 11px;
		margin: 1px 3px;
		background-color: #ccc;
	}
	.actionViolet{
		color: #fff;
		background-color: #eb43dd;
	}
	.actionRedGreen {
		height: 16px;
		line-height: 16px;
		border-radius: 2px;
		padding: 2px 9px;
		font-size: 11px;
		margin: 1px 3px;
	    color: #fff;
	    background-color: #fb4e4e;
	    background-image: linear-gradient(90deg,#fb4e4e 50%,#5cba47 70%);
	}
	.actionRed{
		margin-top: 10px;
		margin-bottom: 10px;
		padding: 6px 10px;
		color: #fff;
		background-color: #fb4e4e;
		display: inline-block;
	}
}
.popupStyle{
	::v-deep .u-popup__content {
	    box-shadow: 0 -9px 18px 0 rgb(63 69 83 / 30%) !important;
	}
}
  .agent-item {
    line-height: 26px;
    text-align: center;
    padding: 0 5px;
    border: 0.5px solid #fff;
    color: #fff;
    border-radius: 9px;
    font-size: 13px;
    margin-left: 4px;
    box-shadow: 0 0 5px 1px rgba(92,186,71,.72);
    background-color: #3fa628;
  }
  .red-agent-item {
    background-color: #fb4e4e;
    box-shadow: 0 0 5px 1px rgba(183, 71, 71, 0.72);
  }
</style>