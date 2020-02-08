require('dotenv').config()
const express = require('express')
const { join } = require('path')
// passport modules: STAY HERE PLS
const passport = require('passport')
const { Strategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const app = express()
const { User } = require('./models')

const mongoURI = 'mongodb://localhost/harmonizedb'
const mongoose = require('mongoose')
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
var Grid = require('gridfs-stream')
var crypto = require('crypto')
const conn = mongoose.createConnection(mongoURI,  {
    // these methods are rarely used
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
// const url = 'mongodb://localhost/harmonizedb';

//middleware
app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//DEPLOYING TO HEROKU
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// passport middleware
// start the passport engine
app.use(passport.initialize())
// brand new session
app.use(passport.session())

// need to use "new" since strategy is a constructor we need new 
passport.use(new Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// grabbing the token authentication process
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .then(user => cb(null, user))
  .catch(e => cb(e))))

//routes
require("./routes")(app)

// image routes
const storage = new GridFsStorage({
  url:  'mongodb://localhost/harmonizedb', 
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = file.originalname
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        }
        resolve(fileInfo)
      })
    })
  },
})

const upload = multer({ storage })

  app.post('/', upload.single('img'), passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id: id } = req.user
    User.findOneAndUpdate({ _id: id }, { pfPic: req.file })
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
    
    // res.status(201).send()
  })
  app.get('/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      })
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    } else {
      res.status(404).json({
        err: 'Not an image',
      })
    }
  })
})
let gfs
//connect to the database and listen on a port
require('mongoose')
  .connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/harmonizedb', {
    // these methods are rarely used
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
    app.listen(process.env.PORT || 3001)})
  .catch(e => console.error(e))

  // Create storage engine