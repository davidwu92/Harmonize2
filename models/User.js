module.exports = (model, Schema) => {
    const User = new Schema({
        name: { type: String, required:true },
        email: {type: String, required:true, unique:true},
        username: {type: String, required:true, unique:true},
        links: [{ type: Schema.Types.ObjectId, ref: 'Youtube' }],
        //added by David 1/30 12 PM
        bio: String,
        cityState: String,
        pfPic: Array,
        instruments: Array,
        skills: Array,
        profile: String,
        pfPic: String,
        instruments: [String],
        skills: [String],
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        password: { type: String, require: true},
        friends: [{type:String,
          // unique: true
        }],
        pending:[],
        requests: [{ type: Schema.Types.ObjectId, ref: 'FriendRequest' }]
    })
    User.plugin(require('passport-local-mongoose'))
    User.index({name: "text", username: "text", email: "text", instruments: "text", skills: "text"})
  
    return model('User', User)
}