import { Db, MongoClient} from 'mongodb'
// import { Db } from 'mongoose'
import nextConnect from 'next-connect'

const uri = "mongodb+srv://jyoti1:jyoti123@cluster0.0tmqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req: any, res: any, next: any){
  console.log("from database file")
  if(!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('sample_mflix')
  return next();
}

const middleware = nextConnect();
middleware.use(database)

export default database;

////==== for instant work around, will be deleted 
export const dbConnect = async() => {
  console.log("from database file")
  if(!client.isConnected()) await client.connect();
  const dbClient = client;
  return dbClient.db('sample_mflix')
  //.collection("pending_consent_user")
}
