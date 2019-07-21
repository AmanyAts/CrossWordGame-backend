const requestLogger = function(req, res, next) {

    console.log(`${new Date()}`)
    console.log(`${req.method} ${req.url}`)
    console.log(`body ${JSON.stringify(req.body)}`)
    console.log(" ")
    next()
}

module.exports = requestLogger
