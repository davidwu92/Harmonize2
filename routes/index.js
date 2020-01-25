module.exports = app => {
  require('./userRoutes.js')(app)
  require('./youtubeRoutes.js')(app)
}