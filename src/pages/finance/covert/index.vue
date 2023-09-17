<template>
    <div class="bg">
        <uni-nav-bar title="convert" fixed :leftType="2">
            <template slot="right">
                <u-icon name="order" color="#fff" bold size="30" @click="toRecord"></u-icon>
            </template>
        </uni-nav-bar>

        <view class="colorBox"></view>
        <view class="txtBox">
            <view class="text" v-for="(item,index) in mList" :key="index">{{ item.symbo }}: {{ item.balance }}</view>
            <view class="icon"></view>
        </view>
        <view class="payMentBox flex flex-warp">
            <view class="payMentItem flex-cc" v-for="(item,key,index) in cashList" :key="index" :class="{'activePayMent': currentIndex===index}" @click="selectType(item,index)">
                <text>{{ item.symbo }}</text>
                <u-icon name="checkbox-mark" class="selecticon" size="18" color="#fff" v-if="currentIndex===index"></u-icon>
            </view>
        </view>
         <view class="number-box">
            <view class="u-input1">
                <u--input
                    placeholder="Please chose coins"
                    border="none"
                    v-model="form.send.symbo"
                    disabled
                    inputAlign="center"
                >
                    <template slot="suffix">
                        <u-icon name="close-circle-fill" color="#666" size="14" @click="clearSend"></u-icon>
                    </template>
                </u--input>
            </view>
            <view class="cover_icon"></view>
            <view class="u-input1">
            <u--input
                placeholder="Please chose coins"
                border="none"
                v-model="form.receive.symbo"
                disabled
                inputAlign="center"
            >
                <template slot="suffix">
                    <u-icon name="close-circle-fill" color="#666" size="14" @click="clearReceive"></u-icon>
                </template>
            </u--input>
            </view>
        </view>
         <view class="number-box addmargin">
            <view class="u-input1">
                <u--input
                    placeholder="Please enter the covert amount "
                    border="none"
                    v-model="form.sender_money"
                    clearable
                    type="number"
                ></u--input>
            </view>
         </view>
         <view class="withdrawal-btn">
            <u-button type="primary" text="Covert" shape="circle" color="#fa3534" style="width: 60%;" @click="save"></u-button>
        </view>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {bankInfo,currencyChose,currencyCurrency,currencySubmit} from '@/api/index'
export default {
    data() {
        return {
            mList:[],
            cashList:[],
            currentIndex:'',
            form:{
                send:{},
                receive:{},
                sender_money:''
            },
            focus1:true,
            focus2:false
        }
    },
    onLoad() {
        this.getCurrency()
    },
    onShow() {
        this.$store.dispatch('GetInfo').then(res => {
            this.mList = res.data.Balances
        })
        
    },
   
    methods:{
        getCurrency() {
            currencyChose().then(res=>{
                this.cashList = res.data
            })
        },
        selectType(item,index) {
            if(this.focus1) {
                // 不能选择相同的转换币种
                this.form.send = item;
                this.currentIndex = index;
                this.getCoverIntCurrency(this.form.send.currency)
            }else {
                this.form.receive = item
                this.focus2 = false
                this.currentIndex = index;
            }
        },
        getCoverIntCurrency(currency) {
             currencyCurrency({currency:currency}).then(res=>{
                this.cashList = res.data;
                this.focus1 = false
                this.focus2 = true
                this.currentIndex = null;                
            })
        },
        clearSend() {
            this.form = this.$options.data().form;
            this.getCurrency()
            this.currentIndex = null;
            this.focus1 = true
            this.focus2 = false
        },
        clearReceive() {
            this.currentIndex = null;
            this.form.receive = {}
        },
        save() {
            if(!this.form.send.currency) {
                uni.showToast({
                    icon: 'none',
                    title: 'Please chose the covert currency',
                    duration: 2000
                });
            }else if(!this.form.receive.currency) {
                uni.showToast({
                    icon: 'none',
                    title: 'Please chose the covert currency',
                    duration: 2000
                });
            }else if(!this.form.sender_money) {
                uni.showToast({
                    icon: 'none',
                    title: 'Please enter the covert amount',
                    duration: 2000
                });
            }else {
                let params = {
                    sender_currency:this.form.send.currency,
                    sender_money:this.form.sender_money,
                    receiver_currency:this.form.receive.currency
                }
                currencySubmit(params).then(res=>{
                    if(res.code == 1) {
                        uni.showToast({
                            title: res.msg,
                            duration: 2000
                        });
                    }else {
                        uni.showToast({
                            icon: 'error',
                            title: res.msg,
                            duration: 2000
                        });
                    }
                })
            }
        },
        toRecord() {
            uni.navigateTo({
                url: '/pages/finance/covert/record'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.colorBox {
    height: 37px;
    width: 100%;
    background-image: linear-gradient(90deg, #cd0103, #f64841);
}
.number-box {
    margin-top: 10px !important;
    padding: 0 18px;
    // height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #f6f6f6;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .u-input1 {
        display: flex;
        border: 1px solid rgb(242, 65, 59);
        border-radius: 4px;
        align-items: center;
        justify-content: center;
        padding: 9px 4px !important;
        text-align: center;
        flex: 1;
    }
    .cover_icon {
        width: 20px;
        height: 17px;
        background: url("/static/img/arrow.svg") no-repeat center;
        background-size: cover;
        margin: 0 10px;
    }
}
.addmargin {
    margin-top: 10px;
}
.txtBox {
    background-color: #fff;
    z-index: 99;
    margin-top: -28px;
    border-radius: 9px 9px 0 0;
    padding: 9px 18px;
    position: relative;

    .text {
        color: #090909;
        font-weight: 600;
        font-size: 15px;
    }

    .icon {
        position: absolute;
        right: 18px;
        top: 0;
        height: 51px;
        width: 30px;
        background: url('/static/img/ghy11.min.png') no-repeat 50%;
        background-size: 100% 100%;
    }
}
.payMentBox {
    width: 100%;
    min-height: 30px;
    padding: 20px;

    .payMentItem {
        width: 30%;
        height: 40px;
        border-radius: 4px;
        margin-right: 10px;
        background-color: #EEEEFA;
        text-align: center;
        position: relative;

        .image-icon {
            width: 18px;
            height: 18px;
            margin-bottom: 10px;
        }

        .selecticon {
            position: absolute;
            bottom: 6px;
            right: 6px;
        }
    }

    .payTdItem {
        width: 40%;
        border-radius: 0;
        height: 80px;

        .selecticon {
            bottom: 2px;
            right: 3px;
        }

        .verity {
            font-size: 13px;
        }
    }

    .activePayMent {
        background: linear-gradient(135deg, #CE0608, #F3453E);
        color: #fff;
    }
}
.withdrawal-btn {
    padding-bottom: 28px;
    margin-top: 28px;
}
.moneyBox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;

    .moneyItem {
        width: 100px;
        height: 30px;
        // border: 1px solid red;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin: 5px;
        box-shadow: 0px 0px 2px #cdcdcd;
        font-weight: 400;
        font-size: 18px;

    }

    .activeMI {
        border: 2px solid #fa3534;
    }
}
</style>