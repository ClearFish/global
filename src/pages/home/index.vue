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
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABKCAMAAAAbgiNiAAAAyVBMVEVHcEz76KH66b366LP73or74Hz4yGb978n//aL326L237P55af56L376Kr65Jf64ZL66K3776Tkp2H66Kr315D876P87rLpqFXnrmvntH7yvm7+1Wb94G3+0GL93Wn95HD9yl7+0mT8wln92Wv+8Hn+93r7vVX//pX+2Gj2t1T+7HT9xl3//X796HT+8IP/+In903P7rT77oDT98pL8u0T7tUL81Vj7x1L3ymX8xEr96H/5tFH602f0rkz9zVP76Iv7kSr8z1z+9ZkTS4KzAAAAG3RSTlMAvBZI7P76CP4zKGkgfdSgWvHoqovdlPvMguzCk4buAAAGmElEQVRYw+2Ye3eaTBDGg8BRvEXjJcnLbWHNKiFACIiAqNXv/6HemQWMiebW9s/OMWl7cvLrMzuzzwxcXf2Lf/HXo9notjG6zeZfYCnioDMeX2OMxx1RAewf4Npib9SXZM3UTFPTNFmShOueqDR+j9lQeoLszXg8Pj56JoZm0J0wFpWfI5vdcd97gKiBFRGVUkn4scpGT8ofnp4qIOd5FRGRmiSIjR8d3ih/euK89xI1zjMMQ5p+P++mKD081cDZ+5wrkYY26XW/yetIT08XgBAVjauEqgvi93j9Ex4AQRqkaEDrmEcoIk1T7ne+kfagj/k+1AJNdbtiyxceS6Zrj7NZnbjn5VLvS6Ii5CcCPZ3EYQisXxjwZ+hofjTzOG42CyKp80W1m9f5a7qPKogrIww5F1Rmey33c8DlfjCfB18Qm73+w/H0TN1mLGY2D8ayGLjLLNsmhhf5Mz8IADgPJoPPiGLfP+ozCcsy2yY6BtEt+GavtkmSwBf1/RnikNgffHKOo2FQ0uD49ixbrQixIHRSYKFVnWz3CNyuFpBwRYw+7p6GOGwFFW+mM0YICONACztZM1RiuwSRWUZMSHreQuJwqnxY4eHBr7rPsBnPlvP0spM1owAgIdstnOdKe/QRB8zJB+3YBIFRfTU4z6r0JTXQICVxlYVhljwGHNhqCYMPLGbY8kveTFsyt+bpuoG3zeCmYANRJySLX16YgYVpQQyFixJFYdiqLy6F8lY4OEizFmgY1Hax6CsghivPLxW2Ju2Ll7g1nFc+4KXl75G9XqgLuMg1D/5KKXhsajNoyiQKuEJIunkReIhqX3Fc3n0GN0DTPOFppsebWs/iOPPyCti6MLzApSMAojN7ngMVKahcO/QRqNXA+RyJpJQIiV/o7vZY8n2v8lEHirlPitr9jDo4b+YjUSNwF32/qnT//AIq1zIAK7tzoJirMKzlGdorsQIGaRwvQ80v70treD4RRMHP/drrALhfhS+ZeVKOkzMEInU2YBbsgJYTzVuHc9cRhUjOK4EcuM2WcfYWx53bywFI2XqNrnaAzkHfOUy758BdkVc5IpAAEQqZnBApfKDmkLTmOEgMwygP5oHvR3PhrBWV0S716kPDC1ER9wskLjDoAphINJnD0CyXJRDMdt4/c4j2dJdqXlWElN/ZfQLEpU0rHiIpxayNDbNdm8XxepcHgQ/TJZCU8z7cpUVe1YByiboOxJAVCFTVhVpCUS8IJASIa9kDr8XW/e8c2IlkBjRqvAKJnqwyQksgIPE7xQCz1InLmC2DL85MuI7nQLh6EYND4llR3S2BepLsaYmrAtOmKYOL6cKsAeDMwxM5B14NJlFqaZwIQfAQwWCTRKenvBJpcIV2xjQz97SFalkXgMooogScBEKlMD+QCDkDUD0LmsLPbHvlQFtqFHj6zTmwMYh2Tgo4LogWmDQBhfuiosCwIlYNdF3M2MFDRx65uzBYlH6UEsin/J2ibJ1ka7tlyoRtXkK7qIAMeCsC/7/KTd2+BOz2Ir8oaqBa8Eony5cldAzgnBA3kheWFuDkTrkAELUcEsQZty/twa0DSlSPEqHZkhB2GlN1nTBcLuMX3HCWCdlsGPSM7VRDh5DbyyvJCCTqR6IKRHubwVLzC1abzWazjOOYqwzXGNCMHIfAm/bFOaVMDvKzakAeRyLMTJhwiNtswBHQBCveem1bfEMhxHXGH4zm6TCSn0Gi9apxC8SwxGEAMkYY/JvpVinPZbfiBwtOV4h8eWGWSaNOPYXZ7jKnDsgTA4DrI4/Yzs1HC1NzIERgEF5FxC+sDTgLioMPK3c7tnFs3aoFOredTzbEyU6WvfzkdhRpWkIYq5ZFm61ZueZxgez27pMdsTuVZFn2d/LxAltFoSOTVR+O1V95tnPX+WyLbV/v5GcZjrIWaZVMNBeu0OVb3hHoOnf3n67uTeVaen7Oo12uvfEDbBDuaXq9Q1W8m/v2V09mPSDKuyiST07Sehs/4OEVLImHQ66dWpf1iq0SdqFh7pXvPE71BERGB+gh8OvFe501jwHve098zQEeJJwkIGV6tOw3AqG8m5v7bz+TKlwk3UWHgw8mX8o8AQLu9ubu/icP4uIIRVKoTjAzTzLnQNtBnnj1s2ijyOc0pbDY4gsHmIZ8EEBHOrf/Cb3feJshThGJgbML5wdUlrH0Wep32r/5dmQw6tfQMuAMJiPxj94KNcWpMJHK6PdHne7Vn0az0ei2FR7dbuMvvLP6F//iXfwPtguWXW4C6e8AAAAASUVORK5CYII=" alt="">
                                        <text>{{ item.vo.winAmount }}</text>
                                    </view>
                                </view>
                            </swiper-item>
                        </swiper>
                    </view>
                </view>
            </view>
            <view class="game_list_box">
                <view class="title_list">
                    <view v-for="(item,index) in titleList" 
                        :key="index" class="title_item" 
                        :class="chosedIndex == index ? 'actived' : '' "
                        @click="choseType(item,index)"
                    >
                        <img :src="item.icon" alt="">
                        <text class="name">{{item.title}}</text>
                    </view>
                </view>
                <view class="container_box_menu">
                    <component :is="componentName"></component>
                </view>
            </view>
        </view>
        <Tabbar :current='2'></Tabbar>
    </view>
