const { model, Schema } = require('mongoose')

const User = require('./User.js')(model, Schema)
const Youtube = require('./Youtube.js')(model, Schema)

module.exports = { User, Youtube }