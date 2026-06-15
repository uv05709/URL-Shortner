import {ValidateUserToken} from '../utils/token.js'



export function authenticationMiddeleware (req,res,next){
   const authHeader   = req.headers['authorization']
    if(!authHeader) return next()
    
    if(!authHeader.startsWith('Bearer'))
        return res.status(400).json({error:` authentication must start woth brearer`})
const[_ , token] = authHeader.split(' ')
const payload =  ValidateUserToken(token)
req.user = payload
next()
}