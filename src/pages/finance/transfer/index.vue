<template>
    <div class="bg">
        <uni-nav-bar title="transfer" fixed :leftType="2">
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
                <image src="/static/img/withdrawal1.png" class="image-icon"></image>
                <text>{{ item.symbo }}</text>
                <u-icon name="checkbox-mark" class="selecticon" size="18" color="#fff" v-if="currentIndex===index"></u-icon>
            </view>
        </view>
         <view class="number-box">
            <view class="u-input1">
                <view class="title">User</view>
                <u--input
                    placeholder="Please enter the payee phone"
                    border="none"
                    type="number"
                    v-model="form.mobile"
                    clearable
                ></u--input>
            </view>
            <view class="u-input1 addmargin">
                <view class="title">Amount</view>
                <u--input
                    placeholder="Please enter the transfer amount"
                    border="none"
                    type="number"
                    v-model="form.amount"
                    clearable
                ></u--input>
            </view>
             <view class="u-input1 addmargin" v-if="isPassword">
                <view class="title">Transaction password</view>
                <u--input
                    placeholder="Please enter the transaction password"
                    border="none"
                    type="password"
                    v-model="form.password"
                    clearable
                ></u--input>
            </view>
            <view class="u-input1 addmargin" v-if="isSmsCode">
                <view class="title">Mobile Verification Code</view>
                <u--input :placeholder="$t('login.label3')" 
                    border="none" 
                    v-model="form.code" 
                    clearable>
                    <template slot="suffix">
                        <u-button
                            @tap="getCode('transfer')"
                            type="text"
                            :disabled="isSend"
                            size="mini"
                        >{{isSend? `${time}s again` : $t('login.code')}}</u-button>
                    </template>
                </u--input>
            </view>
        </view>
         <view class="withdrawal-btn">
            <u-button type="primary" text="Transfer" shape="circle" color="#fa3534" style="width: 60%;" @click="Transfer"></u-button>
        </view>
        <view class="click_tips" @click="showTransferTips(transferTips)">{{$t('transfer.title')}} Click here. >></view>
        <view class="click_tips" @click="showTransferTips(transferCancleTips)" style="margin-top:10px">{{$t('tansfer.cancletitle')}} Click here. >></view>
         <u-popup :show="showTips" class="rulePopup" :round="15"  mode="center" @close="showTips=false">
            <view class="tip_oppup">
                <view class="title">{{chosedItem.title}}</view>
                <view v-for="(item,index) in chosedItem.tips" :key="index" class="item_cont">{{item.content}}</view>
            </view>
         </u-popup>
        <view class="tipe_box">
            <view class="container">
                <view class="title">Notice:</view>
                <view class="item_cont">In order to prevent someone from taking advantage of the reward policy of our platform to steal the interests of all players on the platform, after the transfer transaction, the cash cannot be withdrawn immediately.</view>
                <view class="item_cont">You can withdraw money after placing a bet, and you can withdraw cash when the bet amount reaches the transfer amount</view>
            </view>
        </view>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {bankInfo,usertransferSubmit,smsSend,usertransferConfig} from '@/api/index'
