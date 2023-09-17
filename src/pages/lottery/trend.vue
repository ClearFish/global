<template>
    <view class="big_box">
        <uni-nav-bar title="Total Report" fixed :leftType="2"></uni-nav-bar>
        <view class="content_box" id="captureId" @touchstart="getTouchStart" @touchend="getTouchEnd">
            
        </view>
    </view>
</template>
<script>
import html2canvas from 'html2canvas';
var longTouch = null;
export default {
    data() {
        return {
            resultList:[
                2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,4,5,6,7,8,9
            ],
            sortArr :[]
        }
    },
    onLoad() {
        this.initData(this.resultList)
    },
    methods:{
        initData(arr) {
            var arr1 = [];
        },
        getTouchStart() {
            clearTimeout(longTouch)
            longTouch = setTimeout(()=>{
                this.saveImg()
            },800)
        },
        getTouchEnd(){
            clearTimeout(longTouch);
        },
        saveImg() {
            let dom = document.getElementById('captureId');
            // let saveBtn = document.getElementById('save_btn');
            // saveBtn.parentNode.removeChild(saveBtn)
            const Canvas = document.createElement('canvas');
            const width = dom.offsetWidth;  // 可见屏幕的宽
            const height = dom.offsetHeight;  // 可见屏幕的高
            const scale = 4;  // 设备的devicePixelRadio
            // 将Canvas画布放大scale倍，然后放在小的屏幕里，解决模糊问题
            Canvas.width = width * scale;
            Canvas.height = height * scale;
            Canvas.style.width = width + 'px';
            Canvas.style.height = height + 'px';
            // Canvas.getContext('2d').scale(scale, scale);
              html2canvas(dom, {
                    width,
                    height,
                    scale: scale,
                    canvas: Canvas,
                    dpi: 350,
                    useCORS:true,
                    logging: true,
                }).then(canvas=>{
                    const context = canvas.getContext('2d');
                    // 关闭抗锯齿形
                    context.mozImageSmoothingEnabled = false;
                    context.webkitImageSmoothingEnabled = false;
                    context.msImageSmoothingEnabled = false;
                    context.imageSmoothingEnabled = false;
                    // canvas转化为图片
                    const img = this.canvas2Image(canvas, width * scale, height * scale);
                    dom.appendChild(img);
                    img.style.cssText = "width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;";
                })
        },
        canvas2Image(canvas, width, height) {
            const retCanvas = document.createElement('canvas');
            const retCtx = retCanvas.getContext('2d');
            retCanvas.width = width;
            retCanvas.height = height;
            retCtx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
            const img = document.createElement('img');
            img.src = retCanvas.toDataURL('image/png');  // 可以根据需要更改格式
            return img;
        }
    }
}
</script>
<style lang="scss" scoped>
.content_box {
    width: 100%;
    height: 200px;
    background: red;
}
</style>