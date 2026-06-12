import express from "express";
import { usersTable } from "../models/index.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { error } from "node:console";
import { randomBytes, createHmac } from "crypto";
import { signupRequestPostBodySchema } from "../validation/request.validation.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const validationResult = await signupRequestPostBodySchema.safeParseAsync(
    req.body,
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }
  const { firstname, lastname, email, password } = validationResult.data;

  const [existingUser] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (existingUser) {
    return res.status(400).json({ error: ` user already exist` });
  }

  const salt = randomBytes(256).toString("hex");
  const hashPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

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
export default router;
