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
        <view class="title">Register</view>
        <view class="sign_box">Already have an account?<text>Login</text></view>
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
}
</style>