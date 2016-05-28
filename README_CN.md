[![Build Status](https://travis-ci.org/steambap/svg-captcha.svg?branch=master)](https://travis-ci.org/steambap/svg-captcha)

# svg验证码

在node.js中生成svg格式的验证码

## 如果你遇到这些问题

- 无法使用 google recaptcha
- 无法安装 c++ 模块

## 使用方法
```
var svgCaptcha = require('svg-captcha');
// generate random text of length 4
var text = svgCaptcha.randomText();
// generate svg image
var captcha = svgCaptcha(text);
```
在 express中使用
```
var svgCaptcha = require('svg-captcha');

app.get('/captcha', function (req, res) {
	var text = svgCaptcha.randomText();
	var captcha = svgCaptcha(text);
	req.session.captcha = text;
	
	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(captcha);
});
```

## 图片示例
![image](media/example.svg)

## 为什么使用 svg 格式?

不需要引用 c++ 模块。  
使用 opentype.js了，而且svg图片比jpeg格式图片要小

## Translations
[中文](README_CN.md)

## License
[MIT](LICENSE.md)