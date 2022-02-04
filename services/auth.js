module.exports = function(passport){

    const bcrypt = require('bcryptjs')

    const LocalStrategy = require('passport-local').Strategy
    let dao = require('../database/dao');

    passport.serializeUser(function(autor, done){
        done(null, autor.id)
      })
      
      passport.deserializeUser(function (id, done){
        dao.findById(id)
        .then(([rows])=>{
          let autor = rows[0]
          return done(null, autor)
        }).catch(err => {
          return done(err, null)
        })
      })
      
      let strategyConfig = {
        usernameField: 'username',
        passwordField: 'password'
      }
      
      passport.use(new LocalStrategy(strategyConfig, function (username, password, done){
        dao.findByUsername(username)
        .then(([rows])=>{
          if (rows.length == 0) return done(null, false)

          let autor = rows[0]
          if (bcrypt.compareSync(password, autor.password)) return done(null, autor)
          else return done(null, false)
        }).catch( err => {
          console.log(err)
          return done(err, false)
        })
      }))
}