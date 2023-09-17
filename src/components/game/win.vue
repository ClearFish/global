<template>
	<view class="content">
		<view class="time-box">
			<view class="info flex flex-col">
				<view class="txt">{{gameType[currentTime].label}}{{$t('lottery.game.unit')}}</view>
				<view class="num">{{gameTime.period}}</view>
			</view>
			<view class="out flex flex-col">
				<view class="txt">{{
					showMask ? 
					$t('lottery.timeText2'): $t('lottery.timeText1')}}
				</view>
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
				<!-- 投注倒计时 -->
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
				
			</view>
		</view>
		
		<view class="box">
				<view class="con-box flex flex-sb">
					<u-button :text="$t('lottery.popup.choose')+' '+$t('lottery.winGo.green')" class="btn green" @click="select('ColorPlay', 'Green',11)"></u-button>
					<u-button :text="$t('lottery.popup.choose')+' '+$t('lottery.winGo.violet')" class="btn violet" @click="select('ColorPlay', 'Violet',12)"></u-button>
					<u-button :text="$t('lottery.popup.choose')+' '+$t('lottery.winGo.red')" class="btn red" @click="select('ColorPlay', 'Red',13)"></u-button>
				</view>
				<view class="number-box flex-sb flex-warp">
					<view class="item flex-rcc" v-for="(i,index) in 10" :key="index" @click="select('NumberPlay',index,index)">
						<view class="number flex-rcc" :class="{'randomNum': randomNum === index}">
							<text class="txt">{{index}}</text>
						</view>
					</view>
				</view>
				
				<view class="random-box flex-sb">
					<view class="random flex-rcc" @click="randomNumber">{{$t('lottery.winGo.random')}}</view>
					<view class="flex-rcc">
						<view class="rateItem" v-for="(item,index) in rateList" :key="index" :class="{'action':rate===item}" @click="rate=item">X{{item}}</view>
					</view>
				</view>
				
				<view class="btn-box flex-rcc">
					<view class="item yellow flex-rcc flex-item-1" @click="select('BignessPlay','Big',22)">{{$t('lottery.winGo.big')}}</view>
					<view class="item green flex-rcc flex-item-1" @click="select('BignessPlay','Small',21)">{{$t('lottery.winGo.small')}}</view>
				</view>
				
				<!-- 代理游戏 -->
				<view class="flex" style="margin-top: 20px;" v-if="agentGameList.length>1">
					<view class="agent-item" :class="{'red-agent-item': Number(gameId)===item.game_id}" v-for="(item,index) in agentGameList" :key="index">{{item.agent_alias}}</view>
				</view>
				
				<view class="mask-box flex-rcc" v-if="showMask">
					<view class="countTimeBox rihht-1">{{countdownTime.seconds1}}</view>
					<view class="countTimeBox">{{countdownTime.seconds2}}</view>
				</view>	
			</view>	
		
		<!-- 底部弹窗 -->
		<u-popup :show="show" :round="15" safeAreaInsetBottom mode="bottom" class="popupStyle" >
			<view class="popupBox">
				<view class="head">
					<view class="box-header colorBSize" :class="`color${styleColor}`">
						<view class="con">minute{{gameType[currentTime].label}}</view>
						<view class="color">{{$t('lottery.popup.choose')}}<text style="padding-left: 9px;">
							{{popupTitle}}
						</text></view>
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
								<!-- <u-radio label="USDT" :name="2"></u-radio> -->
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
					<view class="right flex-rcc" @click="postBet">{{$t('lottery.popup.btn2')}}  {{ form.bet_amount}}</view>
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
		currentTime:{
			type: [String,Number],
			default: 0
		},
		balances:{
			type: [Array],
			default: []
		},
		noThree:{
			type: Boolean,
			default: false
		}
	},
	// mounted(){
	// 	this.getGameData()
	// 	this.getTime()
	// },
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
		'noThree':{
			immediate: true,
			handler(newV){
				if(newV){
					if(this.gameType.length===4){
						this.gameType.splice(1,1)
					}
				}
			}
		},
		// timeData:{
		// 	handler(nV,oV){
		// 		if(nV.minutes=== 0 && nV.seconds === 0){
		// 			// 设置倒计时的时间段
		// 			this.comCountTime(this.gameTime.open_time, this.gameTime.closing_time)
		// 		}
		// 	},
		// 	deep: true,
		// 	immediate:true
		// },
		// countdownTime:{
		// 	handler(nV,oV){
		// 		if(nV.minutes=== 0 && nV.seconds === 0){
		// 		 if(this.show){
		// 			 this.cancel()
		// 		 }
		// 		}
		// 		if(nV.minutes=== 0 && nV.seconds === this.timeGap){
		// 			this.$emit('music',nV.seconds)
		// 		}
		// 	},
		// 	deep: true,
		// 	immediate:true
		// }
	},
	data(){
		return{
			timer: null,
			popupTitle: '',
			timmer: null,
			show: false,
			time: 600000,
			countdownTime:{},
			timeData: {},
			gameType: [{value: 1,label: '1'},{value: 3,label: '3'},{value: 5,label: '5'},{value: 10,label: '10'}],
			rateList: [1,3,9,27,81,243,729],
			form:{
				game_id: null, // 游戏id
				currency: 'SYSTEM', // 币种
				period: null, // 期号
				play_group: null, // 玩法组名
				bet_play: null, // 玩法
				bet_amount: 0, // 下注金额
				// type: null,
				money: 1,
				size: 1,
				// sum :0
			},
			moneyList: [1,10,100,1000,10000],
			liList: [1,3,9,27,81,243,729],
			rate:1, // 倍率
			agree: [1],
			styleColor: 'green',
			gameInfo: {}, // 游戏数据
			gameTime: {}, // 开奖时间
			winInfo:{}, // 开奖号码
			randomNum: null,
			agentGameList: [], // 代理游戏列表
			timeGap:10000,
			showMask:false,
			isAllin:false
		}
	},
	methods:{
		currencyChange() {
			let findObj = this.balances.find(item=>item.currency == this.form.currency);
			// this.form.bet_amount = findObj.balance
		},

		// 切换代理
		cutAgent(item){
			this.$emit('cutAgent', item)
			console.log('item', item)
		},
		// 随机数字
		randomNumber(){
			this.timer = setInterval(()=>{
				this.randomNum= Math.ceil(Math.random()*9)
			},100)
			
			setTimeout(()=>{
				clearInterval(this.timer)
				this.select('NumberPlay',this.randomNum,this.randomNum)
				this.randomNum = null
			},2000)
			
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
				/**
					"previous_period": "202305190445",
					"period": "202305190446",
					"next_period": "202305190447",
					"open_time": "2023-05-19 07:25:00", 上期开始封盘，本期开始投注时间
					"closing_time": "2023-05-19 07:25:02", 封盘时间 ->可以开始投注
					"end_time": "2023-05-19 07:26:00", 本期结束时间
					"current_time": "2023-05-19 07:25:12" 当前时间
					*/

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
				console.log(this.timeGap,"timeGap")
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
			this.getData(params);
			// this.timmer = setInterval(()=>{
			// 	getResult(params).then(res=>{
			// 		this.winInfo = res.data
			// 		clearInterval(this.timmer)
			// 		this.$emit('updata')
			// 	})
			// },1000)
		},
		getData(params) {
			let para = {...params}
			getResult(params).then(res=>{
				if(!res.data) {
					setTimeout(()=>{
						this.getData(para)
					},1000)
				}else {
					this.winInfo = res.data
					this.$emit('updata')
				}
			})
		},
		// 下注
		postBet(){
			bet(this.form).then(res=>{
				this.cancel()
				uni.showToast({
					title: this.$t('game.toast'),
					duration: 2000
				});
				this.$emit('upDataLog')
			})
		},
		
		onChange(e) {
			// console.log(e,"99999")
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
		// 投注时间计时结束事件
		finish(){
			// this.getTime(true)
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
		
		// 选择数字
		select(key1,key2,type){
			const data = this.gameInfo.odds
			this.form.play_group = key1//`${this.gameInfo.game_name}.${key1}.${key2}`//玩法组名
			this.form.bet_play = key2 //玩法
			const green = [11,1,3,7,9,21]
			const red = [13,2,4,6,8]
			if (green.includes(type)) {
				this.styleColor = 'green'
			} else if(red.includes(type)){
				this.styleColor = 'red'
			} else if(type===12) {
				this.styleColor = 'violet'
			} else if(type===0){
				this.styleColor = '0'
			}else if(type===5){
				this.styleColor = '5'
			}else{
				this.styleColor = 'big'
			}
			this.popupTitle = this.keyText(type)
			this.form.size = this.rate
			this.form.bet_amount = this.form.size  * this.form.money
			this.show = true
		},
		
		keyText(type){
			let str = ''
			if(type<10){
				str = type
			}else if(type<20){
				if(type===11){
					str = this.$t('lottery.winGo.green')
				}else if(type===12){
					str = this.$t('lottery.winGo.violet')
				}else{
					str = this.$t('lottery.winGo.red')
				}
			}else{
				if(type===22){
					str = this.$t('lottery.winGo.big')
				}else{
					str = this.$t('lottery.winGo.small')
				}
			}
			return str
		},
		// all in 
		allIn() {
			this.isAllin = true;
			let findObj = this.balances.find(item=>item.currency == this.form.currency);
			this.form.money = 1;
			this.rateChange(Math.trunc(findObj.balance))
			this.form.bet_amount = Math.trunc(findObj.balance)
		},
		// 切换金额
		cutMon(i){
			if(this.isAllin) {
				this.isAllin = false
				this.form.size = 1
			}
			this.form.money = i
			this.form.bet_amount = this.form.size * this.form.money
		},
		// 数量change
		valChange(e){
			this.form.bet_amount = e.value * this.form.money
		},
		// 倍率
		rateChange(i){
			this.form.size = i
			this.form.bet_amount = this.form.size  * this.form.money
		},
		closePopup(){
			this.init()
		},
		init(){
			this.form.play_group = null
			this.form.bet_play = null
			this.form.bet_amount = 1
			this.form.money = 5
			this.form.size = 1
			this.showMask = false
		},
		cancel(){
			this.init()
			this.show = false
		},
		// 计算距开奖时间剩余秒数
		comOpenTime(start,end){
			console.log(start,end,"comOpenTime")
			console.time()
			let arr = (miment().distance(start, end).format('mm,ss',true)).split(',')
			this.time = (Number(arr[0])*60 +Number(arr[1])) *1000
			console.timeEnd()
		},
		comCountTime(start,end) {
			console.log(start,end,"comCountTime")
			console.time()
			let arr = (miment().distance(start, end).format('mm,ss',true)).split(',')
			this.countTime = (Number(arr[0])*60 +Number(arr[1])) *1000
			this.showMask = true
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
	    margin-top: 15px;
	    padding: 0 10px;
		.time-box{
		    border-radius: 10px;
		    background: #f94b55 url('/static/game/bannertimeout.6325ccb2.min.png') no-repeat 50%;
		    background-size: auto 100%;
		    margin-bottom: 10px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			overflow: hidden;
			.info{
				padding: 10px;
				color: #fff;
				.txt{
					width: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1px solid #fff;
					font-size: 10px;
					color: #fff;
					padding: 5px;
					border-radius: 5px;
					margin-bottom: 10px;
				}
				.num{
					font-size: 19px;
					    font-weight: 600;
				}
			}
			.out{
			    height: 100%;
			    border-left: 1px dashed #fff;
			    position: relative;
			    padding: 10px;
				.txt{
					color: #fff;
					font-size: 15px;
					text-align: right;
				}
				.time{
					color: #fff;
					font-size: 20px;
					margin-top: 5px;
				}
				.time__custom__item{
					padding: 5px;
					font-size: 20px;
					margin-left: 5px;
					color: #fff;
					font-weight: 600;
					background: #da2031;
				}
				.time__custom__item1{
					background: linear-gradient(135deg,transparent 5px,#da2031 0) 0 0!important;
				}
				.time__custom__item2{
					background: linear-gradient(-45deg,transparent 5px,#da2031 0) 0 0!important;
				}
			}
			.out::after{
				content: "";
				height: 15px;
				width: 15px;
				border-radius: 15px;
				position: absolute;
				top: 0;
				left: 0;
				background-color: #FBFCFD;
				-webkit-transform: translate(-50%,-60%);
				transform: translate(-50%,-60%);
			}
			.out::before{
				content: "";
				height: 15px;
				width: 15px;
				border-radius: 15px;
				position: absolute;
				bottom: -18px;
				left: 0;
				background-color: #FBFCFD;
				-webkit-transform: translate(-50%,-60%);
				transform: translate(-50%,-60%);
			}
		}
		.box{
		    border-radius: 15px;
		    background-color: #fff;
		    box-shadow: 0 9px 18px 1px #ebebf1;
		    padding: 0 10px;
			padding-bottom: 10px;
		    position: relative;
			.btn{
				height: 41px;
				color: #fff;
				width: 31%;
				text-align: center;
				line-height: 41px;
				font-size: 15px;
			}
			.green{
				background-color: #5cba47;
				border-radius: 0 15px 0 15px;
				box-shadow: 0 0 8px 1px rgb(92 186 71 / 72%);
			}
			.violet{
				background-color: #db5fd1;
				border-radius: 10px;
				box-shadow: 0 0 8px 1px rgb(219 95 209 / 58%);
			}
			.red{
				background-color: #fb4e4e;
				border-radius: 15px 0 15px 0;
				box-shadow: 0 0 8px 1px rgb(251 78 78 / 60%);
			}
		}
		.number-box{
			padding: 10px 10px 0;
			border-radius: 10px;
			background-color: #fbedf3;
			margin-top: 10px;
			.item{
				width: 20%;
				border: none;
				margin-bottom: 9px;
				.number{
					width: 56px;
					height: 56px;
					border-radius: 50%;
					text-align: center;
				}
				.txt{
					color: #fff;
					font-size: 21px;
				}
			}
		}
		
		.item:nth-child(odd) .number{
			// border-radius: 50%;
			border: 0.5px solid #fb4e4e;
		}
		.item:nth-child(odd) .txt{
			width: 51px;
			height: 51px;
			border-radius: 50%;
			line-height: 51px;
			text-align: center;
			background-color: #fb4e4e;
		}
		.item:nth-child(even) .number{
			// border-radius: 50%;
			border: 0.5px solid #5cba47;
		}
		.item:nth-child(even) .txt{
			width: 51px;
			height: 51px;
			border-radius: 50%;
			line-height: 51px;
			text-align: center;
			background-color: #5cba47;
		}
		.item:nth-child(odd):first-child .txt{
			width: 51px;
			height: 51px;
			border-radius: 50%;
			line-height: 51px;
			text-align: center;
			background-image: linear-gradient(to bottom right,#fb4e4e 50%,#eb43dd 0)!important;
		}
		.item:nth-child(6) .txt{
			width: 51px;
			height: 51px;
			border-radius: 50%;
			line-height: 51px;
			text-align: center;
			background-image: linear-gradient(to bottom right,#5cba47 50%,#eb43dd 0)!important;
		}
	
		.random-box{
			margin-top: 9px;
			padding: 9px 0;
			.random{
				height: 28px;
				line-height: 28px;
				font-size: 11px;
				display: inline-block;
				background: 0 0;
				color: #333;
				padding: 0 1px;
				border: 1px solid #f2413b;
				border-radius: 9px;
				font-size: 11px;
				color: #333;
			}
			.rateItem{
				width: 37px;
				line-height: 26px;
				text-align: center;
				padding: 0 5px;
				border: 0.5px solid #5cba47;
				color: #5cba47;
				border-radius: 9px;
				font-size: 11px;
				margin-left: 4px;
				background: rgba(92,186,71,.1);
				background-color: #f0f0f0;
				color: #000;
			}
			.action{
				background-color: #5cba47;
				color: #fff;
			}
		}
		.btn-box{
			padding: 9px;
			.item{
				height: 37px;
				color: #fff;
				font-size: 15px;
			}
			.yellow{
				background-color: #ffc511;
				border-radius: 37px 0 0 37px;
				box-shadow: 0 0 7px 0.5px rgb(255 197 17 / 47%);
			}
			.green{
				background-color: #5cba47;
				border-radius: 0 37px 37px 0;
				box-shadow: 0 0 7px 0.5px rgb(92 186 71 / 72%);
			}
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
		.box-header{
		    border-radius: 14px 14px 0 0;
		    padding: 18px 14px 28px;
		    position: relative;
			.con {
			    font-weight: 600;
			    text-align: center;
			    color: #fff;
			    font-size: 18px;
			}
			.color{
			    text-align: center;
			    width: 80%;
			    background-color: #fff;
			    height: 28px;
			    border-radius: 4px;
			    line-height: 28px;
			    margin: 9px auto 0;
			    font-size: 13px;
			}	
		}
		.colorBSize{
			background-size: 100% 100%;
		}
		
		.color0{
		    background-color: #fb4e4e;
		    background-image: linear-gradient(to bottom right,#fb4e4e 50%,#eb43dd 0)!important;
			.color{
				color: #fb4e4e;
			}
		}
		
		.colorgreen{
			background: #26bd2f;
			background-image: linear-gradient(90deg,#26bd2f,#75c76b);
			.color{
				color: #26bd2f;
			}
		}
		
		.colorviolet {
			background: #9831e9;
		    background-image: linear-gradient(90deg,#b354fd,#d483ff);
		    .color{
		    	color: #9831e9;
		    }
		}
		
		.colorred{
		    background: #fb4e4e;
		    background-image: linear-gradient(90deg,#fb4e4e,#fe666e);
			.color{
				color: #fb4e4e;
			}
		}
		
		.color5 {
		    background: #5cba47;
		    background-image: linear-gradient(to bottom right,#5cba47 50%,#eb43dd 0)!important;
			.color{
				color: #5cba47;
			}
		}
		
		.colorbig {
		    background: #f5bb00;
		    background-image: linear-gradient(90deg,#f5bb00,#fdd556);
			.color{
				color: #f5bb00;
			}
		}
		
		.box-header:before {
		    content: "";
		    position: absolute;
		    right: 0;
		    bottom: 0;
		    width: 50%;
		    height: 37px;
		    background-image: linear-gradient(-10deg,#fff 50%,transparent 0);
		}
		.box-header:after {
		    content: "";
		    position: absolute;
		    width: 50%;
		    left: 0;
		    bottom: 0;
		    height: 37px;
		    background-image: linear-gradient(10deg,#fff 50%,transparent 0);
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
.randomNum{
	transform:scale(1.1);
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