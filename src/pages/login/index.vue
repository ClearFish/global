<template>
    <view class="login_box">
        <view class="top">
             <view class="close_icon">
                <img src="/static/home/close.svg" alt="" class="close" @click="close" >
            </view>
        </view>
        <view class="top_logo">
            <img src="/static/home/logo.png" alt="">
        </view>
        <view class="title">Login</view>
        <view class="sign_box">Not account yet?<text>Sign Up</text></view>
        <view class="types_list">
            <view class="content" @click="choseType(item,index)" :class="typeIndex == index ? 'active_index':''" v-for="(item,index) in loginTypes" :key="index">
                <view>{{item.name}}</view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            loginTypes:[
                {name:'Username',type:1},
                {name:'SMS',type:2}
            ],
            typeIndex:0
        }
    },
    methods:{
        choseType(item,index){
            this.typeIndex = index
        }
    }
}
</script>
<style lang="scss" scoped>
.login_box {
    .top {
        display: flex;
        justify-content: flex-end;
        height: 38px;
        align-items: center;
        padding: 0 8px;
        .close_icon {
            width: 22px;
            height: 22px;
            background: #474c51;
            border-radius: 22px;
            padding: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img {
            width: 14px;
            height: 14px;
        }
    }
    .top_logo {
        display: flex;
        justify-content: center;
        img {
            width: 154px;
            height: 46px;
        }
    }
    .title {
        color: #fff;
        display: flex;
        justify-content: center;
        font-size: 24px;
        font-weight: 600;
        margin-top: 32px;
    }
    .sign_box {
        margin-top: 4px;
        color: #d1d1d1;
        text-align: center;
        text {
            color: #f12c4c;
            text-decoration: underline;
        }
    }
    .types_list {
        margin: 0 auto;
        margin-top: 18px;
        height: 42px;
        background: #0b1118;
        padding: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 186px;
        border-radius: 22px;
        .content {
            height: 100%;
            padding: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 22px;
            font-size: 14px;
            color: #fff;
            font-weight: 600;
            flex: 1;
        }
        .active_index {
            background: #1a242d;
            
        }
    }
}
</style>