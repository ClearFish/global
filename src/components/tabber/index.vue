<template>
  <view class="tabberBox flex flex-item-col-center">
    <view class="tabBarItem flex flex-col flex-item-col-center" v-for="(item,index) in list" :key="index" @click="setSelected(index)">
      <view>
        <image :src="current===index? item.selectedIconPath : item.iconPath" class="icon"></image>
      </view>
      <text :class="{'select': current===index}">{{ item.text }}</text>
    </view>
  </view>
</template>

<script>
export default{
  props:{
    current:{
      type: Number,
      default: 0
    }
  },
  data(){
    return{
      // list:
    }
  },
  computed:{
	 list(){
		//  let arr = [
    //     {   
    //       pagePath:'/pages/home/index',
    //       iconPath:'/static/tabbar/home.min.png',
    //       selectedIconPath:'/static/tabbar/home_selected.min.png',
    //       text: this.$t('tabber.home')
    //     },
    //     {   
    //       pagePath:'/pages/lottery/index',
    //       iconPath:'/static/tabbar/predict.png',
    //       selectedIconPath:'/static/tabbar/predict_selected.png',
    //       text: this.$t('tabber.lottery')
    //     },
    //     {   
    //       pagePath:'/pages/mission/index',
    //       iconPath:'/static/tabbar/mission.svg',
    //       selectedIconPath:'/static/tabbar/mission.svg',
    //       text: 'Mission'
    //     },
    //     {   
    //       pagePath:'/pages/share/index',
    //       iconPath:'/static/tabbar/share.png',
    //       selectedIconPath:'/static/tabbar/share_selected.png',
    //       text: this.$t('tabber.share')
    //     },
    //     {   
    //       pagePath:'/pages/mine/index',
    //       iconPath:'/static/tabbar/mine.min.png',
    //       selectedIconPath:'/static/tabbar/mine_selected.min.png',
    //       text: this.$t('tabber.mine')
    //     }
    //   ]
	  return arr
	 } 
  },
  methods:{
    setSelected(index){
      console.log(index,this.list[index])
      uni.switchTab({
        url:this.list[index].pagePath
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tabberBox{
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 55px;
  max-width: 600px;
  z-index: 998;
  background-color: rgb(255, 255, 255);
  border-top: 0.2px solid #e4e7ed;
  .tabBarItem{
    color: rgb(112, 112, 112);
    font-size: 13px!important;
    line-height: 15px;
    text-align: center;
    position: relative;
    z-index: 2 !important;
    flex: 1;
    .icon{
      width: 25px;
      height: 25px;
    }
  }
  .tabBarItem:nth-child(3) view{
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #fff;
    // position: absolute;
    // top: -45px;
    // top: 50%;
    margin-top: -30px;
    display: flex;
    align-items: center;
    justify-content: center;
    // border: 0.2px solid #e4e7ed;
    // z-index: 1 !important;
    .icon{
      width: 39px;
      height: 39px;
      z-index: 9;
    }
  }
  .select{
    color: rgb(255, 0, 0);
  }
}
</style>
