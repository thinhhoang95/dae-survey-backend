import express from 'express'
import surveyModel from '../model/survey'
import contactModel from '../model/contact'
const router = express.Router()

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "5239010958-qp3oenq42s0f5lb3opg7200q4jfpmhjs.apps.googleusercontent.com", // ClientID
    "inS0NsaojnTXE9I248warhBb", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04MQbUFSWUa1OCgYIARAAGAQSNwF-L9IrIFPa4RxvBvdpJ6opB16uE5qYFy1BzNp2UbNDisT5nxmNkpge0jpf70gtpT2fEX-f6fo"
});

const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "hoangdinhthinh@hcmut.edu.vn", 
         clientId: "5239010958-qp3oenq42s0f5lb3opg7200q4jfpmhjs.apps.googleusercontent.com",
         clientSecret: "inS0NsaojnTXE9I248warhBb",
         refreshToken: "1//04MQbUFSWUa1OCgYIARAAGAQSNwF-L9IrIFPa4RxvBvdpJ6opB16uE5qYFy1BzNp2UbNDisT5nxmNkpge0jpf70gtpT2fEX-f6fo",
         accessToken: accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendThanks = async (email) => {
    console.log('Send thanks to ', email)
    const mailOptions = {
        from: "hoangdinhthinh@hcmut.edu.vn",
        to: email,
        subject: "Xin cảm ơn quý ông bà đã dành thời gian tham gia khảo sát",
        generateTextFromHTML: true,
        html: "Kính thưa quý ông bà <br/> Bộ môn Kỹ thuật Hàng không xin trân trọng cảm ơn quý ông bà đã dành thời gian quý báu tham gia khảo sát về chương trình đào tạo cử nhân và kỹ sư Kỹ thuật Hàng Không. Thông tin của quý ông bà sẽ được sử dụng để cải thiện chương trình để chương trình đào tạo ngành KTHK tiến gần hơn với nhu cầu của doanh nghiệp. <br/> Trân trọng cảm ơn <br/> <br/> Hoàng Đình Thịnh <br/> Giảng viên, phụ trách dự án ReactSurvey."
   };

   smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
});
}

const sendIvitation = async (email, referid) => {
    console.log('Send invitation to ', email)
    const mailOptions = {
        from: "hoangdinhthinh@hcmut.edu.vn",
        to: email,
        subject: "Xin mời tham gia khảo sát",
        generateTextFromHTML: true,
        html: "Kính thưa quý ông bà <br/> Bộ môn Kỹ thuật Hàng không xin trân trọng kính mời quý ông bà tham gia thực hiện khảo sát về Chương trình Đào tạo ngành Kỹ thuật Hàng Không tại <a href='http://dae.dte.hcmut.edu.vn:3000/" + referid + "'>đây</a>. Ý kiến đóng góp của quý ông bà rất quan trọng đối với việc phát triển chương trình đào tạo cử nhân và kỹ sự kỹ thuật hàng không phù hợp với yêu cầu của doanh nghiệp trong thời đại mới. Xin trân trọng cảm ơn quý ông bà đã dành thời gian hoàn thành khảo sát. <br/> Trân trọng <br/> Hoàng Đình Thịnh <br/> Giảng viên, phụ trách dự án ReactSurvey."
   };

   smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
});
}

router.post('/submit', async (req, res) => {
    console.log(req.body);
    if (req.body){
        req.body = {'date': new Date(),...req.body}
        var survey = new surveyModel(req.body);
        await survey.save()
        if (req.body.qemail)
            await sendThanks(req.body.qemail)
        res.status(200).send('OK')
    }
})

router.post('/invite', async (req, res) => {
    let contactCount = 0
    let contacts = await contactModel.find()
    contacts.forEach((c) => {
        sendIvitation(c.email, c.referid)
        contactCount++
    })
    res.status(200).send('Sent email to ' + contactCount + ' contacts.')
})

module.exports = router