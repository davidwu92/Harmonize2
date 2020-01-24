const { model, Schema } = require('mongoose')

const User = require('./User.js')(model, Schema)

module.exports = { User }