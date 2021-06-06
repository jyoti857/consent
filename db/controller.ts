import { Document } from "mongoose";
import { sendConfirmationMail } from "./mailer";


// create a new user collections and it's documents (Obviously)
export const registerEmail = (email: string) => async(req: Document, res: any) => {
  console.log("****")
  // const {email} = req.body;
  let existsUser = await req.db.collection("consent_user").findOne({email})
  if(existsUser) {return res.status(422).send("user is already registered")}

  const newUser = await req.db.collection("pending_consent_user").insertOne({email});
  await sendConfirmationMail({toUser: {email: "jyotiranjan857@gmail.com"}, hash: newUser.insertedId})
  return res.json({message: "you have been registered"})

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