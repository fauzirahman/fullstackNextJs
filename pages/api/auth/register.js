import db from "../../../libs/db";
import bcrypt from 'bcryptjs';


export default async function handler(req, res) {
    // console.log(req.method)
    if(req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;
    console.log({email, password})

    const salt = bcrypt.genSaltSync(10);
    const passwordhash = bcrypt.hashSync(password, salt);

    const  register = await db('users').insert({
        email,
        password: passwordhash
    });

    const registeredUser = await db('users').where({ id: register }).first();
    
    
    res.status(200);
    res.json({
        message: 'Register successfully',
        data: registeredUser
    });    
}
