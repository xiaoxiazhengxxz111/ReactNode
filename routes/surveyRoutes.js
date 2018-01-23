const _ = require('lodash')
const Path = require('path-parser')
const {URL} = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

// to access mongoose.model class for instancier obj and access its methods 
const Survey = mongoose.model('surveys')

module.exports = (app) => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
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

  // // processing pipeline
  // app.post('/api/surveys/webhooks', (req, res) => {
  //   const p = new Path('/api/surveys/:surveyId/:choice')

  //   const events = _chain(req.body)
  //     .map(({email, url}) => {
  //       // extract the routes, then   
  //       // extract the surveyID and choice from pathName and store in p obj
  //       const match = p.test(new URL(url).pathname)
  //       if( match ) {
  //         return {email, surveyId: match.surveyId, choice: match.choice}
  //       }
  //     }) 
  //     .compact() 
  //     .uniqBy('email', 'surveyId') // remove duplicate email or id
  //     .value()
  //   console.log(events)
  //   res.send({})
  //   })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });
}

