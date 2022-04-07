const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const {getPasswordByEmail} = require('./models/users.model')

function initialize(passport,getUserByEmail){
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if(user === null){
            return done(null,false,{message: 'Wrong credentials'})
        }

        try {
           const inputPasswordtoString = await getPasswordByEmail(email)
           if(await bcrypt.compare(password,inputPasswordtoString)){
              return done(null,user);
           }else{
             return done(null,false,{message: 'Wrong credentials'})
           }

        }catch(err){
           done(err);
        }
    }
    
    
    passport.use(new LocalStrategy({usernameField: 'email'},
    authenticateUser))
    passport.serializeUser((user,done) => {
        done(null,user._id)
    });
    
    passport.deserializeUser((id,done) => {
        done(null,id);
    });

}

module.exports = {initialize}