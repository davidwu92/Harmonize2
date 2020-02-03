module.exports = app => {
  require('./userRoutes.js')(app)
  require('./youtubeRoutes.js')(app)
  require('./searchRoutes.js')(app)
}