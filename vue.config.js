var path = require('path')
const SvgSpriteLoader = require('svg-sprite-loader/plugin')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  publicPath: './',
  configureWebpack: config => {
    // config.module.rules.push(
    //   {
    //     // 处理markdown文件
    //     test: /\.md$/,
    //     use: [
    //       {
    //         loader: 'vue-loader'
    //       },
    //       {
    //         loader: require.resolve('./markdownLoader')
    //       }
    //     ]
    //   }
    // )
    config.plugins.push(new SvgSpriteLoader({ plainSprite: true }))
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
   
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
        // symbolId: filePath => path.basename(filePath),
        extract: true,
        spriteFilename: 'sprites.svg',
        outputPath: 'sprites/',
        publicPath: 'sprites/'
      }).end()
      // .use('svgo-loader') // 使用这个loader会把双色svg图变成单色的
      // .loader('svgo-loader')
      // .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()
  }
}