import db from "../../../libs/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
    // console.log(req.method)
    if(req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;
    console.log({email, password})

    const checkUser = await db('users').where({ email }).first();
    
    if(!checkUser) return res.status(401).send('User not found!');;
    const checkPassword = await bcrypt.compare(password, checkUser.password);

    console.log(checkPassword)
    if(!checkPassword) return res.status(401).send('Password not valid!');;

    const SECRET_KEY = "123";

    const  expiresIn  =  24  *  60  *  60;

    const token = jwt.sign({
        id: checkUser.id,
        email:  checkUser.email,
    }, SECRET_KEY, {
        expiresIn:  expiresIn
    })
    
    res.status(200);
    res.json({
        message: 'Login successfully',
        token: token,
        data: checkUser,
        expiredIn: expiresIn
    });    
}
