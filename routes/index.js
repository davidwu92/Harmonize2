module.exports = app => {
  require('./userRoutes.js')(app)
  require('./youtubeRoutes.js')(app)
  require('./searchRoutes.js')(app)
  require('./forgotPassword.js')(app)
  require('./requestRoutes.js')(app)
  require('./gigRoutes.js')(app)
}