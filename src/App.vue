<script>
export default {
  onLaunch () {
    uni.hideTabBar()
    console.log('App Launch')
    this.$store.dispatch('GetSite')
    const lang = uni.getStorageSync('lang');
    
    uni.setLocale('en');
    console.log('lang', lang)
    if(lang) {
          this.$i18n.locale = lang
          
      } else {
          uni.setStorageSync('lang', 'en_us')
      }
  },
  onShow () {
    // const code = 'zh-tw' // 默认中文繁体
    // uni.setLocale(code);
    // this.$i18n.locale = 'th_th';
    // this.$i18n.locale = code
    uni.hideTabBar()
    if (this.$route.query.sharecode) {
      uni.setStorageSync('sharecode', this.$route.query.sharecode)
    }
    //console.log('App Show')
  },
  onHide () {
   // console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import "./styles/flex.scss";
@import "uview-ui/index.scss";
/*每个页面公共css */
html,body{
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: #0f1923;
}
body{
  overflow-x: hidden;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}
:root uni-page-body {
  color: #fff !important;
}
</style>
