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
        <view class="login_action">
             <view class="username_box">
                <u--input
                    placeholder="Username"
                    prefixIcon="account-fill"
                    color="#fff"
                    prefixIconStyle="font-size: 22px;color: #d1d1d1"
                ></u--input>
                <u--input
                    placeholder="Passwprd"
                    prefixIcon="lock"
                    color="#fff"
                    prefixIconStyle="font-size: 22px;color: #d1d1d1"
                ></u--input>
                <u--input
                    placeholder="Confirm Passwprd"
                    prefixIcon="lock"
                    color="#fff"
                    prefixIconStyle="font-size: 22px;color: #d1d1d1"
                ></u--input>
                <u--input
                    placeholder="Real Name"
                    prefixIcon="account-fill"
                    color="#fff"
                    prefixIconStyle="font-size: 22px;color: #d1d1d1"
                ></u--input>
            </view>
            <view class="bottom_acton">
                <view class="first">
                    <u-checkbox-group size="20" iconSize="18" activeColor="#0b1118" inactiveColor="#0b1118">
                        <u-checkbox v-model="checked" shape="square" label="I am 18 years old and agree to accept" activeColor="#0b1118" inactiveColor="#0b1118"></u-checkbox>
                    </u-checkbox-group>
                </view>
                <text class="terms_link">Terms of use</text>
            </view>
            <view class="login_btn">Register</view>
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
            typeIndex:0,
            checked:false
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
    .login_action {
        margin-top: 20px;
        padding: 0 40px;
        .username_box {
            display: flex;
            flex-direction: column;
            gap: 16px;
            ::v-deep {
                .u-input {
                    border-color: transparent !important;
                    background: #0b1118;
                }
                
            }
            
        }
        .bottom_acton {
            margin-top: 16px;
            .first {
                display: flex;
                justify-content: space-between;
                align-items: center;
                ::v-deep {
                    .u-checkbox-group {
                        .u-checkbox {
                            .u-checkbox__icon-wrap {
                                background: #0b1118 !important;
                            }
                        }
                    }
                    
                }
            
            }
            .terms_link {
                 color: #f12c4c;
                font-size: 14px;
                padding-left: 20px;
                text-decoration: underline;
            }
        }
        .login_btn {
            width: 100%;
            height: 43px;
            margin-top: 16px;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 700;
            color: #fff;
            border: none;
            border-radius: 4px;
            background-color: #f12c4c;
        }
    }
}
</style>