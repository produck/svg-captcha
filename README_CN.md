![svg-captcha](media/header.png)

# svg验证码

[![Build Status](https://travis-ci.org/lemonce/svg-captcha.svg?branch=master)](https://travis-ci.org/steambap/svg-captcha)

在node.js中生成svg格式的验证码

## Translations
[中文](README_CN.md)

## 什么情况下使用SVG验证码？

- 无法使用 google recaptcha
- 无法安装 c++ 模块

## 安装
> npm install --save svg-captcha

## 使用方法
```js
var svgCaptcha = require('svg-captcha');
// 生成驗證碼字符
var text = svgCaptcha.randomText();
// 生成 svg 圖片
var captcha = svgCaptcha(text);
// 一起生成
var c = svgCaptcha.create();
console.log(c);
// {data: '<svg.../svg>', text: 'abcd'}
```
在 express中使用
```Javascript
var svgCaptcha = require('svg-captcha');

app.get('/captcha', function (req, res) {
	var captcha = svgCaptcha.create();
	req.session.captcha = captcha.text;
	
	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(captcha.data);
});
```

## API
`svgCaptcha.create(options)`  
如果沒有任何參數，則生成的 svg 圖片有4個字符。  
  
options: object  
{  
&nbsp;&nbsp;size: 4 // 驗證碼長度  
&nbsp;&nbsp;ignoreChars: '0o1i' // 驗證碼字符中排除 0o1i  
&nbsp;&nbsp;noise: 1 // 干擾綫條的數量  
&nbsp;&nbsp;color: true // 驗證碼的字符有顔色  
&nbsp;&nbsp;background: '#cc9966' // 驗證碼圖片背景顔色  
}

以上配置對象會用來調用以下兩個接口  
`svgCaptcha.randomText([size|options])`  
`svgCaptcha(text, options)`  
在 1.1.0 版本之前你需要調用上面的兩個接口，但是現在只需要調用 create()  
一個接口就行，可以少打幾個字了 (^_^)/

## 图片示例
![image](media/example.png)

## 为什么使用 svg 格式?

不需要引用 c++ 模块。  
如果你认为可以用正则匹配text标签，那就大错特错了。
这个项目使用了opentype.js，把文字转化为了路径。  
换句话说，你得到的是
'&lt;path fill="#444" d="M104.83 19.74L107.85 19.74L112 33.56L116.13 19.74L119.15 19.74L113.48 36.85...'
这样的路径，没有text标签。所以SVG验证码可能比的图片普通验证码要更难识别，因为你必须先做SVG到其它格式的转化。

## License
[MIT](LICENSE.md)