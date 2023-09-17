<template>
    <view>
        <view>home</view>
        <Tabbar :current="4"></Tabbar>
    </view>
</template>

<script>
import Tabbar from '@/components/tabber/index'
import {mapState} from 'vuex'
import {advertise, gameList, getWithdrawData, getCustomerService} from '@/api/index'
import {redirectTo} from "@/utils/common";
import miment from 'miment'

export default {
    components: {Tabbar},
    onLoad() {
        this.betArr()
        this.getAdvertise() // 轮播
        this.getUserCashRank()
        this.sumRunningTime()
    },
    onShow() {
        this.$store.dispatch('GetSite').then(res => {
            this.text = res.data.notice
        })
        this.getGameList()
        getCustomerService().then(res => {
            if (res.code === 1) {
                this.customer_service_list = res.data.rows
            } else {
                this.customer_service_list = [];
            }
        })
    },
    data() {
        return {
            runningTime: [
                {label: 'DAYS', value: 800},
                {label: 'HOURS', value: 12},
                {label: 'MINUTES', value: 32},
                {label: 'SECONDS', value: 44}
            ],
            customer_service_list: [],
            runTimerr: null,
            text: '',
            langShow: false,
            list1: [],
            userList: [],
            gameList: [],
            userRankList: [
                {account: 12321321, money: 1313, ctime: '12:00'},
                {account: 22321321, money: 1313, ctime: '12:00'},
                {account: 32321321, money: 1313, ctime: '12:00'},
                {account: 42321321, money: 1313, ctime: '12:00'},
                {account: 52321321, money: 1313, ctime: '12:00'},
                {account: 62321321, money: 1313, ctime: '12:00'},
                {account: 72321321, money: 1313, ctime: '12:00'},
                {account: 82321321, money: 1313, ctime: '12:00'},
                {account: 92321321, money: 1313, ctime: '12:00'},
                {account: 1121321, money: 1313, ctime: '12:00'},
                {account: 12321321, money: 1313, ctime: '12:00'},
                {account: 13321321, money: 1313, ctime: '12:00'},
                {account: 14321321, money: 1313, ctime: '12:00'},
                {account: 15321321, money: 1313, ctime: '12:00'},
                {account: 12321321, money: 1313, ctime: '12:00'},
                {account: 12321321, money: 1313, ctime: '12:00'},
                {account: 12321321, money: 1313, ctime: '12:00'},
                {account: 12321321, money: 1313, ctime: '12:00'},
                {account: 12321321, money: 1313, ctime: '12:00'},
                {account: 12321321, money: 1313, ctime: '12:00'},
                {account: 12321321, money: 1313, ctime: '12:00'},
                {account: 12321321, money: 1313, ctime: '12:00'},
            ],
            current: 0
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
        clearInterval(this.runTimerr)
    },
    methods: {
        // 计算运行时间
        sumRunningTime() {
            const oldTime = '2023-03-30 05:23:13'
            const currentTime = miment().format("YYYY-MM-DD hh:mm:ss")
            let arr = (miment().distance(currentTime, oldTime).format('YYYY-MM-DD hh:mm:ss', true)).split(' ')
            let arr1 = arr[0].split('-')
            let arr2 = arr[1].split(':')
            const days = Number(arr1[0]) * 365 + Number(arr1[1]) * 30 + Number(arr1[2])
            this.runningTime[0].value = this.runningTime[0].value + days
            arr2.map((v, key) => {
                this.runningTime[key + 1].value = Number(v)
            })
            this.beginRunningTime()
        },
        beginRunningTime() {
            this.runTimerr = setInterval(() => {
                if (this.runningTime[3].value < 59) {
                    this.runningTime[3].value++
                } else {
                    this.runningTime[3].value = 0
                    if (this.runningTime[2].value < 59) {
                        this.runningTime[2].value++
                    } else {
                        this.runningTime[2].value = 0
                        if (this.runningTime[1].value < 24) {
                            this.runningTime[1].value++
                        } else {
                            this.runningTime[1].value = 0
                            this.runningTime[0].value++
                        }
                    }
                }

            }, 1000);
        },

        getGameList() {
            gameList().then(res => {
                this.gameList = res.data
            })
        },
        betArr() {
            for (let i = 0; i < 9; i++) {
                const num1 = Math.ceil(Math.random() * 9)
                const num2 = Math.ceil(Math.random() * 9)
                const num3 = Math.ceil(Math.random() * 9)
                const num4 = Math.ceil(Math.random() * 9)
                const num5 = Math.ceil(Math.random() * 9)
                const num6 = Math.ceil(Math.random() * 9)
                const num7 = Math.ceil(Math.random() * 9)
                let obj = {
                    username: String(num3) + String(num2) + String(num4) + '***' + String(num6) + String(num5),
                    money: String(num7) + String(num1) + String(Math.ceil(Math.random() * 9)) + String(num5)
                }
                this.userList.push(obj)
            }
        },
        randomNum() {
            return Math.ceil(Math.random() * 9)
        },

        click() {

        },
        toGame(name, type) {
            let gameInfo = {}
            gameInfo = this.gameList.find(v => {
                return v.game_name === name
            })
            if (gameInfo && Object.keys(gameInfo).length > 0) {
                const id = gameInfo.game_id
                if (name === 'Color3m') { // 三分
                    uni.navigateTo({
                        url: `/pages/lottery/win?game_type=${type}&game_id=${id}&min=1`
                    })
                } else if (name === 'Color1m') { // 不显示三分
                    uni.navigateTo({
                        url: `/pages/lottery/win?game_type=${type}&game_id=${id}&noThree=true`
                    })
                } else {
                    uni.navigateTo({
                        url: `/pages/lottery/win?game_type=${type}&game_id=${id}`
                    })
                }

            }
        },
        // 菜单跳转
        toPath(item) {
            let path = ''
            switch (item.type) {
                case 1:
                    path = 'sign-in'
                    break;
                case 2:
                    path = 'tips?type=1'
                    break;
                case 3:
                    path = 'tips?type=2'
                    break;
                case 4:
                    redirectTo(this.siteInfo.app_download, '_blank');
                    return;
            }

            uni.navigateTo({
                url: `/pages/home/${path}`
            })
        },
        add() {
            if (this.current < 3) {
                this.current++
            }
        },
        del() {
            if (this.current > 0) {
                this.current--
            }
        },
        langConfirm(item) {
            this.$i18n.locale = item.value[0].value
            this.langShow = false
            uni.setStorageSync('lang', item.value[0].value);
        },
        toservice() {
            uni.navigateTo({
                url: '/pages/mine/customer-service'
            })
        },
        toMsg() {
            uni.navigateTo({
                url: '/pages/mine/message'
            })
        },
        // 获取轮播
        getAdvertise() {
            advertise().then(res => {
                this.list1 = res.data
                // this.list1.map(v=>{
                // 	v.image = this.$store.state.img_url+ v.image
                // })
            })
        },

        // 获取提款排行榜
        getUserCashRank() {
            getWithdrawData().then(res => {
                this.userRankList = res.data
            })
        },
    }

}
</script>

<style lang="scss" scoped>
.swiperBox {
    margin-top: -2px;
}
.movableArea {
    // position: fixed;
    // top: 0;
    // right: 0;
    width: 100%;
    height: 100vh;
    position: relative;
    
    // pointer-events: none;//设置area元素不可点击，则事件便会下移至页面下层元素
    .movableView {
        pointer-events: auto;//可以点击
        width: 70px;
        height: 70px;
        position: fixed;
        z-index: 22;
        .service {
            width: 70px;
            height: 70px;
        }
    }
}
.header-logo {
    width: 150px;
    height: 35px;
}

.act-content {
    padding: 14px 14px 5px;
    background: #fbfcfd;
    box-sizing: border-box;

    .btn-list {
        width: 100%;
        margin-bottom: 5px;
        padding: 9px;
        font-size: 13px;
        background: #fff;
        box-shadow: 0 1px 16px 0 rgb(203 202 220 / 56%);
        box-sizing: border-box;
    }

    .content-list-btn {
        width: 23%;

        text {
            color: rgb(96, 98, 102);
            font-size: 14px;
            margin: 3px 0px 0px;
        }
    }
}

.home-content {
    padding: 14px 14px 14px;
    background: #fbfcfd;

    .game-list {
        margin-top: 20px;

        .game-item {
            width: 100%;
            color: #fff;
            border-radius: 14px;
            margin-bottom: 15px;
            box-shadow: 0 1px 16px 0 rgb(203 202 220 / 56%);

            .info {
                width: 100%;
                padding: 23px 14px;
                border-radius: 14px 14px 0 0;
                position: relative;

                .name {
                    font-size: 25px;
                    margin-bottom: 14px;
                    font-weight: 600;
                }

                .des {
                    font-size: 14px;
                }

                .lottery-log {
                    position: absolute;
                    width: 120px !important;
                    height: 86px !important;
                    right: -9px;
                    top: -9px;
                }
            }

            .user-list {
                background-color: #fff;
                border-radius: 0 0 14px 14px;
                color: #000;

                .gomeList {
                    padding: 4px 9px;

                    .swiper {
                        height: 37px;
                    }

                    .a-flex-center {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 37px;
                        line-height: 37px;

                        .avatar {
                            width: 28px;
                            height: 28px;
                        }

                        .user-content {
                            font-size: 13px;
                        }
                    }
                }
            }

            .i4 {
                background: linear-gradient(135deg, #28a401, #14ff00c7);
                background-size: 100% 100%;
            }

            .i3 {
                background: linear-gradient(135deg, #64bfff, #2b5dfe);
                background-size: 100% 100%;
            }

            .i2 {
                background: linear-gradient(135deg, #a373ff, #7850f9);
                background-size: 100% 100%;
            }

            .i1 {
                background: linear-gradient(135deg, #fc3a3a, #ff0);
                background-size: 100% 100%;
            }
        }
    }
}

.bonus-box {
    width: 100%;
    height: 202px;
    padding: 19px 15px 0;
    position: relative;
    z-index: 1;

    .bonus-img {
        width: 100%;
        height: 110px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
    }

    .bonus-bg {
        position: absolute;
        top: 0;
        left: 4%;
        z-index: 1;
        width: 92%;
        height: 80%;
        background: url('/static/index/adv-bonus.min.png') no-repeat 50%;
        background-size: cover;

        .inner {
            color: #ffefd8;
            font-size: 19px;
            line-height: 19px;
            position: absolute;
            width: 100%;
            text-align: center;
            bottom: 30px;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
        }
    }
}

.web-info {
    background: url('/static/img/info-bg.adb6f8d4.webp') no-repeat 50%;
    background-size: cover;
    padding: 14px;

    .log-item {
        flex: 1;
        font-size: 15px;
        color: #fff;

        .icon {
            font-weight: bold;
        }

        .num {
            margin: 4px 0;
            font-weight: 600;
        }

        .txt {
            font-size: 12px;
            color: hsla(0, 0%, 100%, .5);
        }
    }
}

.rank-box {
    padding: 14px;

    .rank-tit {
        line-height: 61px;
        font-size: 18px;
        color: #fff;
        text-align: center;
        height: 65px;
        background: url('/static/index/rank.png') no-repeat 50%;
        background-size: contain;
        margin-bottom: 9px;
    }

    .rank-list {
        position: relative;
        box-shadow: 0 1px 17px 0 rgb(203 202 220 / 56%);
        padding: 9px;
        height: 187px;
        overflow: hidden;

        .swiper {
            height: 100%;

            .a-flex-center {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 37px;
                line-height: 37px;
                margin-bottom: 8px;

                .user-info {
                    width: 130px;
                }

                .avatar {
                    width: 37px;
                    height: 37px;
                }

                .username {
                    font-size: 12px;
                }

                .price {
                    width: 130px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #f2413b;
                    text-align: center;
                }

                .user-content {
                    width: 130px;
                    font-size: 14px;
                    color: #303133;
                    text-align: right;
                }
            }
        }
    }
}

.home-how {
    padding: 14px;

    .info {
        box-shadow: 0 1px 15px 0 rgba(203, 202, 220, .56);
        padding: 0 14px;

        .tit {
            font-size: 20px;
            color: #000;
            height: 47px;
            line-height: 47px;
            text-align: center;
            margin-bottom: 9px;
        }

        .tab {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding-bottom: 9px;

            .tab-item {
                width: 49%;
                padding: 9px;
                border: 1px solid #dfdfdf;
                box-shadow: 0 4px 8px 2px hsla(0, 0%, 49%, .13);
                border-radius: 4px;
                background: #feffff;
                margin-bottom: 9px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .step {
                    display: inline-block;
                    font-size: 9px;
                    padding: 4px;
                    background: #dfdfdf;
                    border-radius: 14px;
                }

                .txt {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    font-size: 12px;
                    margin-top: 4px;
                }

                .icon {
                    width: 22px;
                    height: 22px;
                }
            }

        }

        .action {
            border: 1px solid #e1353d !important;
            background: #fff7f7;
            color: #e45d61;
        }

        .a-justify-between {
            justify-content: space-between;
        }
    }

    .how-list {
        box-shadow: 0 1px 17px 0 rgba(203, 202, 220, .56);
        padding: 14px 39px;
        position: relative;
        z-index: 1;

        .show-how {
            width: 100%;
            height: 100%;

            .tit {
                width: 100%;
                text-align: center;
                color: #303133;
                font-size: 14px;
                margin-bottom: 10px;
            }

            .des {
                color: #303133;
                font-size: 14px;
            }

        }

        .arrow-item {
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            height: 33px;
            width: 33px;
            z-index: 1;
            background: #fbefef;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .left {
            left: 0;
        }

        .right {
            right: 0;
        }
    }

    .a-mt-2 {
        margin-top: 10px;
    }
}

.other-bourse-box {
    box-shadow: 0 1px 15px 0 rgba(203, 202, 220, .56);
    padding: 14px;
    margin: 0 14px 14px 14px;

    .title {
        text-align: center;
        font-size: 15px;
        font-weight: 700;
    }
}

.earth {
    width: 25px;
    height: 25px;
    margin-right: 10px;
}

.service {
    position: fixed;
    width: 70px;
    height: 70px;
    bottom: 74px;
    z-index: 9999;
    right: 20px;
}

.timeBox {
    color: #303133;
    font-size: 13px;

    .timeBox-title {
        text-align: center;
        height: 36px;
        font-size: 18px;
        line-height: 36px;
        margin-bottom: 8px;
    }

    .flip-time {
        padding: 0 43px 39px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around !important;

        .flip-num {
            position: relative;
            width: 63px;
            height: 63px;
            box-shadow: 0 2px 7px 0 rgba(172, 182, 192, .5);
            border-radius: 8px;
            background: #fff;
            perspective: 900px;

            .top {
                text-align: center;
                font-size: 16px;
                color: #000;
                width: 100%;
                font-weight: 700;
                height: 31px;
                line-height: 31px;
                border-radius: 8px 8px 0 0;
                background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#eeeff2));
                background: linear-gradient(180deg, #fff, #eeeff2);
            }

            .bottom {
                position: absolute;
                width: 100%;
                height: 31px;
                line-height: 31px;
                font-size: 10px;
                font-weight: 700;
                color: #9da7b3;
                border-radius: 0 0 8px 8px;
                text-align: center;
            }
        }
    }
}
</style>