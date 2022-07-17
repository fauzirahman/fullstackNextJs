import db from "../../../libs/db";
import authorization from '../../../middlewares/authorization';

//Middleware handle incoming request
export default async function handler(req, res) {
    // console.log(req.method)
    // console.log(req.headers)
    if(req.method !== 'GET') return res.status(405).end();
    
    const auth = await authorization(req, res);        

    console.log(auth)

    const  posts = await db('posts');
    
    res.status(200);
    res.json({
        message: 'Post data',
        data: posts
    })    
    

    
}


