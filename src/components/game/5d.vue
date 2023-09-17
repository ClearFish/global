<template>
	<view class="content">
		<view class="page-box">
			<view class="last-round">
				<text>{{$t('lottery.5d.text')}}</text>
				<view class="round-num" v-for="(item,index) in winInfo.result" :key="index">
					<view class="num-scroll-box">{{item}}</view>
					<view class="word-index">{{indexList[index]}}</view>
				</view>
				<view>=</view>
				<view class="round-num red">
					<view class="num-scroll-box">{{sum_num}}</view>
				</view>
			</view>
			<view class="period-title">
				<text>{{$t('lottery.timeText3')}}</text>
				<text>
					<!-- {{(timeData.minutes=== 0 && timeData.seconds<11 &&timeData.seconds>0)? 
						$t('lottery.timeText2'): $t('lottery.timeText1')}} -->
					{{
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
		
		<view class="a-text-center">
			<view class="slot-inner">
				<view class="d5-slot-box">
					<view class="slot-column slot-column-first">
						<view :class="addanimation ? 'slot-transform addanimation':'slot-transform'">
							<view v-for="(a,index1) in 9" :key="index1">
								<view class="slot-num" v-for="(item,index) in 10" :key="index">{{index}}</view>
							</view>
						</view>
					</view>
					<view class="slot-column">
						<view :class="addanimation ? 'slot-transform addanimation':'slot-transform'">
							<view v-for="(a,index1) in 9" :key="index1">
								<view class="slot-num" v-for="(item,index) in 10" :key="index">{{index}}</view>
							</view>
						</view>
					</view>
					<view class="slot-column">
						<view :class="addanimation ? 'slot-transform addanimation':'slot-transform'">
							<view v-for="(a,index1) in 9" :key="index1">
								<view class="slot-num" v-for="(item,index) in 10" :key="index">{{index}}</view>
							</view>
						</view>
					</view>
					<view class="slot-column">
						<view :class="addanimation ? 'slot-transform addanimation':'slot-transform'">
							<view v-for="(a,index1) in 9" :key="index1">
								<view class="slot-num" v-for="(item,index) in 10" :key="index">{{index}}</view>
							</view>
						</view>
					</view>
					<view class="slot-column">
						<view :class="addanimation ? 'slot-transform addanimation':'slot-transform'">
							<view v-for="(a,index1) in 9" :key="index1">
								<view class="slot-num" v-for="(item,index) in 10" :key="index">{{index}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 投注区 -->
		<view class="tzBox">
			<view class="tabBox flex">
				<view class="tabItem" v-for="(i,index) in tabList" :key="index" :class="{'action': tabCurrent===index}" @click="tabCut(index)">
					{{i}}
				</view>
			</view>
			<view class="bet-box">
				<view class="flex-sb" v-if="Object.keys(gameInfo).length>0">
					<view class="bet-type-btn flex-sb" @click="select('Big')">
						<text>{{$t('lottery.winGo.big')}}</text>
						<text>{{gameInfo.odds.SumPlay.Big}}</text>
					</view>
					<view class="bet-type-btn flex-sb" @click="select('Small')">
						<text>{{$t('lottery.winGo.small')}}</text>
						<text>{{gameInfo.odds.SumPlay.Small}}</text>
					</view>
					<view class="bet-type-btn flex-sb" @click="select('Odd')">
						<text>{{$t('lottery.k3.odd')}}</text>
						<text>{{gameInfo.odds.SumPlay.Odd}}</text>
					</view>
					<view class="bet-type-btn flex-sb" @click="select('Even')">
						<text>{{$t('lottery.k3.even')}}</text>
						<text>{{gameInfo.odds.SumPlay.Even}}</text>
					</view>
				</view>
				<template v-if="Object.keys(gameInfo).length>0">
					<view class="flex-sb flex-warp" v-if="tabCurrent<5">
						<view class="bet-num-line flex-cc" v-for="(item,index) in gameInfo.odds.Ball1Play" :key="index" v-if="index<10" @click="select(index)">
							<view class="round">{{index}}</view>
							<text>{{item}}</text>
						</view>
					</view>
				</template>
	
			</view>
			
			<!-- 代理游戏 -->
			<view class="flex" style="margin-top: 20px;" v-if="agentGameList.length>1">
				<view class="agent-item" :class="{'red-agent-item': Number(gameId)===item.game_id}" v-for="(item,index) in agentGameList" :key="index">{{item.agent_alias}}</view>
			</view>
			
			<!-- <view class="mask-box flex-rcc" v-if="timeData.minutes=== 0 &&timeData.seconds<11 &&timeData.seconds>0">
				<view class="countTimeBox rihht-1">{{timeData.seconds1}}</view>
				<view class="countTimeBox">{{timeData.seconds2}}</view>
			</view>	 -->
			<view class="mask-box flex-rcc" v-if="showMask">
				<view class="countTimeBox rihht-1">{{countdownTime.seconds1}}</view>
				<view class="countTimeBox">{{countdownTime.seconds2}}</view>
			</view>	
		</view>
	
		<!-- 底部弹窗 -->
		<u-popup :show="show" :round="15" mode="bottom" class="popupStyle" safeAreaInsetBottom>
			<view class="popupBox">
				<view class="head">
					<view class="bet-box">
						<view class="tabBox flex">
							<view class="tabItem" v-for="(i,index) in tabList" :key="index" :class="{'action': tabCurrent===index}" @click="tabCut(index)">
								{{i}}
							</view>
						</view>
						
						<view class="flex-sb" v-if="Object.keys(gameInfo).length>0">
							<view class="bet-type-btn flex-sb" :class="{'active0':playType.includes('Big')}" @click="select('Big')">
								<text>{{$t('lottery.winGo.big')}}</text>
								<text>{{gameInfo.odds.SumPlay.Big}}</text>
							</view>
							<view class="bet-type-btn flex-sb" :class="{'active1':playType.includes('Small')}" @click="select('Small')">
								<text>{{$t('lottery.winGo.small')}}</text>
								<text>{{gameInfo.odds.SumPlay.Small}}</text>
							</view>
							<view class="bet-type-btn flex-sb" :class="{'active2':playType.includes('Odd')}" @click="select('Odd')">
								<text>{{$t('lottery.k3.odd')}}</text>
								<text>{{gameInfo.odds.SumPlay.Odd}}</text>
							</view>
							<view class="bet-type-btn flex-sb" :class="{'active3':playType.includes('Even')}" @click="select('Even')">
								<text>{{$t('lottery.k3.even')}}</text>
								<text>{{gameInfo.odds.SumPlay.Even}}</text>
							</view>
						</view>
											
						<template v-if="Object.keys(gameInfo).length>0">
							<view class="flex-sb flex-warp" v-if="tabCurrent<5">
								<view class="bet-num-line flex-cc" v-for="(item,index) in gameInfo.odds.Ball1Play" :key="index" v-if="index<10"  @click="select(index)">
									<view class="round" :class="{'activeNum': playType.includes(index)}">{{index}}</view>
									<text>{{item}}</text>
								</view>
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
							<view v-for="i in moneyList" :key="i" class="monItem" :class="{'action':form.money === i}" @click="cutMon(i)">{{i}}</view>
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
								@change="valChange"
							>
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
		data(){
			return{
				show: false,
				timmer: null,
				time: 60 * 1000,
				timeData: {},
				countdownTime:{},
				indexList: ['A','B','C','D','E'],
				win_num: '1,8,2,3,6',
				tabCurrent: 0,
				moneyList: [1,10,100,1000,10000],
				liList: [1,3,9,27,81,243,729],
				form:{
					game_id: null, // 游戏id
					currency: 'SYSTEM', // 币种
					period: null, // 期号
					play_group: null, // 玩法组名
					bet_play: null, // 玩法
					bet_amount: 0, // 下注金额
					money: 1,
					size: 1,
				},
				playType: [], // 玩法种类
				sum: 1,
				agree: [1],
				gameInfo: {}, // 游戏数据
				gameTime: {}, // 开奖时间
				winInfo:{}, // 开奖号码
				sum_num: 0,
				agentGameList: [], // 代理游戏列表
				timeGap:10000,
				showMask:false,
				isAllin:false,
				addanimation:false
			}
		},
		computed:{
			tabList(){
				let arr =['A','B','C','D','E']
				arr.push(this.$t('lottery.table.5d.th3'))
				return arr
			}
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
			// 获取上期结果
			getPreWinNumber(){
				let params = {
					game_id: this.gameId,
					period: this.gameInfo.times.previous_period
				}
				getResult(params).then(res=>{
					this.winInfo = res.data
					this.sum_num = this.sumWin(this.winInfo.result)
				})
			},
			// 获取游戏信息
			getGameData(){
				getGame({game_id: this.gameId}).then(res =>{
					this.gameInfo = res.data
					this.getPreWinNumber()
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
						this.getResultData(this.gameTime.previous_period)
					}
				})
			},
			
			// 获取本期开奖
			getResultData(previous_period){
				let params = {
					game_id: this.gameId,
					period: previous_period
				}
				// this.timmer = setInterval(()=>{
				// 	getResult(params).then(res=>{
				// 		this.winInfo = res.data
				// 		uni.showModal({
				// 			title: this.winInfo
				// 		})
				// 		// alert(JSON.stringify(this.winInfo))
				// 		this.sum_num = this.sumWin(this.winInfo.result)
				// 		// this.start([0,0,0,0,0])
				// 		this.start(res.data.result)
				// 		clearInterval(this.timmer)
				// 		this.$emit('updata')
				// 	})
				// },1000)
				getResult(params).then(res=>{
						this.winInfo = res.data
						uni.showModal({
							title: this.winInfo
						})
						// alert(JSON.stringify(this.winInfo))
						this.sum_num = this.sumWin(this.winInfo.result)
						// this.start([0,0,0,0,0])
						this.start(res.data.result)
						// clearInterval(this.timmer)
						this.$emit('updata')
					})
			},
			
			// 下注
			postBet(){
				this.form.bet_amount = this.sum/this.playType.length
				let length = this.playType.length-1
				console.log('this.playType', this.playType)
				this.playType.map((v,index)=>{
					this.form.bet_play = v
					bet(this.form).then(res=>{
						if(index === length){
							this.cancel()
							uni.showToast({
								title: this.$t('game.toast'),
								duration: 2000
							});
							this.$emit('upDataLog')
						}
					})
				})
				
			},
			start(numbers) {
				 this.addanimation = false
			     var boxs = document.querySelectorAll(".slot-transform");
				
					for(var i=0; i<5; i++){
						boxs[i].style.transition = '.5s';  
						boxs[i].style.transform = 'translateY('+ -535 + "px)";
					}  
				 
				 if(numbers){
					  setTimeout(()=>{
						for(var i=0; i<5; i++){
						// let random = Math.ceil(Math.random()*5)
						// console.log('random', random)
						// let postionY = 0
						// switch(random){
						// 	case 1:
						// 		postionY = 30
						// 		break;
						// 	case 2:
						// 		postionY = -535
						// 		break;
						// 	case 3:
						// 		postionY = -1085
						// 		break;
						// 	case 4:
						// 		postionY = -1635
						// 		break;
						// 	case 5:
						// 		postionY = -2185
						// 		break;
						// }
					    boxs[i].style.transform = 'translateY('+ (-3835 +  -55* numbers[i]) + "px)"; //2185 
					    boxs[i].style.transition = (i+1) * 200 + "ms";  
					 } 
					 },100)
				 }
				 
				 // transition: 2s;
				 // transform: translateY(-101px);
				 // setTimeout(()=>{
					//  for(var i=0; i<5; i++){
					//     boxs[i].style.transform = 'translateY('+ (13 +  -57* numbers[i]) + "px)";
					//     boxs[i].style.transition = (i+1) * 200 + "ms";  
					//  }
				 // },1000)
			     
			
			},
			onChange(e) {
				let str = (e.seconds/10).toFixed(1)
				let arr = str.split('.')
				this.timeData = e
				this.timeData.seconds1 = arr[0]
				this.timeData.seconds2 = arr[1]
			},
			onChangeCountdown(e) {
				let str = (e.seconds/10).toFixed(1)
				let arr = str.split('.')
				this.countdownTime = e
				this.countdownTime.seconds1 = arr[0]
				this.countdownTime.seconds2 = arr[1]
			},
			// 计时结束事件
			finish(){
				// this.getTime(true)
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
			keyWinNumber(value){
				return value.split(',')
			},
			//菜单切换
			tabCut(index){
				this.playType = []
				this.tabCurrent=index
				this.form.play_group = index
			},
			// 求和
			sumWin(value){
				let arr =  []
				arr = value
				let sum = 0
				arr.map(v=>{
					sum = sum + Number(v)
				})
				return sum
			},
			select(index){
				const arr = Object.keys(this.gameInfo.odds)
				this.form.play_group = arr[this.tabCurrent]
				if(isNaN(Number(index))){ // 非数字
					if(this.playType.length===0){
						this.playType.push(index)
					}else{
						const key = this.playType.findIndex(v=>{ return v===index })
						if(key<0){
							this.playType.push(index)
							if(index==="Big"){
								this.deleteIndex('Small')
							}else if(index==="Small"){
								this.deleteIndex('Big')
							}else if(index==="Odd"){
								this.deleteIndex('Even')
							}else{
								this.deleteIndex('Odd')
							}
						}else{
							this.playType.splice(key,1)
						}
					}
				}else{ // 数字
					if(this.playType.length===0){
						this.playType.push(index)
					}else{
						const key = this.playType.findIndex(v=>{ return v===index })
						if(key<0){
							this.playType.push(index)
						}else{
							this.playType.splice(key,1)
						}
					}
				}	
				this.sum = this.form.size  * this.form.money * this.playType.length
				this.show = true
			},
			//删除方法
			deleteIndex(key){
				let newIndex = this.playType.findIndex(v=>{ return v===key })
				if(newIndex>=0){
					this.playType.splice(newIndex,1)
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
				this.sum = this.form.size * this.form.money * this.playType.length
			},
			// 数量change
			valChange(e){
				this.sum = e.value * this.form.money * this.playType.length
			},
			// 倍率
			rateChange(i){
				this.form.size = i
				this.sum = this.form.size  * this.form.money * this.playType.length
			},
			closePopup(){
				this.init()
			},
			init(){
				this.sum = 0
				this.playType = []
				this.form.play_group = null
				this.form.bet_play = null
				this.form.bet_amount = 0
				this.form.money = 5
				this.form.size = 1
				this.showMask = false
			},
			cancel(){
				this.init()
				this.show = false
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
				this.addanimation = true;
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
			.last-round{
			    text-align: center;
			    padding: 0 0 28px;
			    border-bottom: 0.5px solid #f1f3fb;
			    margin-bottom: 12px;
			    height: 65px;
			    display: flex;
			    justify-content: space-between;
			    align-items: center;
				.round-num {
				    width: 37px;
				    height: 37px;
				    line-height: 35px;
				    border-radius: 50%;
				    border: 0.5px solid #000;
				    color: #000;
				    background: #f4f4f4;
				    display: flex;
				    justify-content: space-between;
				    align-items: center;
				    flex-direction: column;
				}
				.red{
					border: none;
					color: #fff;
					line-height: 37px;
					background: #fa574a;
				}
				.word-index{
				    line-height: 15px;
				    color: #9da7b3;
				    font-size: 13px;
				    font-weight: 400;
				}
			}
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
		.a-text-center {
		    text-align: center;
			.slot-inner {
			    padding: 9px;
			    background: #00b977;
			    display: inline-block;
			    border-radius: 6px;
			    position: relative;
			    margin-top: 18px;
			}
			.slot-inner:before {
			    left: -5px;
			    border-radius: 5px 0 0 5px;
				position: absolute;
				top: 40px;
				width: 5px;
				height: 28px;
				content: "";
				background: #008b59;
			}
			.slot-inner:after {
			   position: absolute;
			   top: 40px;
			   width: 5px;
			   height: 28px;
			   content: "";
			   background: #008b59;
			   right: -5px;
			   border-radius: 0 5px 5px 0;
			}
			.d5-slot-box {
			    padding: 5px 0;
			    background: -webkit-gradient(linear,left top,left bottom,from(#003b26),to(#005226));
			    background: linear-gradient(180deg,#003b26,#005226);
			    border-radius: 2px;
			    display: inline-block;
			    position: relative;
			}
			.d5-slot-box:before {
			    left: -0.5px;
			    border-right: 18px solid transparent;
			    border-left: 18px solid #00b977;
			    position: absolute;
			    top: 38px;
			    width: 0;
			    height: 0;
			    border-top: 6px solid transparent;
			    border-bottom: 6px solid transparent;
			    content: "";
			    z-index: 3;
			}
			.d5-slot-box:after {
			    right: -0.5px;
			    border-left: 18px solid transparent;
			    border-right: 18px solid #00b977;
			    position: absolute;
			    top: 38px;
			    width: 0;
			    height: 0;
			    border-top: 6px solid transparent;
			    border-bottom: 6px solid transparent;
			    content: "";
			    z-index: 3;
			}
			
			.slot-column-first {
			    margin-left: 5px;
			}
			.slot-column {
			    display: inline-block;
			    width: 54px;
			    height: 80px;
			    border-radius: 3px;
			    overflow: hidden;
			    background: #333;
			    margin-right: 3px;
			    vertical-align: bottom;
			    position: relative;
			    text-align: center;	
			}
			.slot-transform {
				
				// transform:rotateX(120deg);
				// transition: rotateX() ease-out 2s;
			}
			.addanimation {
				animation: transup .5s infinite ease-in;
				@keyframes transup {
					0% {
						transform: translateY(-55px)
					}

					10% {
						transform: translateY(-110px);
					}

					20% {
						transform: translateY(-165px);
					}

					30% {
						transform: translateY(-220px);
					}

					40% {
						transform: translateY(-275px);
					}
					50% {
						transform: translateY(-330px);
					}
					60% {
						transform: translateY(-385px);
					}
					70% {
						transform: translateY(-440px);
					}
					80% {
						transform: translateY(-495px);
					}
					90% {
						transform: translateY(-550px);
					}
					100% {
						transform: translateY(-605px);
					}
					
				}
			}
			.slot-num {
			    width: 50px;
			    height: 50px;
			    line-height: 50px;
			    background: #e1e1ec;
			    border-radius: 50%;
			    font-size: 28px;
			    color: rgba(0,0,0,.4);
			    font-weight: 700;
			    margin: 0 auto 5px;
				// background: #00e065;
				// color: #fff;
			}
			.slot-column-first .slot-num{
				background: #00e065;
				color: #fff;			
			}
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
		.tzBox{
			position: relative;
		}
		.bet-box{
		    overflow: hidden;
		    position: relative;
		    min-height: 100px;
			}
		.bet-num-line{
			width: 20%;
			font-weight: 400;
			font-size: 11px;
			line-height: 11px;
			color: #6b7581;
			margin-bottom: 15px;
			.round{
				width: 37px;
				height: 37px;
				line-height: 37px;
				border: 1px solid #ceced8;
				border-radius: 50%;
				color: #9da7b3;
				font-size: 14px;
				text-align: center;
				font-weight: 500;
				margin-bottom: 2px;
			}
		}
		.bet-type-btn{
			// width: 65px;
			height: 32px;
			line-height: 32px;
			background: #d1d1d6;
			border-radius: 5px;
			color: #fff;
			margin-bottom: 14px;
			padding: 0 5px;
			font-size: 14px;
			font-weight: 500;
		}
	}
	.popupStyle{
		::v-deep .u-popup__content {
		    box-shadow: 0 -9px 18px 0 rgb(63 69 83 / 30%) !important;
		}
	}
	.popupBox{
		color: #303133;
		font-size: 14px;
		.head{
			padding: 10px!important;
			.bet-box {
			    // margin-top: 18px;
			    overflow: hidden;
			    position: relative;
			    min-height: 100px;
			}
		} 
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
	.activeNum{
		background: #ff9500;
		border: 1px solid #ff9500;
		color: #fff !important;
	}
	.active0{
		background: #5856d6 !important;
	}
	.active1{
		background: #fff !important;
		border: 1px solid #5856d6 !important;
		color: #5856d6 !important;
	}
	.active2{
		background: #ff9500 !important;
	}
	.active3{
		background: #fff !important;
		border: 1px solid #ff9500 !important;
		color: #ff9500 !important;
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