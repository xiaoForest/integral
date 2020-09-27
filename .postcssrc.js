 module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  },
  'autoprefixer': {
    browsers: ['Android >= 4.0', 'iOS >= 7']  //   添加浏览器前缀 安卓4.0版本，ios 7.0版本以上
  },
  'postcss-pxtorem': {
    rootValue: 37.5,
    propList: ['*'],
    minPixelValue: 2 // 小于或等于`2px`不转换为视窗单位
  }
}
