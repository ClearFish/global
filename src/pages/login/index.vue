<template>
    <view class="login_box">
        <view class="top">
             <view class="close_icon">
                <img src="/static/home/close.svg" alt="" class="close" @click="backPage" >
            </view>
        </view>
        <view class="top_logo">
            <img src="/static/home/logo.png" alt="">
        </view>
        <view class="title">Login</view>
        <view class="sign_box">Not account yet?<text>Sign Up</text></view>
        <view class="types_list">
            <view class="types_list_container">
                <view class="content" @click="choseType(item,index)" :class="typeIndex == index ? 'active_index':''" v-for="(item,index) in loginTypes" :key="index">
                    <view>{{item.name}}</view>
                </view>
            </view>
        </view>
        <view class="login_action">
            <view class="username_box" v-if="loginType == 1">
                <u--input
                    :placeholder="$t('login.label2')"
                    prefixIcon="account-fill"
                    color="#fff"
                    prefixIconStyle="font-size: 22px;color: #d1d1d1"
                    type="number"
                ></u--input>
                <u--input
                    :placeholder="$t('login.label4')"
                    prefixIcon="lock"
                    color="#fff"
                    prefixIconStyle="font-size: 22px;color: #d1d1d1"
                    type="password"
                ></u--input>
            </view>
            <view class="username_box" v-else>
                <view class="phone_box">
                    <view class="chosed_country" @click="showMenu">
                        <img :src="country.icon" alt="">
                        <text class="country_phone">{{country.phone}}</text>
                        <u-icon name="arrow-down-fill" color="#fff" size="8" :class="menuShow ? 'selsec_icon':'no_selec'"></u-icon>
                    </view>
                    <u--input
                        placeholder="Phone number"
                        prefixIcon="phone"
                        color="#fff"
                        prefixIconStyle="font-size: 22px;color: #d1d1d1"
                    ></u--input>
                </view>
                <view class="msg_box">
                    <u--input
                        placeholder="SMS"
                        prefixIcon="email"
                        color="#fff"
                        prefixIconStyle="font-size: 22px;color: #d1d1d1"
                    ></u--input>
                    <text class="code_action">Get code</text>
                </view>
            </view>
            <view class="bottom_acton">
                <view class="first">
                    <u-checkbox-group size="20" iconSize="18" activeColor="#0b1118" inactiveColor="#0b1118">
                        <u-checkbox v-model="checked" shape="square" label="Lembrar" activeColor="#0b1118" inactiveColor="#0b1118"></u-checkbox>
                    </u-checkbox-group>
                    <text class="forget_psd">Forgot password</text>
                </view>
            </view>
            <view class="login_btn">Login</view>
        </view>
        <u-popup :show="menuShow" @close="menuShow = false" class="country_popup">
            <view class="list_container">
                <view class="country_top">
                    <text>Country Code</text>
                    <u-icon name="close" color="#888" size="18" @click="menuShow = false"></u-icon>
                </view>
                <view class="item_container">
                    <view v-for="(item,index) in countryList" :key="index" class="country_item" @click="choseCountry(item)">
                        <img :src="item.icon" alt="">
                        <text>{{item.phone}}</text>
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
            loginTypes:[
                {name:'Username',type:1},
                {name:'SMS',type:2}
            ],
            typeIndex:0,
            checked:false,
            loginType:1,
            countryList:[
                {name:'中国',icon:'/static/home/CN.svg',phone:'+86'},
                {name:'美国',icon:'/static/home/CN.svg',phone:'+863'},
                {name:'英国',icon:'/static/home/CN.svg',phone:'+864'},
                {name:'中国',icon:'/static/home/CN.svg',phone:'+86'},
                {name:'中国',icon:'/static/home/CN.svg',phone:'+86'},
                {name:'中国',icon:'/static/home/CN.svg',phone:'+86'},
                {name:'中国',icon:'/static/home/CN.svg',phone:'+86'},
                {name:'中国',icon:'/static/home/CN.svg',phone:'+86'},
                {name:'中国',icon:'/static/home/CN.svg',phone:'+86'},
                {name:'中国',icon:'/static/home/CN.svg',phone:'+86'}
            ],
            country:{name:'中国',icon:'/static/home/CN.svg',phone:'+86'},
            menuShow:false,
            form: {
                mobile: '',
                password: '',
                invite_code: uni.getStorageSync('sharecode'),
                code:'',
                captcha:'',
                newpassword:''
            },
            timer:null
        }
    },
    methods:{
        choseType(item,index){
            this.typeIndex = index;
            this.loginType = item.type
        },
        showMenu() {
            this.menuShow = !this.menuShow
        },
        choseCountry(item) {
            this.country = item;
            this.menuShow = false
        },
        backPage() {
            uni.navigateBack()
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
        display: flex;
        height: 42px;
        justify-content: center;
        margin-top: 20px;
        .types_list_container {
            display: flex;
            padding: 2px;
            border-radius: 21px;
            height: 100%;
            background: #0b1118;
            
            .content {
                height: 100%;
                padding: 16px 22px;
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
                .forget_psd {
                    color: #f12c4c;
                    font-size: 14px;
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
        .phone_box {
            display: flex;
            background: #0b1118;
            .chosed_country {
                display: flex;
                align-items: center;
                padding-left:8px;
                gap: 6px;
                img {
                    width: 18px;
                    height: 18px;
                }
                .country_phone {
                    font-size: 14px;
                    color: #fff;
                }
                .no_selec {
                    transition: transform 0.2s ease-in-out;
                    transform:rotateZ(0deg)
                }
                .selsec_icon {
                    transition: transform 0.2s ease-in-out;
                    transform: rotateZ(-180deg);
                }
            }
        }
        .msg_box {
            display: flex;
            justify-content: space-between;
            background: #0b1118;
            align-items: center;
            .code_action {
                padding-right: 10px;
                color: #f12c4c;
            }
        }
    }
    .country_popup {
        .country_top {
            color: #888;
            display: flex;
            padding: 0 10px;
            height: 45px;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
        }
        .list_container {
            height: 280px;
            background: #fff;
           
            .item_container {
                 height: 235px;
                overflow: auto;
            }
            .country_item {
                display: flex;
                color: #000;
                height: 45px;
                align-items: center;
                font-size: 16px;
                gap: 8px;
                font-weight: 600;
                border-bottom: 1px solid #ddd;
                padding: 0 10px;
                img {
                    width: 18px;
                    height: 18px;
                }
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.username_box {
    ::v-deep {
        .u-input {
             .u-input__content {
                .u-input__content__field-wrapper {
                    .u-input__content__field-wrapper__field {
                        .uni-input-wrapper {
                                  .uni-input-input:-webkit-autofill { 
                                        -webkit-box-shadow:0 0 0px 1000px transparent inset !important;
                                        -webkit-text-fill-color: #333; 
                                    } 
                                    .uni-input-input:-internal-autofill-previewed,
                                    .uni-input-input:-internal-autofill-selected {
                                        -webkit-text-fill-color: #333 !important;
                                        transition: background-color 5000s ease-in-out 0s !important;
                                    }
                        }
                    }
                }
             }
        }
    }
}
</style>