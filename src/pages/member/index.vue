<template>
    <view class="member_box">
        <view class="top_bg">
            <img src="/static/member/home_bg.png" alt="">
        </view>
        <view class="top_header">
            <u-icon name="arrow-left" color="#fff" size="22"></u-icon>
            <text>My Account</text>
        </view>
        <view class="info_card_box">
            <view class="info_card">
                <view class="top_right">
                    <view class="content">
                        <view class="title">entry</view>
                    </view>
                </view>
                <view class="center">
                    <view class="avatar">
                        <img src="/static/member/avatar.png" alt="">
                    </view>
                    <view class="info">
                        <view class="name">
                            <text>aa123123</text>
                            <u-icon name="edit-pen-fill" color="#47404d" size="22"></u-icon>
                        </view>
                        <view class="middle">
                            <text>Nome do usuário:</text>
                            <view class="copy_box">
                                <text>aa123123</text>
                                <img src="/static/member/copy.svg" alt="">
                            </view>
                        </view>
                        <view class="bottom">
                            <text>R$0,00</text>
                            <img src="/static/member/refresh.svg" alt="">
                        </view>
                    </view>
                </view>
                <view class="bottom_box">
                    <view class="top">
                        <view class="left">
                            <view class="vip_logo"></view>
                            <text>vip</text>
                        </view>
                        <view class="right">
                            <text>Benefícios</text>
                            <view class="logo_box"></view>
                        </view>
                    </view>
                    <view class="progress">
                        <view class="progress_container"></view>
                        <text>0/1</text>
                    </view>
                </view>
                <view class="action_box1">
                    <view class="action_btn">Despoit</view>
                    <view class="action_btn">Widthdraw</view>
                </view>
            </view>
        </view>
        <view class="lsit_box">
            <view class="top">
                <text class="title">Centro de associados</text>
            </view>
            <view class="list">
                <view class="list_item" v-for="(item,index) in lists" :key="index">
                    <view class="icon_box">
                        <img :src="item.icon" alt="">
                    </view>
                    <text>{{item.name}}</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            lists:[
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'},
                {name:'Centro de recompensa',icon:'/static/member/cup.svg'}
            ]
        }
    }   
}
</script>
<style lang="scss" scoped>
.member_box {
    width: 100%;
    height: 100vh;
    background: #fff;
    position: relative;
    .top_bg {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        img {
            width: 100%;
            height: auto;
        }
    }
    .top_header {
        position: relative;
        z-index: 2;
        display: flex;
        gap: 10px;
        padding: 10px;
    }
    .info_card_box {
        width: 100%;
        padding-left: 20px;
        margin-top: 10px;
        .info_card {
            width: 100%;
            height: 240px;
            border-radius: 10px 0 0 10px;
            position: relative;
            z-index: 2;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArAAAAFyBAMAAAD/ovSnAAAAKlBMVEUAAABGRkb8/Pzs7OzY2NjDw8NSUlJzc3Ovr6+Hh4diYmKbm5tLS0tLS0vKcUYVAAAADnRSTlMAIyMjIyMiIyMjIyMWDWNh+mIAAAQsSURBVHja7NaxjcJQEEXRtzlI64SILY7EGbFboAW34Bac4AKQICGimBX/Sa5gfvCke5KZ+AajUTOgkL4IW0+741kosz339fAnlHnd9/XnV6jimrbdhTKHs2THk1Do8pS9ObGlXlfPw8AlKLQH/VyuQqn36SENA09suW0YND6Ecp9Ro9ABYY2wKQhrhE1BWCNsCsIaYVMQ1gibgrCdjFqEDhbCNoRNQVgjbArCGmFTENYIm4KwRtgUhDXCpiBsJ4smoYOJsA1hUxDWCJuCsEbYFIQ1wqYgrBE2BWGNsCkIa4RNQdhOJs1CBzNhG8KmIKwRNgVhjbApCGuETUFYI2wKwhphUxDWCJti1ip0sBK2IWwKwhphUxDWCJuCsEbYFIQ1wqYgrBE2BWE7WXUTOrgRtiFsCsIaYVMQ9p8dOqhxIAiAIDZYQiEUlkI4HeyTtjHMoyQbgkdshdgRWyF2xFaIHbEVYkdsxd/5HS74iX2JrRA7YivEjtgKsSO2QuyIrRA7YivEjtgKsXMh9jlc8Ih9ia0QO2IrxI7YCrEjtkLsiK0QO2IrxI7YCrEjtkLsiK14zvdwwVfsS2yF2BFbIXbEVogdsRViR2yF2BFbIXbEVogdsRViR2yF2BFbIXYuxH4OF3zEvsRWiB2xFWJHbIXYEVshdsRWiB2xFWJHbIXYEVshdsRWiB2xFWL/2bmD2kaiAAqCH8tSWAqmEAqhYAqmYAqmEHKR5ikQ5tBSFYQG0CNshbAjbIWwI2yFsCNshbAjbIWwI2yFsCNshbAjbIWwI2yFsCNshbAjbIWwI2yFsCNshbAjbIWwI2yFsCNshbAjbIWwI2yFsCNshbAjbMU/N84/NqcJwo6wFcKOsBXCjrAVwo6wFcKOsBXCjrAVwo6wFcKOsBXCjrAVwo6wFf/P43CDh7AXYSuEHWErhB1hK4QdYSuEHWErhB1hK4QdYSuEHWErhB1hKx7n63CDL2EvwlYIO8JWCDvCVgg7wlYIO8JWCDvCVgg7wlYIOzeEfR1u8BL2ImyFsCNshbAjbIWwI2yFsCNshbAjbIWwI2zF6/wcbvAj7EXYCmFH2AphR9gKYUfYCmFH2AphR9gKYeeGsO/DDd7CXoStEHaErRB2hK0QdoStEHaErRB2hK0QdoSteJ/n4QZPYS/CVgg7wlYIO8JWCDvCVgg7wlYIO8JWCDvCVjzP53CDj7AXYSuEHWErhB1hK4QdYSuEHWErhB1hK4QdYSs+5/twg29hL8JWCDvCVgg7wv62U4c4DAJRFEVv/ZAUg6KLw3xV9gimjgQMisVU/EzYwENM8s4SrritcNjksK1w2OSwrQhiw+SuIOKLif0i4JpmTOocNoDSL5jOHfT8YELHTOoGTGjaIa1+gVAZqV5vTCVrpuLJCh0LVTdiMusOVW9COOwzAPgDJn6K2b84zVgAAAAASUVORK5CYII=),
                              url(/static/member/badge.png),linear-gradient(90deg,#f1f9ff,#b3bcc8)!important;
            background-repeat: no-repeat;
            background-size: calc(100% - 3px) calc(100% - 3px),auto 80%,100% 100%;
            background-position: 50%,bottom 1px right 1px;
            .top_right {
                display: flex;
                justify-content: flex-end;
                .content {
                    height: 31px;
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAABFFBMVEUAAADs4uLey8vbx8f7+fn59fXr4ODk1dXy6+v////48/P28PDt5OTp3Nz07e3h0dH18PD38/Pbx8fx6encycnx6eney8v+/f3YwsLXwcHz7e3ey8vbx8f69/ft4+P07u7bx8fw5+f7+Pjey8vh0NDfzc369/f7+fnz7Oz7+fn28fH8+/v8+/v9/Pz07+/l19f7+fn69/f59fXz7Ozu5OTp3d3s4uL7+fnw5+fq39/59fXp3d3z7Ozn2trx6ur7+fnl19fz7Ozx6urk1dX07+/59fX28fH38/PYwsL////9/Pzl1tb38vLbxsbt4+Pfzc3i0tLh0ND07+/n2trz7Ozp3d3q39/x6urw5+f69/f7+fncycn160ecAAAASHRSTlMAAs1/+TsmJiatfVxcRx4YEvfz5eLc1LeyrJ2YkpCPhXpyTkIrHQz4+Pbx6+jk5OLa2sa9tbWxrqmmoKCXk4uGgH1pWkM8KgdjC1XjAAABVklEQVQoz33Nh3KCQBSF4XNTgCRGTbMbu+m9996EoFKk+P7vkbsSxzLiN8Nhlp+ZBS38hFoAkuFV9Ea45EEjPO+X63sN+D07c8O2jn3/Ko4n34fH8nGMWvLyvCeeJ/It6GN+WNlbBDvlrGla/WtFG8WVRVc0kfE5VgvBDYu7GgzDIMUYkQF7PzQYLMsixRp2BvZi3Ue3LQuO45DiOGuPhVLk1WEbxDXDX0WC67qkuO7aEtgGn6IArvmtEA90XSdJZ5sASrq+DOBcZxLx9DOLALHeT5f6IHc6HZJ4WByIcL0JThLxwLZtkuyeCwh3dkAiHpimSbIZEPc+mP9k4oGqqiSrgSPgWe2TiWeQhbdldSy3Wi2SWxPIxIN2u41qe4JqLzWbTdSaE9REEk8F2cTMmEQWFZG73e56DBPE1jnhl63mirNjirlVUThPg++pkJpWU0A6vKbxB+LDwWOR0O+IAAAAAElFTkSuQmCC),linear-gradient(0deg,#bb0c0c,#ec515b);
                    background-position: 35px,left 6px top -1px;
                    background-size: 20px 20px,100% 100%;
                    background-repeat: no-repeat;
                    position: relative;
                    width: 160px;
                    &::before {
                        content: "";
                        width: 36px;
                        height: 30px;
                        position: absolute;
                        left: -28px;
                        top: 0;
                        z-index: 2;
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAA1CAMAAAAZFmeBAAABR1BMVEUAAAC+EBDZNz3oSlTGGhzQLDDdO0LpTFbLIiXFGhy8Dg7gQEjAFBXqTli7DQ3pTVbCFRe8Dg7nSVK9Dw/sUFrBFBXoS1W8Dg7fP0fIHiDIHSDgQEfsUFrgQEjIHiC+EBDrUFrIHiG+EBDhQEfEGBrePkXWMznhQkrSLTHEGRvMJSi8Dg7YNTq7DQ3NJirTLjPpTVfZNjzOKCy8Dg7qTljaOD7UMDW9EBDqT1nPKS27DQ3bOUC/ExToTFbVMTe8Dg7RKy/dPEO7DQ3sUVvWMznmSVLpTVfSLTHAFBXqTljsUFvqTljpTFbnSVLlR0/cO0LbOD/ZNTvVMDbOJyvMJCfKICPoS1TDFhjjRU3BFBXiREzhQkrgQUnfP0fePUS/EhPWMznTLjPSLTHRKy/PKS3IHiHHHR/GHB7FGhy9Dg7EGRu+EBC7DQ3YUJKvAAAASnRSTlMA/gR6ahcK+vr59/b18e7j0snBs7KtlHFmXE9MSkVAMyUjHRwP+fn39evq5uPb2tjIyL2ppqSknp2UkYd2bmdnX1hIPTk2NDArIWNtLcoAAAE8SURBVFjDtcxVTkNRFAXQ3VcvdTfquLu7uzsUd+b/zQdNSJon184awALgKuXt8cC2emjQVpIhkrvR5+Pq73+lSfeOOmiyNUp3A+uDu4pAx1yA7kY1eq4C9Nnde/JgYC1Ed8MZ3ZcFQ1qS7gbsl3JgJn0tBaZyHTcSYK615VYcLPM7YbCSa6uLgqWl+oEgWEsT3pg5FAMWY4S3a+hIBJhUe+lurLY/8AOj+WN+YDVOeLsGHnmB2UbnEyewW3zmBA5TL3zAQRs+4QIetX66G+XuUw7gU/DQ3ch6zpiBV4bwhuOVFQTyN0YQkPG+M4GIrPeDBYQUur4YQEw5fGENgmoJuhtw+K8sQNxmmO6GNuu/NwMplQTdDRRjNkOQVpzwfeuDAs5UxPapA2pUFkZ6jG95zuXUdCzSFwz6fv78AmV2dI1UUtWvAAAAAElFTkSuQmCC);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                    &::after {
                        content: "";
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAMAAAAS21dbAAAAYFBMVEUAAAD2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYf2hYePm/CpAAAAH3RSTlMA+Obth0IXDAby4MCQSDYuI9rQzHVX6LarqoBuaF9OTNUBHwAAAIJJREFUGNNdkNsSREAMRGUY1t0u607+/y+RojMmb32qkk53UBqKPoFOz8yjA4jPyRPoiK/5xR7IGoBFQFgB/OUGlQA2FbAB1EZ2OoDmK6AAiFsPJLnc8E6YR1YhPNUxtbfcCS/qg6a+5fpO1Glizds+cuZ3QeI7aF9XkMnp02ZUOPIAQKoPDTi3mn4AAAAASUVORK5CYII=) 50%;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        width: 11px;
                        height: 16px;
                        position: absolute;
                        top: 6px;
                        right: 10px;
                    }
                    .title {
                        text-align: center;
                        line-height: 31px;
                        padding-left: 10px;
                    }
                }
            }
            .center {
                width: 100%;
                padding: 0 20px;
                display: flex;
                gap: 10px;
                align-items: center;
                margin-top: 10px;
                .avatar {
                    width: 60px;
                    height: 60px;
                    background: #caa86d;
                    padding: 2px;
                    border-radius: 30px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 30px;
                    }
                }
                .info {
                    .name {
                        color: #47404d;
                        font-size: 14px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .middle {
                        display: flex;
                        gap: 10px;
                        color: #47404d;
                        font-size: 14px;
                        align-items: center;
                        .copy_box {
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            padding: 4px;
                            background: #919ba6;
                            border-radius: 30px;
                            color: #fff;
                            font-weight: 600;
                            img {
                                width: 18px;
                                height: 18px;
                            }
                        }
                    }
                    .bottom {
                        display: flex;
                        align-items: center;
                        font-size: 24px;
                        font-weight: 600;
                        color: #707070;
                        gap: 8px;
                        img {
                            width: 20px;
                            height: 20px;
                        }
                    }
                }
            }
            .bottom_box {
                padding: 0 20px;
                margin-top: 18px;
                .top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .left {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        color: rgba(37,37,37,.6);
                        font-size: 14px;
                        font-weight: 700;   
                        .vip_logo {
                            width: 24px;
                            height: 16px;
                            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAhCAMAAACoVtiLAAAASFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACrhKybAAAAGHRSTlMAZkBNYgNfFDAGUyELWRkQSzo1KiZGHUnmeP/XAAABPElEQVQ4y8WS3ZKDIAyFAwRBBRS17fu/6WoOnU79Yb3a/a4ySU5IQuiUZBS/BrpNYrXC9xWdEh53860CDd2FIYi3BRqC6SLc5/z89rQyxGh3icMgQbMFXxJ0OpQpvFILgaAd6sZ1qtWZy/NohadWoqNSGo9NDOuJvJ6az4Atb6uZV8sjRjRvYd6KGOR19Fkh0pQnciyuIOPD9S6s3p80yn/BaCN8xpLtxEAQhUtvaWvJx1K2MMljcbZ4vrjSqjWxkWnt/CRaECplll5WlVl60laWaDc954Bt80cQW7j06uuH2Tt6E+Q89UDoGpT7cw9pfveNr5LgsvpiTiOMvL8P9Qtuf9JNPb87udAq/iBIdUGgA7GWP9IRXxMsdCRU8tnSCeZaoOmM5VqQTgXtaC540P/gdIWAnPvn5/5Q8AMVTwrXxKIMmwAAAABJRU5ErkJggg==') no-repeat center;
                            background-size: 100% 100%;
                        }
                    }
                    .right {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        color: rgba(37,37,37,.6);
                        font-size: 14px;
                        .logo_box {
                            width: 14px;
                            height: 14px;
                            background: url('data:image/png;base64,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') no-repeat center;
                            background-size: 100% 100%;
                        }
                    }
                }
                .progress {
                    margin-top: 4px;
                    display: flex;
                    font-size: 14px;
                    color: rgba(37,37,37,.6);
                    align-items: center;
                    gap: 10px;
                    .progress_container {
                        width: 100%;
                        border-radius: 4px;
                        height: 4px;
                        background: rgba(102,102,102,.3);
                    }
                }
            }
            .action_box1 {
                margin-top: 20px;
                display: flex;
                padding: 0 20px;
                align-items: center;
                gap: 20px;
                .action_btn {
                    padding: 4px 15px;
                    border-radius: 40px;
                    box-shadow: 0 1px 1px 0 hsla(0,0%,43%,.5);
                    color: #454545;
                    background: linear-gradient(0deg,hsla(0,0%,100%,.7),hsla(0,0%,100%,.3),hsla(0,0%,100%,0) 67%,#fff);
                    display: flex;
                    justify-content: center;
                    font-size: .24rem;
                    text-align: center;
                    font-weight: 700;
                }
            }
        }
    }
    .lsit_box {
        margin-top: 24px;
        .top {
            padding-left: 20px;
            position: relative;
            .title {
                padding: 4px 12px;
                background: #dfdfdf;
                color: #454545;
                border-radius: 20px;
                position: relative;
                display: inline-block;
                z-index: 9;
            }
            &::after {
                    content: "";
                    position: absolute;
                    height: 1px;
                    background: #f3f3f3;
                    width: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 8;
                    left: 20px;
                }
        }
        .list {
            padding: 20px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            row-gap: 30px;
            .list_item {
                width: 25%;
                // padding: 4px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                
                color: #565659;
                font-size: 13px;
                text-align: center;
                .icon_box {
                    width: 48px;
                    height: 48px;
                    border-radius: 48px;
                    background: #fff2db;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }
    }
}
</style>