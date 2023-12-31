const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
    transpileDependencies: ['uview-ui'],
    devServer: {
        proxy: { //配置跨域
            '/api': {
                target: 'https://ad6161.lottotto.bet/api', //这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true, //允许跨域
                pathRewrite: {
                    '^/api': '' //请求的时候使用这个api就可以
                }
            },
            '/uploads': {
                target: 'https://ad6161.lottotto.bet/uploads', //这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true, //允许跨域
                pathRewrite: {
                    '^/uploads': '' //请求的时候使用这个api就可以
                }
            }
        }
    }
}