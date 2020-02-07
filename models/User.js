module.exports = (model, Schema) => {
    const User = new Schema({
        name: { type: String, required:true },
        email: {type: String, required:true, unique:true},
        username: {type: String, required:true, unique:true},
        links: [{ type: Schema.Types.ObjectId, ref: 'Youtube' }],
        //added by David 1/30 12 PM
        bio: String,
        pfPic: Array,
        instruments: Array,
        skills: Array,
        profile: String,
        pfPic: String,
        instruments: [String],
        skills: [String],
    })
    User.plugin(require('passport-local-mongoose'))
    User.index({name: "text", username: "text", email: "text", instruments: "text", skills: "text"})
  
    return model('User', User)
}