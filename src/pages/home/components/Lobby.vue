<template>
    <view class="lobby_box">
        <view v-for="(item,index) in list" :key="index" class="lobby_item">
            <view class="top">
                <view class="left">
                    <img :src="item.icon" alt="">
                    <text class="title">{{item.title}}</text>
                </view>
                <view class="right">
                    <text>view all > </text>
                </view>
            </view>
            <view class="list_box">
                <view class="container" v-for="(ite,inx) in item.gamesList" :key="inx+'a'">
                    <img :src="ite.logo" alt="">
                    <view class="bottom">
                        <view class="left">
                            <text>{{ite.name}}</text>
                            <text>{{ite.subName}}</text>
                        </view>
                        <view class="right">
                            <img src="/static/home/star_empty.svg" alt="">
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import Fire from "@/static/home/fire.svg"
import GameLogo from "@/static/home/PGE120.png"
export default {
    data(){
        return {
            list:[
                {  
                    title:'Hot Games',
                    icon:Fire,
                    gamesList:[
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo}
                    ]
                },
                {  
                    title:'Game providers',
                    icon:Fire,
                    gamesList:[
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo}
                    ]
                },
                {  
                    title:'Megaways',
                    icon:Fire,
                    gamesList:[
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo}
                    ]
                },
                {  
                    title:'Feature buy',
                    icon:Fire,
                    gamesList:[
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo}
                    ]
                },
                {  
                    title:'Bonus games',
                    icon:Fire,
                    gamesList:[
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo}
                    ]
                },
                {  
                    title:'Fishing',
                    icon:Fire,
                    gamesList:[
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo}
                    ]
                },
                {  
                    title:'Bingo',
                    icon:Fire,
                    gamesList:[
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo},
                        {name:'Fortune Rabbit',subName:'Pocket Games Soft',logo:GameLogo}
                    ]
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
    .lobby_box {
        // padding: 10px;
        .lobby_item {
            margin-bottom: 16px;
            .top {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-bottom: 8px;
                justify-content: space-between;
                img {
                    width: 24px;
                    height: 24px;
                }
                .title {
                    font-size: 24px;
                    font-weight: 600;
                }
            }
            .list_box {
                padding-left: 5px;
                display: flex;
                gap: 8px;
                flex-shrink: 0;
                overflow: auto;
                .container {
                    width: 115px;
                    height: 155px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    border-radius: 4px;
                    position: relative;
                    flex-shrink: 0;
                    img {
                        width: 100%;
                        height: auto;
                        border-radius: 4px 4px 0 0;
                    }
                    .bottom {
                        position: relative;
                        z-index: 2;
                        display: flex;
                        justify-content: space-between;
                        padding: 0 8px;
                        align-items: flex-end;
                        position: absolute;
                        bottom: 8px;
                        width: 100%;
                        .left {
                            color: #fff;
                            font-size: 12px;
                            flex: 1;
                        }
                        .right {
                            img {
                                width: 14px;
                                height: 14px;
                            }
                        }

                    }
                    &::after {
                        position: absolute;
                        bottom: 0;
                        display: block;
                        content: "";
                        height: 81px;
                        width: 100%;
                        z-index: 1;
                        box-shadow: 0 0.048rem 0.16rem 0 rgba(6,10,14,.15);
                        background-image: linear-gradient(180deg,rgba(0,163,255,0) 0,#00a3ff 43%);
                        border-radius: 0 0 4px 4px;
                    }
                }
            }
        } 
    }
</style>