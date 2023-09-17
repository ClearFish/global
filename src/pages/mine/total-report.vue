<template>
    <view class="bg">
        <uni-nav-bar title="Total Report" fixed :leftType="2"></uni-nav-bar>
        <view class="list_box">
            <view class="item" v-for="(item,index) in contenList" :key="index">
                <view class="top_item">
                    <img :src="item.imgUrl" alt="">
                    <text>{{item.title}}</text>
                </view>
                <view class="word_content">{{item.number}}</view>
            </view>
        </view>
    </view>
</template>
<script>
import change_deliver from "../../static/report/change_deliver.svg"
import daily_active from "../../static/report/daily_active.svg"
import deliver_number from "../../static/report/deliver_number.svg"
import register_number from "../../static/report/register_number.svg"
import team_amount from "../../static/report/team_amount.svg"
import team_balance from "../../static/report/team_balance.svg"
import team_fee from "../../static/report/team_fee.svg"
import user_number from "../../static/report/user_number.svg"
import withdraw_amount from "../../static/report/withdraw_amount.svg"
import withdraw_number from "../../static/report/withdraw_number.svg"
import recharge_amount from "../../static/report/recharge_amount.svg"
import recharge_number from "../../static/report/recharge_number.svg"
import daily_bet_number from "../../static/report/daily_bet_number.svg"
import {getTotalReport} from "@/api/index.js"
export default {
    data() {
        return {
            contenList:[
                {id:1,title:'Users Number',imgUrl:user_number,number:null},
                {id:2,title:'Daily Active Number',imgUrl:daily_active,number:null},
                {id:3,title:'Register Numberr',imgUrl:register_number,number:null},
                {id:4,title:'Recharge Amount',imgUrl:recharge_amount,number:null},
                // {id:5,title:'Recharge Number',imgUrl:recharge_number,number:null},
                // {id:6,title:'Withdrawal Amount',imgUrl:withdraw_amount,number:null},
                // {id:7,title:'Withdrawal Number',imgUrl:withdraw_number,number:null},
                // {id:8,title:'Change Delivery',imgUrl:change_deliver,number:null},
                {id:9,title:'Deliveries Number',imgUrl:deliver_number,number:null},
                {id:10,title:'Team Balance',imgUrl:team_balance,number:null},
                {id:11,title:'Team Bet Amount',imgUrl:team_amount,number:null},
                // {id:12,title:'Team Refund Fee',imgUrl:team_fee,number:null},
                {id:13,title:'Daily Bet(500+) No.',imgUrl:daily_bet_number,number:null},
            ]
        }
    },
    onLoad() {
        this.getReport()
    },
    methods:{
        getReport() {
            getTotalReport().then(res=>{
                this.contenList[0].number = res.data.UsersNumber;
                this.contenList[1].number = res.data.DailyActiveNumber;
                this.contenList[2].number = res.data.RegisterNumber;
                this.contenList[3].number = res.data.RechargeAmount;
                // this.contenList[4].number = res.data.RechargeNumber;
                // this.contenList[5].number = res.data.WithdrawalAmount;
                // this.contenList[6].number = res.data.WithdrawalNumber;
                // this.contenList[7].number = res.data.ChangeDelivery;
                this.contenList[4].number = res.data.DeliveriesNumber;
                this.contenList[5].number = res.data.TeamBalance;
                this.contenList[6].number = res.data.TeamBetAmount;
                this.contenList[7].number = res.data.DailyBetNumbers;
                // this.contenList[11].number = res.data.TeamRefundFee
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.list_box{
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
        width: 48%;
        padding: 15px 4px;
        background: #FFFFFF;
        box-shadow: 0 0 10px 0 #acacac2b;
        border-radius: 5px;
        margin-bottom: 20px;
        .top_item {
            font-family: PingFang-SC-Bold;
            font-weight: 700;
            font-size: 12px;
            color: #666666;
            display: flex;
            align-items: center;
            img {
                width: 20px;
                height: 20px;
                margin-right: 5px;
            }
        }
        .word_content {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFang-SC-Heavy;
            font-weight: 900;
            font-size: 24px;
            color: #333333;
            margin-top: 10px;
        }
    }
}
</style>