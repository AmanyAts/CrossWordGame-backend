// require necessary NPM packages
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// require route files
const exampleRoutes = require('./app/routes/example_routes')
const userRoutes = require('./app/routes/user_routes')

// require error handling middleware
const errorHandler = require('./lib/error_handler')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// required middleware to log requests
const requestLogger = require('./lib/request_logger')

// require middleware for accepting token or bearer
const tokenOrBearer = require('./lib/token_or_bearer')

// Define Ports
const reactPort = 7165
const expressPort = 3000

// establish database connection
mongoose.Promise = global.Promise
mongoose.connect(db, {
  useMongoClient: true
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}`}))

// define port for API to run on
const port = process.env.PORT || expressPort

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token <token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(tokenOrBearer)

// register passport authentication middleware
app.use(auth)

// add `bodyParser` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(bodyParser.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(bodyParser.urlencoded({ extended: true }))

// add request logger to create server log
app.use(requestLogger)

// register route files
app.use(exampleRoutes)
app.use(userRoutes)

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// run API on designated port (3000 in this case)
app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
