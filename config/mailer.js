'use strict';
const nodemailer = require('nodemailer');

// auth: {
//     user: 'femoxmed@gmail.com',
//     pass: 'omotayo123*'
//   }

// the sender's user and pass
const user = 'femoxmed@gmail.com';
const pass = 'omotayo123*';
//  create the transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

//  create the body of the mail
const send = async (recipient, token) => {
  // here we configure our host
  const url = `http://localhost:9191/api/user/confirmation/${token}`;

  const mail = {
    from: user,
    to: recipient,
    subject: 'Confirm Account',
    html: `<h1>Welcome User</h1><br>Please click this link to confirm your account: <br> <br> <br><a style="border-radius: 5px solid; text-decoration: none; background-color: blue; padding: 15px; color: white; margin: 0 auto; " href="${url}">Click Here </a>`
  };

  try {
    await transporter.sendMail(mail);
    console.log('mail sent');
  } catch (error) {
    console.log(error);
    // throw new Error(error);
  }
};

module.exports = { send };
