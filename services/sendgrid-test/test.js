// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");
const msg = {
  to: "1997shaunak@gmail.com",
  from: "1997shaunak@gmail.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail.send(msg);
