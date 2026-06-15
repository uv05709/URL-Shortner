import express from "express";
import { error } from "node:console";
import { shortenPostRequestBodySchema } from "../validation/request.validation.js";
import { db } from "../db/index.js";
import { urlsTable, usersTable } from "../models/index.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/shorten", async function (req, res) {
  const userId = req.user?.id;
  if (!userId) {
    return res
      .status(401)
      .json({ error: ` You must be logged in to access this resourse` });
  }
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );
  if (validationResult.error)
    return res.status(404).json({ error: validationResult.error });
  const { url, code } = validationResult.data;
  const shortCode = code ?? nanoid(6);
  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetUrl: url,
      userId: req.user.id,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetUrl: urlsTable.targetUrl,
    });
  return res
    .status(201)
    .json({
      id: result.id,
      shortCode: result.shortCode,
      targetUrl: result.targetUrl,
    });
});

export default router;
