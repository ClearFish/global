<template>
    <view class="big_box">
        <view class="top_cont">
            <view class="top_nav">
                <u-icon name="arrow-left" size="22" color="#333333" @click="back"></u-icon>
                <view class="title">Membership Level</view>
                <view></view>
            </view>
            <view class="content_cont">
                <view class="logo_cont"></view>
                <img src="../../static/img/member_icon.png" alt="">
                <view class="content_box">
                    <view class="title">LV{{userInfo.level || vipData.level}}</view>
                    <view class="sub_title">My Membership Level</view>
                    <view class="invite_box">invite code:{{vipInfo.code || vipData.invite_code}}</view>
                </view>
            </view>
            <view class="bottom_cont">
                <view class="left add_fake">
                    <view class="title">{{vipData.recharge_amount}}</view>
                    <view class="sub_title">Recharge Amount</view>
                </view>
                <view class="left">
                    <view class="title">{{vipData.day_bet_amount}}</view>
                    <view class="sub_title">Betting Amount</view>
                </view>
            </view>
        </view>
        <view class="container_box">
            <view class="title">
                <text>Membership Level Rules</text>
                <view class="crown_bg"></view>
            </view>
            <view class="rules">
                <view class="content">Membership level according to Recharge amount and betting amount.</view>
                <view class="content">The VIP level calculation is based on the latest 3-month records.</view>
            </view>
            <view class="list">
                <view class="list_title">
                    <view class="word">Grade</view>
                    <view class="word">Recharge</view>
                    <view class="word">Betting</view>
                </view>
                <view class="list_box">
                    <view class="item_info" v-for="(item,index) in lvList" :key="index">
                        <view class="content_box">
                            <view class="lv_box">
                                <view class="index_box">{{item.level}}</view>
                                <view class="lv_contet">Lv {{item.level}}</view>
                            </view>
                        </view>
                        <view class="content_box">{{item.promotion_money}}</view>
                        <view class="content_box">{{item.day_bet_amount}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import {userlevelList} from "@/api/index.js"
import {mapState} from "vuex"
export default {
    data() {
        return {
            lvList:[],
            vipData:{}
        }
    },
    onLoad() {
        this.getList()
    },
    computed:{
        ...mapState({
            userInfo: state => state.userInfo,
            vipInfo:state=>state.vipInfo
        }),
    },
    methods:{
        getList(){
            userlevelList().then(res=>{
                this.vipData = res.data;
                this.lvList = res.data.rows;
            })
        },
        back() {
            uni.navigateBack()
        }
    }
}
</script>
<style lang="scss" scoped>
.big_box {
    .top_cont {
        padding: 0 10px;
        width: 100%;
        height: 352px;
        background: url("../../static/img/big_bg.png") no-repeat center;
        background-size: cover;
        .top_nav {
            display: flex;
            justify-content: space-between;
            height: 50px;
            width: 100%;
            align-items: center;
            .title {
                color: #333333;
                font-size: 18px;
                font-weight: 600;
            }
        }
        .content_cont {
            width: 100%;
            // height: 120px;
            background: url("../../static/img/membership_content.png") no-repeat center;
            background-size: cover;
            margin-top: 50px;
            position: relative;
            padding-bottom: 11px;
            .logo_cont {
                width: 65px;
                height: 17px;
                background: url("../../static/img/menber_logo.png") no-repeat center;
                background-size: cover;
            }
            img {
                width: 115px;
                height: 112px;
                position: absolute;
                right: 16px;
                top: -30px;
            }
            .content_box {
                padding: 0 20px;
                .title {
                    font-weight: 900;
                    font-size: 30px;
                    color: #491718;
                    font-family: PingFang-SC-Heavy;
                    margin-top: 10px;
                }
                .sub_title {
                    margin-top: 6px;
                    font-weight: 500;
                    font-size: 12px;
                    color: #491718;
                    font-family: PingFangSC-Medium;
                    opacity: 0.4;
                }
                .invite_box {
                    width: 192px;
                    height: 25px;
                    background: url("../../static/img/word_cont.png") no-repeat center;
                    background-size: cover;
                    margin-top: 6px;
                    font-family: PingFang-SC-Heavy;
                    font-weight: 900;
                    font-size: 14px;
                    color: #FFFFFF;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        .bottom_cont {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            .left {
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .title {
                    font-family: PingFang-SC-Heavy;
                    font-weight: 900;
                    font-size: 24px;
                    color: #491718;
                }
                .sub_title {
                    opacity: 0.7;
                    font-family: PingFang-SC-Heavy;
                    font-weight: 900;
                    font-size: 13px;
                    color: #491718;
                    margin-top: 6px;
                }
            }
            .add_fake {
                position: relative;
                &::after {
                    content: "";
                    opacity: 0.3;
                    width: 1px;
                    height: 25px;
                    background: #491718;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    margin-left: -50%;
                }
            }
        }
    }
    .container_box {
        background: #fff;
        border-radius: 20px 20px 0 0;
        margin-top: -20px;
        padding: 20px;
        .title {
            font-family: PingFang-SC-Bold;
            font-weight: 700;
            font-size: 16px;
            color: #333333;
            display: flex;
            align-items: center;
            .crown_bg {
                width: 25px;
                height: 25px;
                background: url("../../static/img/crown.png") no-repeat center;
                background-size: cover;
                margin-left: 10px;
            }
        }
        .rules {
            margin-top: 15px;
            .content {
                width: 80%;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 12px;
                color: #333333;
                line-height: 15px;
                padding-left: 20px;
                position: relative;
                margin-bottom: 10px;
                &::before {
                    content: "";
                    width: 6px;
                    height: 6px;
                    border-radius: 4px;
                    background: #FA4023;
                    position: absolute;
                    left: 0px;
                    top: 50%;
                    // margin-top: -50%;
                    transform: translateY(-50%);
                }
            }
        }
        .list {
            .list_title {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 50px;
                background: #FA4023;
                border-radius: 10px 10px 0 0;
                .word {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 18px;
                    color: #fff;
                }
            }
            .list_box {
                border: 1px solid #F9DEDE;
                border-radius: 0 0 10px 10px ;
                border-top:  none;
            }
            .item_info {
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .content_box {
                    height: 50px;
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 1px solid #F9DEDE;
                    .lv_box {
                        width: 67px;
                        height: 21px;
                        background: url("../../static/img/vip_bg.png") no-repeat center;
                        background-size: cover;
                        display: flex;
                        align-items: center;
                        color: #fff;
                        .index_box {
                            width: 26px;
                            display: flex;
                            justify-content: center;
                            // align-items: center;
                            font-size: 12px;
                            color: #F3C353;
                            height: 21px;
                            line-height: 19px;
                        }
                        .lv_contet {
                            flex: 1;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                    &:last-child {
                        border-right: none;
                    }
                }
                &:nth-child(2n){
                    background: #FFF5F4;
                }
                &:last-child {
                    border-radius: 0 0 10px 10px;
                }
            }
        }
    }
}
</style>