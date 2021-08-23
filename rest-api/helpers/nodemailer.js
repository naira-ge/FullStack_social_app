const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'samanta.towne@ethereal.email',
        pass: 'H5dD3DWcjtmP5HR8Z6'
    }
});

const send = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
        // send mail with defined transport object
        let result = await transporter.sendMail(info);

        console.log("Message sent: %s", result.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        
            resolve(result);

        } catch (error) {
            reject(error);
        }
    });
};

const emailProcessor = ({ email, pin, type, verificationLink = "" }) => {
    let info = "";

    switch (type) {
        case "request-new-password":
            info = {
                from: '"TalentHouse" <samanta.towne@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Password reset Pin 🔑", // Subject line
                text: "Your password reset pin " + pin + " This pin will be expires in 1 day", // plain text body
                html: `<p>Here is your pin <b>${pin}</b></p>
                <p>This pin will be expires in 1 day ⏳</p>`, // html body
            }
    
            send(info);
            break;
        
        case "password-update-success":
            info = {
                from: '"TalentHouse" <samanta.towne@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Password updated 📬", // Subject line
                text: "Your new password has been updated", // plain text body
                html: `<p>Your new password has been updated ✨</p>`, // html body
            }
    
            send(info);
            break;
        
        default:
            break;
    }

};

module.exports = { emailProcessor };