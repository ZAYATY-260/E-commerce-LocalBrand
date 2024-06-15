const nodemailer = require('nodemailer');

const mailing = async (req) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS
    }
  });
  
  const verificationLink = `http://yourdomain.com/verify?email=${encodeURIComponent(req.body.email)}`;
  
  const mail_option = {
    from: "mohammad2109652@miuegypt.edu.eg",
    to: req.body.email,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Verify Your Email</title>
        </head>
        <body>
          <p>Click the link below to verify your email address:</p>
          <a href="${verificationLink}">Verify</a>
        </body>
      </html>
    `
  };

  transporter.sendMail(mail_option, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  });
};

module.exports = { mailing };
