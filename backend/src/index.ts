import { Hono } from 'hono'
import mainRouter from './routes/index'
import { cors } from 'hono/cors'


const app = new Hono()
app.use('/*', cors())

app.route("/api/v1", mainRouter)


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
