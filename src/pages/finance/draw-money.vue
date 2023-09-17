<template>
    <view class="bg">
        <uni-nav-bar :title="$t('draw-money.title')" fixed :leftType="2">
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
            <view class="payMentItem flex-cc" v-for="(item,key,index) in cashList" :key="index" :class="{'activePayMent': currentIndex===index}" @click="selectType(item,index, key)">
                <image src="/static/img/withdrawal1.png" class="image-icon"></image>
                <text>{{ item.symbo }}</text>
                <u-icon name="checkbox-mark" class="selecticon" size="18" color="#fff" v-if="currentIndex === index"></u-icon>
            </view>
        </view>
        <!-- <view class="txtBox">
            <view class="flex-sb flex-item-row-around">
                <view v-for="(item,key,index) in cashList" :key="index" :class="{cRed:currentIndex===index}" @click="selectType(item,index, key)">
                    {{ item.symbo }}
                </view>
            </view>
        </view> -->

        <view class="number-box">
            <view class="u-input1">
                <u--input
                    :placeholder="$t('draw-money.input.label')"
                    border="none"
                    type="number"
                    v-model="form.money"
                    clearable
                ></u--input>
            </view>
        </view>

        <view class="conBox">
            <view class="des">{{ $t('draw-money.input1.txt') }}</view>
            <view class="box">
                <view class="tipBox flex-cc">
                    <view class="bankList flex">
                        <view class="bankItem flex-sb" v-for="(item,index) in bankListInfo" :key="index" @click="form.user_bank_id=item.user_bank_id">
                            <view>
                                <view v-for="(i,key) in item.form" :key="key">{{ i.value }}</view>

                            </view>
                            <view class="select">
                                <u-icon name="checkbox-mark" :color="form.user_bank_id===item.user_bank_id? 'red':'#FFF'" size="28"></u-icon>
                            </view>
                        </view>
                        <!-- <view @click="showSelect=true">选择提现银行卡</view>
                        <u-picker :show="showSelect" :columns="bankList" keyName="bank_name" :cancelText="$t('btn.cancel')" :confirmText="$t('btn.confirm')" @cancel="showSelect=false" @confirm="selectCurrency"></u-picker> -->
                    </view>
                    <view class="tipDes flex-rcc" @click="toAddress">
                        <u-icon name="plus-circle-fill" color="rgba(245,98,93,.2)" size="23" class="add"></u-icon>
                        {{ $t('draw-money.input1.btn') }}
                    </view>
                </view>
            </view>
        </view>

        <view class="requiredBox" style="margin-bottom: 10px;" v-if="epaid_security_pwd">
            <view class="u-input1">
                <image src="/static/img/withdrawal6.png" class="icon-pass"></image>
                <u--input
                    :placeholder="$t('draw-money.input2.label')"
                    border="none"
                    type="password"
                    v-model="form.password"
                    clearable
                ></u--input>
            </view>
        </view>

        <view class="bankBox">
            <view class="box">
                <view class="item flex flex-item-col-center">
                    <image src="/static/img/withdrawal1.png"></image>
                    <!-- <text>1. {{ $t('draw-money.cell1') }} {{ userInfo.Balances[currentIndex].balance }}</text> -->
                    <text>1. Each person can withdraw {{userInfo.level_info.withdraw_number == 0 ? 'any' :userInfo.level_info.withdraw_number}} times a day</text>
                </view>
                <view class="item flex flex-item-col-center">
                    <image src="/static/img/withdrawal1.png"></image>
                    <text>2. {{ $t('draw-money.cell2') }} {{ cashInfo.min_withdrawal }}</text>
                </view>
                <view class="item flex flex-item-col-center">
                    <image src="/static/img/withdrawal2.png"></image>
                    <text>3. {{ $t('draw-money.cell3') }} {{ cashInfo.max_withdrawal }}</text>
                </view>
                <view class="item flex flex-item-col-center">
                    <image src="/static/img/withdrawal4.png"></image>
                    <!-- <text>4. {{$t('draw-money.cell4')}}</text> -->
                    <text v-if="this.form.currency == 'SYSTEM'">4. 5% withdrawal fee for each transaction below 10,000</text>
                    <text v-else>4. There is no handling fee for withdrawals above 99 U</text>
                </view>
            </view>
        </view>


        <view class="withdrawal-btn" v-if="cashInfo.is_bank_bind && bankListInfo.length>0">
            <u-button type="primary" :text="$t('draw-money.btn')" shape="circle" color="#fa3534" style="width: 60%;" @click="save"></u-button>
        </view>
    </view>
</template>

