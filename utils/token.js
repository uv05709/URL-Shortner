import jwt from 'jsonwebtoken'
import {UserTokenSchema} from '../validation/token.validation.js'
import { error } from 'node:console'


const JWT_SECRET = process.env.JWT_SECRET

export function createUserToken(payload){
    const validationResult =  UserTokenSchema.safeParseAsync( payload)
    if(validationResult.error)throw new Error(validationResult.error.message)
      
        const payloadValidatedData = validationResult.data

    const token = jwt.sign(payload,JWT_SECRET)
return token

}

export function ValidateUserToken(token){
   try {
     const payload = jwt.verify(token, JWT_SECRET)
    return payload
   } catch (error) {
    return null
   }
}