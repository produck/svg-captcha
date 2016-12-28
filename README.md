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
```Javascript
var svgCaptcha = require('svg-captcha');

var captcha = svgCaptcha.create();
console.log(c);
// {data: '<svg.../svg>', text: 'abcd'}
```
with express
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
If no option is passed, you will get a random string of four characters and corresponding svg.  
  
options: object  
{  
&nbsp;&nbsp;size: 4 // size of random string  
&nbsp;&nbsp;ignoreChars: '0o1i' // filter out some characters like 0o1i  
&nbsp;&nbsp;noise: 1 // number of noise lines  
&nbsp;&nbsp;color: true // characters will have distinct colors instead of grey, true if background option is set  
&nbsp;&nbsp;background: '#cc9966' // background color of the svg image  
}

The previous options will be passed to the following functions
`svgCaptcha.randomText([size|options])`  
`svgCaptcha(text, options)`
In pre 1.1.0 version you have to call these two functions,  
now you can call create() to save some key strokes ;).

`return:` object  
(property) data: string  
(property) text: string  

`svgCaptcha.createMathExpr(options)`  
Similar to create api, you have the same options and return value. 
The difference is that data is a svg will be an math equation on screen 
and text will be the result of that equation in string, otherwise the usage 
is the same as above.

## sample image
default captcha image:

![image](media/example.png)

math expression image with color options:

![image2](media/example-2.png)

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