<template>
  <view class="bg">
    <uni-nav-bar :title="$t('lottery.title')" fixed :rightType="2">
    </uni-nav-bar>
    <view class="tabsBox">
      <u-tabs :list="gameTypeList" :current="game_type" lineColor="rgb(238, 10, 36)" :inactiveStyle="inactiveStyle"
              :scrollable="false" @click="clickTab" :activeStyle="activeStyle"></u-tabs>
      <u-tabs :list="timeList" :current="game_time" lineColor="rgb(238, 10, 36)" :inactiveStyle="inactiveStyle"
              :scrollable="false" :activeStyle="activeStyle" @click="clickTime"></u-tabs>
    </view>
    <u-button :text="$t('lottery.btn.txt')" class="btn" @click="toPath"></u-button>

    <view class="game-list">
      <view class="u-table">
        <view class="t-tr flex head flex-item-col-center">
          <template v-if="game_type===0">
            <view class="flex-item-2 flex-rcc">{{ $t('lottery.table.th1') }}</view>
            <view class="flex-item-1 flex-rcc">{{ $t('lottery.table.th2') }}</view>
            <view class="flex-item-1 flex-rcc">{{ $t('lottery.table.th3') }}</view>
            <view class="flex-item-1 flex-rcc">{{ $t('lottery.table.th4') }}</view>
          </template>
          <template v-else-if="game_type===1">
            <view class="flex-item-2 flex-rcc">{{ $t('lottery.table.th1') }}</view>
            <view class="flex-item-2 flex-rcc">{{ $t('lottery.table.5d.th2') }}</view>
            <view class="flex-item-1 flex-rcc">{{ $t('lottery.table.5d.th3') }}</view>
          </template>

          <template v-else>
            <view class="flex-item-2 flex-rcc">{{ $t('lottery.table.th1') }}</view>
            <view class="flex-item-1 flex-rcc">{{ $t('lottery.table.5d.th3') }}</view>
            <view class="flex-item-1 flex-rcc">{{ $t('lottery.table.th3') }}</view>
            <view class="flex-item-1 flex-rcc">{{ $t('lottery.table.k3.th4') }}</view>
            <view class="flex-item-1 flex-rcc">{{ $t('lottery.table.k3.th5') }}</view>
          </template>
        </view>

        <view class="t-tr tr flex flex-item-col-center" v-for="(item,key) in gameLog" :key="key">
          <template v-if="game_type===0">
            <view class="flex-item-2 flex-rcc">{{ item.period }}</view>
            <view class="flex-item-1 flex-rcc"
                  :class="{'num_gcolor': Number(item.result[0])>4,'num_rcolor':Number(item.result[0])<5}">
              {{ item.result[0] }}
            </view>
            <view class="flex-item-1 flex-rcc">
              {{ Number(item.result[0]) > 4 ? $t('lottery.winGo.big') : $t('lottery.winGo.small') }}
            </view>
            <view class="flex-item-1 flex-rcc">
              <text class="redc circle" v-if="Number(item.result[0])<5"></text>
              <text class="greenc circle" v-if="Number(item.result[0])>4"></text>
              <text class="zi circle" v-if="[0,5].includes(Number(item.result[0]))"></text>
            </view>
          </template>

          <template v-else-if="game_type===1">
            <view class="flex-item-2 flex-rcc">{{ item.period }}</view>
            <view class="flex-item-2 flex-rcc">
              <text class="border" v-for="(i,index) in item.result" :key="index">{{ i }}</text>
            </view>
            <view class="flex-item-1 flex-rcc">
              <text class="border-r">{{ sumWin(item.result) }}</text>
            </view>
          </template>

          <template v-else>
            <view class="flex-item-2 flex-rcc third">{{ item.period }}</view>
            <view class="flex-item-1 flex-rcc third">{{ sumWin(item.result) }}</view>
            <view class="flex-item-1 flex-rcc third">
              {{ sumWin(item.result) <= 10 ? $t('lottery.winGo.big') : $t('lottery.winGo.small') }}
            </view>
            <view class="flex-item-1 flex-rcc third">
              {{ (sumWin(item.result) % 2) === 0 ? $t('lottery.k3.even') : $t('lottery.k3.odd') }}
            </view>
            <view class="flex-item-1 flex-rcc third">
              <view v-for="(i,index) in item.result" :key="index">
                <image :src="`/static/game/dice_show${i}.min.png`" class="icon-num"></image>
              </view>

            </view>
          </template>
        </view>

        <view class="list-fooder"></view>
      </view>
    </view>

    <page-nav @change="changePage"></page-nav>

    <Tabbar :current="1"></Tabbar>
  </view>
</template>

<script>
import PageNav from '@/components/PageNav/index.vue'
import Tabbar from '@/components/tabber/index'
import {resultRecord, gameList} from '@/api/index.js'

