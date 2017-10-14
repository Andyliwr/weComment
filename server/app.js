const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const co = require('co')
const convert = require('koa-convert')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')
// log middleware
const loggers = require('./middleware/loggers')
const cors = require('koa-cors')
const db = require('./config/dbConfig')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(convert.compose(
  koaBody({ multipart: true }),
  bodyparser,
  json(),
  logger(),
  cors(),
))
// middlewares
app.use(convert(require('koa-static')(__dirname + '/public')))
// local log
app.use(convert(loggers()))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// mongodb connect
db.connect()

module.exports = app
