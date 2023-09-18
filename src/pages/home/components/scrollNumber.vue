<template>
    <div class="scroll-warpper">
      <div class="scroll-item" v-for="(item, index) in num_list" :key="index">
        <div :class="item | classesFilter">
          <span class="scroll-num">.</span>
          <span class="scroll-num">0</span>
          <span class="scroll-num">1</span>
          <span class="scroll-num">2</span>
          <span class="scroll-num">3</span>
          <span class="scroll-num">4</span>
          <span class="scroll-num">5</span>
          <span class="scroll-num">6</span>
          <span class="scroll-num">7</span>
          <span class="scroll-num">8</span>
          <span class="scroll-num">9</span>
        </div>
      </div>
    </div>
</template>
 
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0.00
    }
  },
  filters: {
    classesFilter(value) {
      let newvalue = value === '.' ? 'dot' : value
      return `scroll-num-warpper num-${newvalue}`
    }
  },
  computed: {
    num_list() {
      return this.value.toString().split('')
    }
  },
}
</script>
 
<style lang="scss" scoped>
.scroll-warpper {
  display: inline-block;
  vertical-align: middle;
  transition-duration: .3s;
  .scroll-item {
    overflow: hidden;
    height: 40px;
    float: left;
    .scroll-num-warpper {
      transform: translateY(40px);
      transition-duration: 1s;
      &.num-dot {
        transform: translateY(0);
      }
      &.num-0 {
        transform: translateY(-40px);
      }
      &.num-1 {
        transform: translateY(-80px);
      }
      &.num-2 {
        transform: translateY(-120px);
      }
      &.num-3 {
        transform: translateY(-160px);
      }
      &.num-4 {
        transform: translateY(-200px);
      }
      &.num-5 {
        transform: translateY(-240px);
      }
      &.num-6 {
        transform: translateY(-280px);
      }
      &.num-7 {
        transform: translateY(-320px);
      }
      &.num-8 {
        transform: translateY(-360px);
      }
      &.num-9 {
        transform: translateY(-400px);
      }
      .scroll-num {
        height: 40px;
        line-height: 40px;
        display: block;
        font-weight: 900;
        color: #ffc700;
        position: relative;
        font-size: 26px;
        text-align: center;
        text-shadow: 0.02rem 0 0.03rem rgba(0,0,0,.2), 0.02rem 0 0.03rem rgba(0,0,0,.2), 0.02rem 0 0.03rem rgba(0,0,0,.2), 0.02rem 0 0.03rem rgba(0,0,0,.2), 0.03rem 0 0.03rem #8000ff;
        &:after {
            background: none;
            content: "";
            width: 100%;
            position: absolute;
            left: 0;
            right: 0;
            top: 0.03rem;
            bottom: 0;
            margin: auto;
            z-index: -1;
            text-shadow: 0.02rem 0 0.03rem rgba(0,0,0,.2), 0.02rem 0 0.03rem rgba(0,0,0,.2), 0.02rem 0 0.03rem rgba(0,0,0,.2), 0.02rem 0 0.03rem rgba(0,0,0,.2), 0.03rem 0 0.03rem #8000ff;
            color: #8000ff;
        }
      }
    }
  }
}
</style>