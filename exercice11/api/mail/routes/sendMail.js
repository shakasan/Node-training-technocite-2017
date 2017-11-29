const mongoose = require('mongoose');
const boom = require('boom')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const promisify = require('es6-promisify-all');

module.exports = {
    method: 'POST',
    path: '/api/mail/',
    options: {
        validate: {
            failAction: (request, h, err) => err
        },
        pre: [
            // (req, h) => { console.log(req.nid); return true }
        ]

    },
    handler: async (req, h) => {
        console.log('oooo')
        var transporter = promisify(nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD
            }
        })));

        var mailOptions = {
            from: 'gilles.Wales@gmail.com',
            to: 'gilles@triptyk.eu',
            subject: 'Sending Email using Node.js[nodemailer]',
            text: 'That was easy!'
        };
        await transporter.sendMail(mailOptions);
        return {
            message: "mail sended"
        }
    }
}
