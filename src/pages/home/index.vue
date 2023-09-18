<template>
    <view class="home_box">
        <view class="top_down" v-if="showDownload">
            <view class="left_logo"></view>
            <view class="center_content">
                <text class="intro">Clique para fazer o download do aplicativo para obter mais surpresas</text>
                <view class="star_box">
                    <view class="star"></view>
                    <view class="star"></view>
                    <view class="star"></view>
                    <view class="star"></view>
                    <view class="star"></view>
                </view>
            </view>
            <view class="right_box">
                <view class="download">Download</view>
                <view class="cancle" @click="showDownload = false"></view>
            </view>
        </view>
        <Header :moreHeight="showDownload"/>
        <view :class="showDownload ? 'addmore_padding' : 'container_box'">
            <view class="swiper_box">
                <u-swiper
                    :list="list1"
                    @click="click"
                    keyName="image"
                    indicator
                    indicatorMode="dot"
                    radius="10"
                    height="169"
                    class="swiperBox"
                ></u-swiper>
            </view>
            <view>
                <u-notice-bar :text="text1" bgColor="#0f1923" color="#fff" duration="4000"></u-notice-bar>
            </view>
            <view class="scroll_container">
                <view v-for="(item,index) in scroolList" :key="index" class="scrool_item">
                    <img :src="item.imgUrl" alt="">
                    <text class="title">{{item.title}}</text>
                </view>
            </view>
            <view class="pool_box">
                <view class="container">
                    <view class="top_bg">
                        <img src="/static/home/title.png" alt="">
                        <view class="number_box">
                            <ScroolNumber :value="initNumber"/>
                        </view>
                    </view>
                    <view class="swiper_box2">
                        <swiper class="swiper" loop vertical autoplay  display-multiple-items="3" :disable-touch="true" :interval="2000">
                            <swiper-item v-for="(item,index) in mockData" :key="index">
                                <view class="swiper-item a-flex-center">
                                    <image :src="item.vo.iconUrl" class="avatar"></image>
                                    <view class="center">
                                        <view>{{ item.vo.customerName }}</view>
                                        <view>{{item.vo.gameName}}</view>
                                    </view>
                                    <view class="user-content">
                                        <img src="data:image/png;base64,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" alt="">
                                        <text>{{ item.vo.winAmount }}</text>
                                    </view>
                                </view>
                            </swiper-item>
                        </swiper>
                    </view>
                </view>
            </view>
        </view>
        <Tabbar :current="4"></Tabbar>
    </view>
</template>

