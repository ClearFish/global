<template>
  <view class="bg">
    <uni-nav-bar :title="$t('commission.received')" fixed :leftType="2"></uni-nav-bar>
    <view class="content_box">
			<view class="list flex flex-col" v-if="list.length>0">
				<view class="flex-sb item" v-for="(item,index) in list" :key="index">
					<view class="flex-col add_width">
						<view class="order_box">
							<view class="number_box">
								<text> {{item.order_number}}</text>
								<image src="/static/img/copy.min.png" class="copy" @click="copyNumber(item.order_number)"></image>
							</view>
							
						</view>
						<view class="time">{{item.created_at}}</view>
					</view>
					<!-- <view :class="'status status_'+item.status">{{item.status}}</view> -->
					<view class="jf flex-cc number_width">
						<text class="num">+{{item.bonus}}</text>
						<text>{{$t('trading-record.currency')}}: {{item.currency_symbol}}</text>
					</view>
				</view>
				<u-loadmore :status="status" line :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText" />
			</view>
			<u-empty v-else mode="data" :text="$t('nomore')" style="padding-top: 50px;" />
		</view>
  </view>
</template>

<script>
import {getBonusRecord} from '@/api/index.js'
export default {
  name:'TeamList',
  data(){
    return{
      list: [],
      status: 'loadmore',
      form:{
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
    }
  },
  onReady(){
    this.getList()
  },
    onReachBottom(){
        if(this.list.length<this.total){
            this.status = 'loading'
            this.form.pageIndex++
            this.getList()
        }else{
            this.status = 'nomore'
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
		},
	},
  methods:{
    getList(){
      getBonusRecord(this.form).then(res =>{
        this.list = res.data.rows
        this.total = res.data.total
        this.list = this.list.concat(res.data.rows)
        if (this.list.length===this.total) {
            this.status = 'nomore'
        }
        console.log(this.list,"12312321")
      })
    },
    copyNumber(number) {
        uni.setClipboardData({
            data: number,
            success: ()=> {
                uni.showToast({
                    icon: 'none',
                    title: 'Replicating Success',
                    duration: 2000
                });
            }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.content_box {
	// margin-top: -80px;
	background: #fff;
	border-radius: 10px 10px 0 0 ;
    .order_box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .number_box {
            display: flex;
            align-items: center;
            gap: 10px;
            .copy {
                width: 14px;
                height: 14px;
            }
        }
    }
    }
.item{
	padding: 14px 9px;
	border-bottom: 1px solid #f2f5f7;
	.add_width {
		width: 196px;
	}
	.number_width {
		// flex: 1;
	}
	.time{
		font-size: 15px;
		font-weight: 600;
		color: #999;
		image{
			width: 26px;
			height: 26px;
			margin-right: 5px;
		}
	}
	.jf{
		font-size: 14px;
			font-weight: 500;
			color: #cdcfd6;
		.num{
			font-weight: 600;
			font-size: 18px;
			color: #6bbe58;
		}
		.red{
			color: #f2443e;
		}
	}
}
</style>