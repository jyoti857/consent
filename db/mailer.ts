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
      <h3> Hello ${toUser.email.toString().split("@")[0]} </h3>
      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_" href="http://localhost:3000/api/activate/user/${hash}">${hash}/activate </a></p>
      <p>Cheers</p>
      <p>Your Application Team</p>
    `
  }
  return sendMail(message)
}  