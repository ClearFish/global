<template>
  <view class="bg">
    <uni-nav-bar :title="$t('message.title')" fixed :leftType="2"></uni-nav-bar>
	
	<template v-if="msgList.length>0">
		<view class="tips-box flex flex-col ">
			<view class="flex flex-sb tip-item" v-for="(item,index) in msgList" :key="index" @click="toPath(item)">
				<view class="icon">
					<image src="/static/my-center/message.png"></image>
				</view>
				<view class="time">
					<view class="tit  u-line-1">{{item.title}}</view>
					<view class="time1">{{item.created_at}}</view>
				</view>
				<view class="delete">{{$t('message-detail.btn-del')}}</view>
			</view>
		</view>
		<u-loadmore :status="status" line :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText"  />
	</template>
	<u-empty v-else mode="data" :text="$t('nomore')" style="padding-top: 50px;" />
  </view>
</template>

<script>
import { historyMsg } from '@/api/index.js'
import miment from 'miment'
export default {
  data(){
    return{
		status: 'loadmore',
		msgList: [],
		params:{
			pageIndex: 1,
			pageSize: 100
		},
		total: 0
    }
  },
  computed:{
  	  loadingText(){
  		  return this.$t('loading')
  	  },
  	  loadmoreText(){
  		   return this.$t('more')
  	  },
  	  nomoreText(){
  		  return this.$t('nomore')
  	  }
  },
  onLoad(option){
	// this.params.type = option.type  
	this.getMessageList()
  },
  methods:{
	toPath(item){
		uni.navigateTo({
			url:`/pages/mine/message-detail?id=${1}`
		})
	},
	// 信息列表
	getMessageList(){
		historyMsg(this.params).then(res =>{
			this.msgList = res.data.rows
			this.total = res.data.total
		})
	},
	keyTime(time){
		return miment(time*1000).format()
	}
  }

}
</script>

<style lang="scss" scoped>
.tips-box{
		padding: 14px;
	}
.tip-item{
	width: 100%;
	padding: 15px;
	border-bottom: 1px solid #f2f5f7;
	font-size: 14px;
	color: #2c3e50;
	.icon{
		width: 37px;
		height: 37px;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.tit{
		margin-bottom: 4px;
	}
	.time{
		width: 70%;
		color: #666;
		font-size: 11px;
		padding-left: 10px;
	}
	.delete{
		height: 24px;
		line-height: 24px;
		font-size: 11px;
		background-color: #f2413b;
		padding: 0 14px;
		border-radius: 14px;
		color: #fff;
	}
}
</style>