<template>
    <view class="bg">
        <uni-nav-bar :title="$t('change-password.title')" fixed :leftType="2"></uni-nav-bar>

        <view class="wallet-user a-text-center">
        </view>
        <view class="wallet-box">
            <view class="list">
                <u--input :placeholder="$t('change-password.input1')" v-model="form.oldPassword" type="password" border="bottom" clearable>
                    <u-icon slot="prefix" name="lock" color="rgb(242, 65, 59)" size="18" class="left-icon"></u-icon>
                </u--input>
                <u--input :placeholder="$t('change-password.input2')" v-model="form.newPassword" type="password" border="bottom" clearable>
                    <u-icon slot="prefix" name="lock" color="rgb(242, 65, 59)" size="18" class="left-icon"></u-icon>
                </u--input>
                <u--input :placeholder="$t('change-password.input3')" v-model="value" type="password" border="bottom" clearable>
                    <u-icon slot="prefix" name="lock" color="rgb(242, 65, 59)" size="18" class="left-icon"></u-icon>
                </u--input>

                <u-button type="primary" :text="$t('change-password.btn')" color="#fa3534" class="btn" @click="updateLoginPassword"></u-button>
            </view>
        </view>
    </view>
</template>

<script>
import {changePassword} from '@/api/index.js'

export default {
    data() {
        return {
            form: {
                oldPassword: '',
                newPassword: ''
            },
            value: ''
        }
    },
    methods: {
        updateLoginPassword() {
            if (this.verification()) {
                changePassword(this.form).then(res => {
                    if (res.code === 1) {
                        uni.showToast({icon: 'success', title: res.msg, duration: 2000});
                        return
                    }
                    uni.showToast({icon: 'error', title: res.msg, duration: 2000});
                })
            }
        },
        verification() {
            let isOk = false
            if (this.form.oldPassword && this.form.newPassword && this.value) {
                if (this.form.newPassword === this.value) {
                    isOk = true
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: 'Two new passwords are inconsistent.',    // 两次新密码不一致!
                        duration: 2000
                    });
                }
            } else {
                uni.showToast({
                    icon: 'none',
                    title: 'password can not be blank.', // 密码不能为空! this.$t('share.link.top.btn.tip'),
                    duration: 2000
                });
            }
            return isOk
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