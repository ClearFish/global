<template>
    <view class="big_box">
        <view class="container">
            <canvas  id="myCanvas" canvas-id="myCanvas" :style="{width: '450px', height: '180px'}" type="2d"></canvas >
            <canvas  id="myCanvas2" canvas-id="myCanvas2" :style="{width: '450px', height: '180px',marginTop:'40px'}" type="2d"></canvas >
        </view>
    </view>
</template>
<script>
import {resultRecord} from "@/api/index.js"
export default {
    data() {
        return {
            ctx:null,
            renderVal:[],
            satVal:[],
            arrs:[],

            ctx2:null,
            renderVal2:[],
            satVal2:[]
        }
    },
    onShow() {
        this.initData();
        
    },
    onReady() {
        this.ctx = uni.createCanvasContext(`myCanvas`);
        this.ctx2 = uni.createCanvasContext(`myCanvas2`);
    },
    methods:{
        initData() {
            var newArr = [];
            var sortArr = []
            resultRecord({game_id:'2',pageIndex:1,pageSize:100}).then(res=>{
                this.arrs = res.data.rows
                
                let arrVal = res.data.rows.map(item=>{
                    return item.result[0]
                })
                for(var i = 0;i<arrVal.length;i++) {
                    if(i == 0) {
                        newArr.push([arrVal[0]])
                    }else {
                        if(newArr[newArr.length-1][0] == arrVal[i]) {
                            newArr[newArr.length-1].push(arrVal[i])
                        }else {
                            newArr.push([arrVal[i]])
                        }
                    }
                }
                this.renderVal = newArr.slice(0,15);
                this.initArr(1)
                this.init(1);
                this.ctx.draw();
                setTimeout(()=>{
                    this.initData2()
                },4000)
                // this.initData2()
            })
        },
        initArr(type) {
            var sat =[]
            var ctx = type == 1 ? this.ctx : this.ctx2;
            for (var i = 0; i < 15; i++) {
                ctx.moveTo(i*30, 0);
                ctx.lineTo(i*30, 180);
                for (var j = 0; j < 6; j++) {
                    ctx.moveTo(0, j*30);
                    ctx.lineTo(450, j*30);
                    var obj = {
                        copuied : false,
                        seat:[]
                    }
                    obj.seat.push([i,j])
                    sat.push(obj)
                }
            }
            ctx.moveTo(450, 0);
            ctx.lineTo(450, 180);
            ctx.moveTo(0, 180);
            ctx.lineTo(450, 180);
            ctx.lineWidth=1;
            ctx.strokeStyle="#c3c3c3";
            ctx.stroke();
            this.satVal = sat;
        },
        init(type) {
            console.log(type,"typeeee")
            let initArr = type == 1 ? this.renderVal : this.renderVal2;
            let moreRow = initArr.findIndex(item=>item.length>8);
            let sats = this.satVal
            if(moreRow != -1) {
                let lessEight = initArr.slice(0,moreRow);
                let moreEight = initArr.slice(moreRow);
                console.log(lessEight,moreEight,"more")
                for(var i = 0;i<lessEight.length;i++) {
                    if(lessEight[i].length == 1) {
                        if(type == 1) {
                            this.renderCanvas(i,0,lessEight[i][0])
                        }else {
                            this.renderCanvas2(i,0,lessEight[i][0])
                        }
                    }else {
                        for(var j = 0;j<lessEight[i].length;j++) {
                            if(type ==1) {
                                this.renderCanvas(i,j,lessEight[i][0])
                            }else {
                                this.renderCanvas2(i,j,lessEight[i][0]);
                            }
                        }
                    }
                }
                for(var i = 0;i<moreEight.length;i++) {
                    if(i == 0) {
                        for(var j = 0;j<moreEight[0].length;j++) {
                            var num = j-5
                            var x = j > 5 ? moreRow + num : moreRow;
                            var y = j > 5 ? 5:j
                            if(type ==1) {
                                this.renderCanvas(x,y,moreEight[0][0])
                            }else {
                                this.renderCanvas2(x,y,moreEight[0][0]);
                            }
                            const cupiedIndex = sats.findIndex(item=>item.seat.toString() == [x,y].toString());
                            sats[cupiedIndex].copuied = true
                        }
                    }else {
                        var x = moreRow + i;
                        for(var j = 0;j<moreEight[i].length;j++) {
                            var length = moreEight[i].length
                            var y = j;
                            const cupiedIndex = sats.findIndex(item=>item.seat.toString() == [x,y].toString());
                            if(sats[cupiedIndex] && sats[cupiedIndex].copuied) {
                                // console.log(x,y,"[[==]]",length,x);
                                var firstX = x+1;
                                var firstY = y-1;
                                var moreNum = length - y;
                                console.log(moreNum)
                                for(var k = 0;k<moreNum;k++) {
                                    if(type ==1) {
                                        this.renderCanvas(firstX+k > 14 ? 14 : firstX+k ,firstY,moreEight[i][0])
                                    }else {
                                        this.renderCanvas2(firstX+k > 14 ? 14 : firstX+k ,firstY,moreEight[i][0]);
                                    }
                                    var findindex = sats.findIndex(item=>item.seat.toString() == [firstX+k > 14 ? 14: firstX+k,firstY].toString());
                                    sats[findindex].copuied = true
                                }         
                                break;
                            }else {
                                var findindex = sats.findIndex(item=>item.seat.toString() == [x,y].toString());
                                if(findindex == -1) {
                                    var y = 5;
                                    var moreNum = length - y;
                                    console.log(x,y,moreNum,"000")
                                    for(var k = 0;k<moreNum;k++) {
                                        if(type ==1) {
                                            this.renderCanvas(x+k>14?14:x+k,5,moreEight[i][0])
                                        }else {
                                            this.renderCanvas2(x+k>14?14:x+k,5,moreEight[i][0]);
                                        }
                                        var findindex = sats.findIndex(item=>item.seat.toString() == [x+k>14?14:x+k,5].toString());
                                        sats[findindex].copuied = true
                                    }  
                                }else {
                                    if(type ==1) {
                                        this.renderCanvas(x,y,moreEight[i][0])
                                    }else {
                                        this.renderCanvas2(x,y,moreEight[i][0])
                                    }
                                    sats[findindex].copuied = true
                                }
                            }
                        }
                    }
                }
            }else {
                for(var i = 0;i<initArr.length;i++) {
                    if(initArr[i].length == 1) {
                        if(type ==1) {
                            this.renderCanvas(i,0,initArr[i][0])
                        }else {
                            this.renderCanvas2(i,0,initArr[i][0])
                        }
                        
                    }else {
                        for(var j = 0;j<initArr[i].length;j++) {
                            if(type ==1) {
                                this.renderCanvas(i,j,initArr[i][0]);
                            }else {
                                this.renderCanvas2(i,j,initArr[i][0]);
                            }
                        }
                    }
                }
            }
        },
        renderCanvas(x,y,number){
            const gcolor = '#5cba47'
            const rcolor = '#fb4e4e'
            const mcolor = "#eb43dd"
            let nummberColor = ''
            if(['1','3','7','9'].includes(number)) {
                nummberColor = gcolor
            }else if(['2','4','6','8'].includes(number)) {
                nummberColor = rcolor
            }
            const w = 40;
            if(number == '0' || number == '5') {
                // 上半圆
                this.ctx.beginPath();
                var a = 15+30*x;
                var b = 15+30*y;
                this.ctx.arc(15+30*x,15+30*y, 10, 0.75*Math.PI, 1.75*Math.PI);
                this.ctx.fillStyle = number == '0' ? rcolor : gcolor
                this.ctx.fill();

                // 下半圆
                this.ctx.beginPath();
                var a = 15+30*x;
                var b = 15+30*y;
                this.ctx.arc(15+30*x,15+30*y, 10, 1.75*Math.PI, 0.75*Math.PI);
                this.ctx.fillStyle = mcolor
                this.ctx.fill();
                
            }else {
                this.ctx.beginPath();
                this.ctx.fillStyle = nummberColor;
                this.ctx.arc(15+30*x,15+30*y, 10, 0, 2 * Math.PI);
                this.ctx.fill();
                
            }

            // 绘制文字
            this.ctx.font = "12px Arial"
            this.ctx.fillStyle = '#fff'
            this.ctx.textAlign = "center"
            this.ctx.fillText(number, 15+30*x,20+30*y);
            
        },

        initData2() {
            var newArr = [];
            var sortArr = []
            let arrVal = this.arrs.map(item=>{
                return item.result[0]>4?'B':'S'
            })
            for(var i = 0;i<arrVal.length;i++) {
                if(i == 0) {
                    newArr.push([arrVal[0]])
                }else {
                    if(newArr[newArr.length-1][0] == arrVal[i]) {
                        newArr[newArr.length-1].push(arrVal[i])
                    }else {
                        newArr.push([arrVal[i]])
                    }
                }
            }
            this.renderVal2 = newArr.slice(0,15);
            console.log(this.renderVal2,"this.renderVal2")
            this.initArr(2)
            this.init(2);
            this.ctx2.draw()
        },
        renderCanvas2(x,y,number) {
            const gcolor = '#5cba47'
            const rcolor = '#ffc511'
            let nummberColor = number == 'B' ? rcolor : gcolor
            const w = 40;
            this.ctx2.beginPath();
            this.ctx2.fillStyle = nummberColor;
            this.ctx2.arc(15+30*x,15+30*y, 10, 0, 2 * Math.PI);
            this.ctx2.fill();

            // 绘制文字
            this.ctx2.font = "12px Arial"
            this.ctx2.fillStyle = '#fff'
            this.ctx2.textAlign = "center"
            this.ctx2.fillText(number, 15+30*x,20+30*y);
        }
    }
}
</script>
<style lang="scss" scoped>
.big_box {
    padding: 10px;
}
</style>