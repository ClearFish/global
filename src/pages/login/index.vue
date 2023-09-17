<template>
    <movable-area class="movableArea" >
        <view class="header flex-sb">
            <u-icon name="arrow-left" size="28" color="rgb(0, 0, 0)" bold @click="back"></u-icon>
            <view style="color:#f2413b">{{isForget ? 'Forgot Password': ''}}</view>
            <image src="/static/img/earth-r.png" class="earth" @click="langShow=true"></image>
        </view>
        <view class="login flex-cc">
            <image src="/static/logo.min.png" class="logo"></image>
            <image src="/static/97lottery.min.png" class="logo97"></image>
        </view>
        <!-- 登录注册 -->
        <view class="form-box flex-cc" v-if="!isForget">
            <view class="tabBox">
                <u-tabs :list="list1" :current="current" :scrollable="false" lineColor="rgb(242, 65, 59)" @click="tabClick" :activeStyle="activeStyle"></u-tabs>
            </view>
            <view class="inputBox">
                <!-- <u--input :placeholder="$t('login.label1')" border="none" v-model="form.username" clearable>
                    <u-icon name="account-fill" slot="prefix" color="#f2413b" size="27" class="icon"></u-icon>
                </u--input> -->
                <u--input :placeholder="$t('login.label2')" border="none" type="number" v-model="form.mobile" clearable>
                    <view slot="prefix" class="flex flex-item-col-center">
                        <u-icon name="account-fill" color="#f2413b" size="27" class="icon"></u-icon>
                        <text class="area-code">+{{ siteInfo.area_code }}</text>
                    </view>
                </u--input>
                <u--input v-show="this.$store.state.siteInfo.register_sms_code === '1'" :placeholder="$t('login.label3')" border="none" v-model="form.code" clearable v-if="current===1">
                    <u-icon name="info-circle-fill" slot="prefix" color="#f2413b" size="27" class="icon"></u-icon>
                    <template slot="suffix">
                        <u-button
                            @tap="getCode('register')"
                            type="text"
                            :disabled="isSend"
                            size="mini"
                        >{{isSend? `${time}s again` : $t('login.code')}}</u-button>
                    </template>
                </u--input>
                <u--input :placeholder="$t('login.label4')" border="none" type="password" v-model="form.password" clearable>
                    <u-icon name="lock-fill" slot="prefix" color="#f2413b" size="27" class="icon"></u-icon>
                </u--input>
                <u--input :placeholder="$t('login.label5')" border="none" type="password" v-model="value" clearable v-if="current===1">
                    <u-icon name="lock-fill" slot="prefix" color="#f2413b" size="27" class="icon"></u-icon>
                </u--input>
                <u--input :placeholder="$t('login.label6')" border="none" v-model="form.invite_code" clearable v-if="current===1">
                    <u-icon name="plus-people-fill" slot="prefix" color="#f2413b" size="27" class="icon"></u-icon>
                </u--input>

                <u-button :text="current===0? $t('login.btn1'): $t('login.btn2')" class="btn" @click="submit(current)"></u-button>
                <view v-if="current===0" class="forget_pwd">
                    <text @click="toForget">Forgot Password</text>
                </view>
            </view>
        </view>
        <!-- 忘记密码 -->
        <view v-else class="form-box flex-cc">
             <view class="inputBox">
                <u--input :placeholder="$t('login.label2')" border="none" type="number" v-model="form.mobile" clearable>
                    <view slot="prefix" class="flex flex-item-col-center">
                        <u-icon name="account-fill" color="#f2413b" size="27" class="icon"></u-icon>
                        <text class="area-code">+{{ siteInfo.area_code }}</text>
                    </view>
                </u--input>
                <u--input :placeholder="$t('login.label3')" border="none" v-model="form.captcha" clearable>
                    <u-icon name="info-circle-fill" slot="prefix" color="#f2413b" size="27" class="icon"></u-icon>
                    <template slot="suffix">
                        <u-button
                            @tap="getCode('resetpwd')"
                            type="text"
                            :disabled="isSend"
                            size="mini"
                        >{{isSend? `${time}s again` : $t('login.code')}}</u-button>
                    </template>
                </u--input>
                <u--input placeholder="Confirm Password" border="none" type="password" v-model="form.newpassword" clearable>
                    <u-icon name="lock-fill" slot="prefix" color="#f2413b" size="27" class="icon"></u-icon>
                </u--input>
                <u-button text="Submit" class="btn" @click="submitReset(current)"></u-button>
             </view>
        </view>
        <view class="footer flex-sb">
            <view>{{ $t('login.rule1') }}</view>
            <view>{{ $t('login.rule2') }}</view>
        </view>
        <movable-view class="movableView" direction="all" x="600rpx" y="1300rpx">
            <image  
                src="/static/img/icon_layananonline.be5efb94.min.png" 
                class="service" 
                @click="toservice"
                v-show="customer_service_list.length > 0"
                >
            </image>
        </movable-view>
        <u-picker :show="langShow" :columns="columns" keyName="label" @cancel="langShow=false" @confirm="langConfirm"></u-picker>
    </movable-area>
