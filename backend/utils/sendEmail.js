  
const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'




const sendEmail = async options => {

    const oauth2Client = new OAuth2(
        process.env.MAILING_SERVICE_CLIENT_ID,
        process.env.MAILING_SERVICE_CLIENT_SECRET,
        process.env.MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
        OAUTH_PLAYGROUND
    )

    
    oauth2Client.setCredentials({
        refresh_token: process.env.MAILING_SERVICE_CLIENT_REFRESH_TOKEN
    })

    
    const accessToken =  oauth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.SENDER_EMAIL_ADDRESS,
            clientId: process.env.MAILING_SERVICE_CLIENT_ID,
            clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: process.env.MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
            accessToken
        }
    });

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SENDER_EMAIL_ADDRESS}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

   
    await transporter.sendMail(message)
}


module.exports = sendEmail;