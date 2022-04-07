const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const MongoStore = require('connect-mongo');


const {getUserByEmail,
       registerNewUser,
       usernameAlreadyExists,
       getUsernameById} = require('./models/users.model')

const {initialize} = require('./passport-config')

const dotenv = require('dotenv').config();

initialize(passport,getUserByEmail);

app.set('view-engine','ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
   name: 'session',
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: true,
   store: MongoStore.create({
       mongoUrl: process.env.MONGO_URL,
       collectionName : 'sessions'
   }),
   cookie: {
       maxAge: 1000 * 60 * 60 * 24
   }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuthenticated , async (req,res) => {
    const username = await getUsernameById(req.user)
    res.render('index.ejs', {name: username})
})


app.get('/login', checkNotAuthenticated , (req,res) => {
    res.render('login.ejs');
})

app.post('/login', checkNotAuthenticated , passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated , (req,res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated , async (req,res) => {
    try {
       const hashedPassword = await bcrypt.hash(req.body.password , 10);
       if(await getUserByEmail(req.body.email)!=null || 
          await usernameAlreadyExists(req.body.username)){
           res.status(400).send(`It seems you already
                                 have an account with this email or this username.
                                 Try <a href="/login">login</a> instead`)
       }
       await registerNewUser(req.body.username,req.body.email,hashedPassword);

       res.status(200).send(`Account succesfully created
                             You can use your credentials to 
                             <a href="/login">login</a>`)

    } catch {
        res.status(500).send('Something went wrong on our end..')
    }

})

app.post('/logout' ,(req,res) => {
    req.logOut();
    res.redirect('/login')
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }



module.exports = app