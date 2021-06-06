
import nextConnect from 'next-connect'
import middlware from '../../db/database'
import { findMovies, findOneMovie, registerEmail, updateOneMovie } from '../../db/controller';

const handler = nextConnect();
handler.use(middlware)


handler.post(registerEmail("jyotiranjan857@gmail.com"))
export default handler;