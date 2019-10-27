const nodemailer = require('nodemailer');

exports.mailer = async (email, id) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'ulices.metz@ethereal.email',
      pass: 'HpzUhNTJnwP8rrPr1V'
    }
  });

  try {
    await transporter.sendMail({
      from: '"Kalpesh Patel" <info@kpatel.tech>',
      to: email,
      subject: 'Welcome to my blog!',
      text: 'This is text',
      html: `<a target="_blank" href="localhost:3000/api/auth/verify?id=${ id }&email=${ email }">Click here to verify</a>`
    });
  } catch (err) {
    console.log('Could not send an email!');
    throw new Error(err);
  }
};
