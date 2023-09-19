<template>
    <view class="left_menu_box">
        <u-popup :show="show" 
                mode="left"  
                @close="close" 
                @open="open"
                :overlay="false"
        >
            <view class="top_content">
                <img src="/static/home/logo.png" alt="" class="logo">
                <view class="close_icon">
                    <img src="/static/home/close.svg" alt="" class="close" @click="close" >
                </view>
            </view>
        </u-popup>
    </view>
</template>
<script>
export default {
    data() {
        return {
            show:false
        }
    },
    methods:{
        open() {
            this.show = true
        },
        close() {
            this.show = false
        }
    }
}
</script>
<style lang="scss" scoped>
.left_menu_box {
    width: 100%;
    position: fixed;
    z-index: 900;
    left: 0;
    bottom: 75px;
    ::v-deep {
        .u-popup {
            width: 100%;
            .u-slide-left-enter-to {
                width: 100%;
                bottom: 75px !important;
            }
            .u-popup__content {
                background: #0f1923;
                .top_content {
                    display: flex;
                    padding: 20px;
                    justify-content: space-between;
                    align-items: center;
                    .logo {
                        width: 96px;
                        height: 29px;
                    }
                    .close_icon {
                         width: 34px;
                         height: 34px;
                         background: #474c51;
                         border-radius: 17px;
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         padding: 6px;
                        .close {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>