</template>

<script>
import Tabbar from '@/components/tabber/index'
import Header from "@/components/header/index"
import ScroolNumber from "./components/scrollNumber.vue"
import Lobby from "./components/Lobby.vue"
import {mapState} from 'vuex'
import {advertise} from '@/api/index'
import img1 from "@/static/home/scrrol1.webp"
import img2 from "@/static/home/scrrol2.webp"
import {mockData} from "@/utils/mockdata.js"
import LobbyIcon from "@/static/home/lobby.svg"
import Rocket from "@/static/home/rocket.svg"
export default {
    components: {Tabbar,Header,ScroolNumber,Lobby},
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
            mockData:mockData,
            titleList:[
                {title:'Lobby',id:'',icon:LobbyIcon},
                {title:'Crash Games',id:'',icon:Rocket},
                {title:'New Games',id:'',icon:LobbyIcon},
                {title:'Live',id:'',icon:Rocket},
                {title:'Gamge Shows',id:'',icon:LobbyIcon},
                {title:'Sport',id:'',icon:Rocket},
            ],
            chosedIndex:0,
            componentName:'Lobby'
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
        },
        choseType(item,index){
            this.chosedIndex = index
            this.componentName = item.title
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
    z-index: 99;
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
.game_list_box {
    padding:  10px;
    .title_list {
        // padding-left: 10px;
        display: flex;
        gap: 15px;
        flex-shrink: 0;
        overflow: auto;
        margin-bottom: 16px;
        .title_item {
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 12px;
            border-radius: 20px;
            box-shadow: 0 3px 7px 0 rgba(6,10,14,.15);
            background-color: #1a242d;
            gap: 6px;
            flex-shrink: 0;
            img {
                width: 15px;
                height: 15px;
            }
            .name {
                font-size: 16px;
                color: #fff;
            }
        }
        .actived {
            background: #f12c4c;
        }
    }
}
</style>