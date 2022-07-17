import jwt from 'jsonwebtoken';

export default function authorization(req, res) {
    return new Promise((resolve, reject)=>{
        const { authorization } = req.headers

        if(!authorization) return res.status(401).send('Not Authenticated!');
        
        const authSplit = authorization.split(' ');
        console.log(authSplit)

        const [authType, authToken] = [
            authSplit[0],
            authSplit[1]
        ]

        if(authType !== 'Bearer') return res.status(401).send('Not Authenticated!');
        const SECRET_KEY = "123";

        //jwt.verify(authToken, SECRET_KEY)

        return jwt.verify(authToken, SECRET_KEY, function(err, decoded){
            if(err) return res.status(401).end();

            return resolve(decoded);
        });
    })
    
    
}