export default {
    data() {
        return {
            mList:[],
            cashList: {},
            cashList:[],
            currentIndex:0,
            form:{
                mobile:'',
                amount:'',
                currency:'',
                password:'',
                code:'',
            },
            area_code: '',
            own_mobile: '',
            time:60,
            isSend:false,
            isSmsCode:false,
            isPassword:false,
            transferTips:{
                title:this.$t('transfer.title'),
                tips:[
                    {id:0,content:this.$t('tansfer.strep1')},
                    {id:1,content:this.$t('tansfer.strep2')},
                    {id:2,content:this.$t('tansfer.strep3')},
                    {id:3,content:this.$t('tansfer.strep4')},
                ]
            },
            transferCancleTips:{
                title:this.$t('tansfer.cancletitle'),
                tips:[
                    {id:0,content:this.$t('tansfer.canclestrep1')},
                    {id:1,content:this.$t('tansfer.canclestrep2')},
                    {id:2,content:this.$t('tansfer.canclestrep3')},
                ]
            },
            showTips:false,
            chosedItem:{}
        }
    },
    onLoad() {
        this.getBankInfo();
        this.getConfig()
    },
    onShow() {
        this.$store.dispatch('GetInfo').then(res => {
            this.mList = res.data.Balances
        })
    },
   
    methods:{
        showTransferTips(item) {
            this.chosedItem = item;
            this.showTips = true
        },
        // 获取取款信息
        getBankInfo() {
            bankInfo().then(res => {
                if (res.code === 0) {
                    return
                }
                this.cashList = res.data.currency
                this.form.currency = 'SYSTEM'
                // 当未配置交易密码时转到 设置交易密码
                var u = JSON.parse(uni.getStorageSync('userInfo'))
                if (typeof u.isWithdrawPwd !== 'undefined' && !u.isWithdrawPwd && !uni.getStorageSync('isWithdrawPwd')) {
                    uni.navigateTo({
                        url: '/pages/mine/change-setpay-password'
                    })
                }
            })
        },
        getConfig() {
            usertransferConfig().then(res=>{
                this.isSmsCode = res.data.is_transfer_sms;
                this.isPassword = res.data.is_transfer_pwd;
                this.area_code = res.data.area_code;
                this.own_mobile = res.data.mobile;
            })
        },
        selectType(item,index) {
            this.currentIndex = index;
            this.form.currency = item.symbo
        },
        toRecord() {
            uni.navigateTo({
                url: '/pages/finance/transfer/record'
            })
        },
        showToast(text) {
            uni.showToast({
                icon: 'none',
                title: text,
                duration: 2000
            });
        },
        getCode(type){
            if(this.own_mobile){
               const params = {
                    mobile: this.own_mobile,
                    event: type,
                    area_code: this.area_code
               }
               smsSend(params).then(res =>{
                if(res.code===1){
                    this.showToast(res.msg)
                    this.isSend = true
                    this.timmer = setInterval(()=>{
                        if(this.time===1){
                            clearInterval(this.timmer)
                            this.isSend = false
                            this.time=60    
                        }
                        this.time--
                    },1000)
                }
               }) 
            }else{
                this.showToast(this.$t('login.toast5'))
            }
        },
        Transfer() {
            if(!this.form.mobile) {
                this.showToast('Please enter the payee id or phone');
                return;
            }else if(!this.form.amount) {
                this.showToast('Please enter the transfer amount');
                return;
            }else if(this.isPassword && !this.form.password) {
                this.showToast('Please enter the transaction password');
                return;
            }else if(this.isSmsCode && !this.form.code) {
                this.showToast('Please enter the verification Code');
                return;
            }else {
                usertransferSubmit(this.form).then(res=>{
                    if(res.code == 1) {
                        this.showToast(res.msg);
                        uni.navigateTo({
                            url: '/pages/mine/index'
                        })
                    }else {
                        this.showToast(res.msg);
                    }
                })
            }
        },
        resetForm() {
            this.form = this.$options.data().form
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
    font-size: 23px;
    font-weight: 600;

    .u-input1 {
        display: flex;
        flex-direction: column;
        // border: 1px solid rgb(242, 65, 59);
        border-radius: 4px;
        align-items: flex-start;
        justify-content: center;
        margin-bottom: 15px;
        .title {
            font-size: 16px;
            font-weight: bold;
            color: #2c3e50;
            line-height: 24px;
            padding-left: 20px;
            position: relative;
            &::before {
                content:"*";
                color: #fa3534;
                position: absolute;
                left: 6px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        ::v-deep {
            .u-input {
                width: 100%;
                border: 1px solid rgb(242, 65, 59);
                 padding: 9px 15px !important;
            }
        }
    }
    .addmargin {
        margin-top: 10px;
    }
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
.click_tips {
    color: #ff5e00;
    font-size: 14px;
    text-align: center;
}
.tipe_box {
    padding: 15px;
    .container {
        .title {
            color: #2c3e50;
            font-size: 18px;
            margin-bottom: 6px;
        }
    .item_cont {
            margin-bottom: 4px;
            color: #2c3e50;
            line-height: 22px;
            font-size: 14px;
        }
    }

}
.rulePopup {
     ::v-deep {
        .u-popup__content {
            width: 90%;
            height: 260px;
            overflow: scroll;
            .tip_oppup {
                padding: 20px;
                .title {
                    text-align: center;
                    color: #2c3e50;
                    font-size: 18px;
                    margin-bottom: 20px;
                }
            }
            .item_cont {
                 color: #2c3e50;
                 line-height: 24px;
                 font-size: 14px;
            }
        }
    }
}
</style>