<template>
	<view class="pageBox">
		<view class="page-nav">
			<view class="btn flex-rcc" :class="{'action': pageIndex>1}" @click="remove">
				<u-icon name="arrow-left" size="10" :color="pageIndex===1? 'rgb(127, 127, 127)': '#fff'" bold></u-icon>
			</view>
			<view class="number flex-rcc">
				{{pageIndex}}
			</view>
			<view class="btn flex-rcc" @click="add" :class="{'action': pageIndex<newTotal}">
				<u-icon name="arrow-right" size="10" :color="pageIndex<newTotal? '#fff': 'rgb(127, 127, 127)'" bold></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			params:{
				type: Object,
				default(){
					return{
						pageIndex: 1,
						pageSize: 10
					}
				}
			},
			total:{
				type: [Number,String],
				default: 100
			}
		},
		data() {
			return{
				pageIndex: 1,
				newTotal: 0
			}
		},
		watch:{
			'total':{
				immediate: true,
				handler(newV){
					if(newV){
						if(newV<10){
							this.newTotal = 1
						}else{
							if(newV%10>0){
								this.newTotal =Math.floor(newV/10)+1
							}else{
								this.newTotal = newV/10
							}
						}
					}
				}
			},
		},
		methods:{
			// 上一页
			remove(){
				if(this.pageIndex>1){
					this.pageIndex--
					this.$emit('change',this.pageIndex)
				}
			},
			// 下一页
			add(){
				if(this.pageIndex<this.newTotal){
					this.pageIndex++
					this.$emit('change',this.pageIndex)
				}
				
			},
			setPageIndex(index) {
				this.pageIndex = index
			}
		}
	}
</script>

<style lang="scss">
	.pageBox{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 19px;
		padding-bottom: 19px;
		height: 37px;
		.page-nav{
			display: flex;
			align-items: center;
			justify-content: center;
			.number{
				width: 93px;
				height: 37px;
				line-height: 37px;
				background-color: #f6f7f8;
				color: #303133;
				font-size: 14px;
			}
			.btn{
				height: 37px;
				width: 37px;
				background-color: #d8d8d8;
				border-radius: 4px;
			}
			.action{
				background-color: #fb4e4e;
			}
		}
	}
</style>