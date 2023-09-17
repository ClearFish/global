<template>
  <view class="bg">
    <uni-nav-bar :title="$t('mine.title')" fixed :rightType="2">
    </uni-nav-bar>

    <view class="info">
      <view class="userinfoBox flex-sb" @click="toProfile">
        <view class="userInfo flex flex-item-col-center">
          <image :src="userInfo.avatar" class="avatar"></image>
          <view class="user-des flex flex-col">
            <view class="nickname" style="display:flex;align-item:center" @tap.stop.prevent>
              <text v-if="hidePhone">{{ $t('mine.user.txt') }} {{ userInfo.mobile &&  addHide(userInfo.mobile) }}</text>
              <text v-else>{{ $t('mine.user.txt') }} {{ userInfo.mobile }}</text>
              <u-icon name="eye-off" color="#fff" size="18" style="margin-left:10px" v-if="hidePhone"  @click="clickEye(false)"></u-icon>
              <u-icon name="eye" color="#fff" size="18" style="margin-left:10px" v-else @click="clickEye(true)"></u-icon>
            </view>
            <view class="usercode">{{ $t('mine.nickname') }} {{ invite_code }}</view>
          </view>
        </view>

        <view class="level flex flex-item-col-center" @click.stop="toVip">VIP{{ userInfo.level }}
          <u-icon name="arrow-right" color="#fff"></u-icon>
        </view>
      </view>
    </view>

    <view class="total-box flex flex-col">
      <view class="flex flex-item-col-center">
        <image src="/static/my-center/icon_wallet.86908b64.min.png" class="qb"></image>
        <view class="a-pl-2">
          <view class="des flex flex-item-col-center">{{ $t('mine.user.balance') }}
            <u-icon name="reload" :size="15" color="rgb(146, 146, 146)" @click="getUserInfo"></u-icon>
          </view>
          <view class="money" v-for="(item,key) in userInfo.Balances" :key="key">{{ item.symbo }}: {{ item.balance }}
          </view>
          <!-- <view class="money">USDT: {{USDTbalance}}</view> -->
        </view>
      </view>
      <!-- <view class="jf">{{ $t('mine.user.integral') }}: {{ userInfo.score }}</view> -->
      <view class="flex-sb btns">
        <view class="btn flex-rcc" @click="toCash">{{ $t('mine.card.btn1') }}</view>
        <view class="btn btn1 flex-rcc" @click="toRecharge">{{ $t('mine.card.btn2') }}</view>
      </view>
      <view class="flex-sb btns">
      </view>
    </view>

    <view class="nav-muen flex">
      <view class="item flex-item-1 flex-cc" @click="toPath(1)">
        <image src="/static/my-center/8-gg-min.png"></image>
        <text>{{ $t('mine.menu.li1') }}</text>
      </view>
      <view class="item flex-item-1 flex-cc" @click="toPath(2)">
        <image src="/static/my-center/8-hd-min.png"></image>
        <text>{{ $t('mine.menu.li2') }}</text>
      </view>
      <!-- <view class="item flex-item-1 flex-cc" @click="toPath(3)">
        <image src="/static/my-center/8-sc-min.png"></image>
        <text>{{ $t('mine.menu.li3') }}</text>
      </view> -->
      <!-- <view class="item flex-item-1 flex-cc" @click="toPath(4)">
        <image src="/static/my-center/8-help-min.png"></image>
        <text>{{ $t('mine.menu.li4') }}</text>
      </view> -->
      <view class="item flex-item-1 flex-cc" @click="toPath(6)" style="position:relative;">
        <image src="/static/my-center/8-message-min.png"></image>
        <text>{{ $t('mine.menu.li6') }}</text>
        <view class="tags" v-if="unread_total>0">{{ unread_total }}</view>
      </view>
      <view class="item flex-item-1 flex-cc" @click="toPath(7)">
        <image src="/static/my-center/8-app-min.png"></image>
        <text>{{ $t('mine.menu.li7') }}</text>
      </view>
    </view>
    <view class="nav-muen flex flex-right">
      
      
      
      <view class="item flex-item-1 flex-cc flex-right" @click="toPath(8)">
        <image src="/static/my-center/8-lang-min.png"></image>
        <text>{{ $t('mine.menu.li8') }}</text>
      </view>
      <view class="item flex-item-1 flex-cc"> </view>
      <view class="item flex-item-1 flex-cc"> </view>
      <view class="item flex-item-1 flex-cc"> </view>
    </view>

    <view class="list">
      <u-cell-group class="groupBox" :border="false">
        <!-- <u-cell icon="man-add" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                title="Finance order" url="/pages/finance/work-order"></u-cell> -->
        <u-cell :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                title="Transfer" url="/pages/finance/transfer/index">
                <template slot="icon">
                  <img style="width:18px;height:18px" src="../../static/img/transfer.svg" alt="">
                </template>
        </u-cell>
        <u-cell :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                title="Convert" url="/pages/finance/covert/index">
                <template slot="icon">
                  <img style="width:18px;height:18px" src="../../static/img/covert.svg" alt="">
                </template>
        </u-cell>
        <u-cell icon="gift" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                title="Gift Code" url="/pages/mine/gift-code"></u-cell>
        <!-- <u-cell :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                title="trend" url="/pages/lottery/trend">
                <template slot="icon">
                  <img style="width:18px;height:18px" src="../../static/img/covert.svg" alt="">
                </template>
        </u-cell> -->
        <u-cell :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                title="Team Report" url="/pages/mine/total-report">
                <template slot="icon">
                  <img style="width:18px;height:18px" src="../../static/img/report_icon.svg" alt="">
                </template>
        </u-cell>
        <u-cell :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                title="Account Security" url="/pages/mine/my-profile">
                <template slot="icon">
                  <img style="width:18px;height:18px" src="data:image/png;base64,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" alt="">
                </template>
        </u-cell>
        <u-cell icon="coupon" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                :title="$t('mine.cell1')" url="/pages/mine/trading-record"></u-cell>
        <u-cell :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
            title="Finance" url="/pages/finance/index">
            <template slot="icon">
              <img style="width:18px;height:18px" src="../../static/img/finance.svg" alt="">
            </template>
        </u-cell>
        <u-cell icon="integral" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                :title="$t('mine.cell2')" url="/pages/mine/integral-record"></u-cell>
        <!-- <u-cell icon="gift" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                title="Gift Code" url="/pages/mine/gift-code"></u-cell> -->
        <u-cell icon="checkmark-circle" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                :title="$t('mine.cell3')" url="/pages/lottery/game-record"></u-cell>
        <u-cell icon="level" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                :title="$t('mine.cell4')" url="/pages/lottery/win-record"></u-cell>
        <!-- <u-cell icon="order" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                :title="$t('mine.cell5')" url="/pages/mine/bet-sum"></u-cell>
        <u-cell icon="bookmark" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                :title="$t('mine.cell6')" url="/pages/mine/exchange"></u-cell> -->
        <u-cell icon="man-add" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                :title="$t('mine.cell7')" url="/pages/mine/team"></u-cell>
        <u-cell icon="kefu-ermai" :border="false" size="17" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
                :title="$t('mine.cell8')" url="/pages/mine/customer-service"></u-cell>
      </u-cell-group>
    </view>
    <u-picker :show="langShow" :columns="columns" keyName="label" @cancel="langShow=false" @confirm="langConfirm"
              :cancelText="$t('btn.cancel')" :confirmText="$t('btn.confirm')"></u-picker>
    <u-button :text="$t('mine.logout.btn')" shape="circle" @click="cut" class="exit"></u-button>
    <Tabbar :current="4"></Tabbar>
  </view>
