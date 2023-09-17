<template>
  <view class="bg">
    <uni-nav-bar :title="$t('team.title')" fixed :leftType="2">
      <template slot="right">
          <u-icon name="order" color="#fff" bold size="30" @click="toRecord"></u-icon>
      </template>
    </uni-nav-bar>
    <view class="wallet-user a-text-center"></view>
    <view class="wallet-box">
      <view class="list flex flex-col">
        <view class="top_box">
          <view class="top_container">
            <view>
              <text>Commission:</text>
              <text>{{info.total_game_all && info.total_game_all.SYSTEM && info.total_game_all.SYSTEM.symbo || '₹'}}</text>
              <text>{{info.total_game_all && info.total_game_all.SYSTEM && info.total_game_all.SYSTEM.total_bonus}}</text>
            </view>
            <!-- <view style="display:flex">
              <text>{{info.total_game_all && info.total_game_all.SYSTEM && info.total_game_all.SYSTEM.symbo}}{{info.total_game_all && info.total_game_all.SYSTEM && info.total_game_all.SYSTEM.total_bonus}}</text>
              <text>{{info.total_game_all && info.total_game_all.USDT && info.total_game_all.USDT.symbo}}{{info.total_game_all && info.total_game_all.USDT && info.total_game_all.USDT.total_bonus}}</text>
            </view> -->
          </view>
          
          <view class="cener_container">
            <view class="left">
              <view class="title">Total People</view>
              <view>{{info.total_person}}</view>
            </view>
            <view class="left right">
              <view class="title">Contribution</view>
              <view>{{info.total_game_all && info.total_game_all.SYSTEM && info.total_game_all.SYSTEM.total_contribution}}</view>
            </view>
          </view>
          <view class="bottom_container">
            <view class="content_box">
              <view class="title">My Promotion Code</view>
              <view class="content">{{shareLink.code}}</view>
            </view>
            <view class="content_box">
              <view class="title">My Promotion Link</view>
              <view class="content">{{shareLink.url}}</view>
            </view>
            <view class="copy_box" @click="copyLink">Copy Link</view>
          </view>
          <view class="receive_bonous">
            <view class="receive_box">
              <text>Received Bonous:</text>
              <text>₹{{systemInfo && systemInfo.received_bonus || ''}}</text>
            </view>
            <view  class="receive_box add_margin">
              <text>Not Receive:₹{{systemInfo.not_received_bonus}}</text>
              <view :class="systemInfo.canGet ?'receive_btn get_btn' :'receive_btn'"
                    @click="receiveBonous"
              >receive</view>
            </view>
          </view>
        </view>
        <view class="itemBox flex-sb" @click="toMembership">
          <view class="titleBox flex-rcc">
            <image src="/static/img/level.png" class="leftIcon"></image>
            <text>{{ $t('team.cell1') }}</text>
          </view>
          <view class="vBox">VIP {{ info.level }}</view>
        </view>
        <view class="itemBox flex-sb" @click="toPath">
          <view class="titleBox flex-rcc">
            <image src="/static/tabbar/share_selected.png" class="leftIcon"></image>
            <text>{{ $t('team.cell2') }}</text>
          </view>
          <view class="vBox">{{ info.total_person }}</view>
        </view>
        <view class="itemBox flex-sb">
          <view class="titleBox flex-rcc">
            <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
            <text>{{ $t('team.cell3') }}</text>
          </view>
          <view class="vBox">
            <text class="u-text-right" v-for="(item, index) in info.total_in_level1" :key="index">{{ item.total_money }} {{ item.symbo }}</text>
          </view>
        </view>
        <view class="itemBox flex-sb">
          <view class="titleBox flex-rcc">
            <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
            <text>{{ $t('team.cell4') }}</text>
          </view>
          <view class="vBox">
            <text class="u-text-right" v-for="(item, index) in info.total_in_level2" :key="index">{{ item.total_money }} {{ item.symbo }}</text>
          </view>
        </view>
        <view class="itemBox flex-sb">
          <view class="titleBox flex-rcc">
            <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
            <text>{{ $t('team.cell5') }}</text>
          </view>
          <view class="vBox">
            <text class="u-text-right" v-for="(item, index) in info.total_in_level3" :key="index">{{ item.total_money }} {{ item.symbo }}</text>
          </view>
        </view>
        <view class="itemBox flex-sb">
          <view class="titleBox flex-rcc">
            <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
            <text>Total recharge of level-4 users</text>
          </view>
          <view class="vBox">
            <text class="u-text-right" v-for="(item, index) in info.total_in_level4" :key="index">{{ item.total_money }} {{ item.symbo }}</text>
          </view>
        </view>
        <view class="itemBox flex-sb">
          <view class="titleBox flex-rcc">
            <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
            <text>Total recharge of level-5 users</text>
          </view>
          <view class="vBox">
            <text class="u-text-right" v-for="(item, index) in info.total_in_level5" :key="index">{{ item.total_money }} {{ item.symbo }}</text>
          </view>
        </view>
        <view class="itemBox flex-sb">
          <view class="titleBox flex-rcc">
            <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
            <text>Total recharge of level-6 users</text>
          </view>
          <view class="vBox">
            <text class="u-text-right" v-for="(item, index) in info.total_in_level6" :key="index">{{ item.total_money }} {{ item.symbo }}</text>
          </view>
        </view>
        <view class="itemBox flex-sb">
          <view class="titleBox flex-rcc">
            <image src="/static/img/wallet3.min.png" class="leftIcon"></image>
            <text>{{ $t('team.cell6') }}</text>
          </view>
          <view class="vBox">
            <text class="u-text-right" v-for="(item, index) in info.total_in_all" :key="index">{{ item.total_money }} {{ item.symbo }}</text>
          </view>
        </view>
        <TeamPage ref="teamPage"/>
      </view>
    </view>
    <u-popup :show="show" class="rulePopup" :round="15"  mode="center" @close="show = false">
        <view class="receive_box">
            <view class="title">
                <view>Receive Bonous</view>
            </view>
            <view class="receive_info">
                <view class="info_detail">The commission will be calculated from the update of website 8.1 onwards</text></view>
                <view class="rule-btn center_text">
                    <view class="btn center_text" @click="sureBonous">Receive</view>
                </view>
            </view>
        </view>
    </u-popup>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import {getMyTeam, getMyMember,invite_balance,getBonus,receiveBonus} from '@/api/index.js' 
