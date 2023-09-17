<template>
  <view class="bg">
    <uni-nav-bar :title="$t('teamlist.title')" fixed :leftType="2"></uni-nav-bar>
      <view class="list" style="margin-top:15px">
        <view class="item item1" :class="{activeItem: form.userLevel ===1}" @click="changeLevel(1)">1 Lv</view>
        <view class="item item2" :class="{activeItem: form.userLevel ===2}" @click="changeLevel(2)">2 Lv</view>
        <view class="item" :class="{activeItem: form.userLevel ===3}" @click="changeLevel(3)">3 Lv</view>
      </view>
      <view class="p-list">
        <view class="p-list-item flex">
          <view>UserName</view>
          <view>Mobile</view>
          <view>Invite Code</view>
        </view>
      </view>
      <view class="p-list">
        <template v-if="list.length>0">
          <view class="p-list-item p-list-item1 flex" v-for="(item,index) in list" :key="index">
            <view>{{item.username}}</view>
            <view>{{item.mobile}}</view>
            <view>{{item.invite_code}}</view>
          </view>
        </template>
        <u-empty v-else mode="list" :text="$t('nomore')" style="padding-top: 50px;"></u-empty>
      </view>
  </view>
</template>

<script>
import {Subordinate} from '@/api/index.js'
export default {
  name:'TeamList',
  data(){
    return{
      list: [],
      form:{
        pageIndex: 1,
        pageSize: 100,
        userLevel: 1
      }
    }
  },
  onLoad(){
    this.getTeamList(1)
  },
  methods:{
    changeLevel(level){
      this.form.userLevel = level
      this.getTeamList()
    },
    getTeamList(){
      Subordinate(this.form).then(res =>{
        this.list = res.data.rows
      })
    }
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
    height: 50px;
    // border-right: 1px solid red;
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