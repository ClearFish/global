<template>
    <view>
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
        <div :class="showDownload ? 'addmore_padding' : 'container_box'">
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
        </div>
        <Tabbar :current="4"></Tabbar>
    </view>
</template>

<script>
import Tabbar from '@/components/tabber/index'
import Header from "@/components/header/index"
import {mapState} from 'vuex'
import {advertise, gameList, getWithdrawData, getCustomerService} from '@/api/index'
import {redirectTo} from "@/utils/common";
import miment from 'miment'

export default {
    components: {Tabbar,Header},
    onLoad() {
        this.getAdvertise() // 轮播
    },
    onShow() {
    },
    data() {
        return {
            showDownload:true,
            text1:'AVISO IMPORTANTE',
            list1:[]
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
    }

}
</script>

<style lang="scss" scoped>
.container_box {
    padding-top: 74px;
}
.addmore_padding {
    padding-top: 70px;
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
</style>