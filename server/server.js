import path from 'path'
import webpack from 'webpack'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import config from '../webpack.config'
import webpackDevMiddleware from 'webpack-dev-middleware';

const __PROD__ = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5000
const compiler = webpack(config)
const app = express()

app.disable('x-powered-by')

if (__PROD__) {
  app.use(express.static(config.output.path))
  app.get('*', (req, res) => {
    res.sendFile(path.join(config.output.path, 'index.html'))
  })
  app.use(morgan('combined'))
  app.use(helmet())
} else {
  app.use(webpackDevMiddleware(compiler))
}

app.listen(port, error => {
  if (error) { console.error(error) }
})

module.exports = app