</template>

<script>
import Tabbar from '@/components/tabber/index'
import {getIntegral, logout, unreadMsg, invite_balance} from '@/api/index.js'
import {removeToken} from '@/utils/auth'
import {mapState} from 'vuex'
import {redirectTo} from "@/utils/common";

export default {
  components: {Tabbar},
  data() {
    return {
      langShow: false,
      iconStyle: 'color:rgb(242, 65, 59)',
      titleStyle: 'font-size: 14px',
      title: 'Hello',
      unread_total: 0,
      invite_code: '',
      hidePhone:true
    }
  },
  onLoad() {
    this.getUserInfo()
    this.getUnread()
  },
  onShow() {
    invite_balance().then(res=>{
			this.invite_code = res.data.invite_code
      this.$store.commit('setVipinfo',{code:res.data.invite_code,url:res.data.link})
		})
  },
  computed: {
    ...mapState({
      columns: state => state.langList,
      userInfo: state => state.userInfo
    }),
  },
  methods: {
    clickEye(type) {
      this.hidePhone = type;
    },
    toVip() {
      uni.navigateTo({
          url: '/pages/mine/membership'
        })
    },
    addHide(mobile) {
      return mobile.substr(0,3)+'****'+mobile.substr(mobile.length-3,3)
    },
    // 获取会员消息未读条数
    getUnread() {
      unreadMsg().then(res => {
        this.unread_total = Number(res.data.unread_total)
      })
    },
    getUserInfo() {
      this.$store.dispatch('GetInfo')
    },
    // 获取积分数量
    getIntegral() {
      getIntegral().then(res > {})
    },
    toProfile() {
      uni.navigateTo({
        url: '/pages/mine/my-profile'
      })
    },
    cut() {
      logout().then(res => {
        this.$store.commit('setUserInfo', {})
        removeToken()
        uni.navigateTo({
          url: '/pages/login/index'
        });
      })
    },
    toPath(type) {
      let path = ""
      switch (type) {
        case 1:
          path = '/pages/home/tips?type=1'
          break;
        case 2:
          path = '/pages/home/tips?type=2'
          break;
        case 3:
          path = '/pages/mine/shop'
          break;
        case 4:
          path = '/pages/mine/beginner-guide'
          break;
        case 5:
          path = '/pages/home/sign-in'
          break;
        case 6:
          path = '/pages/mine/message'
          break;
        case 7:
          let site = JSON.parse(uni.getStorageSync('site'));
          redirectTo(site.app_download, '_blank');
          return;
        case 8:
          this.langShow = true
          break;

      }

      if (path) {
        uni.navigateTo({
          url: path
        })
      }

    },

    toRecharge() {
      uni.navigateTo({
        url: '/pages/finance/recharge'
      })
    },
    toTransfer() {
      uni.navigateTo({
        url: '/pages/finance/transfer/index'
      })
    },
    toCovert() {
       uni.navigateTo({
        url: '/pages/finance/covert/index'
      })
    },
    // 提现
    toCash() {
      // if(this.userInfo.isWithdrawPwd){
        uni.navigateTo({
          url: '/pages/finance/draw-money'
        })
      // }else{ // 未设置提款密码
      //   this.isPassWordShow = true
      // }
      
    },

    langConfirm(item) {
      this.$i18n.locale = item.value[0].value
      this.langShow = false
      uni.setStorageSync('lang', item.value[0].value);
    },
  }
}
</script>

