
import nextConnect from 'next-connect'
import middlware from '../../db/database'
import { findMovies, findOneMovie, registerEmail, updateOneMovie } from '../../db/controller';

const handler = nextConnect();
handler.use(middlware)

handler.post(registerEmail("jyotiranjan857@gmail.com"))

// handler.get(findMovies(5))

// handler.get(findOneMovie("Enclave_"))

// handler.get(updateOneMovie)
// handler.put(async(req: any, ))

export default handler;