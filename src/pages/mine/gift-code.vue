<template>
	<view class="bg">
		<uni-nav-bar title="Gift" fixed :leftType="2">
            <template slot="right">
                <u-icon name="order" color="#fff" bold size="30" @click="toRecord"></u-icon>
            </template>
        </uni-nav-bar>
        <view class="main">
            <view class="container">
                <view class="top_con">
                    <view class="title">Hello</view>
                    <view class="title">Evryone</view>
                    <view class="content">We Have a Gift For You</view>
                </view>
                <view class="content_box">
                    <view class="container_box">
                        <view class="top_ixon">
                            <view class="center_white"></view>
                        </view>
                        <view class="center_img">
                            <img src="../../static/img/giftcode.png" alt="">
                        </view>
                        <view class="text_gift">Gift Code</view>
                        <view class="input_box">
                            <u--input placeholder="Please enter gift redemption code" border="none" v-model="giftCode" />
                        </view>
                        <view class="btn_box">
                            <u-button text="Submit" class="btn" @click="submit"></u-button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <u-popup :show="show" class="rulePopup" :round="15"  mode="center">
            <view class="receive_box">
                <view class="title">
                    <view>Receive a Gift</view>
                    <view class="add_margin">Best Wishes to You</view>
                </view>
                <view class="info">
                    <view class="center_text addfont">Congratulations !!</view>
                    <view class="info_detail">You have already received a reward of<text class="amount">{{receiveNum}}{{giftSymbol}}</text></view>
                    <view class="rule-btn center_text">
                        <view class="btn center_text" @click="receiveGift">Receive</view>
                    </view>
                </view>
            </view>
        </u-popup>
	</view>
</template>

<script>
import {redenvelope} from '@/api/index.js'
	export default{
		data(){
			return{
				giftCode:'',
                show:false,
                receiveNum:'',
                giftSymbol:'₹'
			}
		},
		methods:{
            toRecord() {
                 uni.navigateTo({
                    url: '/pages/mine/gift-record'
                })
            },
            submit(){
                if(!this.giftCode) {
                    uni.showToast({
                        icon: 'none',
                        title: 'Please enter gift redemption code',
                        duration: 2000
                    });
                }else {
                    let obj = {
                        receive_code:this.giftCode
                    }
                    redenvelope(obj).then(res=>{
                        if(res.code ==1) {
                            this.show = true;
                            this.receiveNum = res.data.receive_amount
                            this.giftSymbol = res.data.currency_symbol
                        }else {
                            uni.showToast({
                                icon: 'none',
                                title: 'Please enter gift redemption code',
                                duration: 2000
                            });
                        }
                    })
                }
                
            },
            receiveGift() {
                this.show = false
            }
        }
	}
</script>

<style lang="scss" scoped>
.bg {
    padding: 0px !important;
}
.main {
    background: url("@/static/img/bg_image.png") no-repeat top;
    background-size: 100% 100%;
    height: 100vh;
    padding-top: 50px;
    .container {
        padding: 24px;
        .top_con {
            .title {
                color: #f9e8e8;
                font-size: 22px;
                margin-bottom: 8px;
            }
            .content {
                color: #f9e8e8;
                font-size: 16px;
            }
        }
        .content_box {
            padding: 25px;
            .container_box {
                width: 100%;
                height: 317px;
                padding: 10px;
                background: #fff;
                border-radius: 10px;
                position: relative;
                .top_ixon {
                    height: 22px;
                    width: 64px;
                    background: #f2413b;
                    display: inline-block;
                    border-radius: 11px;
                    position: absolute;
                    top: -11px;
                    left: 50%;
                    transform: translate(-50%);
                    text-align: center;
                    .center_white {
                        margin-top: -3px;
                        display: inline-block;
                        border-radius: 7px;
                        width: 80%;
                        height: 14px;
                        background: #fff;
                    }
                }
                .center_img {
                    width: 100%;
                    padding: 20px;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
                .text_gift {
                    text-align: center;
                    color: #f2413b;
                    font-size: 22px;
                    margin-top: -30px;
                }
                .input_box {
                    margin-top: 15px;
                     ::v-deep .u-input {
                        background-color: #f9e8e8;
                        border: 1px solid rgba(242,65,59,.27);
                        padding: 4px 10px !important;
                        border-radius: 8px;
                        margin-bottom: 10px;
                        font-size: 12px !important;
                    }
                }
                .btn_box {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin-top: 50px;
                    .btn {
                        background: #ffce1f;
                        border: 1px solid #ffce1f;
                        color: #fff;
                        width: 186px;
                        height: 46px;
                        border-radius:23px;
                    }
                }
            }
        }

    }
}
.rulePopup {
    ::v-deep {
        .u-popup__content {
            width: 90%;
        }
    }
    width: 90%;
    box-sizing: border-box;
    .receive_box {
        .title {
            padding: 20px;
            box-sizing: border-box;
            background: #f2413b;
            border-radius: 15px 15px 0 0 ;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            view {
                display: flex;
                justify-content: center;
            }
            .add_margin {
                margin-top: 10px;
            }
        }
        .info {
            padding: 20px;
            box-sizing: border-box;
            .addfont {
                font-size: 18px;
                font-weight: 600;
            }
            .info_detail {
                margin-top: 15px;
                padding: 10px 20px;
                box-shadow: 0 -9px 18px 0 rgb(63 69 83 / 30%);
                border-radius: 4px;
                line-height: 30px;
                .amount {
                    padding:2px 5px;
                    background: #f2413b;
                    border-radius: 4px;
                    margin-left: 4px;
                    color: #fff;
                }
            }
            .rule-btn {
                margin-top: 15px;
                .btn {
                    width: 140px;
                    height: 34px;
                    border-radius: 17px;
                    color: #fff;
                    background: #f2413b;
                }
            }
        }
    }
    .center_text {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>