<style lang="scss" scoped>
.info {
  background: url('/static/my-center/bg_top.37d4f848.min.png') no-repeat 50%;
  background-size: 100% 100%;
  height: 158px;
  font-size: 14px;
  color: #fff;

  .userinfoBox {
    padding: 10px;
  }

  .user-des {
    padding-left: 5px;
  }

  .avatar {
    border-radius: 50%;
    width: 56px;
    height: 56px;
  }

  .level {
    padding-right: 10px;
  }

  .nickname {
    font-size: 15px;
  }

  .usercode {
    font-size: 13px;
  }
}

.total-box {
  margin: -51px 14px 14px;
  background-color: #fff;
  padding: 14px .53333rem;
  border-radius: 14px;
  box-shadow: 0 7px 28px 0 rgba(211, 13, 13, .07);

  .qb {
    width: 75px;
    height: 75px;
  }

  .a-pl-2 {
    padding-left: 10px;
  }

  .des {
    font-size: 11px;
    color: #6f7176;
  }

  .money {
    font-weight: 600;
  }

  .jf {
    margin-left: 10px;
    color: #303133;
    font-size: 14px;
  }

  .btns {
    margin: 5px;
    margin-top: 15px;

    .btn {
      width: 45%;
      background-color: #ffce1f;
      height: 28px;
      color: #fff;
      font-size: 13px;
      border-radius: 28px;
      box-shadow: 0 0 9px 1px rgb(255 206 31 / 40%);
    }

    .btn1 {
      background-color: #f2413b;
      box-shadow: 0 0 9px 1px rgb(242 65 59 / 27%);
    }
  }
}

.nav-muen {
  padding: 5px 10px;

  .item {
    font-size: 13px;
    color: #303133;

    image {
      width: 42px;
      height: 42px;
    }
  }
}
.flex-right{
  justify-content: flex-start !important;
}

.list {
  margin-top: 18px;
  background: #fff;
  box-shadow: 0 0 28px 0 rgb(58 58 58 / 7%);

  .groupBox {
    ::v-deep.u-cell__body {
      padding: 15px;
    }

    ::v-deep.u-cell__value {
      color: rgb(242, 65, 59);
      font-size: 13px;
    }
  }
}

.exit {
  margin-top: 37px;
  width: 65%;
  color: #fff;
  border-color: #fa3534;
  background-color: #fa3534;
}

.tags {
  color: #fff;
  font-size: 10px;
  border-radius: 50%;
  background-color: #fa3534;
  padding: 0 5px;
  position: absolute;
  top: 0;
  right: 16px;
}
</style>
