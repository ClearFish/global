<template>
  <view class="bg">
    <uni-nav-bar :title="$t('msg.title')" fixed :leftType="2"></uni-nav-bar>

	<view class="list">
		<view class="title flex flex-item-col-center">
			<image src="/static/img/article.png" class="des-img flex-shrink"></image>
			<view class="tit-info">
				<view class="u-line-1">{{detail.title}}</view>
				<view class="time">{{detail.createtime}}</view>
			</view>
		</view>
		<view class="con" v-html="detail.content">
		</view>
	</view>
  </view>
</template>

<script>
import { getNotice,getActivity } from '@/api/index.js'
export default {
  data(){
    return{
		detail: {
		},
		type: 1,
    }
  },
  onLoad(option){
  	this.type = Number(option.type)
  	  if(this.type===1){
  		  this.getNoticeDetail(option.id)
  	  }else{
  		this.getActivityDetail(option.id)  
  	  }
  },
  methods:{
	  getNoticeDetail(id){
		getNotice({id:id}).then(res =>{
			this.detail = res.data
		})  
	  },
	  getActivityDetail(id){
		getActivity({id:id}).then(res =>{
			this.detail = res.data
		})  
	  }
  }

}
</script>

<style lang="scss" scoped>
.list{
	padding: 14px;
	.title{
		padding: 14px 9px;
		border-bottom: 1px solid #f2f5f7;
		.des-img{
			width: 37px;
			height: 37px;
			margin-right: 10px;
		}
		.tit-info{
			font-size: 16px;
			
			color: #2c3e50;
		}
		.time{
			margin-top: 4px;
			color: #666;
			font-size: 11px;
		}
	}
	.con {
	    padding: 14px;
	    font-size: 14px;
	    line-height: 18px;
	    color: #2c3e50;
	}
}
</style>