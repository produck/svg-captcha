[![Build Status](https://travis-ci.org/steambap/svg-captcha.svg?branch=master)](https://travis-ci.org/steambap/svg-captcha)

# svg captcha

generate svg captcha in node.js

## useful if you

- cannot or do not want to use google recaptcha
- have issue with install c++ addon

## usage
```
var svgCaptcha = require('svg-captcha');
// generate random text of length 4
var text = svgCaptcha.randomText();
// generate svg image
var captcha = svgCaptcha(text);
```
with express
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

## sample image
![image](media/example.png)

## why use svg?

It does not require any c++ addon.  
It uses opentype.js underneath and the result image is smaller than jpeg image.

## Translations
[中文](README_CN.md)

## License
[MIT](LICENSE.md)