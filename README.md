# svg captcha

# Installation
Using npm,
```bash
npm install svg-captcha
```

# Get Started
## Basic use
Generating a svg captcha factory by default options.

```js
// Create a SvgCaptchaFactory.
const SvgCaptchaFactory = require('svg-captcha')();

// Use factory to generate a captcha instance.
const captcha = SvgCaptchaFactory.create();

// Get the svg image.
const image = captcha.image;
// Could re-render the image with the same text.
const newImage = captcha.render();

// Validatation, return true / false.
captcha.validate(/* Any to test */);
```
## Server Integration

For express,

```js
const app = require('express').app();
const SvgCaptchaFactory = require('svg-captcha')();

// Respond a svg captcha image.
app.get('/captcha', function (req, res) {
  var captcha = SvgCaptchaFactory.create();

  req.session.captcha = captcha;

  res.type('image/svg+xml');
  res.status(200).send(captcha.image);
});

// Validate the value.
app.post('/account', function (req, res) {
  const valueToTest = req.query.captcha;
  const isCaptchaValid = req.session.captcha.validate(valueToTest);
  
  if ()
});
```

## Use Options

### Preset

There are some preset option in ``'svg-captcha/lib/options/'``.

```js
const mathOptions = require('svg-captcha/lib/options/math');
const SvgCaptchaFactory = require('svg-captcha')(mathOptions);

```

# Reference

## SvgCaptcha Factory

### Create options

options

options.validator

Provide a funtion to define how to generate a pair of text & data, then return. It looks like:

```js
const Randexp = require('randexp');
const simpleTextRandexp = new Randexp(/[0-9A-Za-z]{4}/);

module.exports = {
  generator() {
    const text = simpleTextRandexp.gen();

    return {
      text,
      data: text
    };
  }
}
```

options.generator

options.renderOptions

#### renderOptions

renderOptions.font

renderOptions.canvas

renderOptions.svg

renderOptions.filter

### Methods

factory.create(/* optional renderOptions */)

## Captcha Instance

### Properties

svgCaptcha.image

### Methods

svgCaptcha.render

svgCaptcha.validate

## Font Registry

## SvgCaptcha static methods

SvgCaptcha.merge

SvgCaptcha.validateOptions