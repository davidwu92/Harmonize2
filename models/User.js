module.exports = (model, Schema) => {
    const User = new Schema({
        name: String,
        email: {type: String, required:true, unique:true},
        username: {type: String, required:true, unique:true}
        // no password because we use real user authentication
    })

  User.plugin(require('passport-local-mongoose'))

  return model('User', User)

}