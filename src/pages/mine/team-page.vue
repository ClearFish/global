<template>
  <view class="bg">
    <!-- <uni-nav-bar :title="$t('teamlist.title')" fixed :leftType="2"></uni-nav-bar> -->
      <view class="list">
        <view v-for="(item,index) in lvList" 
            class="item" 
            :class="{activeItem: form.userLevel === item}"
            @click="changeLevel(item)"
            :key="index"
            >
          {{item}} lv
        </view>
      </view>
      <view class="p-list">
        <view class="p-list-item flex">
          <!-- <view>
            <view>Registration time</view>
            <text>/</text>
            <view>Last login time</view>
          </view> -->
          <view>Reg-Time</view>
          <view>UserName</view>
          <view>Revenue</view>
          <view>Reward</view>
        </view>
      </view>
      <view class="p-list">
        <template v-if="list.length>0">
          <view class="p-list-item p-list-item1 flex" v-for="(item,index) in list" :key="index">
            <view>{{item.createtime.split(' ')[0].substring(5)}}</view>
            <view>{{item.username}}</view>
            <view style="flex-direction: column;"> 
                <text>{{item.game_bonus && item.game_bonus.SYSTEM && item.game_bonus.SYSTEM.symbo}}{{item.game_bonus && item.game_bonus.SYSTEM && item.game_bonus.SYSTEM.total_amount}}</text>
                <!-- <text>{{item.game_bonus && item.game_bonus.USDT && item.game_bonus.USDT.symbo}}{{item.game_bonus && item.game_bonus.USDT && item.game_bonus.USDT.total_amount}}</text> -->
            </view>
            <view style="flex-direction: column;">
                <text>{{item.invite_bonus && item.invite_bonus.SYSTEM && item.invite_bonus.SYSTEM.symbo}}{{item.invite_bonus && item.invite_bonus.SYSTEM && item.invite_bonus.SYSTEM.total_amount}}</text>
                <!-- <text>{{item.invite_bonus && item.invite_bonus.USDT && item.invite_bonus.USDT.symbo}}{{item.invite_bonus && item.invite_bonus.USDT && item.invite_bonus.USDT.total_amount}}</text> -->
            </view>
          </view>
            <!-- 分页 -->
            <page-nav :total="form.total" @change="changePage" ref="pageNav"></page-nav>
        </template>
        <u-empty v-else mode="list" :text="$t('nomore')" style="padding-top: 50px;"></u-empty>
      </view>
  </view>
</template>

<script>
import {Subordinate} from '@/api/index.js'
import PageNav from '@/components/PageNav/index.vue'
export default {
  name:'TeamList',
  components:{
    PageNav
  },
  data(){
    return{
      list: [],
      lvList:[1,2,3,4,5,6],
      form:{
        pageIndex: 1,
        pageSize: 10,
        userLevel: 1,
        total:0
      }
    }
  },
  onLoad(){
    this.getMyTeamSubordinate(1)
  },
  methods:{
    changeLevel(level){
      this.form.userLevel = level
      this.form.pageIndex = 1
      this.$refs.pageNav.setPageIndex(1)
      this.getMyTeamSubordinate()
    },
    getMyTeamSubordinate(){
      Subordinate(this.form).then(res =>{
        this.list = res.data.rows
        this.form.total = res.data.total
      })
    },
    changePage(index){
        this.form.pageIndex = index
        this.getMyTeamSubordinate()
    },
  }
}
</script>

<style lang="scss" scoped>
.list{
  width: 100%;
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  .item{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
    border-right: none;
    height: 50px;
    &:last-child {
      border-right: 1px solid red;
    }
  }
  .activeItem{
    background-color: red;
    color: #fff;
  }
  .item1{
    border-right: none;
  }
  .item2{
    border-right: none !important;
  }
}
.p-list{
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  .p-list-item{
    view{
      flex: 1;
      display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    }
  }
  .p-list-item1{
    font-size: 14px;
    color: #666;
  }
}
</style>