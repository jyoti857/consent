import nodemailer from 'nodemailer'

export function sendMail(message: any){
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jyotiranjan767@gmail.com",
        pass: "9692928165"
      }
    })

    transporter.sendMail(message, function(err, info){
      if(err){
        rej(err)
      }else{
        res(info)
      }
    })
  })  
}

export function sendConfirmationMail({toUser, hash}: any){
  const message = {
    from: "jyotiranjan767@gmail.com",
    to: "jyotiranjan857@gmail.com", 
    subject: "Consent - Activation Account", 
    html: `
      <style>
        {
          button{
            color: 'blue',
            padding: '10px'
          }
        }
      </style>
      <h3> Hello ${toUser.email.toString().split("@")[0]},</h3>
      <p>Thank you for submitting your email communication preferences to ADC Therapeutics. We will process your preferences within 7-10 business days. If you have opted out in error and wish to update your preferences, please visit the Email Communications Portal and adjust your preferences. Please note that you will continue to receive email regarding important safety information of ADC Therapeutics products.</p>
      <p>To activate your account please follow this link: 
      <button class='btn btn-primary' onclick = "location.href='http://localhost:3000/consents/cp?token=${hash}';">
        Verify and Update Preferences
      </button>
      <a class = 'btn btn-primary' target="_" href="http://localhost:3000/consents/cp?token=${hash}">Verify and update preferences</a>
      <p>Cheers</p>
      <p>Thank you,</p>
      <p>Consent Team</p>
    `
  }
  return sendMail(message)
}  

//http://localhost:3000/api/activate/user/${hash}"
// <a target="_" href="http://localhost:3000/consents/cp?token=${hash}">${hash}/activate </a></p>