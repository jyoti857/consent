import { ObjectId } from "mongodb";
import { Document } from "mongoose";
import { sendConfirmationMail } from "./mailer";


// create a new user collections and it's documents (Obviously)
export const registerEmail = async(req: any, res: any) => {
  console.log("****")
  const {email} = req.body;
  let existsUser = await req.db.collection("consent_user").findOne({email})
  if(existsUser) {return res.status(422).send("user is already registered")}

  const newUser = await req.db.collection("pending_consent_user").insertOne({email});
  // console.log("new user --> ", newUser.ops[0])
  const user = newUser.ops[0]
  await sendConfirmationMail({toUser: user, hash: user._id})
  return res.json({message: "you have been registered", user})

}

// activate user
export const activateUser = async(req: any, res: any) => {
  // const hash = "60bd22565059373c1869156a"
  const hash = req.query.hash
  console.log("query hash --->", hash)
  try{
    const data = await req.db.collection("pending_consent_user").findOne({_id: new ObjectId(hash)})
    // res.json(data)
    await req.db.collection("consent_user").insertOne({...data, new: true})
    await req.db.collection("pending_consent_user").remove({_id: new ObjectId(hash)})
    res.json({message: `User ${hash} has been activated`, data: hash})
  }catch{
    res.send("User cannot be activated!!")
  }
}

// find first 5 docs
export const findMovies = (limit: number) => async(req: Document, res: any) => {
  let doc = await req.db.collection("movies").find().limit(limit).toArray()
  res.json(doc)
} 


export const findOneMovie = (title: string) => async(req: Document, res: any) => {
  let doc = await req.db.collection('movies').findOne({title});
  console.log("movies ---> ", doc);
  res.json(doc)
}



export const updateOneMovie = async(req: Document, res: any) => {

  let doc = await req.db.collection('movies').updateOne(
    {title: "Enclave_", genres: ["Short"]},
    {$set: {title: "Enclave_", genres: ["long", "pyt"]}}  
  );
  console.log("doc.plot --> ", doc.result)
  res.json(doc)
}