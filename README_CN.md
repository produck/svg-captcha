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
// generate random text of length 4
var text = svgCaptcha.randomText();
// generate svg image
var captcha = svgCaptcha(text);
```
在 express中使用
```js
var svgCaptcha = require('svg-captcha');

app.get('/captcha', function (req, res) {
	var text = svgCaptcha.randomText();
	var captcha = svgCaptcha(text);
	req.session.captcha = text;
	
	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(captcha);
});
```

## API
`svgCaptcha.randomText([size|options])`  
该方法默认生成由4个字母/数字组成的字符串.  
可选参数:
- size: number  
生成的字符串的长度  
- options: object  
定义生成的字符串的长度或者忽略某些字符.  
例如 { size: 6, ignoreChars: '1234567890' } 会生成由6个字母组成的字符串，没有数字.

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