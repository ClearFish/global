<template>
    <view 
        class="top_header" 
        @click="backBtn"
        :style="{background:bgColor}"
    >
        <view class="left">
            <u-icon name="arrow-left" color="#fff" size="22"></u-icon>
            <text>{{title}}</text>
        </view>
        <view class="right">
            <slot name="right"></slot>
        </view>
    </view>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        bgColor:{
            type:String,
            default:'transparent'
        }
    },
    data() {
        return {

        }
    },
    methods:{
        backBtn() {
            const pages = getCurrentPages()
            if(pages.length>1){
                uni.navigateBack()
            }else{
                uni.switchTab({
                    url:'/pages/home/index'
                })
            }
        }
    }    
}
</script>
<style scoped lang="scss">
.top_header {
    z-index: 2;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    box-sizing: border-box;
    width: 100%;
    .left {
        display: flex;
        gap: 10px;
        align-items: center;
    }
}
</style>