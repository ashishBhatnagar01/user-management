const nodemailer=require('nodemailer');
require('dotenv').config()

const sendEmail=async(to,token)=>{
    let flag=false;
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    const mailOptions={
        from:"bhatnagarashish16@gmail.com",
        to:to,
        subject:"Request regarding password change",
        text:`http://localhost:3000/changePassword/${token}`
    };

    transporter.sendMail(mailOptions,async(err,info)=>{
        if(err){
            console.log(err);
        }
        console.log(info)
    })
    return true
}

module.exports ={sendEmail}