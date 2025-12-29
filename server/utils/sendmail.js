const nodemailer = require('nodemailer');
require('dotenv').config();


function sendMail(name, tel, email, message){
    console.log(process.env.HOST)
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.USERADD,
            pass: process.env.PASS,


        },
    })

    let mailOptions = {
        from: process.env.USERADD,
        to: process.env.USERADD,
        subject: 'New enquiry',
        text: 'New enquiry from...  ' + name + ', telephone: ' + tel + ' message: ' + message + ' email: ' + email
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(mailOptions)
        }
    })

}

module.exports = sendMail;

