require ('dotenv').config();
const nodemailer = require('nodemailer');
const {EMAIL: emailAddress, PASSWORD} = require('./config')
const Email = require('email-templates');
const handleResults = require('./craigslistRequest.js');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailAddress,
    pass: PASSWORD
  }
});

async function handleEmail() {
  const results = await handleResults();
  const email = new Email({
    message: {
      from: 'niftylettuce@gmail.com'
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter
  });
   
  email
    .send({
      template: 'email-templates',
      message: {
        to: 'brendan_darnell@hotmail.com'
      },
      locals: {
        results: results
      }
    })
    .then(console.log('email sent'))
    .catch(console.error);
}

handleEmail();