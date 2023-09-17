<template>
	<u-popup :show="show" class="rulePopup" :round="15"  mode="center" @close="$emit('close')" @open="$emit('open')">
		<view class="ruleBox">
			<view class="title flex-rcc">{{$t('lottery.popup.rule')}}</view>
			<view class="info">
				<scroll-view scroll-y="true" :show-scrollbar="true" class="msgBox">
					<view class="flex flex-warp">{{msg}}</view>
				</scroll-view>
				<view class="rule-btn flex-rcc">
					<view class="btn flex-rcc" @click="$emit('close')">I know !</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default{
		props:{
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '預售規則'
			},
			msg: {
				type: String,
				default: 'Users have the right to participate in the pre-sale, maintain the normal operation order of the pre-sale, and formulate these rules in accordance with relevant agreements and national laws and regulations. Chapter 1 Definitions 1.1 Definition of pre-sale: refers to the way that merchants provide product or service solutions and collect orders from consumers through product pre-sale tools as a pre-agreed sales method to provide goods or services to consumers. 1.2 The pre-sale mode is "DepO IT" mode. Dep OS IT refers to the pre-delivery of a fixed quantity of a pre-sale product at a fixed price. Play a mini game for a chance to earn even more savings. The deposit is not redeemable. 1.3 Pre-sale products: refers to the products transferred by merchants through the pre-sale product tool. "Pre-Order" should only be indicated on the title or product detail page. Items without pre-sale tools are not pre-sale items. 1.4 Pre-sale system: refers to a convenient tool of the system to help merchants sell pre-sale models. 1.5 Pre-sale price: refers to the selling price of pre-sale products. The pre-sale price consists of two parts: DEP OS IT and the final payment.'
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rulePopup{
		::v-deep .u-transition{
			z-index: 11000 !important;
		}
	}
	.ruleBox{
		width: 80vw;
		border-radius: 10px;
		max-width: 400px;
		z-index: 2008;
		background: #fff;
		overflow: hidden;
		.title{
		    width: 100%;
		    height: 46px;
		    line-height: 46px;
		    padding: 0 18px;
		    color: #fff;
		    font-size: 15px;
		    background: #f74345 url('/static/game/Rule-bg.png') no-repeat 0 0;
		    background-size: 100% 100%;
		}
		.info{
		    padding: 14px;
		    font-size: 13px;
		    line-height: 37px;
			.msgBox{
				height: 280px;
				// white-space: nowrap;
			}
			.rule-btn{
				margin-top: 18px;
				.btn{
					width: 60%;
					color: rgb(255, 255, 255);
					background: rgb(242, 65, 59);
					border-color: rgb(242, 65, 59);
					height: 37px;
					border-radius: 50px;
					font-size: 15px;
				}
			}
		}
	}
</style>