export default {
  components: {Tabbar, PageNav},
  data() {
    return {
      current: 0, // 游戏类型
      hisparams: { // 开奖历史
        game_id: 1,
        pageIndex: 1,
        pageSize: 10
      },
      game_type: 0, // 游戏类型
      game_time: 0, // 游戏时间
      gameTypeList: [{name: 'WinGo'}, {name: '5D'}, {name: 'K3'}],
      activeStyle: {'font-weight': 'bold', 'font-size': '13px'},
      inactiveStyle: {'font-size': '13px'},
      gameList: [],// 游戏列表
      gameLog: [], // 游戏记录
    }
  },
  computed: {
    timeList() {
      let arr = [{name: `1${this.$t('lottery.game.unit')}`}, {name: `3${this.$t('lottery.game.unit')}`}, {name: `5${this.$t('lottery.game.unit')}`}, {name: `10${this.$t('lottery.game.unit')}`}]
      if(this.game_type===0){
        arr.splice(1,1)
      }
      return arr
    }
  },
  onShow() {
    this.getGameList()
  },
  onReady() {
    //this.getGameList()
  },
  methods: {
    // 获取游戏列表
    getGameList() {
      gameList().then(res => {
        this.gameList = res.data
        if (res.data.length > 0) {
          this.hisparams.game_id = res.data[0].game_id
          this.getResultRecord() // 获取游戏记录
        }
      })
    },

    // 游戏开奖记录
    getResultRecord() {
      resultRecord(this.hisparams).then(res => {
        this.gameLog = res.data.rows
      })
    },

    // 切换游戏
    clickTab(value) {
      this.gameLog = []
      this.game_type = value.index
      this.game_time = 0
      if (value.index === 0) { // 第一种游戏 id===1
        this.hisparams.game_id = 1
      } else if (value.index === 1) {
        this.hisparams.game_id = 9
      } else {
        this.hisparams.game_id = 5
      }
      this.getResultRecord()
    },

    // 切换时间
    clickTime(value) {
      this.game_time = value.index
      let game_id = 0
      if (this.game_type === 0) {
        if(value.index===0){
          game_id = value.index + 1
        }else{
          game_id = value.index + 2
        }
        
      } else if (this.game_type === 1) {
        game_id = 8 + value.index + 1
      } else {
        game_id = 4 + value.index + 1
      }
      this.hisparams.game_id = game_id
      this.getResultRecord()
    },

    toPath() {
      let gameId = 1
      let path = ''
      if (this.hisparams.game_id <= 4) {
        gameId = 1
      } else if (this.hisparams.game_id > 4 && this.hisparams.game_id <= 8) {
        gameId = 5
      } else {
        gameId = 9
      }
      if(this.game_type===0){
        path = `/pages/lottery/win?game_type=${this.game_type}&game_id=${gameId}&noThree=true`
      }else{
        path = `/pages/lottery/win?game_type=${this.game_type}&game_id=${gameId}`
      }
      uni.navigateTo({
        url: path
      })
    },
    keyWinNumber(value) {
      return value.split(',')
    },
    // 求和
    sumWin(value) {
      let arr = []
      let sum = 0
      if (Array.isArray(value)) {
        arr = value
      } else {
        arr = value.split(',')
      }
      arr.map(v => {
        sum = sum + Number(v)
      })
      return sum
    },
    // 下一页
    changePage(index) {
      this.hisparams.pageIndex = index
      this.getResultRecord()
    }
  }

}
</script>

<style lang="scss" scoped>
.tabsBox {
  width: 100%;
}

.itemBox {
  padding: 9px 20px;
  font-size: 13px;
  border-bottom: 1px solid #efeeee;

  .redt {
    color: #fb4e4e;
    font-size: 10px;
    font-weight: bold;
  }

  .greent {
    color: #5cba47;
    font-size: 10px;
    font-weight: bold;
  }
}

.btn {
  width: 90%;
  margin-top: 10px;
  font-size: 16px;
  height: 44px;
  line-height: 44px;
  color: #fff;
  border-color: #f90;
  background-color: #f90;
}

.game-list {
  margin-top: 15px;
  width: 100%;
  padding-bottom: 20px;
}

.head {
  background-color: #fbedf3;
}

.t-tr {
  padding: 13px;
  font-weight: 600;
  color: #000;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: 14px;
}

.tr {
  font-weight: 400;
  font-size: 15px;
  color: rgb(96, 98, 102);
  border-bottom: 1px solid #e2e2e2;
}

.num_gcolor {
  color: #5cba47 !important;
}

.num_rcolor {
  color: #d0322d !important;
}

.circle {
  height: 10px;
  width: 10px;
  border-radius: 50%;
}

.redc {
  background-color: #fb4e4e;
}

.greenc {
  background-color: #5cba47;
}

.zi {
  margin-left: 5px;
  background-color: #eb43dd;
}

.list-fooder {
  height: 20px;
  background-color: #fbedf3;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.border {
  width: 16px !important;
  height: 16px;
  border-radius: 16px;
  margin-right: 4px;
  border: 1px solid #000;
  color: #000;
  background: #f4f4f4;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
}

.border-r {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border: none;
  color: #fff;
  background-color: #fb4e4e;
  border-radius: 50%;
}

.third {
  font-size: 11px;
}

.icon-num {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
</style>