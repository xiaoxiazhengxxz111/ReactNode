const passport = require('passport')

module.exports = (app) => {
    app.get('/auth/google', 
        passport.authenticate('google', 
        {scope: ['profile', 'email']}
    ))
    
    app.get('/auth/google/callback', 
      passport.authenticate('google'),
      (req, res) => {
        res.redirect('/survays')
      }
    )

    app.get('/api/logout', (req, res) => {
      req.logout() // take the cookie to kill userId
      // res.send(req.user)
      res.redirect('/')
    })

    app.get('/api/currentuser', (req, res) =>{
      // res.send(req.session)
      res.send(req.user)
    })
}
