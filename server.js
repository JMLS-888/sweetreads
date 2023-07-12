const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Method Override

app.use(
    methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
  }
}))

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main'}));

// Sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URI,
    mongooseConnection: mongoose.connection}),
    
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, '/public/images')));

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/library', require('./routes/library'))
app.use('/stories', require('./routes/stories'))


const PORT = process.env.PORT || 3000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)