<script>
import Tabbar from '@/components/tabber/index'
import Header from "@/components/header/index"
import ScroolNumber from "./components/scrollNumber.vue"
import {mapState} from 'vuex'
import {advertise} from '@/api/index'
import img1 from "@/static/home/scrrol1.webp"
import img2 from "@/static/home/scrrol2.webp"
export default {
    components: {Tabbar,Header,ScroolNumber},
    onLoad() {
        this.getAdvertise() // 轮播
        this.setNumber()
    },
    onShow() {
    },
    data() {
        return {
            showDownload:true,
            text1:'AVISO IMPORTANTE',
            list1:[],
            initNumber:2062.628,
            scroolList:[
                {imgUrl:img1,title:'Refer & Win'},
                {imgUrl:img2,title:'Got Bonus & Bet'},
                {imgUrl:img2,title:'Got Bonus & Bet'}
            ],
            mockData:[
  {
    "vo": {
      "recordId": 271634916,
      "merchantCode": "goal11brl",
      "customerId": 96224363,
      "customerName": "********obi",
      "gameType": "RNG",
      "vendor": "TA",
      "gameId": "TA0016",
      "gameCode": "TA0016",
      "gameName": "Crazy777",
      "prizeModeId": null,
      "nodeId": "175437",
      "winAmount": 400,
      "playerRank": null,
      "gameTime": "2023-09-17 23:38:19",
      "endTime": "2023-09-17 23:47:28",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/TA/EN/TA0016.png"
    }
  },
  {
    "vo": {
      "recordId": 271841714,
      "merchantCode": "goal11brl",
      "customerId": 98621238,
      "customerName": "******e80",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE101",
      "gameCode": "PGE101",
      "gameName": "Fortune Tiger",
      "prizeModeId": null,
      "nodeId": "179207",
      "winAmount": 200,
      "playerRank": null,
      "gameTime": "2023-09-18 10:34:44",
      "endTime": "2023-09-18 10:46:59",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE101.png"
    }
  },
  {
    "vo": {
      "recordId": 271739727,
      "merchantCode": "goal11brl",
      "customerId": 97772968,
      "customerName": "******s47",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE103",
      "gameCode": "PGE103",
      "gameName": "Destiny of Sun & Moon",
      "prizeModeId": null,
      "nodeId": "179209",
      "winAmount": 153.6,
      "playerRank": null,
      "gameTime": "2023-09-18 05:08:33",
      "endTime": "2023-09-18 05:19:19",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE103.png"
    }
  },
  {
    "vo": {
      "recordId": 271675078,
      "merchantCode": "goal11brl",
      "customerId": 95214430,
      "customerName": "********nda",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE078",
      "gameCode": "PGE078",
      "gameName": "Fortune Ox",
      "prizeModeId": null,
      "nodeId": "179187",
      "winAmount": 105,
      "playerRank": null,
      "gameTime": "2023-09-18 01:42:46",
      "endTime": "2023-09-18 01:46:26",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE078.png"
    }
  },
  {
    "vo": {
      "recordId": 272062749,
      "merchantCode": "goal11brl",
      "customerId": 96194432,
      "customerName": "****uga",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE078",
      "gameCode": "PGE078",
      "gameName": "Fortune Ox",
      "prizeModeId": null,
      "nodeId": "179187",
      "winAmount": 100,
      "playerRank": null,
      "gameTime": "2023-09-18 21:40:25",
      "endTime": "2023-09-18 21:49:40",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE078.png"
    }
  },
  {
    "vo": {
      "recordId": 272005094,
      "merchantCode": "goal11brl",
      "customerId": 96194432,
      "customerName": "****uga",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE048",
      "gameCode": "PGE048",
      "gameName": "Fortune Mouse",
      "prizeModeId": null,
      "nodeId": "179162",
      "winAmount": 100,
      "playerRank": null,
      "gameTime": "2023-09-18 19:00:27",
      "endTime": "2023-09-18 19:05:35",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE048.png"
    }
  },
  {
    "vo": {
      "recordId": 271896548,
      "merchantCode": "goal11brl",
      "customerId": 95950940,
      "customerName": "**********s21",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE078",
      "gameCode": "PGE078",
      "gameName": "Fortune Ox",
      "prizeModeId": null,
      "nodeId": "179187",
      "winAmount": 100,
      "playerRank": null,
      "gameTime": "2023-09-18 13:22:19",
      "endTime": "2023-09-18 13:32:29",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE078.png"
    }
  },
  {
    "vo": {
      "recordId": 271684451,
      "merchantCode": "goal11brl",
      "customerId": 95214430,
      "customerName": "********nda",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE078",
      "gameCode": "PGE078",
      "gameName": "Fortune Ox",
      "prizeModeId": null,
      "nodeId": "179187",
      "winAmount": 96,
      "playerRank": null,
      "gameTime": "2023-09-18 02:08:37",
      "endTime": "2023-09-18 02:16:22",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE078.png"
    }
  },
  {
    "vo": {
      "recordId": 271911760,
      "merchantCode": "goal11brl",
      "customerId": 98796612,
      "customerName": "*********era",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE120",
      "gameCode": "PGE120",
      "gameName": "Fortune Rabbit",
      "prizeModeId": null,
      "nodeId": "179226",
      "winAmount": 93,
      "playerRank": null,
      "gameTime": "2023-09-18 14:12:29",
      "endTime": "2023-09-18 14:17:30",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE120.png"
    }
  },
  {
    "vo": {
      "recordId": 271881582,
      "merchantCode": "goal11brl",
      "customerId": 97493153,
      "customerName": "***der",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE120",
      "gameCode": "PGE120",
      "gameName": "Fortune Rabbit",
      "prizeModeId": null,
      "nodeId": "179226",
      "winAmount": 87,
      "playerRank": null,
      "gameTime": "2023-09-18 12:46:32",
      "endTime": "2023-09-18 12:47:26",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE120.png"
    }
  },
  {
    "vo": {
      "recordId": 272052132,
      "merchantCode": "goal11brl",
      "customerId": 95264233,
      "customerName": "***818",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE120",
      "gameCode": "PGE120",
      "gameName": "Fortune Rabbit",
      "prizeModeId": null,
      "nodeId": "179226",
      "winAmount": 85.75,
      "playerRank": null,
      "gameTime": "2023-09-18 21:14:43",
      "endTime": "2023-09-18 21:19:48",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE120.png"
    }
  },
  {
    "vo": {
      "recordId": 271821655,
      "merchantCode": "goal11brl",
      "customerId": 96592953,
      "customerName": "********aah",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE120",
      "gameCode": "PGE120",
      "gameName": "Fortune Rabbit",
      "prizeModeId": null,
      "nodeId": "179226",
      "winAmount": 85.5,
      "playerRank": null,
      "gameTime": "2023-09-18 09:49:18",
      "endTime": "2023-09-18 09:49:37",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE120.png"
    }
  },
  {
    "vo": {
      "recordId": 271748496,
      "merchantCode": "goal11brl",
      "customerId": 98629049,
      "customerName": "*****203",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE101",
      "gameCode": "PGE101",
      "gameName": "Fortune Tiger",
      "prizeModeId": null,
      "nodeId": "179207",
      "winAmount": 84,
      "playerRank": null,
      "gameTime": "2023-09-18 05:38:45",
      "endTime": "2023-09-18 05:50:12",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE101.png"
    }
  },
  {
    "vo": {
      "recordId": 272000163,
      "merchantCode": "goal11brl",
      "customerId": 98757831,
      "customerName": "*******ima",
      "gameType": "RNG",
      "vendor": "CQ9",
      "gameId": "CQ0424",
      "gameCode": "CQ0424",
      "gameName": "Funky Bingo",
      "prizeModeId": null,
      "nodeId": "175830",
      "winAmount": 80,
      "playerRank": null,
      "gameTime": "2023-09-18 18:37:07",
      "endTime": "2023-09-18 18:50:23",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/CQ9/EN/CQ0424.png"
    }
  },
  {
    "vo": {
      "recordId": 271748497,
      "merchantCode": "goal11brl",
      "customerId": 98629049,
      "customerName": "*****203",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE101",
      "gameCode": "PGE101",
      "gameName": "Fortune Tiger",
      "prizeModeId": null,
      "nodeId": "179207",
      "winAmount": 79.2,
      "playerRank": null,
      "gameTime": "2023-09-18 05:38:58",
      "endTime": "2023-09-18 05:50:12",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE101.png"
    }
  },
  {
    "vo": {
      "recordId": 271794693,
      "merchantCode": "goal11brl",
      "customerId": 98719995,
      "customerName": "*****etu",
      "gameType": "LIVE",
      "vendor": "PP",
      "gameId": "PP0369",
      "gameCode": "PP0369",
      "gameName": "Roleta Powerup",
      "prizeModeId": null,
      "nodeId": "174328",
      "winAmount": 75,
      "playerRank": null,
      "gameTime": "2023-09-18 08:17:17",
      "endTime": "2023-09-18 08:18:01",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PP/EN/PP0369.png"
    }
  },
  {
    "vo": {
      "recordId": 271794694,
      "merchantCode": "goal11brl",
      "customerId": 98719995,
      "customerName": "*****etu",
      "gameType": "LIVE",
      "vendor": "PP",
      "gameId": "PP0369",
      "gameCode": "PP0369",
      "gameName": "Roleta Powerup",
      "prizeModeId": null,
      "nodeId": "174328",
      "winAmount": 75,
      "playerRank": null,
      "gameTime": "2023-09-18 08:17:17",
      "endTime": "2023-09-18 08:18:01",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PP/EN/PP0369.png"
    }
  },
  {
    "vo": {
      "recordId": 271754593,
      "merchantCode": "goal11brl",
      "customerId": 98719995,
      "customerName": "*****etu",
      "gameType": "LIVE",
      "vendor": "PP",
      "gameId": "PP0369",
      "gameCode": "PP0369",
      "gameName": "Roleta Powerup",
      "prizeModeId": null,
      "nodeId": "174328",
      "winAmount": 75,
      "playerRank": null,
      "gameTime": "2023-09-18 05:52:16",
      "endTime": "2023-09-18 06:05:33",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PP/EN/PP0369.png"
    }
  },
  {
    "vo": {
      "recordId": 271684452,
      "merchantCode": "goal11brl",
      "customerId": 95214430,
      "customerName": "********nda",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE078",
      "gameCode": "PGE078",
      "gameName": "Fortune Ox",
      "prizeModeId": null,
      "nodeId": "179187",
      "winAmount": 75,
      "playerRank": null,
      "gameTime": "2023-09-18 02:08:37",
      "endTime": "2023-09-18 02:16:22",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE078.png"
    }
  },
  {
    "vo": {
      "recordId": 271679660,
      "merchantCode": "goal11brl",
      "customerId": 95214430,
      "customerName": "********nda",
      "gameType": "RNG",
      "vendor": "PGE",
      "gameId": "PGE078",
      "gameCode": "PGE078",
      "gameName": "Fortune Ox",
      "prizeModeId": null,
      "nodeId": "179187",
      "winAmount": 75,
      "playerRank": null,
      "gameTime": "2023-09-18 01:58:49",
      "endTime": "2023-09-18 02:01:24",
      "notAuto": "0",
      "iconUrl": "https://images.b728484.com:42666/TCG_GAME_ICONS/PGE/EN/PGE078.png"
    }
  }
]
        }
    },
    computed: {
        ...mapState({
            columns: state => state.langList,
            siteInfo: state => state.siteInfo
        }),
        menuList() {
            return [
                // {icon: 'calendar', text: this.$t('home.menu.li1'), type: 1},
                {icon: 'volume', text: this.$t('home.menu.li2'), type: 2},
                {icon: 'gift', text: this.$t('home.menu.li3'), type: 3},
                {icon: 'download', text: this.$t('home.menu.li4'), type: 4}
            ]
        },
        courseList() {
            return [
                {
                    step: this.$t('home.course.step1'),
                    tit: this.$t('home.course.step1.tit'),
                    des: this.$t('home.course.step1.des'),
                    text: this.$t('home.course.step1.txt'),
                    icon: 'work_first_hui.webp',
                    iconed: 'work_first_hong.webp'
                },
                {
                    step: this.$t('home.course.step2'),
                    tit: this.$t('home.course.step2.tit'),
                    des: this.$t('home.course.step2.des'),
                    text: this.$t('home.course.step2.txt'),
                    icon: 'lucky-number.min.png',
                    iconed: 'lucky-number-selected.min.png'
                },
                {
                    step: this.$t('home.course.step3'),
                    tit: this.$t('home.course.step3.tit'),
                    des: this.$t('home.course.step3.des'),
                    text: this.$t('home.course.step3.txt'),
                    icon: 'money.min.png',
                    iconed: 'money-selected.min.png'
                },
                {
                    step: this.$t('home.course.step4'),
                    tit: this.$t('home.course.step4.tit'),
                    des: this.$t('home.course.step4.des'),
                    text: this.$t('home.course.step4.txt'),
                    icon: 'diamond.min.png',
                    iconed: 'diamond-selected.min.png'
                }
            ]
        }
    },
    onUnload() {
    },
    methods: {
                // 获取轮播
        getAdvertise() {
            advertise().then(res => {
                this.list1 = res.data
                // this.list1.map(v=>{
                // 	v.image = this.$store.state.img_url+ v.image
                // })
            })
        },
        setNumber() {
            setInterval(()=>{
                var number = this.initNumber + Number(Number(Math.random(0,1)*10).toFixed(2))
                this.initNumber = Number(number.toFixed(3))
            },5000)
        }
    }

}
</script>

