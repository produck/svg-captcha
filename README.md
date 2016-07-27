![svg-captcha](media/header.png)

# svg captcha

[![Build Status](https://travis-ci.org/lemonce/svg-captcha.svg?branch=master)](https://travis-ci.org/steambap/svg-captcha)

generate svg captcha in node.js

## Translations
[中文](README_CN.md)

## useful if you

- cannot or do not want to use google recaptcha
- have issue with install c++ addon

## install
> npm install --save svg-captcha

## usage
```js
var svgCaptcha = require('svg-captcha');
// generate random text of length 4
var text = svgCaptcha.randomText();
// generate svg image
var captcha = svgCaptcha(text);
```
with express
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

## sample image
![image](media/example.png)

## why use svg?

It does not require any c++ addon.  
The result image is smaller than jpeg image.

> This has to be a joke. /\<text.+\>;.+\<\/text\>/g.test...

svg captcha uses opentype.js underneath, which means that there is no
'&lt;text&gt;1234&lt;/text&gt;'.  
You get
'&lt;path fill="#444" d="M104.83 19.74L107.85 19.74L112 33.56L116.13 19.74L119.15 19.74L113.48 36.85...'  
instead.  
  
Even though you can write a program that convert svg to png, svg captcha has done its job  
—— make captcha recognition harder

## License
[MIT](LICENSE.md)