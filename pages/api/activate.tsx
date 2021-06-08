
import nextConnect from 'next-connect'
import middlware from '../../db/database'

import { activateUser, findMovies } from '../../db/controller';

const handler = nextConnect();
handler.use(middlware)

// handler.post(registerEmail("jyotiranjan857@gmail.com"))

// handler.get(findMovies(5))
// handler.get(activateUser)
handler.post(activateUser)


export default handler;