import db from "../../../../libs/db";
import authorization from '../../../../middlewares/authorization';

//Middleware handle incoming request
export default async function handler(req, res) {
    // console.log(req.method)
    // console.log(req.headers)
    if(req.method !== 'GET') return res.status(405).end();

    const { id } = req.query;
    
    const auth = await authorization(req, res);        

    const  posts = await db('posts').where({ id }).first();

    if(!posts) return res.status(404).end()

    res.status(200);
    res.json({
        message: 'Post data',
        data: posts
    })    
    

    
}


