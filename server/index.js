const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')

const { schema } = require('./src/schema')

const PORT = process.env.PORT || 4000

const app = new Koa()
const router = new Router()

// Koa only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  console.log('static files is in ../client/build')
  app.use(serve(path.join(__dirname, '../client/build')))
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
