<template>
    <view class="bg_box">
        <uni-nav-bar title="Promote Mission" fixed :rightType="2"></uni-nav-bar>
        <view class="info">
            <view class="userinfoBox_container">
                <view class="center_box">
                    <view class="title">Total Amount</view>
                    <view class="number">{{totalAmount}}</view>
                </view>
            </view>
        </view>
        <view class="list_box">
            <view class="title">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAAEhyb7BAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEqADAAQAAAABAAAAEgAAAACaqbJVAAADQUlEQVQ4EY2UTWhUVxTHf/e+9yZqkxhj6sdAIaExhA5GTRehFPzoQmo2tgGnGluKSAsFXYkuVMpk1VVBCikKxVC6sSndFKsouNOFCxdCp60NpVLqkAlpJjHJTGbex/XcO76Q7Dwwc9+595z/Oed/zr2wRpQ5dswT/XU62avJ5QxVc5I5Hq0aKTMyshPPMz6RHqVuUMYYxaUTw+xIblIzfxMGo5p8XpPpv82D0HBhchePw85VkPRDmat5w3TmbToaj2iYss90AsV6SSx2sjkZ1Ewb+fZ7WUk6WAnmfUr6LHE4BArmY51iYSZOvG+ufb4p3TDXPopdarLRLGxIRSQCF8uOXRNBcKvoz9WRJpRNoJrzWDAFLv6kqZHwm2rjX/9dKilSSxyhgrdoiGek2smoBfmCWmMfiRazVxWboPn+uMVxYr4d3WKuju5PdWXG84fQ6jorEswzfS7h/5I9oLvYxj3OT2qfstdJa9SNNGK1onb1GMvdsvzGxpQvlUA5OMBc+FcKT7/qoRg/pUeXaBNMakKOCStMTpbp0930qsv8rz5gYKDMooWzRnX5tykPD2eYCseZiiW37V/aQ5aaRr5MjpIW9bC9I2Q5Os3GDRGzsz3MzCgpxokvjN7H5xMId7m2VG2STsRZnUmVdavj7Manb67bXKOYHz7uTRu/ZtvOi9RWLGR4+OQUcbwsBbXQqr6jErzB5ijvjKX90nFYDH6hrTHFvD7Oa2zEI2B3/4Q6VIia0zSgj9Ke/OzmsMY4M/EfZL0RCfMexk6Xg5Np07cpR7+y1duDNp+5s6o6TCZ3z3cmVaUFHZ4lX8kdmJUmBjxPbgkfd9x5CuQlkQSTs/hPfPU1WznHgnhuk/vhDOvK3kZpkPcjU+UiBw+mru6YYlExyBVx+YJqaxd0LzH9+xCL8Tnqjp2XQFUZAonFYpI4kFLJQ83dFPB3UPouXeZDnpgrzOkcOzLLZKXYJW0IxG+1tTam7WZDkghtfSLZbEyxkhdOBgmjPinnMt3Zf5j4pqGUPCSFgnaBV8Tn5dVukq31YRnLW264LZAddEuyW62+hvD1RQs5LfvZ1/+g+U6NjXnCwxbqXmBxXlla4lDew4oqFKIXQthe6ETdvU0AAAAASUVORK5CYII=" alt="">
                <view> My Task </view>
            </view>
            <view class="list_container">
                <view class="container_top">
                    <u-tabs :list="groupList" 
                            @click="choseItem" 
                            keyName="title" 
                            lineColor="#f2413b" 
                            :activeStyle="{
                                color: '#303133',
                                fontSize:'16px',
                                fontWeight: 'bold',
                                transform: 'scale(1.05)'
                            }"
                    >
                    </u-tabs>
                    <view class="amount_box">Receive Amount: {{choseType.total_bonus}}</view>
                </view>
                <u-collapse v-model="collapseVal" icon="" v-if="list && list.length">
                    <u-collapse-item v-for="(item,index) in list" :key="index" :name="index">
                         <view slot="title" class="u-page__item__title__slot-title">
                            <view class="left">{{index+1}}</view>
                            <view class="center_left_top">
                                <view>{{item.title}}</view>
                                <view style="color:#f2413b">+{{item.bonus}}</view>
                            </view>
                             <view class="center_right">
                                <view class="progress_title">{{item.completed}}/{{item.schedule}}</view>
                                <view class="progress">
                                    <view :style="{width:(item.completed/item.schedule*100) >= 100 ? '100%': (item.completed/item.schedule*100) +'%'}" 
                                        class="value_container"></view>
                                </view>
                            </view>
                         </view>
                         <view class="center_left">
                            <view class="details">{{item.synopsis}}</view>
                            <view v-if="item.completed>=item.schedule">
                                <view v-if="item.receive" class="right received">Received</view>
                                <view v-else class="right right_1" @click="receiveBonous(item)">Receive</view>
                            </view>
                            <view v-else>
                                <view class="right">Incomplete</view>
                            </view>
                        </view>
                    </u-collapse-item>
                </u-collapse>
                <u-loading-icon v-else-if="loading && !list.length"></u-loading-icon>
                <view v-else class="no_data">
                    <u-empty mode="list" text='No Data'></u-empty>
                </view>
            </view>
        </view>
        <Tabbar :current="2"></Tabbar>
        <u-popup :show="show" class="rulePopup" :round="15"  mode="center" @close="show = false">
            <view class="receive_box">
                <view class="title">
                    <view>Receive Bonous</view>
                    <view class="add_margin">Best Wishes to You</view>
                </view>
                <view class="receive_info">
                    <view class="center_text addfont">Congratulations !!</view>
                    <view class="info_detail">You have already received a reward of<text class="amount">{{receiveItem.symbo}}{{receiveItem.bonus}}</text></view>
                    <view class="rule-btn center_text">
                        <view class="btn center_text" @click="getBonous">Receive</view>
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>
<script>
import {promotionsList,promotionsReceive,promotionsGroup} from '@/api/index.js'
import Tabbar from '@/components/tabber/index'
export default {
    components: {Tabbar},
    data(){
        return {
            list:[],
            totalBonous:'',
            collapseVal:['0'],
            show:false,
            receiveItem:{},
            bonousList:[
                {
                    currency:'SYSTEM',
                    symbo:'₹'
                },
                {
                    currency:'USDT',
                    symbo:'USDT'
                }
            ],
            groupList:[],
            missionType:0,
            choseType:{},
            originList:[],
            loading:false,
            totalAmount:null
        }
    },
    onShow() {
        this.getList()
        this.getGroup()
    },
    methods:{
        getList() {
            this.loading = true
            promotionsList({group_id:this.missionType}).then(res=>{
                this.originList = res.data.rows;
                this.list = res.data.rows;
                this.totalBonous = res.data.total_bonus;
                this.loading = false
            })
        },
        getGroup() {
            promotionsGroup().then(res=>{
                this.groupList = res.data;
                this.totalAmount = res.data.reduce((a,b)=>Number(a.total_bonus)+Number(b.total_bonus))
                this.totalAmount = this.totalAmount.toString().indexOf('.') == -1 ? this.totalAmount + '.00' : this.totalAmount
                this.choseType = this.groupList.find(item=>item.group_id == this.missionType)

            })
        },
        choseItem(item) {
            this.choseType = item;
            this.missionType = item.group_id;
            this.list = [];
            this.getList()
        },
        receiveBonous(item) {
            console.log(item);
            if(!item.receive) {
                let bonousInfo = this.bonousList.find(ite=>ite.currency == item.currency);
                item.symbo = bonousInfo.symbo;
                this.receiveItem = item;
                this.show = true
            }else {
                return
            }
        },
        getBonous() {
            let item = this.receiveItem
            promotionsReceive({id:item.id}).then(res=>{
                    if(res.code ==1) {
                        uni.showToast({
                            icon: 'none',
                            title: 'receive success',
                            duration: 2000
                        });
                        this.list = []
                        this.getList();
                        this.show = false
                    }else {
                         uni.showToast({
                            icon: 'none',
                            title: res.msg,
                            duration: 2000
                        });
                        this.show = false
                    }
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.bg_box {
    background: aliceblue;
    min-height: 100vh;
    padding-top: 50px;
    padding-bottom: 60px;
    .info {
        background: url('/static/img/banlance_bg.png') no-repeat top;
        background-size: 100% 80%;
        font-size: 14px;
        color: #fff;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding:25px 18px;
        padding-bottom: 0;
        .userinfoBox_container {
            background: hsla(0,0%,100%,.55);
            border-radius: 8px;
            padding: 15px;
            width: 100%;
            .center_box {
                background: #fff;
                border-radius: 8px;
                width: 100%;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 137px;
                .title {
                    color: rgba(0,0,0,0.9);
                }
                .number {
                    color: #ac4f01;
                    margin-top: 10px;
                    font-size: 24px;
                }
            }
        }
    }
    .list_box {
        padding: 10px 15px;
        padding-bottom: 20px;
        .title {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
        }
        .list_container {
            background: #fff;
            box-shadow: 0 0.08rem 0.64rem 0.02667rem hsla(0,0%,87.1%,.79);
            border-radius: 10px;
            padding: 10px 0;
            margin-top: 12px;
            min-height: 60vh;
            .container_top {
                padding: 0 10px;
                .amount_box {
                    font-size: 18px;
                    margin: 10px 0;
                    font-size: 800;
                    color: #000;
                }
            }
            .no_data {
                min-height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    ::v-deep {
        .u-page__item__title__slot-title {
            display: flex;
            .left {
                width: 26px;
                height: 26px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAADK0lEQVRIDa1WTWhTQRCe2fwYSrVRG1trRRERxJ+DWA9Wa2ykd8Fe61EExZNX8e5JFLzn2oIHb4XaoPbg70EUD4oUbKs1tU20Sm3y3jjfvuwjSZukYBfC7s7PtzNvv5kNk45fQ0O72js6CoyFlH7PQ2ggwSIchcGzJ7Dhn+f7xUmNWxDJDGNTPHe6jw2/cApfqI/ha8R/7YRuNsnHT9/AwgkAY0yiO9wvXhg4ls+cOeQEvJROJyNcWnICnbPbJqcumwiVr1QJsRwppPtPGma5VaewW/XgwXUVbZPPnpPQTadEhMnc1CubIIQIgql00BBniOWqKlJC/CRKdHuVuYS0YGcdgiDoJQQNh57mUWyMkW/U8x6p4b6GxhUFwjKe+H/1oA+tjJ0+CCm4jxsqHHGK+hnos6met2HSMNDE92vinfXGMDwyOroKeY2DDA/HFxa/7o8Jt/uGSzGTmN86Pv69GiB0AE3iIrGyfkYmGVCa5Un4gU8yIRT7tD2Xs5wMcrB3S9cVad0cxJdTPsc/wskgbuVqupExwgFrcalYG5sk0x1smg0wAHVTVQjNzFWndCn5K10bdtBkU8aX2IYdQMQSy3LFQWZaBERgbeeO3dMGt+gLX2zhkAXFWW/b3sNyJtNV9lb2GpaHml1vjbPS2ifKoXggD2/6vdJiT37ueI2xbvSWF/TCpp08dHACzHDuyed71iNitZ1bA3QulZpzBHVyzDUHuFSg0K+X1rvSEqlLCcqaoR9Y+C7ShDgaSXxpn5iwTRR7e4BN98e3o+T7RqnVkLNwaDGyWpf3yBh/dmf3O2TEKLGifss4c6RM/ljriFscoT04SubSqojXoYwwqF+4oCz/HxxI3BtgEQHboDlYsdY85s0Y6B/AAbZB58HGNhQsNmE4LGAbtDWLqd1qE7ADiAoWsC2LXPMNqNm6NzUNpFKZruDCOnBPG4uwdsRrCjLSFGitMqut9756y5qeXW1rDzLeAdSEpa6g4PRHclijScE2+Mb6uAnlokw5UBLcFz/y2T0GDjPMwAmqZ9TIcrGYXPH+6L8HswUNFXpcHl7QRKStYP8DVd6wal+3/gfBLVPpxGyf5QAAAABJRU5ErkJggg==') no-repeat center;
                background-size: 100% 100%;
                color: #fff;
                margin-right: 10px;
            }
            .center_left_top {
                display: flex;
                gap: 4px;
                align-items: center;
                width: 60%;
                margin-right: 10px;
            }
            .center_right {
                width: 100px;
                .progress_title {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
                .progress {
                    width: 100%;
                    border-radius: 4px;
                    height: 8px;
                    background: #cecece;
                    margin-top: 4px;
                    .value_container {
                        height: 100%;
                        border-radius: 4px;
                        background: #6bbe58;
                    }
                }
            }

        }
        .center_left {
                color: #98999a;
                margin-top: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
                .details {
                    font-size: 12px;
                }
                .right {
                    color: rgb(255, 255, 255);
                    background: rgb(181, 181, 181);
                    border-color: rgb(181, 181, 181);
                    box-shadow: 0 0 0.21333rem 0.02667rem #b5b5b5;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                    height: 30px;
                    width: 92px;
                }
                .right_1 {
                    background: #f2413b;
                     border-color: #f2413b;
                      box-shadow: 0 0 0.21333rem 0.02667rem #f2413b;
                }
                .received {
                    background: rgba(255,200,0,0.7);
                    border-color: rgb(255,200,0,0.7);
                    box-shadow: 0 0 0.21333rem 0.02667rem rgba(255,200,0,0.7);
                }
        }
        .u-cell__right-icon-wrap{
            display: none !important;
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
            .receive_info {
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
}
</style>