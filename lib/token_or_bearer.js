// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token <token>` OR the Express convention of
// `Authorization: Bearer <token>`
module.exports = function (req, res, next)  {
  if (req.headers.authorization) {
    const auth = req.headers.authorization
    // if we find the Rails pattern in the header, replace it with the Express
    // one before `passport` gets a look at the headers
    req.headers.authorization = auth.replace('Token', 'Bearer');
  }
  next();
}
