<template>
    <view class="header_box" :style="moreHeight?'top:70px':'top:0px'">
        <view class="left">
            <view class="logo_img"></view>
        </view>
        <view class="right">
            <view class="number">
                <text>$0.00</text>
                <view class="fresh_box"></view>
            </view>
            <view class="amount_action">
                <view class="action_left"></view>
                <view class="action_right"></view>
            </view>
        </view>
    </view>
</template>
<script>

export default {
    props:{
        moreHeight: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
           
        }
    }
}
</script>
<style scoped lang="scss">
.header_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    padding: 10px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid #323b45;
    background-color: #0f1923;
    .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo_img {
            width: 113px;
            height: 34px;
            background: url("/static/home/logo.png") no-repeat center;
            background-size: cover;
            animation: hvr-pop 5s linear 0s infinite;
        }
        @keyframes hvr-pop {
            0%{
                transform: scale(1.2);
            }
            15%{
                transform: scale(1);
            }
            100% {
                transform: scale(1);
            }
        }
    }
    .right {
        padding: 5px;
        border-radius: 4px;
        height: 100%;
        background: #282f3c;
        display: flex;
        .number {
            color: #fff;
            font-weight: 700;
            display: flex;
            align-items: center;
            height: 100%;
            gap: 5px;
            .fresh_box {
                width: 18px;
                height: 20px;
                background: url("/static/home/refresh.svg") no-repeat center;
                background-size: cover;
            }
        }
        .amount_action {
            display: flex;
            align-items: center;
            margin-left: 14px;
            gap: 10px;
            .action_left {
                width: 32px;
                height: 32px;
                background: url("/static/home/widthdraw.svg") no-repeat center;
                background-size: cover;
            }
            .action_right {
                width: 32px;
                height: 32px;
                 background: url("/static/home/deposit.svg") no-repeat center;
                background-size: cover;
            }
        }
    }
}
</style>