<script>
import {bankInfo, cashSubmit} from '@/api/index'
import {mapState} from 'vuex'
// import vueQr from 'vue-qr'
export default {
    //components:{mapState},
    data() {
        return {
            list1: [{name: 'TRX'}, {name: 'USDT'}],
            cashList: {},
            cashInfo: {},
            mList: [],
            bankListInfo: [],
            currentIndex: 0,
            showSelect: false,
            activeStyle: {color: 'rgb(242, 65, 59)', fontWeight: 'bold'},
            form: {
                money: '',
                password: '',
                currency: 'SYSTEM',
                user_bank_id: null
            },
            bankList: [],
            epaid_security_pwd: null // 是否开启支付密码
        }
    },
    computed:{
        ...mapState({
            userInfo: state => state.userInfo
        }),
    },
    onLoad() {
        this.getBankInfo()
    },
    onShow() {
        this.$store.dispatch('GetInfo').then(res => {
            this.mList = res.data.Balances
        })
        
        this.epaid_security_pwd = Number(JSON.parse(uni.getStorageSync('site')).epaid_security_pwd)
    },
    methods: {
        // 获取取款信息
        getBankInfo() {
            bankInfo().then(res => {
                if (res.code === 0) {
                    return
                }
                this.cashList = res.data.currency
                this.cashInfo = this.cashList['SYSTEM']
                this.form.currency = 'SYSTEM'
                this.bankListInfo = res.data.currency.SYSTEM.user_bind_bank
                if (this.bankListInfo.length > 0) {
                    this.form.user_bank_id = this.bankListInfo[0].user_bank_id
                }
                if (this.cashInfo.banks.length > 0) {
                    this.bankList.push(this.cashInfo.banks)
                }
                // 当未配置交易密码时转到 设置交易密码
                var u = JSON.parse(uni.getStorageSync('userInfo'))
                if (typeof u.isWithdrawPwd !== 'undefined' && !u.isWithdrawPwd && !uni.getStorageSync('isWithdrawPwd')) {
                    uni.navigateTo({
                        url: '/pages/mine/change-setpay-password'
                    })
                }
                // console.log(this.$store.state.userInfo.isWithdrawPwd)
            })
        },
        selectType(item, index, key) {
            console.log(item,"123123item",this.cashList,index,key,this.currentIndex)
            this.bankList = []
            this.currentIndex = index
            this.cashInfo = item
            this.bankList.push(this.cashInfo.banks)
            // 取款银行列表
            // this.bankListInfo = this.cashList[key].user_bind_bank || []
            this.bankListInfo = item.user_bind_bank
            if (this.bankListInfo.length > 0) {
                this.form.user_bank_id = this.bankListInfo[0].user_bank_id
            }
            this.form.currency = key
        },
        selectCurrency(value) {

        },
        toAddress() {
            uni.navigateTo({
                url: '/pages/mine/change-outmoney-address?type='+this.cashInfo.symbo
            })
        },

        save() {
            if(this.epaid_security_pwd){ // 校验支付密码
                if (!this.form.password){
                    uni.showToast({
                    title: this.$t('draw-money.input2.label'),
                    icon: 'none'
                })
                }else{
                    this.verifyForm()
                }
            }else{
                this.verifyForm()
            }

        },

        verifyForm(){
            if (!this.form.money) {
                uni.showToast({
                    title: this.$t('draw-money.input.label'),
                    icon: 'none'
                })
            } else {
                cashSubmit(this.form).then(res => {
                    this.$store.dispatch('GetInfo')
                    uni.showToast({
                        title: 'success!',
                        icon: 'none'
                    })
                })
            }
        },
        toRecord() {
            uni.navigateTo({
                url: '/pages/mine/integral-record'
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

.number-box {
    margin-top: 10px !important;
    padding: 0 18px;
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #f6f6f6;
    font-size: 23px;
    font-weight: 600;

    .u-input1 {
        display: flex;
        border: 1px solid rgb(242, 65, 59);
        border-radius: 4px;
        align-items: center;
        justify-content: center;
        padding: 9px 15px !important;

    }
}

.bankBox {
    padding: 0 18px;
    margin-bottom: 14px;
    margin-top: 4px;

    .box {
        background: #fff;
        border: 1px solid #de0700;
        box-shadow: 0 7px 13px 0 rgba(242, 65, 59, .1411764705882353);
        border-radius: 4px;

        .item {
            padding: 9px;
            border-bottom: 1px solid #d8d8d8;
            font-size: 13px;
            color: #414141;

            image {
                width: 19px;
                height: 19px;
                margin-right: 9px;
            }
        }
    }
}

.conBox {
    padding: 0 18px;

    .des {
        color: #b3b2c8;
        font-size: 15px;
        margin-bottom: 14px;
    }

    .box {
        background: #fff;
        border: 1px solid #de0700;
        box-shadow: 0 7px 13px 0 rgba(238, 124, 120, .3607843137254902);
        border-radius: 4px;
        margin-bottom: 9px;

        .tipDes {
            height: 32px;
            padding: 0 9px;
            background: #fdf0ef;
            border-radius: 9px;
            color: #f5625d;
            font-weight: 600;
            margin: 14px 0;
            font-size: 14px;
            color: #f5625d;

            .add {
                margin-right: 9px;
            }
        }
    }
}

.requiredBox {
    padding: 0 18px;
    margin-top: 18px;
    position: relative;

    .u-input1 {
        display: flex;
        border: 1px solid rgb(242, 65, 59);
        border-radius: 4px;
        align-items: center;
        justify-content: center;
        padding: 6px 30px !important;
    }

    .icon-pass {
        width: 16px;
        height: 10px;
        position: absolute;
        left: 30px;
        top: 14px;
    }
}

.withdrawal-btn {
    padding-bottom: 28px;
    margin-top: 28px;
}

.cRed {
    color: #f64841;
}

.payMentBox {
    width: 100%;
    min-height: 100px;
    padding: 20px;

    .payMentItem {
        width: 30%;
        height: 100px;
        border-radius: 20px;
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

.bankList {
    width: 100%;
    padding: 10px;
    flex-direction: column;

    .bankItem {
        border-bottom: 1px solid #cdcdcd;
        padding: 10px;
    }

    .select {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #d8d8d8;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
