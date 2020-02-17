require ('dotenv').config();
const nodemailer = require('nodemailer');
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
// console.log(email)

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: email,
		pass: password
	}
});

// const mailOptions = {
// 	from: email,
// 	to: 'brendan_darnell@hotmail.com',
// 	subject: 'craigslist results',
// 	text: 'this is a test'
// };

// transporter.sendMail(mailOptions, (e, info) => {
// 	if(e) {
// 		return console.log(e)
// 	}

// 	console.log('message sent', info.response)
// })

module.exports = {transporter};
