module.exports = (model, Schema) => {
    const Youtube = new Schema({
        link: String,
        userLink: {
          type: Schema.Types.ObjectId, ref: 'User'
        }
    })

    return model('Youtube', Youtube)
}