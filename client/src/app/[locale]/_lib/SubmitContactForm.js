'use server'

import { sendMail } from "./nodemailer.js"

export async function submitContactForm(formData) {
    const mailOptions = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        tel: formData.get('tel')
    }

    const {message, error} = await sendMail(mailOptions)

    if(error){
        console.log(error)
        return {error}
    } else {
        console.log(message)
        return {message}
    }
}