<style lang="scss" scoped>
.home_box {
    padding-bottom: 80px;
}
.container_box {
    padding-top: 74px;
}
.addmore_padding {
    padding-top: 144px;
}
.swiper_box {
    padding: 10px;
    border-radius: 10px;
}
.top_down {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    background: #25313b;
    padding:  10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .left_logo {
        width: 44px;
        height: 44px;
        background: url("/static/home/appIcon.png") no-repeat center;
        background-size: cover;
        border-radius: 4px;
    }
    .center_content {
        width: 160px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .intro {
            font-size: 12px;
            line-height: 12px;
            display: block;
        }
        .star_box {
            display: flex;
            .star {
                width: 16px;
                height: 16px;
                background: url("/static/home/star.svg") no-repeat center;
                background-size: cover;
            }
        }
    }
    .right_box {
        display: flex;
        gap: 10px;
        align-items: center;
        .download {
            width: 108px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            color: #3a2750;
            border-radius: 18px;
        }
        .cancle {
            width: 25px;
            height: 25px;
            background:  url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABaBAMAAAAlRDcPAAAAGFBMVEX///9HcEz////////////////////////5qUDDAAAACHRSTlN/AD9mMwwgTs6tABYAAAJkSURBVFjDlZhNc5tADIY1YIcr2ICvkE56Js1Hr+vptL2aSae90skfCOO2v79gZ2G10n5ofXLy+B3tIr0rAQVZP78/dAAPnz/25F852H/5cQa90sc+gFdfwFzpVy9ev4G1/nnwugOyHp04RwM8OfDqDdj1l8dfeRrSI4f/AtfKeopXnRNfw1/xATzrt42XPhoSG2+8OLQY3/lpLa/xgLiWf8fLEA0bEz8F8evhXHHfmaOzv+L7MA3pijcROBw1XsXQcKPxfRSealxF4XM0F7yLw7dXfBdHz4kw4y+ROPQXHIV+RpFlZ5w3M24Cdyi0qeoUCn7CzfTK8DMb8cY2M763HsUO/bhCJz/hJ3xWhvxYWKfcT7iy1Bf5rLAT5DjhnZ12Wn4kVXk/4bTGdqs4PuVtDjVTws0ijqvyJocSeHlGHLIc9sDLj4yfpATX8hnrJ/n0YeVH1qxOMLAGVPNmNVA8WRyfFoKiuLZPziAUKKc7M1XWQON05yYST5weLsaVLBjhVpXsIEWPaYCTLAn4FFOtI8XYBC7NskIJfGDFUdWa5VGy4sDKZ3xpK8sUjNIueHFWfsvakjJ+erBtiZheaQZGTI9YqkKRgWWptmGXaN/EsGvrOlBo4+Q6QHttkSsm2PXuyVWW3qKr7NMH89t4wSOaGfOiFF7DsZf80zs+yFoIYYMS1/5sl+YqqqFpF/wga92EjaGw7SxqWVMb3ixqmYM9s9WQh+Rb0TCxIaPKq2hUkQ5CnrRPeskQt4RiTZSONv7OMYDyI+Wzc7zl+GfP8FyJhmfpaI4Hf/jTB98TrK8VvjGvFf4DAMSBMDtaEusAAAAASUVORK5CYII=") no-repeat center;
            background-size: cover;
        }
    }
}
.scroll_container {
    padding-left: 10px;
    display: flex;
    gap: 10px;
    overflow: auto;
    margin-top: 10px;
    .scrool_item {
        width: 171px;
        height: 84px;
        position: relative;
        border-radius: 4px;
        flex-shrink: 0;
        img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left:0;
            border-radius: 4px;
            z-index: 1;
        }
        .title {
            z-index: 2;
            position: relative;
            padding-left: 10px;
            display: flex;
            align-items: center;
            width: 77px;
            height: 100%;
        }
    }
}
.pool_box {
    width: 100%;
    padding: 0 10px;
    margin-top: 18px;
    .container {
        width: 100%;
        background: #150e30;
        .top_bg {
            width: 100%;
            height: 128px;
            background: url("/static/home/top_bg.png") no-repeat center;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            img {
                width: 149px;
                height: 20px;
            }
        }
        .swiper_box2 {
            padding: 10px;
            .swiper {
                height: 190px;
            }
        }
        .swiper-item {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            border-radius: 8px;
            background: rgba(91,131,152,.1);
            .avatar {
                width: 48px;
                height: 45px;
            }
            .center {
                flex: 1;
                margin-left: 20px;
            }
            .user-content {
                display: flex;
                gap: 3px;
                align-items: center;
                min-width: 50px;
                img {
                    width: 20px;
                    height: 19px;
                }
            }
        }
    }
}
</style>