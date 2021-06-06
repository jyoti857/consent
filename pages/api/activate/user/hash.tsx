
import nextConnect from 'next-connect'
import middlware from '../../../../db/database'

import { activateUser, findMovies } from '../../../../db/controller';

const handler = nextConnect();
handler.use(middlware)

handler.get(findMovies(2))

// export default async function activateUser(req: any, res: any){
//   const hash = req.query.hash;
//   if(!hash){
//     return res.status(401).json({message: "cannot validate an user!!"})
//   }

//   const response = await fetch(`http://localhost:3000/api/activate/user/${hash}`)
//   if (response.status >= 400) {
//     return res.status(401).json({message: 'Cannot Validate an User!'})
//   } else {
//     res.writeHead(307, { Location: '/users/activated' });
//     res.end();
//   }
// }