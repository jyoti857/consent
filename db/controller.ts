import { ObjectId } from "mongodb";
import { Document } from "mongoose";
import { sendConfirmationMail } from "./mailer";


// create a new user collections and it's documents (Obviously)
export const registerEmail = async(req: any, res: any) => {
  const {email} = req.body;
  console.log("**** req.body --> ", req.body)
  let existsUser = await req.db.collection("consent_user").findOne({email})
  if(existsUser) {
    await sendConfirmationMail({toUser: existsUser, hash: existsUser._id})
    return res.json({message: "exising user details sent"})
  }

  const newUser = await req.db.collection("pending_consent_user").insertOne({email});
  // console.log("new user --> ", newUser.ops[0])
  const user = newUser.ops[0]
  await sendConfirmationMail({toUser: user, hash: user._id})
  return res.json({message: "you have been registered", user})

}

// activate user
export const activateUser = async(req: any, res: any) => {
  const hash = req.query.hash
  const {firstName, lastName, state, type, adc, comm} = req.body
  console.log("query hash from activateuser api --->", hash, firstName, lastName, state, type, adc, comm)
  try{
    const data = await req.db.collection("pending_consent_user").findOne({_id: new ObjectId(hash)})
    if(data){
      console.log("data from activate user ---> ", data)
      const address = await req.db.collection('consent_user_address').insertOne({
        _id: new ObjectId(),
        state,
        country: "USA",
        zip: "30230",
        addressLine: "161 Centereach Mall, Centereach NY 11720"
      })

      // create adc preference 
      const adcPreference = {
        status: "ACTV",
        name: "ADC Therapeutics Corporate Email and News",
        shortName: "TCEN",
        description: "Corporate",
        type: "UNBR"
      }
      // create comm preference 
      const commPreference = {
        status: "ACTV",
        name: "Communications from Sales and Marketing",
        shortName: "EHTS",
        description: "HTS",
        type: "BRAN"
      }
      // create consents array, no schema before, beaty of mongo
      const adcObj = {
        status: "ACTV",
        // subscribed: true,
        hcpId: hash,
        preferenceId: {}, //adcPrefCollection.ops[0]._id,
        preference: {}, //adcPrefCollection.ops[0],
      };
      const commObj = {
        status: "ACTV",
        // subscribed: true,
        hcpId: hash,
        preferenceId: {}, //commPrefCollection.ops[0]._id,
        preference: {}, //commPrefCollection.ops[0],
      }
      const consents = [adcObj, commObj]
      console.log("consents --> ", consents)

      // const existAdcPrefCollection = await req.db.collection('ADC_preference').find()
      // const existCommPrefCollection = await req.db.collection('COMM_preference').find()
      
      let consentCollection;
      const isConsentCollectionExist = await req.db.collection('consents').find({hcpId:hash})?.limit(1)
      console.log("is consent collection exist ----> ", isConsentCollectionExist)
      if(!isConsentCollectionExist.length){
        console.log("in if ")
        const adcPrefCollection_ = await req.db.collection('ADC_preference').insertOne(adcPreference)
        const adcPrefCollection = adcPrefCollection_.ops[0]
        console.log("adcPrefCollection ---> ", adcPrefCollection)
        const commPrefCollection_ = await req.db.collection('COMM_preference').insertOne(commPreference)
        const commPrefCollection = commPrefCollection_.ops[0]
        console.log("commPrefCollection ---> ", commPrefCollection)
        consentCollection = await req.db.collection('consents')
          .insertMany([
            {...adcObj, preferenceId: adcPrefCollection._id, preference: {...adcPrefCollection, subscribed: adc==="adc_sub"?true:false}}, 
            {...commObj,  preferenceId: commPrefCollection._id, preference: {...commPrefCollection, subscribed: comm==='comm_sub'?true:false}}
          ])
        console.log("s ---> ", consentCollection.ops)
        
      }else{
        console.log("in else")
        const getConsentsByUser = await req.db.collection('consents').find({hcpId: hash}).toArray();
        console.log("get consent by user --> ", getConsentsByUser)
        
        // consentCollection = await req.db.collection('consents').updateMany(
        //   [
        //     {""}
        //   ]
        // )
        console.log("in else -->")
      }
      
      console.log("*** && consents from backend ---> ", consentCollection.ops[0])
      await req.db.collection("consent_user").insertOne(
        // {_id: new ObjectId(hash)},
        {...data, name: `${firstName.trim()} ${lastName.trim()}`, 
          state, hcpType: type ? type : 'Other', 
          address: address.ops[0],
          consents: consentCollection ? [...consentCollection.ops] : []
        }, 
        // {upsert: true}
      )
      // just for testing purpose, commented below line 
      await req.db.collection("pending_consent_user").remove({_id: new ObjectId(hash)})
      return res.json({message: `User ${hash} has been activated`, data: hash})
    }else{
      const data = await req.db.collection('consent_user').findOne({_id: new ObjectId(hash)})
      const [{preferenceId: adcId}, {preferenceId: commId}] = data.consents
      console.log("adcId, commId --> ", adcId, commId)
      const addConsDoc = await req.db.collection('consents').findOne({preferenceId: adcId})
      const commConsDoc = await req.db.collection('consents').findOne({preferenceId: commId})
      console.log("addConsDoc, commConsDoc --> ", addConsDoc, commConsDoc)
      // in progress
      await req.db.collection('consents').updateOne({preferenceId: adcId}, {$set:{"preference.subscribed": adc==="adc_sub"?true:false}})
      await req.db.collection('consents').updqteOne({preferenceId: commId}, {$set:{"preference.subscribed": comm==="comm_sub"?true:false}})
      const data_ = {...data, hcpType: type, consents: [{...addConsDoc, preference: {...addConsDoc.preference, subscribed: adc==="adc_sub"?true:false}},
           {...commConsDoc, preference: {...commConsDoc.preference, subscribed: comm==="comm_sub"?true:false}}]}
      await req.db.collection('consent_user').updateOne({_id: data._id}, {$set: {...data_}})
      // return res.json({message: `User ${hash} is there in db before`, data: data})
    }
  }catch{
    console.log("in catch")
    // res.send("User cannot be activated!!")
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