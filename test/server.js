'use strict'

const path = require('path');
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const captchaUrl = '/captcha.jpg'
const captchaMathUrl = '/captchaMath.jpg'
const captchaSessionId = 'captcha'
const captchaFieldName = 'captcha'

const captcha = require('./../index').create({
	cookie: captchaSessionId,
	background: 'rgb(255,255,255)',
	size: 4,
	noise: 3
})

const app = express()
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({
	extended: false
}))

app.get(captchaUrl, captcha.image())
app.get(captchaMathUrl, captcha.math())

app.get('/', (req, res) => {
	res.type('html')
	res.end(`
        <img src="${ captchaUrl }"/>
        <form action="/check" method="post">
            <input type="text" name="${ captchaFieldName }"/>
            <input type="submit"/>
        </form>
        <a href='javascript:;' onclick='window.location.reload()'>refresh</a>
    `)
})

app.get('/math', (req, res) => {
	res.type('html')
	res.end(`
			<img src="${ captchaMathUrl }"/>
			<form action="/check" method="post">
					<input type="text" name="${ captchaFieldName }"/>
					<input type="submit"/>
			</form>
			<a href='javascript:;' onclick='window.location.reload()'>refresh</a>
		`)
})

app.post('/check', (req, res) => {
	res.type('html')
	res.end(`
        <p>CAPTCHA VALID: ${ captcha.check(req, req.body[captchaFieldName]) }</p>
    `)
})

app.listen(8080, () => {
	console.log('server started on http://localhost:8080')
})
