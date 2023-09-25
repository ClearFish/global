<template>
    <view class="deposit_box">
        <Header :title="$t('recharge.title')" :bgColor="'#0f1923'">
            <view slot="right">
                <img src="@/static/deposit/record.svg" alt="">
            </view>
        </Header>
        <view class="pay-box">
            <view class="payMentBox">
                <view class="title">
                    <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
                    {{ $t('recharge.txt') }}
                </view>
                <view class="list_box">
                    <view class="payMentItem" v-for="(item,index) in mList" :key="index" :class="{'activePayMent': currency===item.symbo}"
                        @click="selectCurrency(item)">
                        <image src="/static/img/withdrawal1.png" class="image-icon"></image>
                        <text>{{ item.symbo }}</text>
                        <u-icon name="checkbox-mark" class="selecticon" size="18" color="#ec2529" v-if="currency===item.symbo"></u-icon>
                    </view>
                </view>
            </view>

            <template v-if="payType.length>0">
                <view class="payMentBox">
                    <view class="title">
                        <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
                        {{ $t('recharge.text2') }}
                    </view>
                    <view class="list_box">
                        <view class="payMentItem payTdItem" v-for="(item,index) in payType" :key="index" :class="{'activePayMent': form.id===item.id}"
                            @click="changeRadio(item)">
                            <text>{{ item.pay_title }}</text>
                            <view class="verity">Amount: {{ item.min_money }} - {{ item.max_money }}</view>
                            <u-icon name="checkbox-mark" class="selecticon" size="18" color="#ec2529" v-if="form.id===item.id"></u-icon>
                        </view>
                    </view>
                </view>
            </template>
            <view class="payMentBox">
                <view class="title" style="padding-bottom: 10px;">
                    <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
                    {{ $t('recharge.money.txt') }}
                </view>
                <view class="flex flex-item-col-center add_border">
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
            </view>
            <template v-if="currency && payType.length>0">
                <template v-if="pay_mode==='SYSTEM'">
                    <view class="payMentBox">
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
                    </view>
                </template>
            </template>
            <u-button :disabled="!form.id" :text="$t('recharge.btn')" shape="circle" class="btns" @click="save"></u-button>
            <view v-if="currency !='USDT'" class="utr_help" @click="showFind = true">How to find the UTR number? Click here. >></view>
        </view>
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
import Header from "@/components/commonHeader/index.vue"
import {bankInfo, cashSubmit,epayList} from '@/api/index'
export default {
    components:{Header},
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
            receiver_info: [{label:'test',value:'1'}], //收款信息
            showFind:false,
            binUSDT:false,
            chosePay:{}
        }
    },
    onLoad() {
         this.getUserInfo();
        this.getBankInfo()
    },
    onShow() {
        this.$store.dispatch('GetInfo').then(res => {
            this.mList = res.data.Balances
            this.selectCurrency(this.mList[0])
        })
        this.epaid_security_pwd = Number(JSON.parse(uni.getStorageSync('site')).epaid_security_pwd)
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
.deposit_box {
    min-height: 100vh;
    background: #f5f5f9;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 30px;
    .title {
        color: #333;
        font-weight: 600;
        font-size: 14px;
        position: relative;
        padding-left: 10px;
        display: flex;
        align-items: center;
        gap: 5px;
        .leftIcon {
            width: 24px;
            height: 20px;
        }
        
    }
    .pay-box {
        .payMentBox {
            color: #333;
            background: #fff;
            padding: 10px;
            margin-bottom: 20px;
            .list_box {
                display: flex;
                gap: 20px;
                margin-top: 10px;
                flex-wrap: wrap;
                .payMentItem {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 30px;
                    background: #EEEEFA;
                    border-radius: 4px;
                    position: relative;
                    .image-icon {
                        width: 24px;
                        height: 24px;
                    }
                    .selecticon {
                        position: absolute;
                        bottom: 4px;
                        right: 4px;
                    }
                }
                .activePayMent {
                    border: 1px solid #ec2529;
                }
                .payTdItem {
                    flex-direction: column;
                    width: 45%;
                    padding: 10px;
                    .verity {
                        font-size: 12px;
                    }
                }
            }
            .add_border {
                border: 1px solid #ec2529;
                border-radius: 4px;
                padding: 5px 10px;
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
                    margin: 10px;
                    box-shadow: 0px 0px 2px #cdcdcd;
                }

                .activeMI {
                    border: 2px solid #fa3534;
                }
            }
        }
    }
    .utr_help {
        color: #ff5e00;
        font-size: 12px;
        text-align: center;
    }
    .btns {
        color: #fff;
        border-color: #fa3534;
        background-color: #fa3534;
        margin-top: 20px;
        height: 41px;
        width: calc(100% - 20px);
        box-shadow: 0 0 10px 1px rgba(242, 65, 59, .27);
        margin-bottom: 31px;
    }
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