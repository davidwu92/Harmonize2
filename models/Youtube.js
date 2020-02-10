module.exports = (model, Schema) => {
    const Youtube = new Schema({
        title: String,
        body: String,
        link: String,
        userLink: {
          type: Schema.Types.ObjectId, ref: 'User'
        }
    })

    return model('Youtube', Youtube)
}