import TeamList from "./team-list.vue"
import TeamPage from "./team-page.vue"

export default {
  components:{
    TeamPage
  },
  onLoad() {
    this.getMyTeam()
    this.getShareMoney()
    this.getBonus()
  },
  data() {
    return {
      info: {
        level: 0,
        total_person: 0,
      },
      params: {
        pageIndex: 1,
        pageSize: 10
      },
      list: [],
      shareLink:{
        url:'',
        code:''
      },
      bonousInfo:{},
      systemInfo:{},
      show:false
    }
  },
  methods: {
    toPath(){
      if(Number(this.info.total_person)>0){
        uni.navigateTo({
          url: '/pages/mine/team-list'
        })
      }
    },
    toMembership() {
      uni.navigateTo({
          url: '/pages/mine/membership'
        })
    },
    getMyTeam() {
      getMyTeam().then(res => {
        if (res.code === 1) {
          this.info = res.data;
        }
      })
    },
    getBonus() {
      getBonus().then(res=>{
        if(res.code == 1) {
          res.data.bonus.SYSTEM.canGet = Number(res.data.bonus.SYSTEM.not_received_bonus) > 0;
          res.data.bonus.USDT.canGet = Number(res.data.bonus.USDT.not_received_bonus) > 0;
          this.bonousInfo = res.data
          this.systemInfo = res.data.bonus.SYSTEM
        }
      })
    },
    receiveBonous() {
      var _this = this;
      if(!this.systemInfo.canGet) {
          uni.showToast({
            icon: 'none',
            title: 'Unavailable for receive',
            duration: 2000
          });
      }else {
        receiveBonus().then(res=>{
          if(res.code ==1) {
              // this.show = false
            this.$refs.uToast.show({
                type: 'success',
                message: `Successfully Received ${this.systemInfo.symbo}${this.systemInfo.not_received_bonus}`,
                complete() {
                  _this.bonousInfo = {}
                  _this.systemInfo = {}
                  _this.getMyTeam()
                  _this.getBonus()
                }
              })
            }else {
              uni.showToast({
                icon: 'none',
                title: res.msg,
                duration: 2000
              });
            }
        })
      }
    },
    sureBonous() {
       receiveBonus().then(res=>{
        if(res.code ==1) {
            this.show = false
            uni.showToast({
              icon: 'none',
              title: 'receive successful',
              duration: 2000
            });
            this.getMyTeam()
            this.getBonus()
          }
        })
    },
    toRecord() {
        uni.navigateTo({
          url: '/pages/mine/bonous-history'
        })
    },
    getMyMember() {
      getMyMember(this.params).then(res => {
        if (res.code === 1) {
          this.list = res.result
        }
      })
    },
    // 获取分享佣金
    getShareMoney(){
      invite_balance().then(res=>{
        this.shareLink.url = res.data.link
        this.shareLink.code = res.data.invite_code
        this.$store.commit('setVipinfo',this.shareLink)
        this.$refs.teamPage.getMyTeamSubordinate()
      })
    },
    copyLink() {
      uni.setClipboardData({
        data: this.shareLink.url,
        success: ()=> {
          uni.showToast({
            icon: 'none',
            title: this.$t('share.link.top.btn.tip'),
            duration: 2000
          });
        }
      });
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
  padding: 0 18px;
  margin-top: -80px;

  .list {
    background: #fff;
    box-shadow: 0 0 .8rem 0 rgba(58, 58, 58, .07);
    margin-top: 14px;

    .itemBox {
      min-height: 56px;
      line-height: 1.1rem;
      font-size: 13px;
      color: #000;
      border-bottom: 1px solid #efeeee;
      padding: 10px 14px;
      .leftIcon {
        width: 17px;
        height: 17px;
        margin-right: 9px;
      }
    }
    .top_box {
      .top_container {
        display: flex;
        justify-content: center;
        padding-top: 40px;
        align-items: center;
        
      }
      .receive_bonous {
        padding: 10px 14px;
        border-top: 1px solid #efeeee;
        border-bottom: 1px solid #efeeee;
        margin-top: 14px;
        .receive_box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .receive_btn {
            margin-left: 12px;
            padding: 4px 12px;
            border-radius: 4px;
            background: #cdcdcd;
            
          }
          .get_btn {
            background: #f2413b;
            color: #fff;
          }
        }
        .add_margin {
          margin-top: 10px;
        }
        
      }
      .cener_container {
        display: flex;
        margin-top: 30px;
        padding: 0 10px;
        justify-content: center;
        .left {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            color: rgb(112, 112, 112);
          }
        }
      }
      .bottom_container {
        margin-top: 30px;
        .content_box {
          width: 100%;
          padding: 0 14px;
          margin-bottom: 20px;
          .title {
            color: rgb(112, 112, 112);
            margin-bottom: 10px;
          }
          .content {
            border-bottom: 1px solid #efeeee;
            padding-right: 10px;
            padding-bottom: 8px;
            width: 100%;
            word-break: break-all
          }
        }
        .copy_box {
          width: 150px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          margin-top: 20px;
          background: #dfdfdf;
          border-radius: 4px;
        }
      }
    }
  }
  .u-text-right {
    text-align: right;
    display: block;
  }

}
.bg {
  .rulePopup {
        ::v-deep {
            .u-popup__content {
                width: 90%;
            }
        }
        width: 90%;
        box-sizing: border-box;
        .receive_box {
            .title {
                padding: 20px;
                box-sizing: border-box;
                background: #f2413b;
                border-radius: 15px 15px 0 0 ;
                color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                view {
                    display: flex;
                    justify-content: center;
                }
                .add_margin {
                    margin-top: 10px;
                }
            }
            .receive_info {
                padding: 20px;
                box-sizing: border-box;
                .addfont {
                    font-size: 18px;
                    font-weight: 600;
                }
                .info_detail {
                    margin-top: 15px;
                    // padding: 10px 20px;
                    // box-shadow: 0 -9px 18px 0 rgb(63 69 83 / 30%);
                    border-radius: 4px;
                    line-height: 30px;
                    .amount {
                        padding:2px 5px;
                        background: #f2413b;
                        border-radius: 4px;
                        margin-left: 4px;
                        color: #fff;
                    }
                }
                .rule-btn {
                    margin-top: 15px;
                    .btn {
                        width: 140px;
                        height: 34px;
                        border-radius: 17px;
                        color: #fff;
                        background: #f2413b;
                    }
                }
            }
        }
        .center_text {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>