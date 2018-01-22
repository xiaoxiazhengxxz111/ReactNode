const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

// to access mongoose.model class for instancier obj and access its methods 
const Survey = mongoose.model('surveys')

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for your feedback!')
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // console.log('req.body', req.body)
    // pull out the properties from req.body
    const { title, subject, body, recipients } = req.body

    // instance survey and assigne req.body properties to the survey obj
    const survey = new Survey({
      title,
      subject,
      body,
      // recipients: recipients.split(',').map(email =>{ return {email: email}}),
      recipients: recipients.split(',').map( email => ({ email: email.trim() })),
      //mongoDB user id
      _user: req.user.id, 
      dateSent: Date.now()
    })

    // merge survey and surveyTemplate to mailer object and send
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
      // these steps are all possible go wrong, so wrap them try/catch bloc
      await mailer.send()
      await survey.save()

      // update user model & send back to client
      req.user.credits -= 1
      const user = await req.user.save()  
      res.send(user)

    } catch (err) {
      res.status(422).send(err)
    }
  })
}