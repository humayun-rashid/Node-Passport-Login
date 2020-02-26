const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
function authenticateUser()

function initialize (passport,getUserbyEmail) {
    const authenticateUser = function(email,password,done){
        const user = getUserbyEmail(email)
        if (user== null){
            return done(null,false,{message: "No user with that email "})
        }
        try{
            if (await bcrypt.compare(password,user.password)) {
                return done(null,user)
            }
            else {
                return done(null,flase,{message:"Password Incorrect"})
            }

        } catch(err){
            return done(err)
            
        }

    }

    passport.use(new localStrategy({usernameField:'email'}), authenticateUser)
    passport.serializeUser (function(user,done) {
    
    })
    passport.deserializeUser (function(user,done) {
    
    })
}

module.exports = initialize