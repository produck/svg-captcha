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
如果没有任何参数，则生成的 svg 图片有4个字符。  
  
options: object  
{  
&nbsp;&nbsp;size: 4 // 验证码长度  
&nbsp;&nbsp;ignoreChars: '0o1i' // 验证码字符中排除 0o1i  
&nbsp;&nbsp;noise: 1 // 干扰线条的数量  
&nbsp;&nbsp;color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有  
&nbsp;&nbsp;background: '#cc9966' // 验证码图片背景颜色  
}

以上配置对象会用来调用以下两个接口  
`svgCaptcha.randomText([size|options])`  
`svgCaptcha(text, options)`  
在 1.1.0 版本之前你需要调用上面的两个接口，但是现在只需要调用 create()  
一个接口就行，可以少打几个字了 (^_^)/

`返回:` 对象  
(属性) data: string  
(属性) text: string  

`svgCaptcha.createMathExpr(options)`  
和前面的 api 的参数和返回值都一样。不同的是这个 api 生成的 svg 是一个算数式，而
text 属性上是算数式的结果。不过用法和之前是完全一样的。

## 图片示例
默认生成图片：

![image](media/example.png)

生成数学公式并且有颜色的验证码：

![image2](media/example-2.png)

## 为什么使用 svg 格式?

不需要引用 c++ 模块。  
如果你认为可以用正则匹配text标签，那就大错特错了。
这个项目使用了opentype.js，把文字转化为了路径。  
换句话说，你得到的是
'&lt;path fill="#444" d="M104.83 19.74L107.85 19.74L112 33.56L116.13 19.74L119.15 19.74L113.48 36.85...'
这样的路径，没有text标签。所以SVG验证码可能比的图片普通验证码要更难识别，因为你必须先做SVG到其它格式的转化。

## License
[MIT](LICENSE.md)