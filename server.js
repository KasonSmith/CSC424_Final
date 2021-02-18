const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false }))
app.use(methodOverride('_method'))

app.get('/',  async (req, res) =>
{
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
}) 

app.get('/login', (req, res) => 
{
    res.render('../views/login')
})

app.post('/login', (req, res) =>
{

})

app.get('/signup', (req, res) => 
{
    res.render('../views/signup')
})

app.post('/signup', (req, res) =>
{
    
})

app.use('/articles', articleRouter)

app.listen(5000) 
