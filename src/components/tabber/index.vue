<template>
  <view class="tabberBox flex flex-item-col-center">
    <view class="tabBarItem flex flex-col flex-item-col-center" v-for="(item,index) in list" :key="index" @click="setSelected(item,index)">
      <view>
        <image :src="current===index? item.selectedIconPath : item.iconPath" class="icon"></image>
      </view>
      <text :class="{'select': current===index}">{{ item.text }}</text>
    </view>
    <LeftMenu ref="leftMenu"/>
  </view>
</template>

<script>
import LeftMenu from "../leftMenu/index.vue"
export default{
  components:{LeftMenu},
  data(){
    return{
      current:2
    }
  },
  computed:{
	 list(){
		 let arr = [
        {
          pagePath:'',
          text: "Menu",
          iconPath:'/static/tabbar/menu.svg',
          selectedIconPath:"/static/tabbar/menu_active.svg",
          showPopup:true
        },
        {   
          pagePath:'/pages/promotion/index',
          text: 'Promotion',
           iconPath:'/static/tabbar/gift.svg',
          selectedIconPath:"/static/tabbar/gift_active.svg",
          showPopup:false
        },
        {   
          pagePath:'/pages/home/index',
          text: this.$t('tabber.home'),
           iconPath:'/static/tabbar/home.svg',
          selectedIconPath:"/static/tabbar/home_active.svg",
          showPopup:false
        },
        {   
          pagePath:'/pages/deposit/index',
          text: 'Deposit',
           iconPath:'/static/tabbar/deposit.svg',
          selectedIconPath:"/static/tabbar/deposit_active.svg",
          showPopup:false
        },
        {   
          pagePath:'/pages/member/index',
          text: 'Member',
           iconPath:'/static/tabbar/members.svg',
          selectedIconPath:"/static/tabbar/members_active.svg",
          showPopup:false
        },
      ]
	  return arr
	 } 
  },
  methods:{
    setSelected(item,index){
      this.current = index
      if(item.pagePath) {
        uni.switchTab({
          url:this.list[index].pagePath
        })
      }else if(item.showPopup) {
        this.$refs.leftMenu.show ? this.$refs.leftMenu.close() :
        this.$refs.leftMenu.open()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabberBox{
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 75px;
  max-width: 600px;
  z-index: 998;
  background-color: #1f272f;
  border-top: 0.2px solid #334250;
  .tabBarItem{
    color: rgb(112, 112, 112);
    font-size: 13px!important;
    line-height: 15px;
    text-align: center;
    position: relative;
    z-index: 11002 !important;
    flex: 1;
    .icon{
      width: 25px;
      height: 25px;
    }
  }
  .select{
    color: rgb(255, 0, 0);
  }
}
</style>
