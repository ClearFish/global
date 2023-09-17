<template>
  <view class="bg">
    <uni-nav-bar :title="$t('mine.title')" fixed :leftType="2">
    </uni-nav-bar>
    <view class="customer-service-banner">
      <image src="/static/my-center/customerservice_title.d5e18bcd.min.jpg" mode="aspectFill" class="imgbg"></image>
    </view>
    <view class="customer-service-list wrap">
      <view class="u-row" v-for="(item,index) in customer_service_list" :key="index" v-on:click="customerLink(item.url, item.target)">
        <img v-show="item.icon" :src="item.icon" />
        <view>{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {getCustomerService} from "@/api/index.js"

export default {
  data() {
    return {
      status: 'loadmore',
      customer_service_list: [],
    }
  },
  onShow() {
    // 获取客服连接
    getCustomerService().then(res => {
      if (res.code === 1) {
        this.customer_service_list = res.data.rows
      } else {
        this.customer_service_list = [];
      }
    })
  },
  methods: {
    toPath(item) {
      uni.navigateTo({
        url: `/pages/home/tips-detail?id=${1}`
      })
    },
    customerLink(url, target) {
      let a = document.createElement('a');
      a.target = target ?? "_blank";
      a.href = url;
      a.click();
    }
  }

}
</script>

<style lang="scss" scoped>
.customer-service-banner {
  position: relative;

  .imgbg {
    width: 100%;
    height: 192px;
  }
}

.customer-service-list {
  padding: 14px;
  position: relative;
  z-index: 999;
  background-color: #fff;
  margin-top: -14px;
  border-radius: 18px 18px 0 0;

  .u-row {
    background: #fff;
    box-shadow: 0 2px 17px 3px #f0f1f3;
    border-radius: 8px;
    margin-bottom: 14px;
    font-size: 15px;
    padding: 10px 14px;
    align-items: center;
    display: flex;
    img {
      width: 70px;
      height: 70px;
      margin-right: 9px !important;
    }
  }
}
</style>