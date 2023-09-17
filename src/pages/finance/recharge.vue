<template>
    <view class="bg">
        <uni-nav-bar :title="$t('recharge.title')" fixed :leftType="2">
            <template slot="right">
                <u-icon name="order" color="#fff" bold size="30" @click="toRecord"></u-icon>
            </template>
        </uni-nav-bar>

        <view class="colorBox"></view>
        <view class="txtBox">
            <view class="text" v-for="(item,index) in mList" :key="index">{{ item.symbo }}: {{ item.balance }}</view>
            <view class="icon"></view>
        </view>
        <view class="pay-box">


            <view class="title">
                <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
                {{ $t('recharge.txt') }}
            </view>

            <view class="payMentBox flex flex-warp">
                <view class="payMentItem flex-cc" v-for="(item,index) in mList" :key="index" :class="{'activePayMent': currency===item.symbo}"
                      @click="selectCurrency(item)">
                    <image src="/static/img/withdrawal1.png" class="image-icon"></image>
                    <text>{{ item.symbo }}</text>
                    <u-icon name="checkbox-mark" class="selecticon" size="18" color="#fff" v-if="currency===item.symbo"></u-icon>
                </view>
            </view>

            <template v-if="payType.length>0">
                <view class="title">
                    <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
                    {{ $t('recharge.text2') }}
                </view>

                <view class="payMentBox flex flex-warp">
                    <view class="payMentItem flex-cc payTdItem" v-for="(item,index) in payType" :key="index" :class="{'activePayMent': form.id===item.id}"
                          @click="changeRadio(item)">
                        <text>{{ item.pay_title }}</text>
                        <view class="verity">Amount: {{ item.min_money }} - {{ item.max_money }}</view>
                        <u-icon name="checkbox-mark" class="selecticon" size="18" color="#fff" v-if="form.id===item.id"></u-icon>
                    </view>
                </view>
            </template>

            <view class="title" style="padding-bottom: 10px;">
                <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
                {{ $t('recharge.money.txt') }}
            </view>
            <view class="flex flex-item-col-center">
                <text style="padding-right: 10px;">{{ currency }}</text>
                <u--input
                    :placeholder="$t('recharge.money.txt.p')"
                    border="none"
                    v-model="form.money"
                    type="number"
                    clearable
                ></u--input>
            </view>


            <view class="moneyBox flex">
                <view class="moneyItem" v-for="(item, index) in moneyList" :key="index" @click="form.money=item.value"
                      :class="{'activeMI':Number(form.money)===item.value}">{{ item.label }}
                </view>
            </view>


            <!-- <view class="content-show-box" @click="showSelect=true">{{currency? `${$t('recharge.txt')}:${currency}`: $t('recharge.txt1') }}</view>
            <u-picker :show="showSelect" :columns="newMlist" keyName="symbo" :cancelText="$t('btn.cancel')" :confirmText="$t('btn.confirm')" @cancel="showSelect=false" @confirm="selectCurrency"></u-picker> -->
            <template v-if="currency && payType.length>0">
                <!-- <view class="cell-box flex-sb">
                <u-radio-group
                    v-model="form.id"
                    placement="row"
                    @change="changeRadio">
                        <u-radio activeColor="red" :label="item.pay_title" :name="item.id" v-for="(item,index) in payType" :key="index"></u-radio>
                </u-radio-group>
            </view> -->
                <template v-if="pay_mode==='SYSTEM'">
                    <view class="cell-box">
                        <view class="title">{{ $t('recharge.put.txt') }}</view>
                        <u-cell-group>
                            <u-cell v-for="(item, index) in receiver_info" :key="index" :title="item.label" :value="item.value"></u-cell>
                        </u-cell-group>
                    </view>
                    <view class="cell-box">
                        <view class="title">{{ $t('recharge.pay.txt') }}</view>
                        <u--form labelPosition="left" :model="form" labelWidth="150" :rules="rules" ref="form1" class="form-style">
                            <u-form-item :label="$t('recharge.pay.label1')" prop="form.bank_name" borderBottom ref="item1">
                                <u--input v-model="form.frontend.bank_name" :placeholder="$t('recharge.pay.label1.p')" border="none"></u--input>
                            </u-form-item>
                            <u-form-item :label="$t('recharge.pay.label2')" prop="form.name" borderBottom ref="item1">
                                <u--input v-model="form.frontend.name" :placeholder="$t('recharge.pay.label2.p')" border="none"></u--input>
                            </u-form-item>
                            <u-form-item :label="$t('recharge.pay.label3')" prop="form.bank_card" borderBottom ref="item1">
                                <u--input v-model="form.frontend.bank_card" type="number" :placeholder="$t('recharge.pay.label3.p')" border="none"></u--input>
                            </u-form-item>
                        </u--form>
                    </view>
                </template>
                <!-- <view class="cell-box">
                    <view class="title">{{$t('recharge.money.txt')}}</view>
                    <u--input
                        :placeholder="$t('recharge.money.txt.p')"
                        border="surround"
                        v-model="form.money"
                        type="number"
                        clearable
                    ></u--input>
                </view> -->
            </template>

            <!-- <view class="content-show-box">
                <view class="address u-line-1">{{link}}</view>
                <image src="/static/img/copy.min.png" class="copy"></image>
            </view> -->

            <!-- <view class="title" style="margin-top: 15px;">
                <image src="/static/img/wallet3.min.png" class="leftIcon"></image>{{$t('recharge.txt1')}}
            </view> -->

            <!-- <view class="qrBox flex-rcc">
                <vue-qr :text="link" :size="198" :correctLevel="2" class="qr"></vue-qr>
            </view> -->

            <u-button :disabled="!form.id" :text="$t('recharge.btn')" shape="circle" class="btns" @click="save"></u-button>
            <view v-if="currency !='USDT'" class="utr_help" @click="showFind = true">How to find the UTR number? Click here. >></view>
        </view>
        <!-- <view class="border-b">
            <u-steps current="0">
                    <u-steps-item :title="$t('recharge.step1')">
                        <u-icon name="arrow-rightward" slot="icon"></u-icon>
                    </u-steps-item>
                    <u-steps-item :title="$t('recharge.step2')"></u-steps-item>
                    <u-steps-item :title="$t('recharge.step3')"></u-steps-item>
                    <u-steps-item :title="$t('recharge.step4')"></u-steps-item>
                </u-steps>
        </view> -->
        <!-- <view class="rule-box">
            <view class="titleBox flex flex-item-col-center">
                <u-icon name="info-circle" color="rgb(242, 65, 59)" size="15" class="icon"></u-icon>{{$t('recharge.txt2')}}
            </view>
            <view class="des">1. 充值地址实时更换，请勿保存充值地址，每次充值前请重新获取充值地址，避免数字货币丢失。 </view>
        </view> -->
        <u-popup :show="showFind" class="rulePopup" :round="15"  mode="center" @close="showFind=false">
            <view class="receive_box">
                <view class="title">
                    <view>How to find the<br/>UTR No.</view>
                </view>
                <view class="info">
                    <view class="center_text addfont">
                        <view class="add_margin">Phonepe</view>
                        <img src="@/static/img/phonepe.png" alt="">
                    </view>
                    <view class="center_text addfont">
                        <view class="add_margin">GPay</view>
                        <img src="@/static/img/gpay.png" alt="">
                    </view>
                    <view class="center_text addfont">
                        <view class="add_margin">Paytm</view>
                        <img src="@/static/img/paytm-1.png" alt="">
                        <img src="@/static/img/paytm-2.png" alt="">
                    </view>
                    <view class="center_text addfont">
                        <view class="add_margin">Amazon Pay</view>
                        <img src="@/static/img/amazon.png" alt="">
                    </view>
                     <view class="center_text addfont">
                        <view class="add_margin">BHIM</view>
                        <img src="@/static/img/BHIM.png" alt="">
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
// import vueQr from 'vue-qr'
import {epayList, epaySubmit,bankInfo} from '@/api/index'

