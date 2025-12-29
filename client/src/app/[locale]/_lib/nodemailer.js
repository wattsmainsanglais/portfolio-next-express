import nodemailer from 'nodemailer'

export async function sendMail(mailOptions){

    const {name, email, tel, message} = mailOptions

    let mailOptionsReturn = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'New enquiry from portfolio',
        text: 'New enquiry from...  ' + name + ', telephone: ' + tel + ' message: ' + message + ' email: ' + email
    }

    return new Promise((resolve, reject)=> {

        // Debug logging
        console.log('Email config:', {
            host: process.env.HOST,
            user: process.env.EMAIL_USER,
            passLength: process.env.PASS?.length
        })

        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASS,
            },
        })

        transporter.sendMail(mailOptionsReturn, function(err, info) {
            if (err) {
                console.error('Email error:', err)
                resolve ({
                    error: 'Error sending message, please try again later'
                })
            } else {
                console.log('Email sent successfully')
                resolve ({
                    message: 'Thank you ' + name + ' for your enquiry, I will be in contact soon'
                })
            }
        })
    })
}
