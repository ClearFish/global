<template>
    <view class="bg">
        <uni-nav-bar :title="$t('change-setpay-password.title')" fixed :leftType="2"></uni-nav-bar>

        <view class="wallet-user a-text-center"></view>
        <view class="wallet-box">
            <view class="list">
                <u--input :placeholder="$t('change-setpay-password.input2')" v-model="form.password" type="password" border="bottom" clearable>
                    <u-icon slot="prefix" name="lock" color="rgb(242, 65, 59)" size="18" class="left-icon"></u-icon>
                </u--input>
                <u--input :placeholder="$t('change-setpay-password.input3')" v-model="value" type="password" border="bottom" clearable>
                    <u-icon slot="prefix" name="lock" color="rgb(242, 65, 59)" size="18" class="left-icon"></u-icon>
                </u--input>

                <u-button type="primary" :text="$t('change-password.btn')" color="#fa3534" class="btn" @click="updatePayPassword"></u-button>
            </view>
        </view>
    </view>
</template>

<script>
import {setWithdrawalPassword} from '@/api/index.js'

export default {
    data() {
        return {
            form: {
                password: ''
            },
            value: ''
        }
    },
    methods: {
        updatePayPassword() {
            if (this.verification()) {
                setWithdrawalPassword(this.form).then(res => {
                    if (res.code === 1) {
                        uni.showToast({icon: 'success', title: res.msg, duration: 2000});
                        uni.setStorageSync('isWithdrawPwd', true)
                        // 返回上一个页面
                        setTimeout(() => { uni.navigateBack(); }, 1000)
                        return
                    }
                    uni.showToast({icon: 'error', title: res.msg, duration: 2000});
                })
            }
        },
        verification() {
            if (!this.form.password) {
                uni.showToast({
                    icon: 'none',
                    title: this.$t('login.toast2'), // '密码不能为空!', //this.$t('share.link.top.btn.tip'),
                    duration: 2000
                });
                return false
            }
            return true
        }
    }
}
</script>

<style lang="scss" scoped>
.wallet-user {
    padding: 20px 31px 99px;
    background: url('/static/img/banlance_bg.dddd9837.min.png') no-repeat 50%;
    background-size: 100% 100%;
    width: 100%;
}

.wallet-box {
    padding: 0 20px;
    margin-top: -71px;

    .list {
        background: #fff;
        box-shadow: 0 0 .8rem 0 rgba(58, 58, 58, .07);
        margin-top: 15px;
        border-radius: 10px;
        padding: 11px !important;

        .left-icon {
            margin-right: 11px;
        }

        ::v-deep .u-input {
            padding: 12px !important;
        }

        ::v-deep .u-border-bottom {
            border-color: 1px solid #f4f6f8 !important;
        }
    }
}

.btn {
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    margin: 14px 0 11px 0;
}
</style>