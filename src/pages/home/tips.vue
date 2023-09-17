<template>
  <view class="bg">
    <uni-nav-bar :title="$t('msg.title')" fixed :leftType="2"></uni-nav-bar>
	<template v-if="msgList.length>0">
		<view class="tips-box flex flex-col">
			<view class="flex flex-col tip-item" v-for="(item,index) in msgList" :key="index" @click="toPath(item)">
				<view class="tit flex">
					<u-icon name="arrow-right" size="12" bold color="#666"></u-icon>{{item.title}}
				</view>
				<view class="time">{{item.createtime}}</view>
			</view>
		</view>
		<u-loadmore :status="status" line :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText"  />
	</template>
	<u-empty v-else mode="data" :text="$t('nomore')" style="padding-top: 50px;" />
	
	<!-- <view class="can-box">
		<canvas style="width: 100%; height: 100%;" canvas-id="firstCanvas" id="firstCanvas"></canvas>
	</view> -->
	</view>
</template>

<script>
import { notice,activity } from '@/api/index.js'
export default {
  data(){
    return{
		status: 'loadmore',
		msgList: [],
		params:{
			pageIndex: 1,
			pageSize: 100
		},
		type: 1,
    }
  },
  onLoad(option){
	this.type = Number(option.type)
	  if(this.type===1){
		  this.getHdggList()
	  }else{
		this.getActivity()  
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
  methods:{
	toPath(item){
		uni.navigateTo({
			url:`/pages/home/tips-detail?id=${item.id}&type=${this.type}`
		})
	},
	// 信息列表
	getHdggList(){
		notice(this.params).then(res =>{
			this.msgList = res.data.rows
			if(this.msgList.length===res.data.total){
				this.status = 'nomore'
			}
		})
	},
	// 获取活动
	getActivity(){
		activity(this.params).then(res =>{
			this.msgList = res.data.rows
			if(this.msgList.length===res.data.total){
				this.status = 'nomore'
			}
		})
	}
  }

}
</script>

<style lang="scss" scoped>
	.can-box{
		width: 150px;
		height: 30px;
		border:1px solid red;
	}
	.tips-box{
		padding: 14px;
	}
.tip-item{
	width: 100%;
	padding: 15px 30px;
	border-bottom: 1px solid #f2f5f7;
	font-size: 14px;
	color: #2c3e50;
	.tit{
		margin-bottom: 4px;
	}
	.time{
		color: #666;
		font-size: 11px;
		padding-left: 10px;
	}
}
</style>