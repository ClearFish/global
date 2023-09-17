<template>
    <view class="finance_box">
        <uni-nav-bar title="finance order" fixed :leftType="2">
            <template slot="right">
                <u-icon name="order" color="#fff" bold size="30" @click="toRecord"></u-icon>
            </template>
        </uni-nav-bar>
        <view class="container_box">
            <view class="flex-item-col-center">
                <text class="title required">Amount</text>
                <u--input
                    placeholder="Place enter the Amount"
                    v-model="form.amount"
                    clearable
                    style="margin-top:8px"
                ></u--input>
            </view>
            <view class="flex-item-col-center">
                <text class="title required">Date</text>
                <view class="uni-list" style="margin-top:8px">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                                <view class="uni-input date_input">{{form.date}}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="flex-item-col-center">
                <text class="title required">Transfer screenshot</text>
                <view style="width:100%;margin-top:8px">
                    <u-upload 
                        :fileList="fileList"
                        @afterRead="afterRead"
                        @delete="deletePic"
                        name="6"
                        multiple
                        :maxCount="1"
                        width="250"
                        height="150">
                        <u-button text="Upload" shape="circle" class="btns"></u-button>
                    </u-upload>
            </view>
            </view>
            <view class="flex-item-col-center">
                <text class="title">UPI Account</text>
                <u--input
                    placeholder="Place enter the UPI Account"
                    v-model="form.amount"
                    clearable
                    style="margin-top:8px"
                ></u--input>
            </view>
            <view class="flex-item-col-center">
                <text class="title">Payment Channel</text>
                <u--input
                    placeholder="Place enter the Payment Channel"
                    v-model="form.amount"
                    clearable
                    style="margin-top:8px"
                ></u--input>
            </view>
            <view class="flex-item-col-center">
                <text class="title">Recharge Method</text>
                <view class="method_box">
                    <view v-for="(item,index) in rechargeList" :key="index" :class="chosedIndex == index ?'recharge_item chosed_index':'recharge_item'" @click="choseItem(index)">
                        <u-icon name="checkbox-mark" class="selecticon" size="18" color="#fa3534" v-if="chosedIndex === index"></u-icon>
                        <text>{{item}}</text>
                    </view>
                </view>
            </view>
            <view class="flex-item-col-center">
                <text class="title">Memo</text>
                <u-textarea
                    placeholder="Place enter the Memo"
                    v-model="form.amount"
                    clearable
                    style="margin-top:8px"
                ></u-textarea>
            </view>
            <view class="bottom_btn">
                <u-button type="primary" text="Submit" shape="circle" color="#fa3534" @click="submit"></u-button>
            </view>
        </view>
    </view>
</template>
<script>
import dayjs from "dayjs"
export default {
    data() {
        return {
           rechargeList:['UTR','REF'],
           form:{
             amount:'',
             date:dayjs().format('YYYY-MM-DD'),
           },
            startDate:dayjs('2020-01-01').format('YYYY-MM-DD'),
            endDate:dayjs().format('YYYY-MM-DD'),
            date:dayjs().format('YYYY-MM-DD'),
            fileList:[],
            chosedIndex:null
        }
    },
    methods:{
        bindDateChange(val) {
            console.log(val,"123")
            this.form.date = val.detail.value
        },
        afterRead(file) {
            console.log(file)
        },
        deletePic() {

        },
        choseItem(index) {
            if(this.chosedIndex == index) {
                this.chosedIndex = null
            }else {
                this.chosedIndex = index
            }
        },
        submit() {

        },
        toRecord() {

        }
    }
}
</script>
<style lang="scss" scoped>
.container_box {
    padding: 0 15px;
    padding-top: 65px;
    .flex-item-col-center {
        margin-top: 10px;
        .title {
            font-size: 16px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 8px;
            padding-left: 8px;
            position: relative;
        }
        .required::before {
            content: "*";
            color: #fa3534;
            position: absolute;
            top: 0;
            left: 0;
        }
        .method_box {
            display: flex;
            gap: 10px;
            margin-top: 8px;
            .recharge_item {
                padding: 4px 20px;
                border: 1px solid #dadbde;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }
            .chosed_index {
                border-color: #fa3534;
            }
        }
        ::v-deep {
            .date_input {
                border-width: 0.5px !important;
                border-color: #dadbde !important;
                border-style: solid;
                padding: 6px 9px;
                border-radius: 4px;
            }
            .u-upload {
                width: 100%;
                .u-upload__wrap {
                    display: block;
                    width: 100%;
                }
            }
        }
        .btns {
            color: #fff;
            border-color: #fa3534;
            background-color: #fa3534;
            height: 41px;
            width: 100%;
            box-shadow: 0 0 10px 1px rgba(242, 65, 59, .27);
        }
        
    }
    .bottom_btn {
            margin-top: 20px;
        }
}
</style>