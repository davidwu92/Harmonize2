module.exports = (model, Schema) => {
    const User = new Schema({
        name: String,
        email: {type: String, required:true, unique:true},
        username: {type: String, required:true, unique:true},
        links: [{ type: Schema.Types.ObjectId, ref: 'Youtube' }],
        //added by David 1/30 12 PM
        bio: String,
        pfPic: String,
        instruments: Array,
        skills: Array,
    })

  User.plugin(require('passport-local-mongoose'))

  return model('User', User)

}