export default {
    // components:{vueQr},
    data() {
        return {
            showSelect: false,
            mList: [],
            newMlist: [],
            currency: '',
            pay_code: null,
            pay_mode: null,
            form: {
                id: null,
                money: null,
                frontend: {
                    bank_name: null,
                    name: null,
                    bank_card: null
                }
            },
            moneyList: [
                /**
                 * 200 500 1k 3k 5k
                    10k  20k 30k 50k
                 */
                {value: 200, label: '200'},
                {value: 500, label: '500'},
                {value: 1000, label: '1K'},
                {value: 3000, label: '3K'},
                {value: 5000, label: '5K'},
                {value: 10000, label: '10K'},
                {value: 20000, label: '20K'},
                {value: 30000, label: '30K'},
                {value: 50000, label: '50K'}
            ],
            rules: {},
            payType: [],
            receiver_info: {}, //收款信息
            showFind:false,
            binUSDT:false,
            chosePay:{}
        }
    },
    onLoad() {
        this.getUserInfo();
        this.getBankInfo()
    },
    methods: {
        getUserInfo() {
            this.$store.dispatch('GetInfo').then(res => {
                this.mList = res.data.Balances
                this.newMlist.push(res.data.Balances)
                this.selectCurrency(this.mList[0])
            })
        },
        getBankInfo() {
            bankInfo().then(res=>{
                if(!res.data.currency.USDT.user_bind_bank.length) {
                    this.binUSDT = false
                }else {
                    this.binUSDT = true
                }
            })
        },
        selectCurrency(item) {
            this.currency = item.symbo
            this.getEpayList(item.currency);
        },
        //获取支付可选通道
        getEpayList(value) {
            epayList({currency: value}).then(res => {
                this.payType = res.data
                let index = res.data.findIndex(v => {
                    return v.pay_mode === "SYSTEM"
                })
                // let index1 = res.data.findIndex(v=>{return v.pay_mode==="PAY"})
                // this.receiver_info = res.data[index].receiver_info
                // this.form.id = res.data[index1].id

                if (res.data && res.data.length > 0) {
                    this.form.id = res.data[0].id
                    this.pay_code = res.data[0].pay_code
                    this.pay_mode = res.data[0].pay_mode;
                    this.chosePay = res.data[0];
                }
            })
        },
        changeRadio(item) {
            this.form.id = item.id
            // let obj = this.payType.find(v=>{ return v.id === item.id})
            this.pay_code = item.pay_code
            this.pay_mode = item.pay_mode
            this.chosePay = item
        },
        save() {
            if(Number(this.form.money) < Number(this.chosePay.min_money) || Number(this.form.money) > Number(this.chosePay.max_money)) {
                uni.showToast({
                    icon: 'none',
                    title:`The recharge amount should be between ${this.chosePay.min_money}-${this.chosePay.max_money}`,
                    duration: 2000
                })
            }else {
                if(this.currency == 'USDT') {
                    if(this.binUSDT) {
                        this.submitForm()
                    }else {
                        uni.showToast({
                            icon: 'none',
                            title:'Currently not bound to USDT address, please go to bind',
                            duration: 2000
                        })
                        setTimeout(()=>{
                            uni.navigateTo({
                                url: '/pages/mine/change-outmoney-address?type=USDT'
                            })
                        },3000)
                    }
                }else {
                    this.submitForm()
                }
            }
            // const agent = navigator.userAgent;
            // const isAndroid = agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1;
            // if(!isAndroid) {
            //     this.onLocal = window.open("","_blank")
            // }else {
            //     this.onLocal = null
            // }
            // if(this.currency == 'USDT') {
            //     bankInfo().then(res=>{
            //         if(!res.data.currency.USDT.user_bind_bank.length) {
            //             uni.showToast({
            //                 icon: 'none',
            //                 title:'Currently not bound to USDT address, please go to bind',
            //                 duration: 2000
            //             })
            //             setTimeout(()=>{
            //                 uni.navigateTo({
            //                     url: '/pages/mine/change-outmoney-address?type=USDT'
            //                 })
            //             },3000)
                        
            //         }else {
            //             this.submitForm()
            //         }
            //     })
            // }else {
            //     this.submitForm()
            // }
        },
        submitForm() {
            const agent = navigator.userAgent;
            const isAndroid = agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1;
            let onLocal = null
            if(!isAndroid) {
                onLocal = window.open("","_blank")
            }else {
                onLocal = null
            }
            epaySubmit(this.form).then(res => {
                if (this.pay_mode === "PAY") {
                //    alert(res.data.link,"[]===")
                    // let a = document.createElement('a');
                    // a.target = "_blank";
                    // a.href = res.data.link;
                    // a.click();
                    if(isAndroid) {
                        window.open(res.data.link,"_blank")
                    }else {
                        onLocal.location = res.data.link
                    }
                } else {
                    uni.showToast({
                        title: 'success!',
                        icon: 'none'
                    })
                }

            })
        },
        toRecord() {
            uni.navigateTo({
                url: '/pages/mine/trading-record'
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

.pay-box {
    padding: 0 15px;

    .cell-box {
        padding: 20px 0 0 0;
    }

    .form-style {
        padding: 10px 15px;
    }

    .title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        color: #2c3e50;

        .leftIcon {
            width: 20px;
            height: 20px;
            margin-right: 6px;
        }
    }

    .payMentBox {
        width: 100%;
        min-height: 100px;
        padding: 20px 0;

        .payMentItem {
            width: 30%;
            height: 100px;
            border-radius: 20px;
            margin-right: 10px;
            margin-bottom: 10px;
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

    .content-show-box {
        margin-top: 10px;
        height: 42px;
        display: flex;
        line-height: 42px;
        padding: 0 9px;
        background: #fff;
        border: 0.5px solid rgba(0, 0, 0, .06);
        box-shadow: 0 3px 10px 0 rgb(0 0 0 / 10%);
        border-radius: 9px;
        justify-content: space-between;
        align-items: center;

        .address {
            width: 90%;
        }

        .copy {
            width: 13px;
            height: 13px;
        }
    }
}

.qr {
    box-shadow: 0 4px 11px 0 rgb(0 0 0 / 10%);
}

.btns {
    color: #fff;
    border-color: #fa3534;
    background-color: #fa3534;
    margin-top: 20px;
    height: 41px;
    width: 60%;
    box-shadow: 0 0 10px 1px rgba(242, 65, 59, .27);
    margin-bottom: 31px;
}

.border-b {
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(228, 231, 237);
}

.rule-box {
    padding: 20px;
}

.titleBox {
    font-size: 15px;

    .icon {
        margin-right: 5px;
        color: rgb(96, 98, 102);
    }
}

.des {
    color: #303133;
    font-size: 15px;
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
    }

    .activeMI {
        border: 2px solid #fa3534;
    }
}
.utr_help {
    color: #ff5e00;
    font-size: 12px;
    text-align: center;
}
.rulePopup {
     ::v-deep {
        .u-popup__content {
            width: 90%;
            height: 420px;
            overflow: scroll;
            .receive_box {
                .title {
                    margin: 20px 0;
                    font-size: 20px;
                    text-align: center;
                    font-family: lato;
                    font-weight: 600;
                    color: #054384;
                }
            }
            .info {
                .center_text {
                    .add_margin {
                        font-family: lato;
                        font-weight: 600;
                        color: #054384;
                        text-align: center;
                    }
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>