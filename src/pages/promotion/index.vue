<template>
    <view class="promotion_box">
        <Header :moreHeight="false"/>
        <view class="container">
            <view class="top_title">
                <img src="/static/tabbar/gift.svg">
                <text>Promotion</text>
            </view>
            <view class="list_container">
                <view class="list_item" v-for="(item,index) in lists" :key="index">
                    <img :src="item.imgUrl" alt="">
                    <view class="content_box">
                        <text class="tiitle">{{item.name}}</text>
                        <view class="action">
                            <view class="more_box">More</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <Tabbar :current='1'></Tabbar>
    </view>
</template>
<script>
import Header from "@/components/header/index"
import Tabbar from '@/components/tabber/index'
export default {
    components:{Header,Tabbar},
    data() {
        return {
            lists:[
                {name:'O DOWNLOAD DO APLICATIVO DÁ R$ 5',imgUrl:'/static/promotion/promotion1.jpg'},
                {name:'O DOWNLOAD DO APLICATIVO DÁ R$ 5',imgUrl:'/static/promotion/promotion1.jpg'},
                {name:'O DOWNLOAD DO APLICATIVO DÁ R$ 5',imgUrl:'/static/promotion/promotion1.jpg'},
                {name:'O DOWNLOAD DO APLICATIVO DÁ R$ 5',imgUrl:'/static/promotion/promotion1.jpg'},
                {name:'O DOWNLOAD DO APLICATIVO DÁ R$ 5',imgUrl:'/static/promotion/promotion1.jpg'},
                {name:'O DOWNLOAD DO APLICATIVO DÁ R$ 5',imgUrl:'/static/promotion/promotion1.jpg'}
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.promotion_box {
    padding-top: 64px;
    .container {
        padding: 10px;
        .top_title {
            display: flex;
            gap:16px;
            font-size: 20px;
            font-weight: 700;
            img {
                width: 24px;
                height: 24px;
            }
        }
        .list_container {
            margin-top: 10px;
            .list_item {
                margin-bottom: 10px;
                img {
                    width: 100%;
                    height: auto;
                    border-radius: 4px;
                }
                .content_box {
                    padding-left: 10px;
                    .tiitle {
                        font-size: 16px;
                        color: #fff;
                    }
                    .action {
                        display: flex;
                    }
                    .more_box {
                        padding: 5px 15px;
                        font-size: 12px;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #f12c4c;
                        border-radius: 4px;
                        flex-shrink: 0;
                        margin-top: 6px;
                        font-weight: 800;
                    }
                }
            }
        }
    }
}
</style>