import express from "express";
import { usersTable } from "../models/index.js";
import { db } from "../db/index.js";
import { error } from "node:console";
import { signupRequestPostBodySchema ,loginRequestPostBodySchema} from "../validation/request.validation.js";
import { hashPasswordWithSalt } from "../utils/hash.js";
import { getUserByEmail } from "../services/user.services.js";

import {createUserToken} from '../utils/token.js'

const router = express.Router();

router.post("/signup", async (req, res) => {
  const validationResult = await signupRequestPostBodySchema.safeParseAsync(
    req.body,
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }
  const { firstname, lastname, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ error: ` user already exist` });
  }

  const { salt, password: hashPassword } = hashPasswordWithSalt(password);

  const [user] = await db
    .insert(usersTable)
    .values({
      firstname,
      lastname,
      email,
      salt,
      password: hashPassword,
    })
    .returning({ id: usersTable.id });
  return res.status(201).json({ data: { userId: user.id } });
});

router.post('/login',async(req,res)=>{
const validationResult = await loginRequestPostBodySchema.safeParseAsync(req.body)

if(validationResult.error){
  return res.status(400).json({error:validationResult.error})
}
const{email,password} = validationResult.data
const user = await getUserByEmail(email)
if(!user){
  return res.status(404).json({error:` user not found`})
}

const { password:hashPassword} = hashPasswordWithSalt(password,user.salt)
if(user.password !== hashPassword){
  return res.status(401).json({error: `invalid password`})
}
const token = await   createUserToken({id: user.id})

return res.json({token})

})
export default router;
