const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')
const Article = require('./models/article')
const User = require('./models/user')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false }))
app.use(methodOverride('_method'))
app.use(require('express-session')({
    secret: "Testing the secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/',  async (req, res) =>
{
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
}) 

app.get('/login', (req, res) => 
{
    res.render('../views/login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: '/login'
}), function (req, res) { })

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

app.get('/signup', (req, res) => 
{
    res.render('../views/signup')
})

app.post('/signup', (req, res) =>
{
    var username = req.body.username
    var password = req.body.password
    User.register(new User({ username: username }), password, function (err, user) {
        if (err) {
            console.log(err)
            return res.render('../views/signup')
        }
        passport.authenticate('local')(
            req, res, function () {
                res.redirect('/')
            })
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}

var port = process.env.PORT || 5000

app.use('/articles', articleRouter)

app.listen(port, function () {
    console.log("Server has Started!")
})

//app.use('/articles', articleRouter)

//app.listen(5000) 