</template>

<script>
import {login, register, smsSend, smsCheck,resetpwd,getCustomerService} from '@/api/index'
import {mapState} from "vuex";

export default {
    data() {
        return {
            langShow: false,
            value: '',
            activeStyle: {
                'color': 'rgb(242, 65, 59)',
                'font-weight': 'bold',
                'font-size': '16px'
            },
            current: this.$route.query.sharecode ? 1 : 0,
            form: {
                // username: '',
                mobile: '',
                password: '',
                // email: "",
                invite_code: uni.getStorageSync('sharecode'),
                code:'',
                captcha:'',
                newpassword:''
            },
            time: 60,
            timmer: null,
            isSend: false, // 是否发送验证码
            isForget:false,
            customer_service_list:[]
        }
    },
    computed: {
        ...mapState({
            siteInfo: state => state.siteInfo,
            columns: state => state.langList
        }),
        isPhone() {
            return uni.$u.test.mobile(this.form.username)
        },
        list1() {
            return [{name: this.$t('login.btn1')}, {name: this.$t('login.btn2')}]
        }
    },
    onUnload(){
        clearInterval(this.timmer)
    },
    onShow() {
        getCustomerService().then(res => {
            if (res.code === 1) {
                this.customer_service_list = res.data.rows
            } else {
                this.customer_service_list = [];
            }
        })
    },
    methods: {
        toservice() {
            uni.navigateTo({
                url: '/pages/mine/customer-service'
            })
        },
        // 忘记密码
        toForget() {
            if(!this.isForget) {
                this.isForget = true;
                this.resetForm()
                clearInterval(this.timmer)
            }
        },
        // 发送已验证码
        getCode(type){
            if(this.form.mobile){
               const params = {
                    mobile: this.form.mobile,
                    event: type,
                    area_code: '91'
               }
               smsSend(params).then(res =>{
                if(res.code===1){
                    this.showToast(res.msg)
                    this.isSend = true
                    this.timmer = setInterval(()=>{
                        if(this.time===1){
                            clearInterval(this.timmer)
                            this.isSend = false
                            this.time=60    
                        }
                        this.time--
                    },1000)
                }
               }) 
            }else{
                this.showToast(this.$t('login.toast5'))
            }
        },

        // 检测验证码
        checkCode(){
            let isSuccess = false
            const params = {
                mobile: this.form.mobile,
                event: 'register',
                area_code: '91',
                captcha: this.form.code
            }
            smsCheck(params).then(res =>{
                if(res.code === 1){
                    isSuccess = true
                    return;
                }
                uni.showToast({
                    icon: 'error',
                    title: res.msg,
                    duration: 2000
                });
            })
            return isSuccess
        },

        back() {
            if(this.isForget) {
                this.isForget = false
            }else {
                const pages = getCurrentPages()
                if (pages.length > 1) {
                    uni.navigateBack()
                } else {
                    uni.switchTab({
                        url: '/pages/home/index'
                    })
                }
            }
        },
        tabClick(item) {
            this.current = item.index
            this.isForget = false
        },
        langConfirm(item) {
            console.log('item', item)
            this.$i18n.locale = item.value[0].value
            this.langShow = false
            uni.setStorageSync('lang', item.value[0].value);
        },
        submit(type) {
            // const isusernameMobile = uni.$u.test.mobile(this.form.username)
            const isMobile = uni.$u.test.mobile(this.form.mobile)
            // const isEmail = uni.$u.test.email(this.form.email)
            if (type === 0) {
                // 登录
                if (!this.form.mobile) {
                    this.showToast(this.$t('login.toast1'))
                    return;
                }
                if (!this.form.password) {
                    this.showToast(this.$t('login.toast2'))
                    return;
                }
                login(this.form).then(res => {
                    this.$store.commit('setUserInfo', res.data)
                    uni.switchTab({
                        url: '/pages/home/index'
                    })
                })

            } else {
                // 注册
                if (!this.form.invite_code) {
                    this.showToast(this.$t('login.toast6'))
                    return
                }
                if (!this.form.mobile) {
                    this.showToast(this.$t('login.toast5'))
                    return;
                }
                if(this.$store.state.siteInfo.register_sms_code === '1' && !this.form.code) {
                    this.showToast(this.$t('login.toast4'))
                    return;
                }
                if (!this.form.password === this.value) {
                    this.showToast(this.$t('login.toast3'))
                    return;
                }
                register(this.form).then(res => {
                    this.$store.commit('setUserInfo', res.data.userinfo)
                    uni.switchTab({
                        url: '/pages/home/index'
                    })
                })
            }
        },
        submitReset() {
            if (!this.form.mobile) {
                this.showToast(this.$t('login.toast1'))
                return;
            }
            if(!this.form.captcha) {
                this.showToast('Please enter the mobile captcha')
                return;
            }
            if(!this.form.newpassword) {
                this.showToast('Please enter the new password')
                return;
            }
            resetpwd(this.form).then(res => {
                if(res.code == 1) {
                    this.showToast('reset success')
                    this.isForget = false;
                    this.resetForm()
                    clearInterval(this.timmer)
                }else {
                    this.showToast(res.msg)
                }
            })
        },
        resetForm() {
            this.form = {
                mobile: '',
                password: '',
                // email: "",
                invite_code: uni.getStorageSync('sharecode'),
                code:'',
                captcha:'',
                newpassword:''
            }
        },
        showToast(text) {
            uni.showToast({
                icon: 'none',
                title: text,
                duration: 2000
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    height: 72px;
    padding: 0 9px;

    .earth {
        width: 28px;
        height: 28px;
    }
}

.login {
    .logo {
        width: 103px;
        height: 108px;
    }

    .logo97 {
        width: 223px;
        height: 28px;
        margin-top: 5px;
    }
}

.form-box {
    // width: 100vw;
    padding-top: 40px;

    .btn {
        margin-top: 22px !important;
        font-size: 16px !important;
        height: 44px;
        line-height: 44px;
        background-color: #f2413b !important;
        color: #fff !important;
    }
}

.tabBox {
    width: 50%;
}

.inputBox {
    padding: 20px;
    width: 100%;

    ::v-deep .u-input {
        background-color: #edeffe;
        padding: 12px 10px !important;
        border-radius: 20px;
        margin-bottom: 10px;
    }

    .icon {
        margin-right: 10px;
    }
}

.area-code {
    color: #de0404;
}
.forget_pwd {
    color: #de0404;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}
.footer {
    width: 100%;
    padding: 15px 15px 40px 15px;
    color: rgba(0, 0, 0, .59);
    background: #fff;
    font-size: 15px;
    justify-content: space-around;
}
.movableArea {

}
.movableArea {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    // pointer-events: none;//设置area元素不可点击，则事件便会下移至页面下层元素
    .movableView {
        pointer-events: auto;//可以点击
        width: 70px;
        height: 70px;
        .service {
            width: 70px;
            height: 70px;
        }
    }
}

</style>