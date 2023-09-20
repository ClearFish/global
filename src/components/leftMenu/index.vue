<template>
    <view class="left_menu_box">
        <u-popup :show="show" 
                mode="left"  
                @close="close" 
                @open="open"
                :overlay="false"
        >
            <view class="top_content">
                <img src="/static/home/logo.png" alt="" class="logo">
                <view class="close_icon">
                    <img src="/static/home/close.svg" alt="" class="close" @click="close" >
                </view>
            </view>
            <view class="top_info">
                <view class="btn_box">Centro de recompensa</view>
                <view class="user_info">
                    <view class="avatar">
                        <img src="/static/home/avatar.svg" alt="">
                    </view>
                    <view class="info_box">
                        <text class="login_title">Plase Login</text>
                        <view class="content_box">
                            <img src="/static/home/wallet.svg" alt="">
                            <text>R$</text>
                        </view>
                    </view>
                </view>
                <view class="action_box">
                    <view class="refister_btn">Register</view>
                    <view class="refister_btn login_btn">Login</view>
                </view>
                <view class="list_box">
                    <view class="list_item" v-for="(item,index) in menuList" :key="index">
                        <img :src="item.icon" alt="">
                        <text>{{item.name}}</text>
                    </view>
                </view>
                <view class="language_box">
                    <view :class="languageIndex == index ? 'language active_lanuage':'language'" v-for="(item,index) in languageList" :key="index" @click="choseLanguage(item,index)">
                        <img :src="item.icon" alt="">
                        <view class="name">{{item.title}}</view>
                        <view class="chosed" v-if="languageIndex == index">
                            <img src="/static/home/correct.svg" alt="">
                        </view>
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>
<script>
export default {
    data() {
        return {
            show:false,
            menuList:[
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Hot Game',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Crash Game',url:'/'},
                {icon:'/static/home/rocket.svg',name:'New Games',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Game Providers',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Magaways',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Feature Buy',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'},
                {icon:'/static/home/rocket.svg',name:'Home',url:'/'}
            ],
            currentIndex:0,
            languageList:[
                {icon:'/static/home/BR.svg',title:'Português'},
                {icon:'/static/home/US.svg',title:'English'},
            ],
            languageIndex:0
        }
    },
    methods:{
        open() {
            this.show = true
        },
        close() {
            this.show = false
        },
        choseLanguage(item,index) {
            this.languageIndex = index
        }
    }
}
</script>
<style lang="scss" scoped>
.left_menu_box {
    width: 100%;
    position: fixed;
    z-index: 900;
    left: 0;
    bottom: 75px;
    ::v-deep {
        .u-popup {
            width: 100%;
            .u-slide-left-enter-to {
                width: 100%;
                bottom: 75px !important;
            }
            .u-popup__content {
                background: #0f1923;
                overflow: auto;
                .top_content {
                    display: flex;
                    padding: 20px;
                    justify-content: space-between;
                    align-items: center;
                    .logo {
                        width: 96px;
                        height: 29px;
                    }
                    .close_icon {
                         width: 34px;
                         height: 34px;
                         background: #474c51;
                         border-radius: 17px;
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         padding: 6px;
                        .close {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }
    .top_info {
        padding:0 20px;
        margin-top: 8px;
        .btn_box {
            width: 100%;
            height: 46px;
            background: #f12c4c;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 800;
            color: #fff;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        .user_info {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            align-items: center;
            .avatar {
                width: 55px;
                height: 55px;
                border-radius: 55px;
                background: #fff;
                padding: 8px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .login_title {
                font-size: 20px;
                font-weight: 700;
            }
            .content_box {
                display: flex;
                color: #f3d47c;
                align-items: center;
                gap: 8px;
                img {
                    width: 18px;
                    height: 18px;
                }
                text {
                    font-weight: 700;
                }
            }
        }
    }
    .action_box {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 0 auto;
        margin-top: 20px;
        gap: 20px;
        .refister_btn {
            flex: 1;
            height: 39px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #fff;
            background: #474c51;
            border-radius: 4px;
            font-weight: 600;
        }
        .login_btn {
            background: #2c63f1;
        }
    }
    .list_box {
        padding: 20px;
        .list_item {
            display: flex;
            align-items: center;
            gap: 18px;
            font-size: 18px;
            color: #fff;
            height: 25px;
            margin-bottom: 10px;
            img {
                width: 22px;
                height: 22px;
            }
        }
    }
    .language_box {
        display: flex;
        justify-content: center;
        gap: 20px;
        padding-bottom: 20px;
        .language {
            display: flex;
            padding: 10px;
            border-radius: 40px;
            background: #1f272f;
            color: #fff;
            height: 44px;
            align-items: center;
            gap: 10px;
            img {
                width: 27px;
                height: 27px;
            }
            .chosed {
                img {
                    width: 20px;
                    height: 20px;
                }
            }
        }
        .active_lanuage {
            background: #f12c4c;
        }
    }
}
</style>