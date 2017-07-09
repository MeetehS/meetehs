const path = require('path')
const zlib = require('zlib')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const send = require('koa-send')
const compress = require('koa-compress')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')

const { schema } = require('./server/schema')

const PORT = process.env.PORT || 4000

const app = new Koa()
const router = new Router()

app.use(compress({
  flush: zlib.Z_SYNC_FLUSH,
}))

// Koa only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(serve(path.join(__dirname, './build')))

  router.get('/post/:id', async (ctx, next) => {
    console.log('id is ', ctx.params.id)
    await send(ctx, './build/index.html')
  })
}

// bodyParser is needed just for POST.
app.use(bodyParser())

router.post('/graphql', graphqlKoa({
  schema,
}))
router.get('/graphql', graphqlKoa({
  schema,
}))

router.post('/graphiql', graphiqlKoa({
  endpointURL: '/graphql',
}))
router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql',
}))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`))
